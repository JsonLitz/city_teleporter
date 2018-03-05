function City() {
  this.cityNodes = [];
  this.connected = [];
}

City.prototype.addCity = function(city) {
  this.cityNodes.push(city);
  this.connected[city] = [];
};

City.prototype.addConnection = function(cityNode1, cityNode2) {
  this.connected[cityNode1].push(cityNode2);
  this.connected[cityNode2].push(cityNode1);
};

City.prototype.print = function() {
  console.log(this.cityNodes.map(function(cityNode) {
    return (cityNode + ' <-> ' + this.connected[cityNode].join(', ')).trim();
  }, this).join(' | '));
};

City.prototype.pathFromTo = function(citySource, cityDestination) {
  if (!~this.cityNodes.indexOf(citySource)) {
    return console.log('Trip not possible.');
  }
  var queue = [];
  queue.push(citySource);
  var visited = [];
  visited[citySource] = true;
  var paths = [];

  while (queue.length) {
    var city = queue.shift();
    for (var i = 0; i < this.connected[city].length; i++) {
      if (!visited[this.connected[city][i]]) {
        visited[this.connected[city][i]] = true;
        queue.push(this.connected[city][i]);
        // save paths between nodes
        paths[this.connected[city][i]] = city;
      }
    }
  }
  if (!visited[cityDestination]) {
    return "Not connected.";
  }
  var path = [];
  for (var j = cityDestination; j != citySource; j = paths[j]) {
    path.push(j);
  }
  path.push(j);
  return path.reverse().join('-');
};

City.prototype.checkForLoop = function(city) {
  if (this.cityNodes.indexOf(city) == -1) {
    return console.log('City not found');
  }
  var visited = {};
  this._checkForLoop(city, visited);
};
City.prototype._checkForLoop = function(city, visited, fn) {
  visited[city] = true;
  var currentCity = city;
  console.log(visited);

  //Marks this city as visited and stores it in object
  //   if (this.connected[city] !== undefined) { //checks if that city has any more edges/connections
  //     fn(city);
  //   }
  for (var i = 0; i < this.connected[city].length; i++) {
    if (visited[this.connected[city][i]]) {
      console.log("Loop detected");
    } else {
      this._checkForLoop(this.connected[city][i], visited, fn);
    }
  }
};

var cities = new City();
cities.addCity("Washington");
cities.addCity("Atlanta");
cities.addCity("Baltimore");
cities.addCity("Seattle");
cities.addCity("New York");
cities.addCity("Philadelphia");
cities.addCity("Los Angeles");
cities.addCity("San Francisco");
cities.addCity("Oakland");
cities.addConnection("Washington", "Baltimore");
cities.addConnection("Washington", "Atlanta");
cities.addConnection("Baltimore", "Philadelphia");
cities.addConnection("Philadelphia", "New York");
cities.addConnection("Los Angeles", "San Francisco");
cities.addConnection("San Francisco", "Oakland");
cities.addConnection("Los Angeles", "Oakland");
cities.addConnection("Seattle", "New York");
cities.addConnection("Seattle", "Baltimore");

console.log('path from Washington to Seattle:', cities.pathFromTo("Washington", "Seattle"))
var loopCheck = function(taco) {
  console.log(taco);
}

cities.checkForLoop("Seattle");