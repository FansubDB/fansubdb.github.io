#fansub.github.io

##What is it?
This site has the goal to list all the new airing/streaming anime in Japan, and which subs groups are subbing (or plan to sub) them.

##Is there an API?
It's not really an API.
Next version, we will have `JSON` files to load our `HTML` files content.
<br><br>
You can access to it on fansub.github.io/`lang`/`years`/`season`.json
<br>
`lang`, `year`, `season` can be found in their respective files (lang.json, etc.)

##I want to help you.
No problem, do a pull request :)

###How are organized your json files?

####lang.json, year.json, season.json
They have an objects table. The object contains each value (lang/year/season) and their url.

####the season json (eg. automne_TV.json)
It's a unique object which contains: 
* name: Its value is its translation; *required*
* group: the same of `name`; *required*
* anime: a table of `anime` object; *required*. An `anime` object contains:
  * a name; *required*
  * an image from MAL (or livechart exceptionally); *required*
  * a table of subs-group which subs it; *required*. An object `group` has:
    * a status (release, dropped, uncertain, simultcast, dropped)
    * a table of details. Details (it's the details of the group) is a table, so we have the possibility to add **co-subbing**; *required* if `status` exists. This table contains:
  		* the name of the group; *required* if `status` exists
  		* and its URL (see External Links); *optional*

###External Links
Please ask to the owner of the website when you add a link (from his -the owner's- website) in your Pull Request :)
