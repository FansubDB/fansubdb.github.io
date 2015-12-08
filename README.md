#FansubDB.github.io

##What is it?
This site has the goal to list all the new airing/streaming anime in Japan, and which subs groups are subbing (or plan to sub) them.

##Is there an API?
It's not really an API.
Our website hosts `JSON` files to load our `HTML` files content.
<br><br>
You can access to it over **GET** on **HTTP** or **HTTPS** on fansub.github.io/`:lang/:years/:season.json`
<br>
* `:lang` can be found on `fansub.github.io/lang.json`
* `:year` and `:season` can be found on `fansubdb.github.io/:lang/list.json` (`:lang` come from above)

##I want to help you.
No problem, do a pull request :)

###How have you organized your json files?

####lang.json, year.json, season.json
* `lang.json` in the root folder, to choose the subs language.
* `list.json` in the `:lang` folder. It indicates where the json file of the season animes is located.

They have an objects table. The object contains each value (lang/year/season) and their url.

####The json file of the season animes
is located under `:lang/:year/:season.json`. (eg. [`fr/2014/automne_TV.json`](fr/2014/automne_TV.json))

It's a unique object which contains three attributs: 
* the *name*: Its value is its translation; **required** ; it's my `<th>` of my table
* the *group*: the same of `name`; **required** ; it's my second `<th>` of my table
* the *anime*: an array of `anime` objects; **required**. An `anime` object contains:
	* a *name*; **required** ; it's my `<td>` of my table, appears in the colum of `name`
	* an *image* from MyAnimeList link (or livechart exceptionally); **required** ; when the anime name is hover
	* a *table* (array) of subs-group which subs it; **required**. An object `group` can have:
		* a *status* (uncertain, planned, release, dropped, simulcast); **required** if `detail` exists (see below);
		* an array named *details*, where we have the possibility to add co-subbing; **required** if `status` exists. This array contains:
			* the *name* of the group; **required** if `status` exists
			* and its *url* (see [External Links](#external-links)); **optional**

#####Simple example of a JSON file
```
{
	"name": "name",
	"group": "fansub group",
	"anime": [{
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
	}]
}
```

###How edit the JSON file
* Copy the json
* Paste it on a JSON editor ([one online](https://www.jsoneditoronline.org)) (or not if you're good)
* Modify it
* Format it using [JSON Lint](http://jsonlint.com)
* And do a pull request with the new one

###External Links
Please ask to the owner of the website when you add a link (from his -the owner's- website) in your Pull Request :)
