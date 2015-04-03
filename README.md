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
They have an objects table. The object contains each value (lang/year/season) and their url.

####the season json (eg. automne_TV.json)
It's a unique object which contains: 
* name: Its value is its translation; *required*
* group: the same of `name`; *required*
* anime: a table of `anime` object; *required*. An `anime` object contains:
	* a name; *required*
	* an image from MAL (or livechart exceptionally); *required*
	* a table of subs-group which subs it; *required*. An object `group` can have:
		* a status (release, dropped, uncertain, simultcast, dropped); *required* if `detail` exists (see below)
		* a table of details. Detail (it's the details of the group) is a table, so we have the possibility to add **co-subbing**; *required* if `status` exists. This table contains:
			* the name of the group; *required* if `status` exists
			* and its URL (see [External Links](#external-links)); *optional*

###External Links
Please ask to the owner of the website when you add a link (from his -the owner's- website) in your Pull Request :)
