function getTime() {
  var d = new Date(),
      h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
      m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes(),
      s = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
  
  return h+":"+m+":"+s;
}

function stringComparator(a, b){
	 return (a.properties.Name.toUpperCase() < b.properties.Name.toUpperCase()) ? -1 : ((a.properties.Name.toUpperCase() > b.properties.Name.toUpperCase()) ? 1 : 0);
}

 