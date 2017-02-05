onmessage = function(e){

	importScripts("../util/turf.min.js");

	var layer1 = e.data[0],
		layer2 = e.data[1],
		primaryLayer = layer1.features.map(item => [item.properties.Name, turf.area(item)]);

        var output = primaryLayer.reduce((acc, area) => {acc[area[0]] = (acc[area[0]] || 0) + area[1]; return acc;},{});

	var result = [];
	layer2.features.forEach(d => {
		result.push([d.properties.Name, Math.round(d.properties.Area/output[d.properties.Name]*100)]);
	})

	result.sort((a,b) => {
		return ((a[1] === b[1]) ? 0 : ((a[1] > b[1]) ? -1 : 1));
  });

	postMessage(result);






}