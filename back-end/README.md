# Name
お店予約アプリケーションのバックエンドを構築する
  
# Installation
・PHP(7.4.24)  
  
【バックエンド環境構築】  
  
MAMP(Mac)もしくはXAMPP(Windows)でMySQL起動

コマンドプロンプト、もしくはターミナルを起動  
Macの場合  
cd /Applications/MAMP/Library/bin/  
Windowsの場合  
cd C:\xampp\mysql\bin  
  
MySQLに接続  
mysql -u root -p  
  
データベースを作成  
CREATE DATABASE backenddb;
  
新たにコマンドプロンプト、もしくはターミナルを起動  
git cloneによりportfolio-appをダウンロード後、そのディレクトリへ移動  
cd portfolio-app  
  
back-endのフォルダをhtdocsへ移動  
Macの場合  
mv back-end /Applications/MAMP/htdocs  
Windowsの場合  
move back-end C:\xampp\htdocs  
  
移動先のディレクトリへ移動
Macの場合  
cd /Applications/MAMP/htdocs/back-end  
Windowsの場合  
cd C:\xampp\htdocs/back-end  
  
(*)Composerをインストールされていない方  
curl -sS https://getcomposer.org/installer | php  
sudo mv composer.phar /usr/local/bin/composer  
chmod a+x /usr/local/bin/composer  
  
Laravel(8.73.0)をインストール  
composer install  
  
.envの作成  
cp .env.example .env  
vi .env  
  
以下の環境変数を設定  
DB_DATABASE=backenddb  
DB_PASSWORD=root  
QUEUE_CONNECTION=database  
MAIL_MAILER=log  
  
以下の環境変数を追加する  
QUEUE_DRIVER=database  
  
vi操作を:wqで終了し、ターミナル(コマンドプロンプト)でlaravel.logを追加  
touch storage/logs/laravel.log
  
JWTの設定  
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"  
php artisan jwt:secret  
  
Storageをリンク  
php artisan storage:link  
  
keyの作成  
php artisan key:generate  
  
キャッシュのクリア  
php artisan config:clear  
  
マイグレーションとシーディングの実行  
php artisan migrate --seed  
  
サーバーを起動  
php artisan serve  
  
最後に別のターミナル(コマンとプロンプト)を開き、キューのワーカを起動します  
cd /Applications/MAMP/htdocs/back-end  
php artisan queue:work  
