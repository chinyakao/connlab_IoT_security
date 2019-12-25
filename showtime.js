function ShowTime(){
  var NowDate=new Date();
  var h=NowDate.getHours();
  var m=NowDate.getMinutes();
  var s=NowDate.getSeconds();　
  document.getElementById('showbox').innerHTML =h+':'+m+':'+s;
  setTimeout('ShowTime()',1000);
}