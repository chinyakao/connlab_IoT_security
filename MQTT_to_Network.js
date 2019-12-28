//NETWORK GRAPH
// create an array with nodes
var nodes = new vis.DataSet([
  {id: '172.105.219.146', label: '172.105.219.146',x: 0, y: 0,color: "#858796", timestamp: "", ipType: 0, font: {color: 'white'}},
]);
// create an array with edges
var edges = new vis.DataSet([]);
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
  edges.forEach(function (ip) {
    var get_time = new Date(ip.timestamp).getTime();
    var now_time = new Date().getTime();
    // console.log("now: "+now_time+" ip_time: "+get_time);
    // return((now_time-get_time)>30000);
      // edges.remove(ip.id);

    if((now_time-get_time)>30000){
      console.log(ip.timestamp);
      var edge_remove_id = ip.id;
      var node_remove_id = edge_remove_id.substring(0, edge_remove_id.length-1);
      var edge_conType = ip.conType;
      var node_ipType = nodes.get(node_remove_id).ipType;
      edges.remove(edge_remove_id);
      if(edge_conType ==　node_ipType){
        nodes.remove(node_remove_id);
      }else{
        if(edge_conType == 1){
          edges.update({id: node_remove_id+"2", color:"#1cc88a"});
          nodes.update({id: node_remove_id, color: "#1cc88a", ipType: 2});
        }else if(edge_conType == 2){
          nodes.update({id: node_remove_id, color: "#4e73df", ipType: 1});
          edges.update({id: node_remove_id+"1", color:"#4e73df"})
        }
      }
    }
  })
}, 1000);

//count Node
function CountNode(){
  var type1 = 0;
  var type2 = 0;
  var type3 = 0;
  var type4 = 0;
 
  nodes.forEach(
    function(ip){
      if(ip.ipType == 4) type4++;
      else if(ip.ipType == 1) type1++;
      else if(ip.ipType == 2) type2++;
      else if(ip.ipType == 3) type3++;
  });
  // if(edges.length != 0){

  //   edges.forEach(
  //     function(ip){
  //       if(ip.conType == 1) pie_out++;
  //       else if(ip.conType == 2) pie_in++;
  //       else if(ip.conType == 3) pie_gateway++;
  //   });
  //   var pie_data = [pie_out, pie_in, pie_gateway];

  //   console.log(pie_in);
  //   console.log(pie_gateway);
  //   addData(myPieChart,pie_data);
  // }
  

  document.getElementById('server_to_ip').innerHTML =type1;
  document.getElementById('ip_to_server').innerHTML =type2;
  document.getElementById('ip_server').innerHTML =type4;
  document.getElementById('ip_to_gateway').innerHTML =type3;
  //console.log(type4.length); 
  setTimeout('CountNode()',1000);
}

// table Node
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
      console.log(ip);
      console.log(edges.get(name+"1"));
      rate = (edges.get(name+"1").width).toFixed(2);
      if(rate>=1.5)
        danger ="Unsafe";
    }else if(ip.ipType == 2){
      type= "IP -> Intranet";
      console.log(ip);
      console.log(edges.get(name+"2"));
      rate =  (edges.get(name+"2").width).toFixed(2);
      if(rate>=1.5)
        danger ="Unsafe";

    }else if(ip.ipType == 3){
      type= "IP -> Gateway";
      rate = (edges.get(name+"3").width).toFixed(2);
      if(rate>=1.5)
        danger ="Unsafe";
    }else if(ip.ipType == 5){
      type= "IP -> Gateway";
      rate = (edges.get(name+"5").width).toFixed(2);
      danger = "Unsafe";
    }else{
      type= "IP <=> Intranet";
      var rate1 = (edges.get(name+"1").width).toFixed(2);
      var rate2 = (edges.get(name+"2").width).toFixed(2);
      rate= rate1+" / "+rate2;
      if(rate1>=1.5||rate2>=1.5)
        danger ="Unsafe";
    }
      // console.log(rate);
    if(ip.ipType == 5)
      tableContent = tableContent+"<tr style=\"color:#e74a3b;\"><td>"+name+"</td><td>"+type+"</td><td>"+rate+"</td><td>"+danger+"</td><td>"+lasttime+"</td></tr>";
    else
      tableContent = tableContent+"<tr><td>"+name+"</td><td>"+type+"</td><td>"+rate+"</td><td>"+danger+"</td><td>"+lasttime+"</td></tr>";
  });
  document.getElementById('myTable').innerHTML =tableContent;
  setTimeout('TableNode()',1000);
}

