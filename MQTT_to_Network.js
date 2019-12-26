//NETWORK GRAPH
// create an array with nodes
var nodes = new vis.DataSet([
  {id: 'main_ip', label: '10.255.255.N', x: 0, y: 0, color: "#858796", timestamp: "", ipType: 0, font: {color: 'white'}},
  {id: 'Server', label: '172.105.219.146',x: -1, y: 0,color: "#858796", timestamp: "", ipType: 0, font: {color: 'white'}},
]);
// create an array with edges
var edges = new vis.DataSet([
  {id: 0, from: 'main_ip', to: 'Server', timestamp: "", width: 1}
]);
// create a network
var container = document.getElementById('mynetwork');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);

// remove Nodes
setInterval(function () {
  var disconnect = edges.get({
    filter: function (ip) {
      var get_time = new Date(ip.timestamp).getSeconds();
      var now_s = new Date().getSeconds();
      var upper = (now_s+1)%60;
      var lowwer = (now_s+59)%60;
      // console.log("now: "+now_s+" ip time: "+get_time);
      if(upper<lowwer){
        return(get_time>=upper&&get_time<=lowwer);
      }else if(get_time>now_s){
        return(get_time>=upper);
      }else{
        return(get_time<=lowwer);
      }
    }
  });
  if(disconnect.length != 0){
    disconnect.forEach(function(ip){
      var edge_remove_id = ip.id;
      var node_remove_id = edge_remove_id.substring(0, edge_remove_id.length-1);
      var ipType_remove = parseInt(edge_remove_id.substring(edge_remove_id.length-1), 10);
      var node_ipType = nodes.get(node_remove_id).ipType;
      edges.remove(edge_remove_id);
      if(ipType_remove ==　node_ipType){
        nodes.remove(node_remove_id);
      }else{
        if(ipType_remove == 1){
          edges.update({id: node_remove_id+"2", color:"#1cc88a"});
          nodes.update({id: node_remove_id, color: "#1cc88a", ipType: 2});
        }else if(ipType_remove == 2){
          nodes.update({id: node_remove_id, color: "#4e73df", ipType: 1});
          edges.update({id: node_remove_id+"1", color:"#4e73df"})
        }
      }
      console.log("remove!!!!!!!");
    });   
    network.setData(data);
  }
  // console.log(disconnect);
  
}, 40000);

//count Node
function CountNode(){
  var type1 = nodes.get({filter: function (ip) {return(ip.ipType == 1);}});
  var type2 = nodes.get({filter: function (ip) {return(ip.ipType == 2);}});
  var type3 = nodes.get({filter: function (ip) {return(ip.ipType == 3);}});
  var type4 = nodes.get({filter: function (ip) {return(ip.ipType == 4);}});

  document.getElementById('server_to_ip').innerHTML =type1.length;
  document.getElementById('ip_to_server').innerHTML =type2.length;
  document.getElementById('ip_server').innerHTML =type4.length;
  document.getElementById('ip_to_gateway').innerHTML =type3.length;
  //console.log(type4.length); 
  setTimeout('CountNode()',1000);
}

