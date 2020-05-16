# 檔案下載下來之後

## 1. 安裝方式
1. 安裝node.js   可以到node.js官網下載穩定版[https://nodejs.org/en/]()
2.   不必額外安裝設定webpack babelrc 因為檔案裡面已經有了
3.   選擇想要的資料夾，將內容複製到src資料夾
4.   在終端機中 `npm run watch` 或是 `npm run build` 即可進行compile動作  

>如果安裝完畢發現無法使用`npm run build` 或是 `npm run watch`
>
>請使用 `npm install`重新安裝 npm
---

## 2. 文件內容
1. 在資料夾名稱前面有_前綴的資料夾都是舊的檔案，使用者可以直接拿來閱讀或是複製到src資料夾compile使用
2. 使用`npm run build` 就是使用在package.json中 `"build": "webpack"`
3.   使用`npm run watch` 就是使用在package.json中 `"watch": "webpack -w"` 因為watch可要讓在開發時持續compile，**推薦使用**
4.  **至於其它部分如無需要儘量不要修改，避免出錯**

```
"build": "webpack",
    "watch": "webpack -w",
    "build_webpack": "webpack --config webpack.config.js",
    "build_js&sass": "npm run js & npm run sass",
    "dev_watch": "start npm run js_watch & start npm run sass_watch",
    "js": "babel src -d lib",
    "js_watch": "babel --watch src -d lib",
    "sass": "sass scss:css",
    "sass_watch": "sass --watch scss:css"
```
    
## 3. 備註 
下面是被丟到firebase上的測試程式，使用目前在src資料夾compile的內容
	
<label>測試網站</label>
<a href="https://vuetest-69b45.firebaseapp.com/">https://vuetest-69b45.firebaseapp.com/</a>

