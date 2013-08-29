Karmacrazy API Javascript
=========================

A Javascript wrapper for Karmacracy API. You can check all documentation here: http://karmacracy.com/sections/developers/documentation/api-documentation-index.php

# Initialize

* You can request your API_key here: http://karmacracy.com/sections/developers/key/play-with-api.php
'''var kcy = new Karmacrazy(API_key, 'es');'''
* Request the user his userName in Karmacrazy
'''kcy.setUserName(userName);'''
* Ask for his userKey. He can find it in Preferences > Conexions at karmacrazy.
'''kcy.setUserKey(userKey);'''
* Call 
# Methods

## Constructor
	You can create a new Karmacrazy object and initialize with 2 params:
	* API_key: Your developer API key
	* lang: Karmacrazy support 2 languages: English (en) and Spanish (es). Default value 'en'.

## setLang
You can change the lang of the response using this function. The response of following request will be in the new language

## setUserName
You can change the userName for the request. Remember that you have to change the userKey too.

## setUserKey
You can change the userKey for the request. Remember that you have to change the userName too.

## setUser
This is a shortcut to change UserName and UserKey at once. You need give the parameters userName and userKey.

## getKey
You can recover the key asking for the user's name and password.

## getNewKey
You can regenerate the userKey of the user asking for the user's name and password.

## checkKey
 Allows to know whether the user and the key (third key) entered by the user are valids.

## getUserInfo
Return user details and a list of his kcys.

## getNuts
Return an array with all user's nuts

## getNut
Return detailed information and URLs of the nut (achievement) of the user.

## getNetworks
This method return an array with all user's networks

## getFacebookPages
Return an array with all Facebook Pages that the user is admin.

## getDomains
Returns the list of user's domains ranking ordered by the user within the domain.

## getKcys
Allows you to view, search and explore all kcys in Karmacracy.com.

## getKcy
Get a kcy detailed information, statistics and human trafficking that have shared.

## getRank
View and explore the global and instantaneous kcyrank.

## getStatsEvolution
Returns the statistics of the evolution of a user in the last 30 days.

## getStatsRelevance
Returns the statistics of the relevance of a user in the last 30 days (default), 7 days or 24 hours.

## shortLink
You can short a link using kcy.me, the Karmacracy.com shortener.

## shareKcy
Share a kcy through user networks. Before use it you have to short it and get the user's networks.