//table Node
function TableNode(){
  var tableContent="";
  nodes.forEach(function(ip){
    var name=ip.label;
    var temptime = new Date(ip.timestamp);
    var lasttime = temptime.getHours()+":"+temptime.getMinutes()+":"+temptime.getSeconds();
    var danger = "Safe";
    var type;
    var rate;
    if(ip.ipType == 0){
      type ="--";
      rate = "--";
      lasttime = "--";
    }else if(ip.ipType == 1){
      type= "IP <- Intranet";
      rate = (edges.get(name+"1").width).toFixed(2);
      if(rate>=1.5)
        danger ="Unsafe";

    }else if(ip.ipType == 2){
      type= "IP -> Intranet";
      rate =  (edges.get(name+"2").width).toFixed(2);
      if(rate>=1.5)
        danger ="Unsafe";

    }else if(ip.ipType == 3){
      type= "IP -> Gateway";
      rate = (edges.get(name+"3").width).toFixed(2);
      if(rate>=1.5)
        danger ="Unsafe";
    }else{
      type= "IP <=> Intranet";
      var rate1 = (edges.get(name+"1").width).toFixed(2);
      var rate2 = (edges.get(name+"2").width).toFixed(2);
      rate= rate1+" / "+rate2;
      if(rate1>=1.5||rate2>=1.5)
        danger ="Unsafe";
    }
      // console.log(rate);
    tableContent = tableContent+"<tr><td>"+name+"</td><td>"+type+"</td><td>"+rate+"</td><td>"+danger+"</td><td>"+lasttime+"</td></tr>";
  });
  document.getElementById('myTable').innerHTML =tableContent;
  setTimeout('TableNode()',1000);
}

//click Node
network.on("click", function(params) {
  // console.log(params.nodes[0]);
  // console.log(params);
  //click node
  if(params.nodes[0] != undefined){
    var c_node = nodes.get(params.nodes[0]);
    // console.log(c_node);
    document.getElementById("info_name").innerHTML = c_node.label;
    document.getElementById("info_src").innerHTML = "--";
    document.getElementById("info_dest").innerHTML = "--";
    document.getElementById("info_danger").innerHTML ="Safe";
    var temptime = new Date(c_node.timestamp);
    var lasttime = temptime.getHours()+":"+temptime.getMinutes()+":"+temptime.getSeconds();
    document.getElementById("info_lasttime").innerHTML = lasttime;
    if(c_node.ipType == 0){
      if(c_node.id == "main_ip")
        document.getElementById("info_type").innerHTML ="Intranet";
      else
        document.getElementById("info_type").innerHTML ="Gateway";
      document.getElementById("info_rate").innerHTML ="--";
      document.getElementById("info_danger").innerHTML ="--";
      document.getElementById("info_lasttime").innerHTML = "--";
    }else if(c_node.ipType == 1){
      var c_edge = edges.get(params.nodes[0]+"1");      
      document.getElementById("info_type").innerHTML ="IP <- Intranet";
      document.getElementById("info_rate").innerHTML =(c_edge.width).toFixed(2);
      if(c_edge.width>=1.5)
        document.getElementById("info_danger").innerHTML ="Unsafe";
    }else if(c_node.ipType == 2){
      var c_edge = edges.get(params.nodes[0]+"2");      
      document.getElementById("info_type").innerHTML ="IP -> Intranet";
      document.getElementById("info_rate").innerHTML =(c_edge.width).toFixed(2);
      if(c_edge.width>=1.5)
        document.getElementById("info_danger").innerHTML ="Unsafe";
    }else if(c_node.ipType == 3){
      var c_edge = edges.get(params.nodes[0]+"3");      
      document.getElementById("info_type").innerHTML ="IP -> Gateway";
      document.getElementById("info_rate").innerHTML =(c_edge.width).toFixed(2);
      if(c_edge.width>=1.5)
        document.getElementById("info_danger").innerHTML ="Unsafe";
    }else if(c_node.ipType == 4){
      var c_edge1 = edges.get(params.nodes[0]+"1");      
      var c_edge2 = edges.get(params.nodes[0]+"2");      
      document.getElementById("info_type").innerHTML ="IP <=> Intranet";
      document.getElementById("info_rate").innerHTML =(c_edge1.width).toFixed(2)+" / "+(c_edge2.width).toFixed(2);
      if(c_edge1.width>=1.5||c_edge2.width>=1.5)
        document.getElementById("info_danger").innerHTML ="Unsafe";
    }
  }else if(params.edges[0] != undefined){
    var c_edge = edges.get(params.edges[0]);
    var main_name = nodes.get('main_ip').label;
    document.getElementById("info_name").innerHTML = "--";
    document.getElementById("info_rate").innerHTML =(c_edge.width).toFixed(2);
    var temptime = new Date(c_edge.timestamp);
    var lasttime = temptime.getHours()+":"+temptime.getMinutes()+":"+temptime.getSeconds();
    document.getElementById("info_lasttime").innerHTML = lasttime;
    if(c_edge.id == 0){
      document.getElementById("info_src").innerHTML = main_name;
      document.getElementById("info_dest").innerHTML = "172.105.219.146";
      document.getElementById("info_rate").innerHTML ="--";
      document.getElementById("info_type").innerHTML ="Server";
      document.getElementById("info_lasttime").innerHTML = "--";
    }else if(c_edge.from == "main_ip"){
      document.getElementById("info_src").innerHTML = main_name;
      document.getElementById("info_dest").innerHTML = c_edge.to;
      document.getElementById("info_type").innerHTML ="IP <- Intranet";
    }else if(c_edge.to == "main_ip"){
      document.getElementById("info_src").innerHTML =c_edge.from;
      document.getElementById("info_dest").innerHTML = main_name;
      document.getElementById("info_type").innerHTML ="IP -> Intranet";
    }else{
      document.getElementById("info_src").innerHTML =c_edge.from;
      document.getElementById("info_dest").innerHTML = "172.105.219.146";
      document.getElementById("info_type").innerHTML ="IP -> Intranet";
    }
    if(c_edge.width>=1.5)
      document.getElementById("info_danger").innerHTML ="Unsafe";
    else
      document.getElementById("info_danger").innerHTML ="Safe";

  }
});


