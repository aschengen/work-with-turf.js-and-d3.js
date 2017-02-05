onmessage = function(e){

	importScripts("../util/turf.min.js");

	var layer1 = e.data[0],
	    layer2 = e.data[1];

	var count = 0,
      maxcount = (layer1.features.length * layer2.features.length);

	var intcollection = [];

	layer1.features.forEach(function(poly1){
    postMessage(count/maxcount*100);
    layer2.features.forEach(function(poly2){
      count++;
      var intersect = turf.intersect(poly1,poly2);
      if(intersect!=undefined){
        intersect.properties.Name = poly1.properties.Name;
        intersect.properties.Area = turf.area(intersect);
        intcollection.push(intersect);
      }
    })
  })
 
  var x = turf.featureCollection(intcollection);
  postMessage(x);
  close();
}