#fansub.github.io

##What is it?
This site has the goal to list all the new airing/streaming anime in Japan, and which subs groups are subbing (or plan to sub) them.

##Is there an API?
It's not really an API.
Our website hosts `JSON` files to load our `HTML` files content.
<br><br>
You can access to it over **GET** on **HTTP** and **HTTPS** on fansub.github.io/`:lang/:years/:season.json`
<br>
* `:lang` can be found on `fansub.github.io/lang.json`
* `:year` can be found on `fansub.github.io/:lang/year.json` (`:lang` come from above)
* `:season` can be found on `fansub.github.io/:lang/:year/season.json` (`:lang` and `:year` come from above)

##I want to help you.
No problem, do a pull request :)

###How have you organized your json files?

####lang.json, year.json, season.json
* `lang.json` in the root folder
* `year.json` in the `:lang` folder 
* `season.json` in the `:lang/:year` folder.

They have an objects table. The object contains each value (lang/year/season) and their url.

####the season json
is located under `:lang/:year/:season.json`. (eg. [`francais/2014/automne_TV.json`](francais/2014/automne_TV.json))

It's a unique object which contains: 
* name: Its value is its translation; **required** ; it's my `<th>` of my table
* group: the same of `name`; **required** ; it's my second `<th>` of my table
* anime: a table of `anime` object; **required**. An `anime` object contains:
	* a name; **required** ; it's my `<td>` of my table, appears in the colum of `name`
	* an image from MAL (or livechart exceptionally); **required** ; when the anime name is hover
	* a table of subs-group which subs it; **required**. An object `group` can have:
		* a status (release, dropped, uncertain, simultcast, dropped); **required** if `detail` exists (see below) ; the color of the name of the group (see below)
		* a table of details. Detail (it's the details of the group) is a table, so we have the possibility to add *co-subbing*; **required** if `status` exists. This table contains:
			* the name of the group; **required** if `status` exists
			* and its URL (see [External Links](#external-links)); **optional**

###How edit the JSON file
* Edit the json
* Use a JSON editor ([one online](https://www.jsoneditoronline.org)) (or not if you're good)
* And do a pull request

###External Links
Please ask to the owner of the website when you add a link (from his -the owner's- website) in your Pull Request :)
