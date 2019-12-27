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