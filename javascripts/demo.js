var kcy = new Karmacracy('k4rm4cracy.JSWr42per');

var app = (function(k){
	var _bindEvents = function(){
		_bindSetup.call(this);
		_bindRequestForms.call(this);
		_bindGetNetworksToShare.call(this);
	};
	var _bindSetup = function(){
		var that = this;
		var form = document.getElementById('setup');
		form.addEventListener('submit', function(event){
			event.preventDefault();
			var userName = form.userName.value;
			var userKey = form.userKey.value;
			k.setUser(userName, userKey);
			k.checkKey(that.onError, function(data){
				if( data.ok ){
					form.style.display = 'none';
					var setup_done = document.getElementById('setupDone');
					var results = setup_done.querySelectorAll('strong');
					results[0].innerHTML = userName;
					results[1].innerHTML = userKey;
					setup_done.style.display = 'block';
					var inputs_userName = document.querySelectorAll('input[name="userName"]');
					for (var i = inputs_userName.length-1; i >= 0; i--)
					{
						inputs_userName[i].value = userName;
					}
				} else {
					alert('The pair userName and userKey are not correct');
				}
			});
		}, false);
	};

	var _bindRequestForms = function(){
		var that = this;
		var requestForms = document.querySelectorAll('form.requestForm');
		for (var i = requestForms.length-1; i >= 0; i--)
		{
			requestForms[i].addEventListener('submit', function(event){
				event.preventDefault();
				var form = this;
				form.querySelector('pre').innerHTML = 'Loading...';
				var params = _getParams(this);
				apply_args = [
					params,
					function(error, data)
					{
						if( error )
						{
							that.onError(form, data);
						}
						else
						{
							that.onSuccess(form, data);
						}
					}
				];
				if( !params) apply_args.shift();
				
				k[this.id].apply(k,apply_args);
			}, false);
		}
	};

	var _bindGetNetworksToShare = function(){
		var that = this;
		document.getElementById('shareLink_getNetworks').addEventListener('click', function(event){
			event.preventDefault();
			var  button = this;
			var onSuccess = function(data){
				var select = button.previousElementSibling;
				var options = [];
				for( var i = data.length-1; i >= 0; i--){
					options.push('<option value="' + data[i].type + data[i].connectid + '">[' + data[i].type + '] ' + data[i].name + '</option>' );
				}
				select.innerHTML = options.join('\n');
			}
			k.getNetworks(
				function(data){
					that.onError(button.form, data);
				},
				onSuccess
			);

		}, false);
	}
	var _getParams = function(form){
		var params = {};
		switch(form.id){
			case 'getNetworks':
			case 'getFacebookPages':
			case 'getStatsEvolution':
			case 'getStatsRelevance':
				params = null;
				break;
			case 'getUserInfo':
			case 'getDomains':
			case 'getKcys':
				if( form.userName.value ) params.u = form.userName.value;
				break;
			case 'getKcy':
				if( form.kcy.value ) params.kcy = form.kcy.value;
				break;
			case 'getNuts':
				if( form.userName.value ) params.u = form.userName.value;
				if( form.nutType.value ) params.t = form.nutType.value;
				break;
			case 'getRank':
				if( form.now.value ) params.now = form.now.value;
				if( form.from.value ) params.from = form.from.value;
				break;
			case 'shortLink':
				if( form.url.value ) params.url = form.url.value;
				break;
			case 'shareKcy':
				if( form.txt.value ) params.txt = form.txt.value;
				if( form.kcy.value ) params.kcy = form.kcy.value;
				if( form.where.value ) params.where = form.where.value;
				break;
			case 'getFirewords':
				if( form.num.value ) params.num = form.num.value;
				break;
		}
		return params;
	};
	this.onError = function(form, data){
		var error_text = "Error ";
		if( data.error ) {
			error_text += data.error + ': ' + (data.descError || data.msg);
		}
		form.querySelector('pre').innerHTML = error_text;
	};
	this.onSuccess = function(form, data){
		form.querySelector('pre').innerHTML = _syntaxHighlight(JSON.stringify(data, undefined, 4));
	};

	var _syntaxHighlight = function(json) {
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
	};

	_bindEvents.call(this);
})(kcy);
