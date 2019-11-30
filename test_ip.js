// create an array with nodes
var nodes = new vis.DataSet([
  {id: 'my_ip', label: 'my_ip'},
  {id: 'out_to_in', label: 'out_to_in'},
  {id: 'in_to_out', label: 'in_to_out'},
  {id: 'bad_ip', label: 'bad_ip', color: {border: "red", background: "pink"}},
  
  {id: '10.255.255.101', label: '10.255.255.101'},
  {id: 'Server', label: 'Server: 172.105.219.146'},

]);
// create an array with edges
var edges = new vis.DataSet([
  {id: 1, from: 'my_ip', to: 'in_to_out', label: 'rate', arrows:{to: {enabled: true, type: "triangle"}}},
  {id: 2, from: 'out_to_in', to: 'my_ip', arrows:{to: {enabled: true, type: "triangle"}}, width: 3},
  {id: 3, from: 'bad_ip', to: 'my_ip', arrows:{to: {enabled: true, type: "triangle"}}, color: {color: "red"}},

  {id: 4, from: '10.255.255.101', to: 'Server'}
]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);