// click Node
network.on("click", function(params) {
  // console.log(params.nodes[0]);
  // console.log(params);
  //click node
  document.getElementById("click_ip_info").style.color = "#858796";
  if(params.nodes[0] != undefined){
    var c_node = nodes.get(params.nodes[0]);
    var c_edge = edges.get(params.edges[0]);
    var temptime = new Date(c_node.timestamp);
    var lasttime = temptime.getHours()+":"+temptime.getMinutes()+":"+temptime.getSeconds();
    document.getElementById("info_lasttime").innerHTML = lasttime;      
    document.getElementById("info_name").innerHTML = c_node.label;
    document.getElementById("info_src").innerHTML = "--";
    document.getElementById("info_dest").innerHTML = "--";
    document.getElementById("info_rate").innerHTML =(c_edge.width).toFixed(2);

    if(c_edge.width>=1.5)
      document.getElementById("info_danger").innerHTML ="Unsafe";
    else
      document.getElementById("info_danger").innerHTML ="Safe";
    
    if(c_node.ipType == 0){
      if(c_node.id == "172.105.219.146")
        document.getElementById("info_type").innerHTML ="Server";
      else
        document.getElementById("info_type").innerHTML ="Intranet";
      document.getElementById("info_rate").innerHTML ="--";
      document.getElementById("info_danger").innerHTML ="--";
      document.getElementById("info_lasttime").innerHTML = "--";
    }else if(c_node.ipType == 1){
      document.getElementById("info_type").innerHTML ="IP <- Intranet";
    }else if(c_node.ipType == 2){
      document.getElementById("info_type").innerHTML ="IP -> Intranet";
    }else if(c_node.ipType == 3){
      document.getElementById("info_type").innerHTML ="IP -> Gateway";
    }else if(c_node.ipType == 4){
      var c_edge1 = edges.get(params.nodes[0]+"1");      
      var c_edge2 = edges.get(params.nodes[0]+"2");      
      document.getElementById("info_type").innerHTML ="IP <=> Intranet";
      document.getElementById("info_rate").innerHTML =(c_edge1.width).toFixed(2)+" / "+(c_edge2.width).toFixed(2);
      if(c_edge1.width>=1.5||c_edge2.width>=1.5)
        document.getElementById("info_danger").innerHTML ="Unsafe";

    }else if(c_node.ipType == 5){
      document.getElementById("info_type").innerHTML ="IP -> Gateway";
      document.getElementById("info_danger").innerHTML ="Unsafe";
      document.getElementById("click_ip_info").style.color = "#e74a3b";
    }

  }else if(params.edges[0] != undefined){
    var c_edge = edges.get(params.edges[0]);
    var temptime = new Date(c_edge.timestamp);
    var lasttime = temptime.getHours()+":"+temptime.getMinutes()+":"+temptime.getSeconds();
    document.getElementById("info_lasttime").innerHTML = lasttime;
    document.getElementById("info_name").innerHTML = "--";
    document.getElementById("info_rate").innerHTML =(c_edge.width).toFixed(2);
    document.getElementById("info_src").innerHTML = c_edge.from;
    document.getElementById("info_dest").innerHTML = c_edge.to;
    if(c_edge.width>=1.5)
      document.getElementById("info_danger").innerHTML ="Unsafe";
    else
      document.getElementById("info_danger").innerHTML ="Safe";

    if(c_edge.conType == 0){
      document.getElementById("info_rate").innerHTML ="--";
      document.getElementById("info_type").innerHTML ="Intranet";
      document.getElementById("info_lasttime").innerHTML = "--";
    }else if(c_edge.conType == 1){
      document.getElementById("info_type").innerHTML ="IP <- Intranet";
    }else if(c_edge.conType == 2){
      document.getElementById("info_type").innerHTML ="IP -> Intranet";
    }else if(c_edge.conType == 3){
      document.getElementById("info_type").innerHTML ="IP -> Gateway";
    }else if(c_edge.conType == 5){
      document.getElementById("info_type").innerHTML ="IP -> Gateway";
      document.getElementById("info_danger").innerHTML ="Unsafe";
      document.getElementById("click_ip_info").style.color = "#e74a3b";
    }
  }
});

