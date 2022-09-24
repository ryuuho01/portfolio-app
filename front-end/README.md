# Name
お店予約アプリケーションのフロントエンドを構築する。
  
# Installation
  
【フロントエンド環境構築】  
コマンドプロンプト、もしくはターミナルを起動  
ここではデスクトップで構築します  
cd desktop  
  
git cloneによりportfolio-appをダウンロード後、ディレクトリを移動  
cd portfolio-app/front-end  
  
(*)Node.jsをインストールされていない方  
nvm install v14.18.1  
  
(*)Node.jsのバージョンがv14.18.1でない方  
nvm use v14.18.1  
  
(*)Vue CLIをインストール  
npm install -g @vue/cli  
  
(*)yarnをインストール  
npm install -g yarn  
  
yarnのライブラリをインストール  
yarn install  
  
vee-validateをインストール  
yarn add vee-validate@3  
  
auth-nextをインストール  
yarn add @nuxtjs/auth-next  
  
proxyをインストール  
yarn add @nuxtjs/proxy  
  
dotenvをインストール  
yarn add @nuxtjs/dotenv  
  
cross-envをインストール  
yarn add cross-env  
  
sassをインストール  
yarn add --dev sass-loader@10  
  
.envを作成し、  
touch .env  
vi .env  
環境変数を設定。以下の環境変数を追加  
BASE_URL=http://localhost:3000  
  
vi操作を:wqで終了し、最後にサーバーを起動  
yarn dev  
  
ブラウザにアクセス  (別途バックエンドの起動も必要)  
http://localhost:3000  
  
また  
yarn test  
により、Jestによるテストが可能です。  
