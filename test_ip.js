// create an array with nodes
var nodes = new vis.DataSet([
  {id: 'src_ip', label: 'src_ip'},
  {id: 'out_to_in', label: 'out_to_in'},
  {id: 'in_to_out', label: 'in_to_out'},
  {id: 'bad_ip', label: 'bad_ip', color: {border: "red", background: "pink"}},
]);
// create an array with edges
var edges = new vis.DataSet([
  {id: 1, from: 'src_ip', to: 'in_to_out', arrows:{to: {enabled: true, type: "triangle"}}},
  {id: 2, from: 'out_to_in', to: 'src_ip', arrows:{to: {enabled: true, type: "triangle"}}, width: 3},
  {id: 3, from: 'bad_ip', to: 'src_ip', arrows:{to: {enabled: true, type: "triangle"}}, color: {color: "red"}},
]);

// create a network
var container = document.getElementById('mynetwork');
var data = {
  nodes: nodes,
  edges: edges
};
var options = {};
var network = new vis.Network(container, data, options);