// // Set new default font family and font color to mimic Bootstrap's default styling
// Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
// Chart.defaults.global.defaultFontColor = '#858796';
// var pie_out = 0;
// var pie_in = 0;
// var pie_gateway = 0;
// // Pie Chart
// var ctx = document.getElementById("myPieChart");
// var myPieChart = new Chart(ctx, {
//   type: 'doughnut',
//   data: {
//     labels: ["Out", "In", "Gateway"],
//     datasets: [{
//       data: [pie_out, pie_in, pie_gateway],
//       backgroundColor: ['#4e73df', '#1cc88a', '#f6c23e'],
//       hoverBackgroundColor: ['#2e59d9', '#17a673', '#d4a52f'],
//       hoverBorderColor: "rgba(234, 236, 244, 1)",
//     }],
//   },
//   options: {
//     maintainAspectRatio: false,
//     tooltips: {
//       backgroundColor: "rgb(255,255,255)",
//       bodyFontColor: "#858796",
//       borderColor: '#dddfeb',
//       borderWidth: 1,
//       xPadding: 15,
//       yPadding: 15,
//       displayColors: false,
//       caretPadding: 10,
//     },
//     legend: {
//       display: false
//     },
//     cutoutPercentage: 80,
//   },
// });




function setServer(ip)
{
  nodes.add({id: ip, label: ip, color: "#858796", timestamp: "", ipType: 0, font: {color: 'white'}});
  edges.add({id: ip+"0", from: ip, to: "172.105.219.146", timestamp: "", width: 1, conType: 0});
  return;
}

function NewnodeNewedge(src, dest, ipType, times)
{
  if(ipType == 1){
    nodes.add({id: dest, label: dest, color: "#4e73df", timestamp: times, ipType: 1, font: {color: 'white'}});
    edges.add({id: dest+"1", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color:"#4e73df", width: 1, timestamp: times, conType: 1});
  }else if(ipType == 2){
    nodes.add({id: src, label: src, color: "#1cc88a", timestamp: times, ipType: 2, font: {color: 'white'}});
    edges.add({id: src+"2", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color:"#1cc88a", width: 1, timestamp: times, conType: 2});
  }else if(ipType == 3){
    nodes.add({id: src, label: src, color: "#f6c23e", timestamp: times, ipType: 3, font: {color: 'white'}});
    edges.add({id: src+"3", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color:"#f6c23e",width: 1, timestamp: times, conType: 3});
  }else if(ipType == 5){
    nodes.add({id: src, label: src, color: "#e74a3b", timestamp: times, ipType: 5, font: {color: 'white'}});
    edges.add({id: src+"5", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color: "#e74a3b", width: 1, timestamp: times, conType: 5});
  }
  return;
}