//MQTT
var mqtt;
var reconnectTimeout = 2000;
var host="10.255.255.254"; //change this
var port= 61883;

function onFailure(message) {
  console.log("Connection Attempt to Host "+host+"Failed");
  setTimeout(MQTTconnect, reconnectTimeout);
}
function onMessageArrived(msg)
{
  var str_msg = msg.payloadString;
  var obj_msg = JSON.parse(str_msg);
  // console.log(obj_msg);
  // console.log("src:"+ obj_msg["src_ip"]+ "// dest:"+ obj_msg["dest_ip"]+ " // oob.out: " +obj_msg["oob.out"]);

  //內網連外面
  if(obj_msg["oob.out"]=="eth0")
  {
    if(nodes.get('main_ip').label == '10.255.255.N'){
      nodes.update({id:'main_ip', label: obj_msg["src_ip"]});
    }

    var out_ip = obj_msg["dest_ip"];
    var out_edge = out_ip + "1";
    var out_time = obj_msg["timestamp"];
    //NEW node and new connect
    if(nodes.get(out_ip) == null && edges.get(out_edge) == null)
    {
      nodes.add({id: out_ip, label: out_ip, color: "#4e73df", timestamp: out_time, ipType: 1, font: {color: 'white'}});
      edges.add({id: out_edge, from: 'main_ip', to: out_ip, arrows:{to: {enabled: true, type: "triangle"}}, color:"#4e73df", width: 1, timestamp: out_time});
    }else
    {
      //old node and NEW connect
      if(edges.get(out_edge) == null)
      {
        var edge_change_color = out_ip + "2";
        nodes.update({id: out_ip, color: "#36b9cc", timestamp: out_time, ipType: 4});
        edges.update({id:　edge_change_color, color:"#36b9cc"});
        edges.add({id: out_edge, from: 'main_ip', to: out_ip, arrows:{to: {enabled: true, type: "triangle"}}, color:"#36b9cc", width: 1, timestamp: out_time});
      }else
      { //old node and MORE connect
        var new_width = edges.get(out_edge).width + 0.01;
        edges.update({id: out_edge, width: new_width, timestamp: out_time});
      }
    }
    
    // console.log("內到外");    
    // console.log("src:"+ obj_msg["src_ip"]+ "// dest:"+ obj_msg["dest_ip"]);
    // console.log("oob.in: "+ obj_msg["oob.in"]+ " // oob.out: " +obj_msg["oob.out"]);

  }else if (obj_msg["oob.in"]=="eth0")
  {
    //外面連Gateway
    if(obj_msg["oob.out"]=="")
    {
      var out_ip = obj_msg["src_ip"];
      var out_edge = out_ip + "3";
      var out_time = obj_msg["timestamp"];

      //NEW node and new connect
      if(nodes.get(out_ip) == null && edges.get(out_edge) == null)
      {
        
        nodes.add({id: out_ip, label: out_ip, color: "#f6c23e", timestamp: out_time, ipType: 3, font: {color: 'white'}});
        edges.add({id: out_edge, from: out_ip, to: 'Server', arrows:{to: {enabled: true, type: "triangle"}}, width: 1, timestamp: out_time});

      }else
      { //old node and NEW connect
        if(edges.get(out_edge) == null)
        {
          edges.add({id: out_edge, from: out_ip, to: 'Server', arrows:{to: {enabled: true, type: "triangle"}}, color:"#f6c23e", width: 1, timestamp: out_time});
          console.log(obj_msg);
        }else
        { //old node and MORE connect
          var new_width = edges.get(out_edge).width + 0.01;
          edges.update({id: out_edge, width: new_width, timestamp: out_time});
        }

      }
      if(obj_msg["oob.prefix"] != "")
      {
        nodes.update({id: out_ip, color: "#e74a3b"});
      }
      console.log(obj_msg["oob.prefix"]);


      // console.log("外到S");        
      // console.log("src:"+ obj_msg["src_ip"]+ "// dest:"+ obj_msg["dest_ip"]);
      // console.log("oob.in: "+ obj_msg["oob.in"]+ " // oob.out: " +obj_msg["oob.out"]);
    }else
    { //外面連內網
      if(nodes.get('main_ip').label == '10.255.255.N'){
        nodes.update({id:'main_ip', label: obj_msg["dest_ip"]});
      }
        
      var out_ip = obj_msg["src_ip"];
      var out_edge = out_ip + "2";
      var out_time = obj_msg["timestamp"];

      //NEW node and new connect          
      if(nodes.get(out_ip) == null && edges.get(out_edge) == null)
      {
        nodes.add({id: out_ip, label: out_ip, color: "#1cc88a", timestamp: out_time, ipType: 2, font: {color: 'white'}});
        edges.add({id: out_edge, from: out_ip, to: 'main_ip', arrows:{to: {enabled: true, type: "triangle"}}, color:"#1cc88a", width: 1, timestamp: out_time});
      }else
      { //old node and NEW connect
        if(edges.get(out_edge) == null)
        {
          var edge_change_color = out_ip + "1";
          nodes.update({id: out_ip, color: "#36b9cc", timestamp: out_time, ipType: 4});
          edges.update({id:　edge_change_color, color:"#36b9cc"}); 
          edges.add({id: out_edge, from: out_ip, to: 'main_ip', arrows:{to: {enabled: true, type: "triangle"}}, color:"#36b9cc", width: 1, timestamp: out_time});
        }else
        { //old node and MORE connect
          var new_width = edges.get(out_edge).width + 0.01;
          edges.update({id: out_edge, width: new_width, timestamp: out_time});
        }
      }
    
      // console.log("外到內");
      // console.log("src:"+ obj_msg["src_ip"]+ "// dest:"+ obj_msg["dest_ip"]);
      // console.log("oob.in: "+ obj_msg["oob.in"]+ " // oob.out: " +obj_msg["oob.out"]);
    }
  }else{
    console("I AM OUT!!!!!!!!!!!!1");
    console.log("src:"+ obj_msg["src_ip"]+ "// dest:"+ obj_msg["dest_ip"]);
    console.log("oob.in: "+ obj_msg["oob.in"]+ " // oob.out: " +obj_msg["oob.out"]);

  }
  // network.setData(data);
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

MQTTconnect();