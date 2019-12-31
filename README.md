# connlab_IoT_security
	display Network Connection in real time

## Question
	Unsafe 的定義 目前訂 width >= 1.5 就顯示 Unsafe
## Bug
	time line chart 修正成多線
	option 可調整time interval

## DEMO
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
