<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;
use App\Http\Requests\ResisterRequest;
use App\Http\Requests\MailRequest;
use App\Http\Requests\ShopCreateRequest;
use App\Models\User;
use App\Models\Shop;
use App\Models\Area;
use App\Models\Genre;
use App\Models\Jobtest;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['regist', 'login', 'reminder']]);
    }

    /**
     * レスポンス作成
     *
     * @param string $status httpStatus Number
     * @param string $statusText
     * @param array $data
     * @param string $request
     * @return array
     */
    protected function buildResponse($status, $statusText, $data, $request)
    {
        $response = [
            'status' => $status,
            'statusText' => $statusText,
            'data' => $data,
            'request' => $request
        ];

        return $response;
    }
    /**
     * ユーザー登録（レジスト）
     * name,email,passwordをリクエストパラメータで受け取る必要がある。
     *
     * @param ResisterRequest $request
     * @return json
     */

    public function register(ResisterRequest $request)
    {
        Log::info($request);
        $user = new User;
        $user->fill($request->all());
        $user->shop_id = null;
        $user->authority = 3;
        $user->verify_email_address = $request->email; //verify_email_address: 検証するEmail
        $user->email = Str::random(32) . "@temp.tmp";
        $user->password = Hash::make($request->password);
        $user->verify_email = false; //verify_email: Emailの承認確認
        $user->verify_token = Str::random(32);
        $user->verify_date = Carbon::now()->toDateTimeString();
        $user->save();
        $this->sendVerifyMail("regist", $user->verify_email_address, $user->verify_token);
        $response = $this->buildResponse(200, "OK", '', "register");

        Log::info('Verify Regist User:' . $user);
        return response()->json($response, $response['status']);
    }

    /**
     * WEBアクセス Email認証用メソッド
     *
     * Emailで届いたトークンを承認する
     *
     * @param string $token
     * @return view
     */
    public function verify($token)
    {
        $verify_limit = Carbon::now()->subMinute(30)->toDateTimeString();
        $user = User::where('verify_token', $token)->where('verify_date', '>', $verify_limit)->first();
        if ($user) {
            // もし登録しようとしているemailが既にusersテーブルに存在していれば
            if (User::where("email", $user->verify_email_address)->first()) {
                Log::info('Verify Exist: ' . $user->verify_email_address);
                return redirect()->away('http://localhost:3000/registalready');
            } else {
                // 仮メールアドレスを本メールに移動
                $user->email = $user->verify_email_address;
                // 仮メールアドレスを削除
                $user->verify_email_address = null;
                // 有効なユーザーにする
                $user->verify_email = true;
                // その他データをクリーニング
                $user->verify_token = null;
                $user->verify_date = null;
                // 承認日登録
                $user->email_verified_at = Carbon::now()->toDateTimeString();
                // 権限付与
                $user->authority = 2;
                // テーブル保存
                $user->save();
                Log::info('Verify Success: ' . $user);
                return redirect()->away('http://localhost:3000/thanks');
            }
        } else {
            Log::info('Verify Not Found: token=' . $token);
            return redirect()->away('http://localhost:3000/registerror');
        }
    }

    /**
     * 認証メールを送信する
     *
     * @param [type] $type
     * @param [type] $email
     * @param [type] $token
     * @return void
     */
    public function sendVerifyMail($type, $email, $token)
    {
        $data = ['token' => $token];
        if ($type == 'regist') {
            Mail::send('jwt.emails.user_register', $data, function ($message) use ($email) {
                $message
                    ->to($email)
                    ->from(config('mail.from.address'))
                    ->subject('【Rese】ユーザー登録の確認メール');
            });
        }
        if ($type == 'reminder') {
            Mail::send('jwt.emails.user_reminder', $data, function ($message) use ($email) {
                $message
                    ->to($email)
                    ->from(config('mail.from.address'))
                    ->subject('【Rese】パスワード変更確認メール');
            });
        }
    }

    /**
     * ログイン
     * email,passwordをリクエストパラメータで受け取る必要がある。
     *
     * @param Request $request
     * @return json
     */
    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token);
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    /**
     * パスワードリマインダー
     *
     * @param Request $request
     * @return json
     */
    public function reminder(Request $request)
    {
        // ユーザーが存在するか確認
        if ($request->email) {
            $user = User::where('email', $request->email)->first();
            Log::info($user);
        }
        if ($user == null) {
            $response = $this->buildResponse(200, 'User Not Found', '', 'reminder');
            Log::info('Reminder User:' . 'User Not Found');
            return response()->json($response, $response['status']);
        } else if ($user != null) {
            // verify_tokenを作成し保存
            $user->verify_token = Str::random(32);
            $user->verify_date = Carbon::now()->toDateTimeString();
            $user->save();
            // メール送信
            $this->sendVerifyMail("reminder", $user->email, $user->verify_token);
            $response = $this->buildResponse(200, 'OK', '', 'reminder');
            Log::info('Reminder User:' . $user);
            return response()->json($response, $response['status']);
        }
    }

    /**
     * WEBリクエスト パスワード設定画面
     *
     * @param Request $request
     * @return view
     */
    public function input_password(Request $request)
    {

        $token = $request->id;

        $verify_limit = Carbon::now()->subMinute(30)->toDateTimeString();
        $user = User::where('verify_token', $token)->where('verify_date', '>', $verify_limit)->first();
        if ($user) {
            return redirect()->away('http://localhost:3000/input_password/?id=' . $token);
        } else {
            return redirect()->away('http://localhost:3000/registerror');
        }
    }

    /**
     * WEBリクエスト パスワードリマインダー
     *
     * @param Request $request
     * @return View
     */
    public function password_change(Request $request)
    {
        $token = $request->token;
        $verify_limit = Carbon::now()->subMinute(30)->toDateTimeString();
        $user = User::where('verify_token', $token)->where('verify_date', '>', $verify_limit)->first();

        if ($user !== null) {
            // パスワードを変更する
            $user->password = Hash::make($request->password);
            // その他のデータをクリーニング
            $user->verify_token = null;
            $user->verify_date = null;
            // 承認日登録
            $user->email_verified_at = Carbon::now()->toDateTimeString();
            // テーブル保存
            $user->save();
            $response = $this->buildResponse(200, 'Success', '', 'password_change');
            Log::info('Reminder Success: ' . $user);
            return response()->json($response, $response['status']);
        } else if ($user === null) {
            $response = $this->buildResponse(200, 'Notfound User', '', 'password_change');
            Log::info('Reminder Error: Notfound User');
            return response()->json($response, $response['status']);
        }
    }

    public function email(MailRequest $request)
    {
        $TO = $request->TO;
        $CC = $request->CC;
        $BCC = $request->BCC;
        $subject = $request->subject;
        $data = ['text' => $request->text];

        if ($TO !== []) {

            Mail::send(['text' => 'jwt.emails.user_text'], $data, function ($message) use ($TO, $CC, $BCC, $subject) {
                $message
                    ->to($TO)
                    ->cc($CC)
                    ->bcc($BCC)
                    ->from(config('mail.from.address'))
                    ->subject($subject);
            });
            $response = $this->buildResponse(200, 'Success', '', 'send_email');
            return response()->json($response, $response['status']);
        } else {
            $response = $this->buildResponse(404, 'Notfound TO', '', 'not_send_email');
            Log::info('Sending email Error: Notfound TO');
            return response()->json($response, $response['status']);
        }
    }
    public function users()
    {
        $items = User::all();
        return response()->json([
            'data' => $items
        ], 200);
    }
    public function add_manager(ResisterRequest $request)
    {
        $hash = Hash::make($request->password);
        $item_content = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hash,
        ];
        $item = User::create($item_content);
        return response()->json([
            'data' => $item
        ], 201);
    }
    public function change_authority(Request $request)
    {
        $update = [
            'authority' => 1,
            'verify_email' => 1
        ];
        $TO = $request->email;
        $data = [
            'name' => $request->name,
            'password' => $request->password
        ];
        $item = User::where('id', $request->id)->update($update);
        if ($item) {
            Mail::send('jwt.emails.manager_created', $data, function ($message) use ($TO) {
                $message
                    ->to($TO)
                    ->from(config('mail.from.address'))
                    ->subject("店舗代表者が作成されました");
            });
            $response = $this->buildResponse(200, 'Success', '', 'change_user_authority');
            return response()->json($response, $response['status']);
        } else {
            $response = $this->buildResponse(404, 'Notfound user', '', 'not_send_email');
            Log::info('Sending email Error: Notfound user');
            return response()->json($response, $response['status']);
        }
    }

    public function add_shop(ShopCreateRequest $request)
    {
        $picture = $request->file('pic_path');
        $picture_name = $picture->getClientOriginalName();
        $picture->storeAs('public', $picture_name);
        $pic_path = "http://127.0.0.1:8000/storage/" . $picture_name;

        $area_id = Area::where('area_name', $request->area_name)->first();
        $genre_id = Genre::where('genre_name', $request->genre_name)->first();
        $item_content = [
            'area_id' => $area_id->id,
            'genre_id' => $genre_id->id,
            'shop_name' => $request->shop_name,
            'description' => $request->description,
            'pic_path' => $pic_path,
        ];
        Shop::create($item_content);

        return response()->json([
            'data' => $item_content
        ], 200);
    }

    public function add_shop_data(Request $request)
    {
        $update = [
            'shop_id' => Shop::pluck('id')->last(),
        ];

        $item = User::where('id', $request->user_id)->update($update);
        if ($item) {
            return response()->json([
                'message' => 'Updated successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
    }

    public function testData()
    {
        $item = Jobtest::all();
        return response()->json([
            'data' => $item,
        ], 200);
    }

    public function test(Request $request)
    {
        $update = [
            'test' => $request->test,
        ];

        $item = Jobtest::where('id', 1)->update($update);
        if ($item) {
            return response()->json([
                'message' => 'Updated successfully',
            ], 200);
        } else {
            return response()->json([
                'message' => 'Not found',
            ], 404);
        }
    }
}
