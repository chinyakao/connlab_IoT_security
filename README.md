# connlab_IoT_security
	display Network Connection in real time

## Question
	Unsafe 的定義 目前訂 width >= 1.5 就顯示 Unsafe
## Bug
	time line chart 修正成多線
	option 可調整time interval

## DEMO
	我們使用了 d3.js 來建構世界地圖以及經緯度在地圖上的相對座標，
	只要給定經緯度就可以在網頁上得到相對的位置
	連接 api 取得記錄下來的資料做統計，並將統計後各地區的結果顯示在地圖上。

	那因為我們存放的資料算蠻多的，一直去 call api 會爆掉，所以寫個小程式給他跑然後就直接存在 local
	在 local 端直接整理過且統計後的資料，就可以直接取得不用一直讓他去 call api
	
	使用者能在這個網頁上看見我們實作的成果

	圓圈大小代表了數量的多寡，虛線的流向代表連接的方向
	將滑鼠移動到圓圈上，底下會顯示該地區統計的結果，顯示該地區的名稱、數量、使用的通訊協定及其數量。
	使用者也可以利用左邊的日曆來選擇任一時間區段做顯示

	右方則是當有特殊事件，例如：當有 IP 嘗試在短時間內連	不同的 port，就會被 ban，並且顯示在表格裡做提醒說，哪個 IP 對哪個 IP 在什麼時候做了 Port Scanning

	遇到的困難 -> 資料很多、call api 會爆掉，改存整理後的資料在 local

	一、即時連線確認之必要
		連線完成點開網頁後，即可確認自身內網IP位址和外網其他位置的連線互動，可以即時發現有危險性的連線
	二、使用流程
		(網頁圖)
		[HEAD]
			有自訂的內網名稱及當下時間
			四種ip位置連線的個數 1.out藍 2.in綠 3.out+in藍綠 4.gateway黃
		[左中圖]
			Network Graph連線圖 
			四種顏色 傳輸時間越長線越粗
			若有ip位置短時間內port scanning多次，即顯示紅色警告使用者
		[右中表]
			點擊ip位址或是連線，顯示資訊
		[左下pie]
			各種連線所佔比例
		[右下表]
			隨時間收到的package 數	
		[最下表]
			將各個ip位址呈列
	三、實作架構
		1、主要架構(圖)
			MQTT、WebSocket
		2、資料處理(圖)
			使用欄位oob.in及oob.out分類四種type的連線
			[ADD]當有new message傳送過來，即更新(新增) ip位址 以及 ip 的更新時間和封包數(連線時間長度)
			[REMOVE]每40秒檢查一次，ip位址在一分鐘內是否有更新，若超過一分鐘未更新，就刪除ip位址 
			[COUNT][TABLE]每秒更新一次
		3、視覺呈現(圖)
			BOOSTRAP -> RWD
			js -> Counting
			vis.js -> Network Graph、Graph event
			chart.js -> Table
