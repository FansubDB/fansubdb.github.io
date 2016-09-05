# How to contribute

## Issue tracker

The issue tracker is the preferred channel for bug reports, features requests and submitting pull requests, but please respect the following restrictions:

 * Please do not use the issue tracker for personal support requests.
 * Please do not derail or troll issues. Keep the discussion on topic and respect the opinions of others.

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project.<br>It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

## Pull requests 

We love pull requests from everyone.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to license your work under [these license][License].

### The short version: Modifying a JSON file

1. Modify the JSON files you want using the web interface
2. Do not hesitate to use a JSON editor (for example [jsoneditoronline.org][JSONEditor])
3. Format your modifications using [JSON Lint][JSONFormat]
4. Do a Pull Request

> Please ask to the owner of the website when you add a link (from their -the owner's- website) in your Pull Request :)

### The long version: Modifying a JSON file

#### Modify through the Web Interface (Recommended)

You must to have a GitHub account. It's the easier way to modify our JSON files.
<br>Else you can send me an email with a patch attachment.

1. Visit one of our JSON files and use the GitHub interface.
2. Note how GitHub automatically forked the project under your username and created a `patch-N` branch for it.
3. Go to that patch.
4. Modify the files.
5. Wait for approval!

#### Modify through git (Advanced & Manual)

 1. Fork the repository.
 2. Clone your fork: ```git clone https://github.com/<your-username>/fansubdb.github.io.git```
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

1. `index.html` containing all needed information. [Example][index]
2. A JSON file `list.json` which contains the season files information. [Example][list]
3. Directories named after the year of each list.

### Year Folder

A year directory should contain the following:

1. A Static HTML file to load the season file. [Example][seasonHTML]
2. A JSON file `list.json` which contains the season files information. [Example][seasonJSON] [Structure][struct]
  * There are one JSON file and one HTML file per season.
  
## That you can do to do a better Pull Request

* Validate your JSON changes by using [Json Schema Validator][JSONValidator]
  * the Schema is [here][schemaJSON]
  * the Data is what you have modified
* Please ask to the owner of the website when you add a link (from their -the owner's- website) in your Pull Request :)
* Some informations:
  * For `tv`, we determine the season with the airing date on japanese TV;
  * For `ova`, it's the DVD/BD date
  * For `movie`, it's the theater date (not the release in BD/DVD date)
* Shows are ordered in alphabetical order
* Shows' name are in **romaji**; not in your language (*french*, *english*...)

### Reporting Bugs / Suggestions

Do not hesitate to report bugs or some suggestions [here][NEWIssue]!

[pr]: https://github.com/FansubDB/fansubdb.github.io/compare/
[JSONEditor]: https://www.jsoneditoronline.org
[JSONFormat]: http://jsonlint.com
[index]: fr/index.html
[list]: fr/list.json
[seasonHTML]: fr/2014/automne.html
[seasonJSON]: fr/2014/automne.json
[struct]: README.md#the-json-file-of-the-season-animes
[JSONValidator]: http://json-schema-validator.herokuapp.com
[schemaJSON]: season-schema.json
[NEWIssue]: https://github.com/FansubDB/fansubdb.github.io/issues/new
[ISOCode]: http://www.loc.gov/standards/iso639-2/php/code_list.php
[License]: README.md#license
