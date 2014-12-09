Karmacracy API Javascript
=========================

[![Build Status](https://secure.travis-ci.org/jorgecasar/karmacracy-javascript-api.png?branch=master)](http://travis-ci.org/jorgecasar/karmacracy-javascript-api)

A Javascript wrapper for Karmacracy API. You can check the [official documentation](http://karmacracy.com/sections/api/documentation/api-documentation-index.php)

If you want to try the tool, here you are an [invitation](http://kcy.me/n6lp)

# Initialize
Before start to develop an app or web using Karmacracy you need an [API_key](http://karmacracy.com/sections/api/key/introduction.php). 

## Runing Karmacracy API in the Client
```Javascript
var kcy = new Karmacracy(API_key, 'es');
```
## Runing Karmacracy API in the Server (NodeJS)
You need to add the dependence in the pacjage.json. Check the [NPM module page](https://npmjs.org/package/karmacracy-javascript-api)
```JSON
"dependences": {
	"karmacracy-javascript-api": "*"
}
```
And you can use it as module:
```Javascript
var karmacracy = require('karmacracy-javascript-api');
var kcy = new karmacracy(API_key, 'es');
```
# Setup the user (client and server)
The first thing the user of your app will need to give you the userName and userKey (The user can find it in Preferences > Conexions at karmacracy).
```Javascript
kcy.setUserName('userName');
kcy.setUserKey('userKey');
```
If you want to do this in one simple line
```Javascript
kcy.setUser('userName', 'userKey');
```

# Methods
## setLang
You can change the lang of the response using this function. The response of following request will be in the new language
```Javascript
kcy.setLang('es');
```

## setUserName
You can change the userName for the request. Remember that you have to change the userKey too.
```Javascript
kcy.setUserName('jorgecasar');
```

## setUserKey
You can change the userKey for the request. Remember that you have to change the userName too.
```Javascript
kcy.setUserKey('ia7odp8fvdof');
```

## setUser
This is a shortcut to change UserName and UserKey at once. You need give the parameters userName and userKey.
```Javascript
kcy.setUser('jorgecasar', 'ia7odp8fvdof');
```

## getKey
You can recover the key asking for the user's name and password.
```Javascript
kcy.getKey({
	u: 'jorgecasar',
	p: 'jorgecasarPassword'
}, onError, onSuccess);
```
You can manage the error or success with the callbacks. If all went well you receive an object like this:
```Javascript
{error: 0, key: 'userKey'}
```

## getNewKey
You can regenerate the userKey of the user asking for the user's name and password.
```Javascript
kcy.getNewKey({
	u: 'jorgecasar',
	p: 'jorgecasarPassword'
}, onError, onSuccess);
```
You can manage the error or success with the callbacks. If all went well you receive an object like this: ```{error: 0, key: 'userNewKey'}```

## checkKey
Allows to know whether the user and the key (third key) entered by the user are valids.
```Javascript
kcy.checkKey({
	k: 'userKey'
}, onError, onSuccess);
```
You can manage the error or success with the callbacks. If all went well you receive an object like this: ```{ok: 1}```
In the other case, if it's not correct: ```{ok: 0}```

## getUserInfo
Return user details and a list of his kcys.
```Javascript
kcy.getUserInfo(onError, onSuccess);	
kcy.getUserInfo({u: 'jorgecasar'}, onError, onSuccess);
```
If the user does't exist you get an error 404. In the other case you get an object with the user info:
```JSON
{
	"username": "jorgecasar",
	"kcyrank": "40",
	"img": "http://gravatar.com/avatar/b374f3bd05b1db4a974585ba57661815/?s=85",
	"level": "3",
	"date_signed": "2012-10-28 17:20:32",
	"stats": [],
	"kcys": []
}
```

## getNuts
Return an array with all user's nuts
```Javascript
kcy.getNuts(onError, onSuccess);	
kcy.getNuts({u: 'jorgecasar'}, onError, onSuccess);
```
If all was right you get an array like this:
```JSON
[{
	"id": "140",
	"name": "Creator 10",
	"imageSmall": "http://karmacracy.com/img-nuts/0b4beab1b0b6b273ae0ca0818b1b0d1a833edf38.png",
	"imageBig": "http://karmacracy.com/img-nuts/3d1c89f69382216508cdeb2a685a85336cd9d651.png",
	"level": "1",
	"dateReceivedOrLast": "2013-06-24",
	"number": "1"
},{
	…
}]
```

## getNut
Return detailed information and URLs of the nut (achievement) of the user.
```Javascript
kcy.getNut({
	n: '140'
}, onError, onSuccess);

kcy.getNut({
	u: 'jorgecasar',
	n: '140'
}, onError, onSuccess);
```
If all was right you get an object like this:
```JSON
{
	"id": "140",
	"name": "Creator 10",
	"dateSince": "2012-09-03",
	"history": "This nut was proposed by <a href=\"/kcy\">kcy</a>. It was created on 03 sep 2012.",
	"imageSmall": "http://karmacracy.com/img-nuts/0b4beab1b0b6b273ae0ca0818b1b0d1a833edf38.png",
	"imageBig": "http://karmacracy.com/img-nuts/3d1c89f69382216508cdeb2a685a85336cd9d651.png",
	"description": "Life is a game and so is Karmacracy. We want you to keep having fun with us so we give you this Nut because you have shared 10 new kcys (new links in Karmacracy). Use this Cinexin to rekindle the moment.",
	"flg_type": "H",
	"level": "1",
	"nrKcys": "0",
	"nrMyKcys": "0",
	"nrHumans": "2707",
	"humans": [{…}]
}
```

## getNetworks
This method return an array with all user's networks
```Javascript
kcy.getNetworks(onError, onSuccess);
kcy.getNetworks({ u: 'jorgecasar' }, onError, onSuccess);
```
If all was right you get an array like this:
```JSON
[{
	"connectid": "connectID",
	"hidden": "0",
	"name": "Jorge del Casar",
	"type": "FB"
},{
	…
}}
```

## getFacebookPages
Return an array with all Facebook Pages that the user is admin.
```Javascript
kcy.getFacebookPages(onError, onSuccess);
```
If all was right you get an array like this:
```JSON
[{
	"access_token": "ACCESS_TOKEN",
	"id": "FACEBOOK_PAGE_ID",
	"name": "Jorge del Casar - Desarrollo Frontend"
},{
	…
}]
```
## getDomains
Returns the list of user's domains ranking ordered by the user within the domain.
```Javascript
kcy.getDomains(onError, onSuccess);
kcy.getDomains({u:'jorgecasar'}, onError, onSuccess);
```
If all was right you get an array like this:
```JSON
[{
	"clicks": "246",
	"domain": "developer.blackberry.com",
	"numPersonas": "5",
	"rank": "1"
},{
	…
}]
```
## getKcys
Allows you to view, search and explore all kcys in Karmacracy.com.
```Javascript
kcy.getKcys(onError, onSuccess);
kcy.getKcys({u:'jorgecasar'}, onError, onSuccess);
```
If all was right you get an array like this:
```JSON
[{
	"id": "qt36",
	"url": "http://www.eldiario.es/turing/Socializando-enlaces-contenidos-Karmacracy_0_169383125.html",
	"title": "Socializando enlaces y contenidos con Karmacracy",
	"description": "&nbsp;Entrevistamos a Álex Dolara, fundador de Karmacracy, una startup española, dedicada a compartir contenidos y acortar enlaces con una capa social.",
	"imgUser": "http://karmacracy.com/img/kcylocke.png",
	"image": "http://images.eldiario.es/turing/Alex-Dolara_EDIIMA20130828_0074_6.jpg",
	"time": "2013-08-29 07:32:21",
	"user": "agileando",
	"clicks": "205",
	"weight": "205",
	"people": […]
},{
	…
}]
```

## getKcy
Get a kcy detailed information, statistics and human trafficking that have shared.
```Javascript
kcy.getKcys({kcy:'qt36'}, onError, onSuccess);
```
If all was right you get an object like this:
```JSON
{
	"shorturl": "qt36",
	"url": "http://www.eldiario.es/turing/Socializando-enlaces-contenidos-Karmacracy_0_169383125.html",
	"date": "2013-08-29 07:32:21",
	"kcyedhumans": {…},
	"kclicks": null,
	"mykclicks": "17",
	"mykcytype": "2",
	"traffic": {…}
}
```

## getRank
View and explore the global and instantaneous kcyrank.
```Javascript
kcy.getRank(onError, onSuccess);
// Get the instantaneous rank from position 40th.
kcy.getRank({
	now:1,
	from:40
}, onError, onSuccess);
```
If all was right you get an array like this:
```JSON
[{
	"username": "elandroidelibre",
	"kcyrank": "1",
	"img": "http://karmacracy.com/img-users/114.jpg",
	"totalawards": "9384"
},{
	…
}]
```

## getStatsEvolution
Returns the statistics of the evolution of a user in the last 30 days.
```Javascript
kcy.getStatsEvolution(onError, onSuccess);
```
If all was right you get an object like this:
```JSON
{

	"links_evolution": {…},
	"koi_evolution": {…},
	"rank_evolution": {…},
	"clicks_evolution": {…},
	"virgin_vs_burned": {
		"virgin": "128",
		"total": "154",
		"burned": 26
	},
	"kclicks": "4357.64",
	"kcys": "118"
}
```

## getStatsRelevance
Returns the statistics of the relevance of a user in the last 30 days (default), 7 days or 24 hours.
```Javascript
kcy.getStatsRelevance(onError, onSuccess);
```
If all was right you get an object like this:
```JSON
{
	"hours": {…},
	"kclicks": "4357.64",
	"kcys": "118",
	"koi": 36.929152542373,
	"social": {…},
	"week": {…}
}
```

## shortLink
You can short a link using kcy.me, the Karmacracy.com shortener.
```Javascript
kcy.shortLink({url: 'http://karmacracy.com'}, onError, onSuccess);
```
If all was right you get an object like this:
```JSON
{
	"long_url": "http://karmacracy.com",
	"url": "http://kcy.me/nlr8",
	"hash": null,
	"global_hash": null,
	"new_hash": 0
}
```

## shareKcy
Share a kcy through user networks. Before use it you have to short it and get the user's networks.
```Javascript
kcy.shareKcy({
	txt: 'Text to send to the social network of choice.',
	kcy: 'nlr8',
	// Network identifier, composed as follows:
	// RR_IDCONNECT, being 'RR' property 'type' network, and being IDCONNECT property 'connectId'.
	where: 'RR_IDCONNECT'
}, onError, onSuccess);
```
If all was right you get an object like this:
```JSON
{"result": "0"} 
```

## getFirewords
Gets the list of the firewords on the Karmacracy portal:
```Javascript
kcy.getFirewords({ 
	num: '30' //number of firewords to get
},
 onError, onSuccess);
```

If all was right you get an object like this:
```JSON
"word": [
    [
        "celebro",
        "10",
        "1",
        "10.0000"
    ],
]
```
