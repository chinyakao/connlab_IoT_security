# connlab_IoT_security
	display Network Connection in real time

## Question
	Unsafe 的定義 目前訂 width >= 1.5 就顯示 Unsafe
## Bug
	time line chart 修正成多線
	option 可調整time interval

## DEMO-歷史連線圖
	一、主要目的	
		用地圖的形式，確認過去的連線狀況
		呈現出各地區ip位置的連線數量、連線方式以及顯示特殊事件
	二、實作架構
		使用了 d3.js 來建構世界地圖以及經緯度在地圖上的相對座標，
		只要給定經緯度就可以在網頁上得到相對的位置
		連接 api 取得記錄下來的資料做統計，並將統計後各地區的結果顯示在地圖上。
		
		存放的資料多，一直去 call api 會爆掉，
		寫個小程式給他跑然後就直接存在 local
		在 local 端直接整理過且統計後的資料，
		就可以直接取得不用一直讓他去 call api
	三、使用流程
		[地圖]
			預設為所有的連線資料
			圓圈大小代表了數量的多寡，虛線的流向代表連接的方向
			將滑鼠移動到圓圈上，底下會顯示該地區統計的結果，顯示該地區的名稱、數量、使用的通訊協定及其數量。
		[日曆]
			選擇任一時間區段做顯示
		[下拉選單]
			選擇要看哪一種連線模式(三種連線方式)
		[列表]
			顯示特殊事件
			如：當有 IP 嘗試在短時間內連不同的 port，就會被 ban
			並且顯示在表格裡做提醒，哪個 IP 對哪個 IP 在什麼時候做了 Port Scanning
	四、遇到的困難 
		資料很多、call api 會爆掉，改存整理後的資料在 local
## DEMO-即時連線圖
	一、主要目的
		確認自身內網的設備和外網其他位置的連線互動
		呈現各個ip位置的資訊、連線時間、數量、特殊事件
		能即時發現有危險性的連線
	二、實作架構
		1、主要架構(圖)
			MQTT、WebSocket
		2、資料處理(圖)
			使用欄位oob.in及oob.out分類四種type的連線
			[ADD]當有package傳送過來，整理後，再更新(新增) ip位址 以及 ip 的更新時間和封包數(連線時間長度)
			[REMOVE]每秒檢查，ip位址在30秒內是否有更新，若超過30秒未更新，就刪除ip位址 
			[TIMELINE]每5秒更新一次
			[COUNT][TABLE][PIE]每秒更新一次
		3、視覺呈現(圖)
			BOOSTRAP -> RWD
			js -> Counting
			vis.js -> Network Graph、 Graph event
			chart.js -> Table、 Pie、 Timeline
	三、使用流程
			(網頁圖)
			[HEAD]
				有自訂的內網名稱及當下時間
				四種ip位置連線的個數 1.out藍 2.in綠 3.out+in藍綠 4.gateway黃
			[左中圖]
				Network Graph連線圖 
				四種顏色 傳輸時間越長線越粗
				若有ip位置短時間內port scanning多次，顯示紅色警告使用者
			[右中表]
				點擊ip位址或是連線，顯示資訊
			[左下pie]
				各種連線所佔比例
			[右下表]
				隨時間收到的package 數	
			[最下表]
				將各個ip位址呈列
			[特殊事件]
				若有ip位置短時間內port scanning多次，會跳網頁通知，並顯示成紅色警告使用者
	四、遇到的困難
		1. mqtt連接web的過程是透過webSockets做api連接，
		從了解mqtt的發布訂閱到接收資料呈現在網頁應用上花了較多的時間

		2. MQTT封包的傳送是用當下有連線的ip位置就不斷的丟封包，可能一秒內就有好多個，
		且當一有新的封包，network graph 就會不斷的更新，graph 會一直變
		使用者就會比較不容易從 graph 上一眼就看出所有的連線狀態，
		同時也較難直接判斷 ip 位置已經斷掉連線，讓我們即時顯示在 graph 上
		所以我們要計算多久需要更新 graph 一次，同時又不影響其他，能呈現真正的連線狀態
		因此用30秒當作我們的域值，只要 ip 位址離上一次封包更新時間超過30秒，判斷為已斷線
		不斷傳送更新的封包我們會做整理並從存在 local 端，再每秒一次更新上去
	
