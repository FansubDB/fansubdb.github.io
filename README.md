# [FansubDB][url]

## What is it?

This site has the goal to list all the new airing/streaming anime in Japan, and which subs groups are subbing (or plan to sub) them.

## Is there an API?

It's not really an API.
Our website hosts `JSON` files to load our `HTML` files content.
<br><br>
You can access to it over **GET** on **HTTP** or **HTTPS** on `fansubdb.github.io/:lang/:years/:season.json`
<br>
* `:lang` can be found on `https://fansubdb.github.io/lang.json`
* `:year` and `:season` can be found on `https://fansubdb.github.io/:lang/list.json` (`:lang` come from above)

### How are the json files organized?

#### lang.json, year.json, season.json

* `lang.json` in the root folder, to choose the subs language.
* `list.json` in the `:lang` folder. It indicates where the json file of the season animes is located.

They have an object table. The object contains each value (lang/year/season) and their url.

#### The json file of the season animes

This file is located under `:lang/:year/:season.json`. (eg. [`fr/2014/automne.json`][automne2014JSON])

It's a unique object which contains:

* *`name`*: Translation of the name; **required**; it's the `<th>` of the table
* *`group`*: Translation of the group; **required**; it's the second `<th>` of the table
* *`lbl_tv`*: The label of the button to show `TV` list; **required**
* *`lbl_ova`*: The label of the button to show `OVA/ONA/Special` list; **required**
* *`lbl_movie`*: The label of the button to show `Movie` list; **required**
* *`message`*: Show the text when the array `tv`,`ova` or `movie` is empty (i.e. contains 0 value)
* *`tv`*: an array of anime objects; **required**; it's the `TV` list
* *`ova`*: an array of anime objects; **required**; it's the `OVA/ONA/Special` list
* *`movie`*: an array of anime objects; **required**; it's the `Movie` list

##### The Anime object

An anime object contains:

* *`name`*: **required**; it's the `<td>` of the table, appears in the colum of `name`
* *`image`* from MyAnimeList CDN URL link; **required**; show it when click on the button
* *`group`* (array) of subs-group which subs it: **required**. An object `group` can have:
	* a *`status`* (uncertain, planned, release, dropped, simulcast): **required** if `detail` exists (see below);
	* an array named *`detail`*, where we have the possibility to add co-subbing: **required** if `status` exists. This array contains:
		* the *`name`* of the group: **required** if `status` exists
		* and its *`url`* (see [External Links](#external-links)): **optional**

##### Simple example of a JSON file

```json
{
	"name": "name",
	"group": "fansub group",
	"lbl_tv": "TV",
	"lbl_ova": "OVA/ONA/Special",
	"lbl_movie": "Movie",
	"message": "This list is empty! <br>Don't hesitate to submit a PR.",
	"tv": [{
		"name": "Anime A",
		"image": "link from CDN MAL of the picture of Anime A",
		"group": [{
			"status": "release",
			"detail": [{
				"name": "SUBS 1",
				"url": "URL of the SUBS 1"
			}]
		}]
	}, {
		"name": "Anime B",
		"image": "link from CDN MAL of the picture of Anime B",
		"group": [{
			"status": "simulcast",
			"detail": [{
				"name": "simulcast 2",
				"url": "URL of the simulcast 2"
			}]
		}, {
			"status": "dropped",
			"detail": [{
				"name": "fansub drop 1"
			}, {
				"name": "fansub drop 2 in co-subbing with fansub drop 1",
				"url": "and its URL"
			}]
		}]
	}],
	"ova": [{
		"name": "Anime C",
		"image": "link from CDN MAL of the picture of Anime C",
		"group": [{
			"status": "release",
			"detail": [{
				"name": "SUBS 1",
				"url": "URL of the SUBS 1"
			}, {
				"name": "SUBS 2 in co-subbing with SUBS 1"
			}]
		}]
	}, {
		"name": "Anime D",
		"image": "link from CDN MAL of the picture of Anime D",
		"group": [{
			"status": "planned",
			"detail": [{
				"name": "fansub plan 4"
			}]
		}, {
			"status": "simulcast",
			"detail": [{
				"name": "simulcast 3"
			}]
		}]
	}],
	"movie": [{
		"name": "movie 1",
		"image": "link from CDN MAL of the picture of Movie 1",
		"group": [{
			"status": "release",
			"detail": [{
				"name": "release group 1",
				"url": "URL of the release group 1"
			}]
		}]
	}, {
		"name": "movie 2",
		"image": "link from CDN MAL of the picture of Movie 2",
		"group": [{
			"status": "release",
			"detail": [{
				"name": "fansub D"
			}]
		}]
	}]
}
```

## I want to help you.

No problem.
<br>
If you want to modify the JSON files, please read [CONTRIBUTING.md][TLDRContributing] and do a pull request :)

## License

Source code is under the [GNU GPL v3 license][GPLv3] and JSON files, which contain data, are under the [CC BY-SA 4.0 license][CCBYSA].

[url]: https://fansubdb.github.io
[automne2014JSON]: fr/2014/automne.json
[TLDRContributing]: CONTRIBUTING.md#the-short-version-modifying-a-json-file
[GPLv3]: https://www.gnu.org/licenses/gpl-3.0.txt
[CCBYSA]: http://creativecommons.org/licenses/by-sa/4.0/
