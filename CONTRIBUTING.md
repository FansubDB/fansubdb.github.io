# How to contribute

## Issue tracker

The issue tracker is the preferred channel for bug reports, features requests and submitting pull requests, but please respect the following restrictions:

 * Please do not use the issue tracker for personal support requests.
 * Please do not derail or troll issues. Keep the discussion on topic and respect the opinions of others.

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project.<br>It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

## Pull requests 

We love pull requests from everyone.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to license your work under [theses licenses][License].

### The short version: Modifying a JSON file

1. Modify the JSON files you want using the web interface
2. Do not hesitate to use a JSON editor (for example [jsoneditoronline.org][JSONEditor])
3. Format your modifications using [JSON Lint][JSONFormat]
4. Do a Pull Request

### The long version: Modifying a JSON file

#### Modify through the Web Interface (Recommended)

You must to have a GitHub account. It's the easier way to modify our JSON files.
<br>Else you can send me an email with a patch attachment.

1. Visit one of our JSON files and use the GitHub interface on [https://github.com/FansubDB/data](https://github.com/FansubDB/data).
2. Note how GitHub automatically forked the project under your username and created a `patch-N` branch for it.
3. Go to that patch.
4. Modify the files.
5. Wait for approval!

#### Modify through git (Advanced & Manual)

 1. Fork the repository.
 2. Clone your fork: ```git clone https://github.com/<your-username>/data.git```
 2. Modify the JSON files that you want to modify
 3. Push to your fork and [submit a pull request][pr].
 4. Send a pull request with a description of the changes you made including the source of the files
 5. Wait for our approval
 6. That's it!

## How my directories are organized

### Lang Folder

At the base of the repositories, there are lang folder. Please follow the instructions below (exceptions are made on a per-case basis).

* Lang must respect the [ISO 639-1 Code][ISOCode] (e.g. ```fr```)

A Lang directory should contain the following:

1. `index.html` containing all needed information, and located on this repositorie. [Example][index]
2. A JSON file `list.json` which contains the season files information, and located on the data repositorie. [Example][list]
3. A `tables.css` file, containing some translate option (the `.uncertain::after`, that display the `?` and `.simulcast::before`, that display `Simulcast:` before a simulcast name. [Example][css]
4. Directories named after the year of each list.

### Year Folder

A year directory should contain a JSON file `list.json` which contains the season files information, and located on the data repositorie. [Example][seasonJSON] [Structure][struct]
  * There are one JSON file per season.
  
NB: On some websites, Winter 2016/2017 (for example) is indicated as Winter 2017 (like myanimelist). In this website, it's indicated as Winter 2016.
  
## That you can do to do a better Pull Request

* Validate your JSON changes by using [Json Schema Validator][JSONValidator]
  * the Schema is [here][schemaJSON]
  * the Data is what you have modified
* Some informations:
  * For `tv`, we determine the season with the airing date on japanese TV;
  * For `ova`, it's the DVD/BD date
  * For `movie`, it's the theater date (not the release in BD/DVD date)
* Shows are ordered in alphabetical order
* Shows' name are in **romaji**; not in your language (*french*, *english*...)

### Reporting Bugs / Suggestions

Do not hesitate to report bugs or some suggestions [here][NEWIssue]!

[pr]: https://github.com/FansubDB/data/compare/
[JSONEditor]: https://jsoneditoronline.org
[JSONFormat]: https://jsonlint.com
[index]: fr/index.html
[list]: fr/list.json
[css]: fr/tables.css
[seasonJSON]: https://github.com/FansubDB/data/blob/master/fr/2014/automne.json
[struct]: README.md#the-json-file-of-the-season-animes
[JSONValidator]: http://json-schema-validator.herokuapp.com
[schemaJSON]: https://github.com/FansubDB/data/blob/master/season-schema.json
[NEWIssue]: https://github.com/FansubDB/fansubdb.github.io/issues/new
[ISOCode]: https://www.loc.gov/standards/iso639-2/php/code_list.php
[License]: README.md#license
