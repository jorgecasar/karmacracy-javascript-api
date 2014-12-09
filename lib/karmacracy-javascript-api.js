// Uses AMD or browser globals to create a module.

// Grabbed from https://github.com/umdjs/umd/blob/master/amdWeb.js.
// Check out https://github.com/umdjs/umd for more patterns.

// Defines a module "Karmacracy".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory)
{
	'use strict';
	if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['XMLHttpRequest'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("xmlhttprequest").XMLHttpRequest);
    } else {
        // Browser globals (root is window)
        root.Karmacracy = factory(XMLHttpRequest);
    }
}(this, function (XMLHttpRequest)
{
	'use strict';
	function Karmacracy(appkey, lang)
	{
		var _appkey = appkey;
		var _baseUrl = 'http://karmacracy.com/api/v1/';
		var _langs = ['en', 'es'];
		/*
		 * Serialize an object to param string for URLs
		 */
		var _serializeObject = function(object)
		{
			var pairs = [];
			for (var prop in object)
			{
				if (!object.hasOwnProperty(prop))
				{
					continue;
				}
				if (Object.prototype.toString.call(object[prop]) === '[object Object]')
				{
					pairs.push(object[prop].serialize());
					continue;
				}
				if( object[prop] ){
					pairs.push(prop + '=' + object[prop]);
				}
			}
			return pairs.join('&');
		};

		var _doRequest = function(method, params, callback)
		{
			if( typeof params === 'function')
			{
				callback = params;
				params = {};
			}

			var xhr = XMLHttpRequest ? new XMLHttpRequest({mozSystem: true}) : new ActiveXObject('Microsoft.XMLHTTP');

			var requestType = _getRequestType.call(this);
			var url = _getUrl.call(this, method, params);

			xhr.open(requestType, url, true);
			xhr.onreadystatechange = function(){

				if ( xhr.readyState === 4 )
				{
					if ( xhr.status < 400 )
					{
						var response = _parseResponse(method, xhr);
						if( response && typeof callback === 'function')
						{
							callback(null, response);
						}
					}
					else
					{
						callback({
							status: xhr.status,
							statusText: xhr.statusText
						}, null);
					}
				}
			};
			xhr.onerror = function(error){
				callback(error, null);
			};

			xhr.send();
		};
		var _getRequestType = function()
		{
			return 'GET';
		};
		var _parseResponse = function(method, xhr)
		{
			var data;
			try
			{
				data = JSON.parse(xhr.responseText);
			}
			catch(error)
			{
				return xhr.onerror(error, null);
			}
			if( data.error )
			{
				return xhr.onerror(data, null);
			}

			if( data.data )
			{
				data = data.data;
			}

			switch(method)
			{
			case 'user':
				data = data.user[0];
				break;
			case 'awards':
			case 'awards:nut':
				data = data.nut;
				break;
			case 'networks':
				data = data.network;
				break;
			case 'domains':
				data = data.domain;
				break;
			case 'kcy':
			case 'world':
				data = data.kcy;
				break;
			case 'rank':
				data = data.user;
				break;
			case 'stats:evolution':
				data = data.stats;
				data.links_evolution = data.links_evolution ? JSON.parse(data.links_evolution) : {};
				data.koi_evolution = data.koi_evolution ? JSON.parse(data.koi_evolution) : {};
				data.clicks_evolution = data.clicks_evolution ? JSON.parse(data.clicks_evolution) : {};
				data.rank_evolution = data.rank_evolution ? JSON.parse(data.rank_evolution) : {};
				break;
			case 'stats:relevance':
				data = data.stats;
				break;
			case 'firewords':
				data = data.word;
				break;
			}
			return data;
		};
		var _getUrl = function(method, params){
			var url = _baseUrl;
			params = params || {};
			params.u = params.u || this.userName;
			params.k = params.k || this.userKey;
			params.appkey = _appkey;

			switch(method)
			{
			case 'key':
				url += method + '/';
				delete(params.k);
				params.p = encodeURIComponent(params.p);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'key:check':
				method = method.replace(':', '/');
				url += method + '/';
				params.key = params.k;
				delete(params.k);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'user':
			case 'awards':
				url += [method, params.u].join('/');
				delete(params.u);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'awards:nut':
				if( !params.n )
				{
					return false;
				}
				method = method.split(':');
				url += [method[0], params.u, method[1], params.n].join('/');
				params.lang = this.lang;
				delete(params.u);
				delete(params.n);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'networks:fbpages':
				method = method.replace(':', '/');
				url += method + '/';
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'stats:evolution':
			case 'stats:relevance':
				method = method.replace(':', '/');
				url += method + '/';
				delete(params.k);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'kcy':
			case 'world':
				url += [method, params.kcy].join('/');
				delete(params.kcy);
				delete(params.u);
				delete(params.k);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'networks':
			case 'domains':
			case 'rank':
				url += method + '/';
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'share':
				url += method + '/';
				params.txt = encodeURIComponent(params.txt);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'shortLink':
				url = 'http://kcy.me/api/';
				params.format = 'json';
				params.key = params.k;
				params.url = encodeURIComponent(params.url);
				delete(params.k);
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			case 'firewords':
				url += method + '/';
				params.format = 'json';
				params = _serializeObject(params);
				if( params !== '' )
				{
					url += '?' + params;
				}
				break;
			}
			return url;
		};

		this.setLang = function(lang){
			this.lang = lang || (typeof navigator !== 'undefined' ? (navigator.language || navigator.userLanguage) : null );
			if( _langs.indexOf(this.lang) === -1 )
			{
				this.lang = _langs[0];
			}
			return this.lang;
		};
		this.setUserKey = function(userKey){
			this.userKey = userKey;
			return this.userKey;
		};
		this.setUserName = function(userName){
			this.userName = userName;
			return this.userName;
		};
		this.setUser = function(userName, userKey){
			this.setUserName(userName);
			this.setUserKey(userKey);
		};

		this.getKey = function(params, callback)
		{
			var method = 'key';
			params.regenerate = 0;
			_doRequest.call(this, method, params, callback);
		};
		this.getNewKey = function(params, callback)
		{
			var method = 'key';
			params.regenerate = 1;
			_doRequest.call(this, method, params, callback);
		};
		this.checkKey = function(params, callback)
		{
			var method = 'key:check';
			_doRequest.call(this, method, params, callback);
		};
		this.getUserInfo = function(params, callback)
		{
			var method = 'user';
			_doRequest.call(this, method, params, callback);
		};
		this.getNuts = function(params, callback)
		{
			var method = 'awards';
			_doRequest.call(this, method, params, callback);
		};
		this.getNut = function(params, callback)
		{
			var method = 'awards:nut';
			_doRequest.call(this, method, params, callback);
		};
		this.getNetworks = function(callback)
		{
			var method = 'networks';
			_doRequest.call(this, method, callback);
		};
		this.getFacebookPages = function(params, callback)
		{
			var method = 'networks:fbpages';
			_doRequest.call(this, method, params, callback);
		};
		this.getDomains = function(params, callback)
		{
			var method = 'domains';
			_doRequest.call(this, method, params, callback);
		};
		this.getKcy = function(params, callback)
		{
			var method = 'kcy';
			_doRequest.call(this, method, params, callback);
		};
		this.getKcys = function(params, callback)
		{
			var method = 'world';
			_doRequest.call(this, method, params, callback);
		};
		this.getRank = function(params, callback)
		{
			var method = 'rank';
			_doRequest.call(this, method, params, callback);
		};
		this.getStatsEvolution = function(params, callback)
		{
			var method = 'stats:evolution';
			_doRequest.call(this, method, params, callback);
		};
		this.getStatsRelevance = function(params, callback)
		{
			var method = 'stats:relevance';
			_doRequest.call(this, method, params, callback);
		};
		this.shortLink = function(params, callback){
			var method = 'shortLink';
			_doRequest.call(this, method, params, callback);
		};
		this.shareKcy = function(params, callback){
			var method = 'share';
			_doRequest.call(this, method, params, callback);
		};
		this.getFirewords = function (params, callback)
		{
			var method = 'firewords';
			_doRequest.call(this, method, params, callback);
		};

		this.setLang(lang);
	}

	// Return a value to define the module export.
	return Karmacracy;
}));