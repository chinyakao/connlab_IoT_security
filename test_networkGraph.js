var dotDefault =
  "digraph {\n" +
  " // Parent nodes\n" +
  ' src_ip[label="src_ip"]; \n' +
  "\n" +
  " // Children nodes\n" +
  ' out_to_in[label="out_to_in"]; \n' +
  ' in_to_out[label="in_to_out"]; \n' +
  ' bad_node[label="bad_node", color="pink"]; \n' +
  "\n" +
  " // Line styles\n" +
  "\n" +
  " // Arrowhead styles\n" +
  ' src_ip -> in_to_out[arrowhead=normal]; \n' +
  ' out_to_in -> src_ip[arrowhead=normal]; \n' +
  ' bad_node -> src_ip[arrowhead=normal, penwidth=3, color="pink"]; \n' +
  "}";

// create a network
var container = document.getElementById("mynetwork");
var options = {
  physics: {
    stabilization: false,
    barnesHut: {
      springLength: 200
    }
  }
};
var data = {};
var network = new vis.Network(container, data, options);

$("#draw").click(draw);
$("#reset").click(reset);

$(window).resize(resize);
$(window).load(draw);

$("#data").keydown(function(event) {
  if (event.ctrlKey && event.keyCode === 13) {
    // Ctrl+Enter
    draw();
    event.stopPropagation();
    event.preventDefault();
  }
});

function resize() {
  $("#contents").height($("body").height() - $("#header").height() - 30);
}

function draw() {
  try {
    resize();
    $("#error").html("");

    // Provide a string with data in DOT language
    data = vis.parseDOTNetwork($("#data").val());
    console.log(data);

    network.setData(data);
  } catch (err) {
    // set the cursor at the position where the error occurred
    var match = /\(char (.*)\)/.exec(err);
    if (match) {
      var pos = Number(match[1]);
      var textarea = $("#data")[0];
      if (textarea.setSelectionRange) {
        textarea.focus();
        textarea.setSelectionRange(pos, pos);
      }
    }

    // show an error message
    $("#error").html(err.toString());
  }
}

function reset() {
  $("#data").val(dotDefault);
  draw();
}

window.onload = function() {
  reset();
};
