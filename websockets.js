var mqtt;
var reconnectTimeout = 2000;
var host="10.255.255.254"; //change this
var port= 61883;
var obj_msg;

function onFailure(message) {
	console.log("Connection Attempt to Host "+host+"Failed");
	setTimeout(MQTTconnect, reconnectTimeout);
}
function onMessageArrived(msg){
	//console.log(msg.payloadString);
	var str_msg = msg.payloadString;
	obj_msg = JSON.parse(str_msg);
	//console.log(obj_msg);
	console.log("src:"+ obj_msg["src_ip"]+ "// dest:"+ obj_msg["dest_ip"]+ " // oob.out: " +obj_msg["oob.out"]);
}

	function onConnect() {
// Once a connection has been made, make a subscription and send a message.

	console.log("Connected ");
	mqtt.subscribe("traffic/172-105-219-146");
	// message = new Paho.MQTT.Message("Hello World");
	// message.destinationName = "traffic/172-105-219-146";
	// mqtt.send(message);
}
function MQTTconnect() {
	console.log("connecting to "+ host +" "+ port);
	mqtt = new Paho.MQTT.Client(host,port,"clientjs");
	//document.write("connecting to "+ host);
	var options = {
		timeout: 3,
		onSuccess: onConnect,
		onFailure: onFailure,
	};
	mqtt.onMessageArrived = onMessageArrived;

	mqtt.connect(options); //connect
}