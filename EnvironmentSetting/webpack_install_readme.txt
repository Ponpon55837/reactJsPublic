專案中安裝webpack

1. 終端機執行 npm install --save-dev webpack

如:C:\User\ponpon55837\public> npm install --save-dev webpack

2. 終端機執行 npm install --save-dev webpack-cli

如:C:\User\ponpon55837\public> npm install --save-dev webpack-cli

3. 新增webpack.config.js 檔

如:C:\User\ponpon55837\public\webpack.config.js

新增內容

const path = require('path');              // path為固定          不可改

module.exports = {
  entry: './src/main.js',                  // main,js為傳入的js   可改
  output: {
    path: path.resolve(__dirname, 'lib'),  // lib這邊是輸出的位置 可改
    filename: 'main.js'                    // 輸出後的js名稱      可改
  }
};


webpack 串接 babel

1. 終端機執行 npm install --save-dev babel-loader @babel/core

如:C:\User\ponpon55837\public> npm install --save-dev babel-loader @babel/core

2. 在webpack.config.js中加入module內容

const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};

記得在html中使用的js跟css都是編譯後的放在lib跟css資料夾中的檔案


只使用webpack 不使用.babelrc的話


1. 修改module中的rules的test的正規表示式

原本的是 test: /\.js/,
改寫後是 test: /\.m?jsx?$/,

2.在webpack.config.js中 將loader改寫

module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }

3. 刪除.babelrc檔

4. 在package.json中

使用webpack編譯的話可以寫成
"build": "webpack",
"watch": "webpack -w",

5. 在webpack.config.js中新增mode

可以寫在module上面，有三種模式
mode: "production", // production || development || none


webpack 安裝 style lodaer & css loader

1. 安裝style loader

終端機執行 npm install --save-dev style-loader

2. 安裝css loader

終端機執行 npm install --save-dev css-loader

3. webpack.config.js 新增rules

{
 test: /\.css$/,
 exclude: /node_modules/,
 use:[
   { loader: 'style-loader'},
   { loader: 'css-loader'}
  ],
}

寫完之後css檔可以不用掛在html下面 可以跟著main,js一起掛上去
如: main.js中使用import

import css from '../css/main.css'

在網頁中會直接以程式的方式呈現

如:
<style>
  body{
    color: blue;
}
</style>

不過我覺得直接使用<link rel="stylesheet" type="text/css" href="main.css" />比較方便


讓webpack使用babel使可以run  => 函式

1. 終端機執行 npm install @babel/plugin-proposal-class-properties -d

2. webpack.config.js中新增options
rules: [
  {
    test: /\.m?jsx?$/,
    exclude: /node_modules/,
    use:{
      loader: "babel-loader",
      options:{
        presets: ["@babel/preset-env"],
        plugins: ['@babel/plugin-proposal-class-properties']
       }
     }
   },


webpack 串接react

1. 終端機執行 npm install -D babel-loader @babel/core @babel/preset-react

2. 終端機執行 npm install -D @babel/preset-env

3. 修改webapck.config.js rules的preset

rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env", '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },


webpack 安裝babel properties 用來run function箭頭函數

1. 終端機執行 npm install @babel/plugin-proposal-class-properties -D
2. 確定安裝完之後webpack.config.js在loader裡面有沒有plugins

寫成

use:{
       loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env", '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
        }
    }


webpack 安裝material design lite - button

1. 終端機執行 npm install @material/react-button
2. 終端機執行 npm install react react-dom -D
3. jsx中放入 import Button from '@material/react-button'

格式寫成 <Button></Button>

webpack 安裝material design lite - card

1. 終端機執行 npm install @material/react-card
2. jsx中放入
import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from "@material/react-card";

webpack 安裝material design lite - typography 因為card會用到typography

1. 終端機執行  npm install @material/react-typography
2. jsx放入
import {
  Body1,
  Body2,
  Button,
  Caption,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '@material/react-typography';

webpack 安裝material design lite - radio

1. 終端機執行  npm install @material/react-radio
2. jsx放入  import Radio, {NativeRadioControl} from '@material/react-radio';

webpack 安裝material design lite - checkbox
1. 終端機執行 npm install @material/react-checkbox
2. jsx放入  import Checkbox from '@material/react-checkbox';

webpack 安裝material design lite - textfield
1. 終端機執行  npm install @material/react-text-field
2. jsx放入 import TextField, {HelperText, Input} from '@material/react-text-field';

webpack 安裝material design lite - icon

1. 終端機執行  npm install @material/react-material-icon
2. jsx放入 import MaterialIcon from '@material/react-material-icon';


webpack 安裝material design lite - select

1. 終端機執行 npm install @material/react-select
2. jsx放入 import Select, {Option} from '@material/react-select';

webpack 安裝react cdn內容  不再由網路接cdn進來

1. 終端機執行 npm install react -D
2. 終端機執行 npm install react-dom -D
3. jsx放入 import React from 'react' 注意  這一行每一頁都要放
4. jsx放入 import ReactDOM from 'react-dom'

webpack 安裝material design lite - layout-grid
1. 終端機執行 npm install @material/react-layout-grid
2. jsx放入 import {Cell, Grid, Row} from '@material/react-layout-grid';

webpack 安裝react router
1. 終端機執行 npm install --save react-router -D
2. jsx放入 import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

webpack 安裝React Top App Bar
1. 終端機執行 npm install @material/react-top-app-bar
2. jsx放入 import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';

webpack 安裝react-material-icon
1. 終端機執行 npm install @material/react-material-icon
2. jsx放入 import MaterialIcon from '@material/react-material-icon';

webpack 安裝react-material-drawer
1. 終端機執行 npm install @material/react-drawer
2. jsx放入 import Drawer, {DrawerAppContent} from '@material/react-drawer';

webpack 安裝Redux
1. 終端機執行 npm install --save react-redux
2. jsx放入 import { createStore } from 'redux'
