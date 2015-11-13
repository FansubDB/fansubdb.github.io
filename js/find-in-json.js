//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}

/*
var json = '{"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","ID":"44","str":"SGML","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}';

var js = JSON.parse(json);

//example of grabbing objects that match some key and value in JSON
console.log(getObjects(js,'ID','SGML'));
//returns 1 object where a key names ID has the value SGML

//example of grabbing objects that match some key in JSON
console.log(getObjects(js,'ID',''));
//returns 2 objects since keys with name ID are found in 2 objects

//example of grabbing obejcts that match some value in JSON
console.log(getObjects(js,'','SGML'));
//returns 2 object since 2 obects have keys with the value SGML

//example of grabbing objects that match some key in JSON
console.log(getObjects(js,'ID',''));
//returns 2 objects since keys with name ID are found in 2 objects

//example of grabbing values from any key passed in JSON
console.log(getValues(js,'ID'));
//returns array ["SGML", "44"] 

//example of grabbing keys by searching via values in JSON
console.log(getKeys(js,'SGML'));
//returns array ["ID", "SortAs", "Acronym", "str"] */
