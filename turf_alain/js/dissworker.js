onmessage = function(e){

	importScripts("../util/turf.min.js");

	var dissolveLayer = e.data;

  dissolveLayer.features.sort((a, b) => {
    return (a.properties.Name.toUpperCase() < b.properties.Name.toUpperCase()) ? -1 : ((a.properties.Name.toUpperCase() > b.properties.Name.toUpperCase()) ? 1 : 0);
  });

  const distBez = [...new Set(dissolveLayer.features.map(item => item.properties.Name))];

  var count = 0,
      maxcount = (dissolveLayer.features.length),
      disscollection = [];

  var i=0,
      a = performance.now();

  distBez.forEach(d => {
    var temp = [];

    while(i < dissolveLayer.features.length){            
      if(d == dissolveLayer.features[i].properties.Name)
        temp.push(dissolveLayer.features[i]);
      else
        break;

      postMessage(i/maxcount*100);
      i++;
    };

    var merged = temp[0];

    for(var j = 1 ; j < temp.length; j++)
          merged = turf.union(merged,temp[j]);

    merged.properties.Area = turf.area(merged);
    disscollection.push(merged);
  });

  var b = performance.now();

  console.log('Loop runtime: ' + (b - a) + ' ms.');
  
  var x = turf.featureCollection(disscollection);
  postMessage(x);
  close();
}



// distBez.forEach(d => {

  //   var temp = [];

  //   dissolveLayer.features.forEach( x => {    
  //     if(d == x.properties.Name)
  //       temp.push(x);
  //     count++;
  //   });

  //   var merged = temp[0];
  //   console.log(temp);

  //   for(var j = 1 ; j < temp.length; j++)
  //         merged = turf.union(merged,temp[j]);
    
  //   console.log(d+ " total: "+turf.area(merged));
  // });