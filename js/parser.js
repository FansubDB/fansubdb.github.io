function parse () {
  var tmp = [];
  var year, season;

  var items = location.search.substr(1).split("&");//first we remove the part after "?" and split this part with &

  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");

    //two parameters allowed : year, season
    if (tmp[0].search("year") != -1) {
      year = tmp[1];
    }
    if (tmp[0].search("season") != -1) {
      season = tmp[1];
    }
  }
  return new Array(season, year);
}