function OldnodeNewedge(src, dest, newType, times){
  if(newType == 1){
    nodes.update({id: dest, color: "#36b9cc", timestamp: times, ipType: 4});
    edges.update({id:　dest+"2", color:"#36b9cc"});
    edges.add({id: dest+"1", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color:"#36b9cc", width: 1, timestamp: times, conType: 1});
  }else if(newType == 2){
    nodes.update({id: src, color: "#36b9cc", timestamp: times, ipType: 4});
    edges.update({id:　src+"1", color:"#36b9cc"}); 
    edges.add({id: src+"2", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color:"#36b9cc", width: 1, timestamp: times, conType: 2});
  }else if(newType == 3){
    nodes.update({id: src, color: "#f6c23e", timestamp: times, ipType: 3});
    edges.remove(src+"5");
    edges.add({id: src+"3", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color:"#f6c23e", width: 1, timestamp: times, conType: 3});
    console.log(obj_msg);
  }else if(newType == 5){
    nodes.update({id: src, color: "#e74a3b", timestamp: times, ipType: 5});
    edges.remove(src+"3");
    edges.add({id: src+"5", from: src, to: dest, arrows:{to: {enabled: true, type: "triangle"}}, color: "#e74a3b",width: 1, timestamp: times, conType: 5});
  }
  return;
}

function Moreedge(ip_edge, times){
  var new_width = edges.get(ip_edge).width + 0.01;
  edges.update({id: ip_edge, width: new_width, timestamp: times});
  return;
}

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
  var srcIp = obj_msg["src_ip"];
  var destIp = obj_msg["dest_ip"];
  
  // console.log(obj_msg);
  //內網連外面
  if(obj_msg["oob.out"]=="eth0")
  {
    if(nodes.get(srcIp)==null) 
      setServer(srcIp);

    if(nodes.get(destIp) == null && edges.get(destIp+"1") == null) 
      NewnodeNewedge(srcIp, destIp, 1, obj_msg["timestamp"]);
    else if(edges.get(destIp+"1") == null)
      OldnodeNewedge(srcIp, destIp, 1, obj_msg["timestamp"]);
    else
      Moreedge(destIp+"1", obj_msg["timestamp"]);

  }else if (obj_msg["oob.in"]=="eth0" && obj_msg["oob.out"]=="")
  {
    if(nodes.get(destIp)==null) 
      setServer(destIp);

    if(obj_msg["oob.prefix"] == ""){

      if(nodes.get(srcIp) == null && edges.get(srcIp+"3") == null) 
        NewnodeNewedge(srcIp, destIp, 3, obj_msg["timestamp"]);
      else if(edges.get(srcIp+"3") == null)
        OldnodeNewedge(srcIp, destIp, 3, obj_msg["timestamp"]);
      else
        Moreedge(srcIp+"3", obj_msg["timestamp"]);
    }
    else{
      if(nodes.get(srcIp) == null && edges.get(srcIp+"5") == null){
        NewnodeNewedge(srcIp, destIp, 5, obj_msg["timestamp"]);   
        alert(srcIp+" 有IP在60秒內嘗試超過連10個不同port！");        
      } 
      else if(edges.get(srcIp+"5") == null){
        OldnodeNewedge(srcIp, destIp, 5, obj_msg["timestamp"]);
        alert(srcIp+" 在60秒內嘗試超過連10個不同port！");        
      }
      else
        Moreedge(srcIp+"5", obj_msg["timestamp"]);
    }


  }else if (obj_msg["oob.in"]=="eth0" && obj_msg["oob.out"]!="")
  {
    if(nodes.get(destIp)==null) 
      setServer(destIp);

    if(nodes.get(srcIp) == null && edges.get(srcIp+"2") == null) 
      NewnodeNewedge(srcIp, destIp, 2, obj_msg["timestamp"]);
    else if(edges.get(srcIp+"2") == null)
      OldnodeNewedge(srcIp, destIp, 2, obj_msg["timestamp"]);
    else
      Moreedge(srcIp+"2", obj_msg["timestamp"]);
  }else
  {
    console.log("I AM OUT!!!!!!!!!!!!");
    console.log(obj_msg);
  }
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