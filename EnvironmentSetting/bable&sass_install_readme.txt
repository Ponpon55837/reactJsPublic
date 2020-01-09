在專案裡面安裝babel

安裝babel cli
1. 在指定資料夾中確認有無package.json檔案
如果沒有則建立一個空的 package.json的檔案
如: C:\User\ponpon55837\public\package.json

在package.json中 輸入 {}

2. 終端機執行 npm install --save-dev @babel/core @babel/cli

3. 執行完後，點開package.json 確認內容如下
{
  "devDependencies": {
   "@babel/cli": "^7.0.0", //版本號可能不同
   "@babel/core": "^7.0.0"
  }
}

4. 新增script 將package.json內容改寫為
  {
    "scripts": {
      "build": "babel src -d lib"
   },
      "devDependencies": {
      "babel-cli": "^6.0.0"
    }
  }

5. 新增 src , lib 資料夾
如: C:\User\ponpon55837\public\src
如: C:\User\ponpon55837\public\lib

6. 新增 .babelrc檔案
如: C:\User\ponpon55837\public\.babelrc

內容填入
{
  "presets": ["@babel/preset-env"]
}

在終端機執行 npm install @babel/preset-env --save-dev

7. 將寫為ES6的js檔都放入src資料夾，在終端機執行 npm run build
即會在lib資料夾看到編譯過的js檔



安裝sass
1. 終端機執行npm install sass

2. 在專案新增scss css資料夾
如: C:\User\ponpon55837\public\scss
如: C:\User\ponpon55837\public\css

3. 在package.json的script中加入sass內容
"scripts": {
    "build": "babel src -d lib",
    "sass": "sass scss:css"
  },

4. 將scss的檔案放在scss資料夾，終端機執行npm run sass
就可以在css資料夾看到編譯後的css檔跟css.map檔

5. 如果要持續編譯scss檔案擇要在package.json中
"scripts": {
    "build": "babel src -d lib",
    "sass": "sass scss:css",
    "sass_watch": "sass --watch scss:css",
  },

終端機執行npm run sass_watch 就會持續編譯，直到關閉終端機或是按下ctrl + c


同步編譯ES6 & sass
1. 修改package.json中script內容
"scripts": {
    "build": "npm run js & npm run sass",   //執行js跑ES6編譯 , 執行sass編譯
    "js": "babel src -d lib",
    "sass": "sass scss:css",
    "sass_watch": "sass --watch scss:css"
  },

終端機執行npm run build


同步編譯ES watch & sass watch
1. 修改package.json中script內容
"scripts": {
    "build": "npm run js & npm run sass",
    "dev_watch": "start npm run js_watch & start npm run sass_watch",
    "js": "babel src -d lib",
    "js_watch": "babel --watch src -d lib",
    "sass": "sass scss:css",
    "sass_watch": "sass --watch scss:css"
  },

終端機執行npm run dev_watch
