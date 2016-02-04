# How to contribute

We love pull requests from everyone.

## TD;DR: Modifying a JSON file

1. Modify the JSON files you want using the web interface
2. Do not hesitate to use a JSON editor (for example [jsoneditoronline.org](https://www.jsoneditoronline.org/))
3. Format your modifications using [JSON Lint](http://jsonlint.com/)
4. Do a Pull Request

> Please ask to the owner of the website when you add a link (from their -the owner's- website) in your Pull Request :)

## Modifying a file

### Modify through the Web Interface (Recommended)

You must to have a GitHub account. It's the easier way to modify our JSON files

1. Visit one of our JSON files and use the GitHub interface.
2. Note how GitHub automatically forked the project under your username and created a `patch-N` branch for it.
3. Go to that patch.
4. Modify the files.
5. Wait for approval!

### Modify through git (Advanced & Manual)

 1. Fork the repository. ```git clone https://github.com/FansubDB/fansubdb.github.io.git```
 2. Modify the JSON files that you want to modify
 3. Push to your fork and [submit a pull request][pr].
 4. Send a pull request with a description of the changes you made including the source of the files
 5. Wait for our approval
 6. That's it!

## How my directories are organized

### Lang Folder

At the base of the repositories, there are lang folder. Please follow the instructions below (exceptions are made on a per-case basis).

* Lang must respect the [ISO 639-1 Code](http://www.loc.gov/standards/iso639-2/php/code_list.php) (e.g. ```fr```)

A Lang directory should contain the following:

1. `index.html` containing all needed information. [Example][1]
2. A JSON file `list.json` which contains the season files information. [Example][2]
3. Directories named after the year of each list.

### Year Folder

A year directory should contain the following:

1. A Static HTML file to load the season file. [Example][3]
2. A JSON file `list.json` which contains the season files information. [Example][4] [Structure][struct]
  * There are ne JSON file and one HTML file per season.
  
##That you can do to do a better Pull Request

* Validate it using [Json Schema Validator](http://json-schema-validator.herokuapp.com)
  * the Schema is [here](season-schema.json)
  * the Data is what you have modified
* Please ask to the owner of the website when you add a link (from their -the owner's- website) in your Pull Request :)

### Reporting Bugs / Suggestions

Do not hesitate to report bugs or some suggestions [here](https://github.com/FansubDB/fansubdb.github.io/issues/new)

  [1]: https://github.com/FansubDB/fansubdb.github.io/blob/master/fr/index.html
  [2]: https://github.com/FansubDB/fansubdb.github.io/blob/master/fr/list.json
  [3]: https://github.com/FansubDB/fansubdb.github.io/blob/master/fr/2014/automne.html
  [4]: https://github.com/FansubDB/fansubdb.github.io/blob/master/fr/2014/automne.json
  [pr]: https://github.com/FansubDB/fansubdb.github.io/compare/
  [struct]: https://github.com/FansubDB/fansubdb.github.io#the-json-file-of-the-season-animes
