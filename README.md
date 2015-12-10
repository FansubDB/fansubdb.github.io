# [FansubDB.github.io](https://fansubdb.github.io/)

## What is it?
This site has the goal to list all the new airing/streaming anime in Japan, and which subs groups are subbing (or plan to sub) them.

## Is there an API?
It's not really an API.
Our website hosts `JSON` files to load our `HTML` files content.
<br><br>
You can access to it over **GET** on **HTTP** or **HTTPS** on fansub.github.io/`:lang/:years/:season.json`
<br>
* `:lang` can be found on `fansub.github.io/lang.json`
* `:year` and `:season` can be found on `fansubdb.github.io/:lang/list.json` (`:lang` come from above)

## I want to help you.
No problem, do a pull request :)

### How are the json files organized?

#### lang.json, year.json, season.json
* `lang.json` in the root folder, to choose the subs language.
* `list.json` in the `:lang` folder. It indicates where the json file of the season animes is located.

They have an objects table. The object contains each value (lang/year/season) and their url.

#### The json file of the season animes
This file is located under `:lang/:year/:season.json`. (eg. [`fr/2014/automne_TV.json`](fr/2014/automne_TV.json))

It's a unique object which contains: 
* *name*: Translation of the name; **required**; it's the `<th>` of the table
* *group*: Translation of the group; **required**; it's the second `<th>` of the table
* *lbl_tv*: The label of the button to show `tv` list; **required**
* *lbl_ova*: The label of the button to show `ova/ona/special` list; **required**
* *lbl_movie*: The label of the button to show `movie` list; **required**
* *message*: Show the text when the array `tv`, `ova` or `movie` is empty (i.e. contains 0 value)
* *tv*: an array of `anime` objects; **required**.
* *ova*: an array of `anime` objects; **required**.
* *movie*: an array of `anime` objects; **required**.

##### The `Anime` object
An `anime` object contains:
* *name*: **required**; it's the `<td>` of the table, appears in the colum of `name`
* *image* from MyAnimeList link (or livechart exceptionally); **required**; show it when click on the button
* *group* (array) of subs-group which subs it: **required**. An object `group` can have:
	* a *status* (uncertain, planned, release, dropped, simulcast): **required** if `detail` exists (see below);
	* an array named *detail*, where we have the possibility to add co-subbing: **required** if `status` exists. This array contains:
		* the *name* of the group: **required** if `status` exists
		* and its *url* (see [External Links](#external-links)): **optional**

##### Simple example of a JSON file
```
{
	"name": "name",
	"group": "fansub group",
	"lbl_tv": "TV",
	"lbl_ova": "OAV/ONA/Spéciaux",
	"lbl_movie": "Films",
	"message": "This list is empty! <br>Don't hesitate to submit a PR.",
	"tv": [{
		"name": "Anime A",
		"image": "URL from MAL of the Anime A",
		"group": [{
			"status": "release",
			"detail": [{
				"name": "SUBS 1",
				"url": "URL of the SUBS 1"
			}]
		}]
	}, {
		"name": "Anime B",
		"image": "URL from MAL of the Anime B",
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
		"image": "URL from MAL of the Anime C",
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
		"image": "URL from MAL of the Anime D",
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
		"image": "URL from MAL of the movie 1",
		"group": [{
			"status": "release",
			"detail": [{
				"name": "release group 1",
				"url": "URL of the release group 1"
			}]
		}]
	}, {
		"name": "movie 2",
		"image": "URL from MAL of the movie 2",
		"group": [{
			"status": "release",
			"detail": [{
				"name": "fansub D"
			}]
		}]
	}]
}
```

### How edit the JSON file
* Copy the json
* Paste it on a JSON editor ([one online](https://www.jsoneditoronline.org)) (or not if you're good)
* Modify it
* Format it using [JSON Lint](http://jsonlint.com)
* And do a pull request with the new one

### External Links
Please ask to the owner of the website when you add a link (from their -the owner's- website) in your Pull Request :)
