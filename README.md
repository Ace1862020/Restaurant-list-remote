# My Restaurant-list
建立&編輯你喜歡的餐廳清單
## 特色
* 必須先註冊/登入才能使用
* 也可以使用Facebook登入
* 點擊頁面左上方的LOGO，可以返回index page
* 點擊任一餐廳資訊卡，可以查看該餐廳的詳細資料
* 搜尋餐廳名稱，會顯示相關關鍵字的餐資訊卡
* 搜尋不到的時候，會顯示 not founnd
## 更新
* 可以使用排序顯示
* 可以新增餐廳資訊卡
* 可以更新編輯餐廳資訊
* 可以刪除餐資訊
* 增加使用者認證功能
###### 登入頁
![image](https://github.com/Ace1862020/Restaurant-list-remote/blob/master/public/rest_auth.jpg)
###### 首頁
![image](https://github.com/Ace1862020/Restaurant-list-remote/blob/master/public/rest-home-page.jpg)
###### 新增頁
![image](https://github.com/Ace1862020/Restaurant-list-remote/blob/master/public/resran-create.jpg)

## 未完成清單
* 刪除餐廳跳出確認提示
* 搜尋系統更新
* 頁面優化

## 建置環境 - prerequisites
1. Node.js (V 14.15.0) - JavaScript執行環境
2. Nodemon (V 2.0.6) - 輔助Node.js的模組
3. MongoDB

## 安裝 - Installation
1.[Dowload](https://github.com/Ace1862020/Restaurant-list-remote/archive/master.zip)<br>
or 開啟終端機(Terminal)到欲存放的資料夾(本機)位置，輸入以下指令
```
$ git clone Ace1862020/Restaurant-list-remote
```
2. 安裝套件
```
$ npm install
```
3. 產生預設使用者與餐廳資料
```
$ npm run seed
```
```
看到 mongodb connected! 與 done. 表示成功建立資料
```
4. 執行程式
```
$ npm run dev
```
看到以下訊息表示啟動完成
```
Express is listening on localhost:3000
mongodb connected!
```
Will show on terminal when server connect success.
<br>
browse http://localhost:3000

## 測試用資料
* Account_1
  * email：user1@example.com
  * pwd：12345678
* Account_2
  * email：user1@example.com
  * pwd：12345678
