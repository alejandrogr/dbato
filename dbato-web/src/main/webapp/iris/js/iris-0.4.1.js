/*
 * Copyright (c) 2012 Intelygenz <www.intelygenz.com>
 * All rights reserved.
 * 
 * BSD License
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL COPYRIGHT HOLDERS OR CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *	
 * Download:
 * 
 *  Previous version can be found at: https://iris-js.googlecode.com/svn/tags/
 *  e.g.:
 *  	https://iris-js.googlecode.com/svn/tags/0.3.2/iris.js
 * 
 * Creation date: 2012-01-12
 * 
* 
 * [version] date -> authors
 * 		upd|fix|new|dep|rmv - description
 *
 *
 * [0.4.1] 2012-07-17 -> alejandro.gonzalez@intelygenz.com
 * 		[new] Behaviours
 * 		[new] iris.BE -> Define a new Behaviour
 * 		[new] iris.ApplyBE -> applies a already loaded BE to a set of uis iris.ApplyBE("be_controle.js", [ui1, ui2]);
 * 		[upd] iris.InstanceUi -> now displays in console when data-id is not unique
 * 
 * [0.4.0] 2012-xx-xx -> angel.sanchez@intelygenz.com
 * 		[new] iris.Goto(), iris.GotoUrlHash()
 * 		[rmv] iris.screen.Goto(), iris.screen.Back(), iris.screen.Forward()
 * 
 * [0.3.6] 2012-06-27 -> angel.sanchez@intelygenz.com, victor.gutierrez@intelygenz.com
 * 		[new] Added parameter p_settings={"success":function, "error":function} to iris.lang.LoadFrom(p_locale, p_uri, p_settings)
 * 		[upd] Small Code Refactoring
 * 		[upd] iris.lang.LoadFrom -> The callbacks "success" and "error" return the locale as parameter.
 * 		[new] iris.lang.Locale -> set or get the current locale code
 * 		[upd] Now self.Template() can be called without parameters
 *		[new] iris.util.DateFormat()
 *
 * [0.3.5] 2012-04-23 -> jonas.dacruz@intelygenz.com, angel.sanchez@intelygenz.com, fco.gamiz@intelygenz.com
 * 		[new] Added template parameters formatting: date and currency
 *		[upd] iris.Include() can load external resources
 * 
 * [0.3.4] 2012-04-11 -> jonas.dacruz@intelygenz.com, angel.sanchez@intelygenz.com
 * 		[new] self.Template() added p_params parameter
 * 		[new] Added ##Id## notation to write parameters values into templates
 * 		[upd] self.InstanceUI() change p_uiId to p_idOrJq, now you can do self.InstanceUI($obj, ...) or self.InstanceUI("id", ...)
 * 		[new] Added new template modes: self.TEMPLATE_AFTER and self.TEMPLATE_BEFORE
 * 		[rmv] self.Template() removed p_cssUrl parameter
 * 		[new] Created iris.net.Ajax() function
 *
 * [0.3.3] 2012-04-02 -> fco.gamiz@intelygenz.com, javier.lazaro@intelygenz.com, angel.sanchez@intelygenz.com
 *		[new] Config setting: "environments-nocache"
 * 		[new] iris.Include : Load *.css and *.js files synchronously
 * 		[fix] template.$Get() templates need a dom root node
 * 		[upd] When screen awakes with null paramater, automatically receive {}
 * 		[fix] Bug in the _AbstractComponent.__UIComponents__ array
 *  	[upd] Added p_$tmpl paramater to self.$Get() and self.InstanceUI(). If p_$tmpl is undefined, p_$tmpl = this.__$Tmpl__
 *		[new] UI.TEMPLATE_APPEND, UI.TEMPLATE_REPLACE, UI.$Container(), UI.TemplateMode() and Screen.$Container()
 *		[rmv] UI.Replace and UI.Append. Now Screen.Template() does append, and UI.Template() does replace by default (use UI.TemplateMode() to change it)
 *
 * [0.3.2] 2012-03-14 -> jonas.dacruz@intelygenz.com, angel.sanchez@intelygenz.com
 * 		[upd] functions inherited into iris.UI always receive "self" parameter and must be used by all members instead of "this"
 * 		[new] (iris.UI) self.$Container() provide access to the jQuery component container
 * 
 * [0.3.1] 2012-03-13 -> jonas.dacruz@intelygenz.com, angel.sanchez@intelygenz.com
 * 		[new] Screens and UI components inheritance
 * 		[new] AbstractComponent.InstanceUI()
 * 		[new] Automated dependency load
 * 		[new] Adoption Resource-View-Presenter pattern
 * 		[upd] Complete code refactor
 * 		[rmv] iris.screen.transition
 * 		
 * 		WARNING: No backward with previous versions
 * 
 */

/**
 * @namespace
 *  This JavaScript library provides different client-side optimization techniques for front construction.
 *  It is independent and compatible with any server-side technology: JAVA, PHP, Python, GOOGLE APP ENGINE, .NET...
 * 
 * */
var iris = new function() {
	
	var _APP_VERSION = "0.4.1-SNAPSHOT"
	,	_APP_NAME = "iris"
	,	_JQ_MIN_VER = 1.5
	;

	var _Env = null
	,	_Log = {"error":true}
	,	_LogPrefix = ""
	,	_Screen = {}
	,	_ScreenUrl = {}
	,	_Context = {}
	,	_LastScreen = {}
	,	_PrevHashUrl = ""
	,	_Global = {}
	,	_Local = {}
	,	_Locale = null
	,	_Config = {}
	,	_Lang = {}
	,	_Event = {}
	,	_Includes = {}
	,	_Components = {}
	,	_Behaviours = {}
	,	_AppBaseUri = ""
	,	_LastIncludePath
	,	_Head = $("head").get(0)
	,	_Cache = true
	,	_HasConsole
	;

	function _Init () {
		$(window).bind("hashchange", _Window_OnHashChange);
		
		if( typeof jQuery === "undefined" ) {
			_E( "jQuery " + _JQ_MIN_VER + "+ previous load required" );
		}
		else if ( $().jquery < _JQ_MIN_VER ) {
			_E( "jQuery " + $().jquery + " currently loaded, jQuery " + _JQ_MIN_VER + "+ required" );
		}
		
		_HasConsole = (window.console && window.console.debug && window.console.warn && window.console.error);
		if ( !_HasConsole && window.console && window.console.log ) {
			window.console.log("advanced console debugging is not supported in this browser");
		}
		
	}
	
	function _Window_OnHashChange () {
		var prev = _PrevHashUrl.split("/")
		,	curr = document.location.hash.split("/")
		,	prevPath = ""
		,	currPath = ""
		,	pathWithoutParams
		,	hasRemainingChilds = false
		;
		
		// Hide screens and its childs that are not showed
		if ( prev.length > curr.length ) {
			
			for ( var f=0, F=prev.length; f<F; f++ ) {
				prevPath += prev[f] + "/";
				
				if ( curr[f] ) {
					currPath += curr[f] + "/";
				}
				
				if ( hasRemainingChilds || currPath != prevPath ) {
					hasRemainingChilds = true;
					
					pathWithoutParams = _RemoveURLParams(prevPath);
					_Screen[pathWithoutParams].__Sleep__();
					_Screen[pathWithoutParams].Hide();
				}
			}
		}
		
		// Show child screens
		prevPath = "";
		currPath = "";
		hasRemainingChilds = false;
		for ( var f=0, F=curr.length; f<F; f++ ) {
			currPath += curr[f] + "/";
			
			if ( prev[f] ) {
				prevPath += prev[f] + "/";
			}
			
			if ( hasRemainingChilds || currPath != prevPath ) {
				hasRemainingChilds = true;
				
				pathWithoutParams = _RemoveURLParams(currPath);
				_ShowScreen(pathWithoutParams, _NavGetParams(curr[f]) );
				
			}
		}
		
		_PrevHashUrl = _RemoveLastSlash(currPath);
	}
	
	function _RemoveURLParams (p_url) {
		return _RemoveLastSlash(p_url.replace(/\?[^\/]*/, ""));
	}
	
	function _RemoveLastSlash (p_url) {
		return p_url.replace(/\/$/, "");
	}
	
	function _ShowScreen (p_screenPath, p_params) {

		if ( !_Context.hasOwnProperty(p_screenPath) ) {
			_E( "[iris.screen.Goto] iris.screen.Add() has to be previosly called", p_screenPath );
		}
		else {
			if ( !_Screen.hasOwnProperty(p_screenPath) ) {
				_CreateScreen(p_screenPath);
			}

			var currentScreen = _Screen[p_screenPath];
			var contextId = currentScreen.$Get().parent().attr("data-id");

			if ( _LastScreen.hasOwnProperty(contextId) ) {
				var lastScreen = _LastScreen[contextId];
				lastScreen.__Sleep__();
				lastScreen.Hide();
			}
			currentScreen.__Awake__( p_params ? p_params : {} );
			currentScreen.Show();

			_LastScreen[contextId] = currentScreen;
		}
	}
	
	function _Goto(p_hashUri) {
		_PrevHashUrl = document.location.hash;
		document.location.hash = p_hashUri;
	}
	
	function _NavGetLabel(p_hashPart) {
		 return p_hashPart.split("?")[0];
	}
	
	function _NavGetParams(p_hashPart) {
		var params = {}
		,	regex = /(\w*)=(\w*)/g
		;
		
		while ( matches = regex.exec(p_hashPart) ) {
			params[matches[1]] = matches[2];
		}

		return params;
	}
	
	function _GotoUrlHash (p_defaultHashUrl) {
		var hashUri = document.location.hash;
		if ( hashUri ) {
			_Window_OnHashChange();
		}
		else {
			_Goto(p_defaultHashUrl);
		}
	}
	
	function _AppName () {
		return _APP_NAME + " v" + _APP_VERSION + " [" + _Env + "]";
	}

	function _Include(p_uiFile) {
		
		if ( !_Includes.hasOwnProperty(p_uiFile) ) {
			_Includes[p_uiFile] = true;
			
			var fileUrl = p_uiFile.indexOf("http") === 0 ? p_uiFile: _BaseUri() + p_uiFile;
			
			_D("[iris.ui.Include]", fileUrl);
			
			if ( p_uiFile.lastIndexOf(".css") > -1 ) {
				var link  = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = fileUrl;
				_Head.appendChild(link);
			}
			else {
				_LastIncludePath = p_uiFile;
				var isHtml = p_uiFile.lastIndexOf(".html") > -1;
				_AjaxSync(
					  fileUrl
					, isHtml ? "html" : "text"
					, function (p_data) {
						if ( isHtml ) {
							_IncludeHtml(p_data, p_uiFile);
						}
						else {
							_IncludeJs(p_data);
						}
					}
					, function (p_err) {
						delete _Includes[fileUrl];
						_E(p_err.status, "Error loading file", fileUrl);
					}
				);
			}
		}
	}
	
	function _IncludeHtml ( p_html, p_uiFile ) {
		_Includes[p_uiFile] = _LocaleParse(p_html);
	}
	
	function _IncludeJs ( p_js ) {
		var script = document.createElement("script");
		script.language = "javascript";
		script.type = "text/javascript";
		script.text = p_js;
		_Head.appendChild(script);
	}
	
	function _IncludeFiles () {
		for ( var f=0,F=arguments.length; f<F; f++ ){
			_Include( arguments[f] );
		}
	};
	
	function _LogOf (p_type) {
		return _Log[p_type];
	}
	
	function _L(){
		if ( _HasConsole && window.console.log) {
			window.console.log(_LogPrefix, arguments);
		}
	};
	
	function _D(){
		if(_HasConsole && _LogOf("debug") ){
			window.console.debug(_LogPrefix, arguments);
		}
	};
	
	function _W(){
		if(_HasConsole && _LogOf("warning") ){
			window.console.warn(_LogPrefix, arguments);
		}
	};
	
	function _E(){
		if(_HasConsole && _LogOf("error") ){
			window.console.error(_LogPrefix, arguments);
		}
	};
	
	function _ConfigLoad (p_json){
		if ( p_json ) {
			$.extend(_Config, p_json);

			_GlobalLoad( _Config["global"] );

			var currentEnv = _GetEnv();
			if ( _Config["log"] ) {
				var logConfig = _Config["log"][currentEnv];
				var logs = logConfig.split(",");
				for ( var logType in logs ) {
					_Log[ $.trim(logs[logType]) ] = true;
				}
			}
			
			_Cache = true;
			if ( _Config.hasOwnProperty("environments-nocache") ) {
				var envNocache = _Config["environments-nocache"].split(",");
				for ( var f=0, F=envNocache.length; f<F; f++ ) {
					if ( envNocache[f] == currentEnv ) {
						_Cache = false;
						break;
					}
				}
			}
			
			_LocalLoad( _Config["local"] );
		}
		return _Config;
	};
	
	function _GetEnv (p_env) {
		if ( p_env !== undefined ) {
			_Env = p_env;
		}
		else {
			if ( !_Env ) {
				_Env = _Config["environment-default"];
				for (var p in _Config["environment"] ){
					if ( document.location.href.indexOf( p ) > -1 ) {
						_Env = _Config["environment"][p];
						break;
					}
				}
				if ( !_Env ) {
					_Env = "pro";
				}
				_LogPrefix = "[" + _Env + "]";
			}
			return _Env;
		}
	};
	
	function _AjaxSync (p_uri, p_dataType, f_success, f_error) {
		$.ajax(
			{ url: p_uri
			, dataType: p_dataType
			, async: false
			, cache: _Cache
			, success : f_success
			, error : f_error
			}
		);
	}
	
	function _GlobalLoad(p_hash){
		$.extend(_Global, p_hash);
		return _Global;
	};

	function _GlobalData (p_label, p_value){
		if ( p_label && p_value !== undefined ) {
			_Global[p_label] = p_value; 	
		}
		else if ( p_label ) {
			return _Global[p_label];
		}
		else {
			return _Global;
		}
	};
	
	function _LocalLoad(p_hash){
		$.extend(_Local, p_hash);
		return _Local;
	};

	function _LocalData(p_label, p_value){
		if ( p_label && p_value !== undefined ) {
			_Local[p_label][_GetEnv()] = p_value; 	
		}
		else if ( p_label ) {
			return _Local[p_label][_GetEnv()];
		}
		else  {
			return _Local;
		}
	};
	
	function _Find(p_eventName, f_func){
		var events = _Event[p_eventName];
		if ( events ) {
			for ( var f=0, F=events.length; f<F; f++ ) {
				if ( events[f] === f_func ) {
					return f;
				}
			}
		}
		return -1;
	}
	
	function _EventSubscribe(p_eventName, f_func){
		if ( !_Event[p_eventName] ) {
			_Event[p_eventName] = [];
		}

		var index = _Find( p_eventName, f_func );
		if ( index==-1 ) {
			index = _Event[p_eventName].length;
		}

		_Event[p_eventName][index] = f_func;
	};
	
	function _EventRemove(p_eventName, f_func){
		var index = _Find(p_eventName, f_func);
		if ( index!=-1 ){
			_Event[p_eventName].splice(index,1);
		}
	};

	function _EventNotify(p_eventName, p_data){
		if ( _Event[p_eventName] ) {
			var funcs = _Event[p_eventName];
			for ( var f=0, F=funcs.length; f<F; f++ ) {
				funcs[f](p_data);
			}
		}
	}
	
	function _BaseUri(p_baseUri){
		if ( p_baseUri !== undefined ) {
			_AppBaseUri = p_baseUri;
		}
		else {
			var base = document.getElementsByTagName("base");
			base = base.length > 0 ? base[0].attributes["href"].value : "/";
			_AppBaseUri = document.location.protocol + "//" + document.location.host + base;
		}
		return _AppBaseUri;
	};

	function _Ajax (p_settings) {
		return $.ajax(p_settings);
	}

	function _LocaleLoad(p_locale, p_data){
		_D("[iris.lang.Load]", p_locale, p_data);
		
		if ( _Locale === null ) {
			_Locale = p_locale;
		}
		
		if ( !_Lang.hasOwnProperty(_Locale) ) {
			_Lang[_Locale] = {};
		}
		
		$.extend(_Lang[_Locale], p_data);
	};

	function _LangGet (p_label, p_locale) {
		var locale = ( p_locale ) ? p_locale : _Locale;
		var value  = _Lang[locale][p_label];
		if ( !value ) value = "??" + p_label + "??";
		return value;
	};
	
	function _LocaleGet(p_locale) {
		if ( p_locale !== undefined ) {
			_Locale = p_locale;
		}
		else {
			return _Locale;
		}
	};

	function _LocaleParse(p_html){
		var html = p_html;
		var matches = html.match(/@@[A-Z_\.]+@@/g);
		if ( matches ) {
			var f, F = matches.length;
			for ( f=0; f<F; f++ ) {
				html = html.replace(matches[f], _LangGet(matches[f].substring(2,matches[f].length-2)));
			}
		}
		return html;
	};

	function _LangLoadFrom (p_locale, p_uri, p_settings) {
		_D("[iris.lang.LoadFrom]", p_locale, p_uri);
		
		_AjaxSync(
			  p_uri
			, "json"
			, function (p_data) {
				  _LocaleLoad(p_locale, p_data);
				  _D("[iris.lang.LoadFrom] loaded", p_data);

				  if ( p_settings && p_settings.hasOwnProperty("success") ) {
					  p_settings["success"](p_locale);
				  }
			  }
			, function (p_err) {
				  _E(p_err.status, "Error loading lang file", p_uri);
				  
				  if ( p_settings && p_settings.hasOwnProperty("error") ) {
					  p_settings["error"](p_locale);
				  }
			}
		);
	};

	function _HashToJq(p_hash, p_$obj, p_filter){
		var dom = p_$obj.get(0);
		if ( p_filter ){
			var filter;
			for ( var f=0, F=p_filter.length; f<F; f++ ){
				filter = p_hash[p_filter[f]];
				if ( filter ) {
					dom.setAttribute(p_filter[f], filter);
				}
			}
		}
		else {
			for ( var label in p_hash){
				dom.setAttribute(label, p_hash[label]);
			}
		}
		return p_$obj;
	}

	function _JqToHash(p_$obj) {
		var hash = {};
		var attrs = p_$obj.get(0).attributes;
		var label;
		for( var f=0, F=attrs.length; f<F; f++ ) {
			label = attrs[f].name;
			if ( label.indexOf("data-")==0 ){
				label = label.substr(5);
			}
			hash[label] = attrs[f].value;
		}
		return hash;
	}

	function _InstanceUI (p_$container, p_uiId, p_jsUrl, p_uiSettings) {
		_Include(p_jsUrl);
		
		var uiInstance = new _AbstractUI();
		uiInstance.__Id__ = p_uiId;
		uiInstance.__$Container__ = p_$container;
		uiInstance.__UIComponents__ = [];
		uiInstance.__Setting__ = {};
		uiInstance.prototype = new _Components[p_jsUrl](uiInstance);

		
		p_uiSettings = p_uiSettings === undefined ? {} : p_uiSettings;
		var jqToHash = _JqToHash(p_$container);
		
		$.extend(uiInstance.__Setting__, jqToHash, p_uiSettings);
		
		uiInstance.Create(jqToHash, p_uiSettings);
		
		return uiInstance;
	}
	
	function _ScreenCreate (f_screen) {
		f_screen.prototype = new _AbstractScreen();
		_Components[_LastIncludePath] = f_screen;
	};
	
	function _ApplyBE( p_beId, p_uis ){
		var be = new _AbstractBE();
		be.prototype = new _Behaviours[p_beId]( be );
		be.Apply( p_uis );
	}

	function _BECreate( f_be  ){
		_Behaviours[ _LastIncludePath ] = f_be;
	}
	
	function _UICreate (f_ui) {
		_Components[_LastIncludePath] = f_ui;
	};
	
	function _ScreenAdd (p_$context, p_screenPath, p_jsUrl, p_showBefore) {
		
		if ( p_$context.get(0) === document.body ) {
			p_$context.attr("data-id", "document_body");
		}
		
		_ScreenUrl[p_screenPath] = p_jsUrl;
		_Context[p_screenPath] = p_$context;
		if( p_showBefore ){
			_ShowScreen( p_screenPath );
		}
	};
	
	function _CreateScreen (p_screenPath) {
		
		var jsUrl = _ScreenUrl[p_screenPath];
		_Include(jsUrl);
		
		var screenInstance = new _AbstractScreen();
		screenInstance.prototype = new _Components[jsUrl](screenInstance);

		screenInstance.__Id__ = p_screenPath;
		screenInstance.__UIComponents__ = [];
		screenInstance.__$Container__ = _Context[p_screenPath];
		
		screenInstance.Create();
		screenInstance.Hide();
		
		_Screen[p_screenPath] = screenInstance;
	}

	function _TemplateParse (p_html, p_data) {
		var result = p_html
		,	matches
		,	formatLabel
		,	value
		,	regExp = /##([0-9A-Za-z_\.]+)(?:\|(date|currency)(?:\(([^\)]+)\))*)?##/g
		;

		while ( matches = regExp.exec(p_html) ) {
			value = p_data[matches[1]];

			formatLabel = matches[2];
			if ( formatLabel ) {
				switch (formatLabel) {
					case "date":
						value = _DateFormat(value, matches[3]);
						break;
					case "currency":
						value = _ParseCurrency(value);
						break;
					default:
						iris.W("Unknow template format label", formatLabel);
				}
			}

			result = result.replace(matches[0], value);
		}
		
		return result;
	}
	
	function _ParseCurrency (p_value) {
		var settings = _Regional[_Locale]["currency"];
		
		var val = Number(p_value);
		var format = (val >= 0) ? settings["formatPos"] : settings["formatNeg"];
		
		var decimal = val % 1;
		var num = String( Math.abs(val-decimal) );
		
		decimal = String(Math.abs(decimal).toFixed(settings["precision"]))
		decimal = decimal.substr(2);
	
		for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
			num = num.substring(0, num.length - (4 * i + 3)) + settings["thousand"] + num.substring(num.length - (4 * i + 3));
		}
		
		return format.replace("n", num + settings["decimal"] + decimal );
	}
	
	function _DateFormat (p_date, p_format) {
		if ( !p_format ) {
			p_format = _Regional[_Locale]["dateFormat"];
		}
		
		if ( typeof p_date !== "object" ) {
			p_date = new Date(Number(p_date))
		}
		
		var dateFormat = "";
		for (var f=0, F=p_format.length; f<F; f++) {
			dateFormat += _DateFormatChar(p_format[f], p_date);
		}
		return dateFormat;
	}
	
	function _LeadingZero (p_number) {
		return (p_number < 10) ? "0" + p_number : p_number;
	}
	
	function _DateFormatChar (p_formatChar, p_date) {
		var regional = _Regional[_Locale];
		switch (p_formatChar) {
			case "y":
				return String(p_date.getFullYear()).substring(2);
			case "Y":
				return p_date.getFullYear();
			case "m":
				var m = p_date.getMonth()+1;
				return _LeadingZero(m);
			case "n":
				return p_date.getMonth()+1;
			case "M":
				return regional[monthNames][p_date.getMonth()].substring(0, 3);
			case "b":
				return regional[monthNames][p_date.getMonth()].substring(0, 3).toLowerCase();
			case "F":
				return regional[monthNames][p_date.getMonth()];
			case "d":
				var d = p_date.getDate();
				return _LeadingZero(d);
			case "D":
				return regional[dayNames][p_date.getDay()].substring(0, 3);
			case "l":
				return regional[dayNames][p_date.getDay()];
			case "s":
				var s = p_date.getSeconds();
				return _LeadingZero(s);
			case "i":
				var i = p_date.getMinutes();
				return _LeadingZero(i);
			case "H":
				var h = p_date.getHours();
				return _LeadingZero(h);
			case "h":
				var h = p_date.getHours();
				h = (h % 12) == 0 ? 12 : h % 12;
				return _LeadingZero(h);
			case "a":
				return (p_date.getHours() > 12) ? "p.m." : "a.m.";
			case "A":
				return (p_date.getHours() > 12) ? "PM" : "AM";
			case "U":
				return Math.floor(p_date.getTime() * 0.001);
			default:
				return p_formatChar;
		}
	}
	
	var _Regional = {
		 "en-US" : {
			 dayNames : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
			,monthNames : ["January","February","March","April","May","June","July","August","September","October","November","December"]
			,dateFormat : "m/d/Y h:i:s"
			,currency : {
				 formatPos : "$ n"
				,formatNeg : "($ n)"
				,decimal : "."
				,thousand : ","
				,precision : 2
			}
		}
		,"es-ES" : {
			 dayNames : ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
			,monthNames : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
			,dateFormat : "d/m/Y H:i:s"
			,currency : {
				 formatPos : "n €"
				,formatNeg : "-n €"
				,decimal : ","
				,thousand : "."
				,precision : 2
			}
		}
	};
	
	/**
	 * @class
	 * @ignore 
	 */
	function _AbstractBE () {

	}
	
	/**
	 * @class
	 * @ignore 
	 */
	function _AbstractUI () {
		this.__TemplateMode__ = this.TEMPLATE_REPLACE;
		
		this.TemplateMode = function (p_mode) {
			this.__TemplateMode__ = p_mode;
		};
		this.Template = function (p_htmlUrl, p_params) {
			this.__Template__(p_htmlUrl, p_params, this.__TemplateMode__);
		};
	};
	_AbstractUI.prototype = new _AbstractComponent();

	/**
	 * @class
	 * @ignore 
	 */
	function _AbstractScreen () {
		this.Template = function (p_htmlUrl, p_params) {
			this.__Template__(p_htmlUrl, p_params, this.TEMPLATE_APPEND);
		};
	};
	_AbstractScreen.prototype = new _AbstractComponent();

	/**
	 * @class
	 * @ignore 
	 */
	function _AbstractComponent () {
		this.TEMPLATE_APPEND = "append";
		this.TEMPLATE_REPLACE = "replace";
		this.TEMPLATE_AFTER = "after";
		this.TEMPLATE_BEFORE = "before";
		
		this.__$Tmpl__ = null;
		this.__Id__ = null;
		this.__UIComponents__ = null;
		this.__$Container__ = null;
		this.__Setting__ = null;
		
		this.__Sleep__ = function () {
			var $ui = this.__UIComponents__;
			for ( var f=0, F=$ui.length; f < F; f++ ) {
				$ui[f].Sleep();
			}
			this.Sleep();
		};
		
		this.__Awake__ = function (p_params) {
			var $ui = this.__UIComponents__;
			for ( var f=0, F=$ui.length; f < F; f++ ) {
				$ui[f].Awake();
			}
			this.Awake(p_params);
		};

		this.__Template__ = function (p_htmlUrl, p_params, p_mode) {
			
			if ( typeof p_htmlUrl == "undefined" ) {
				this.__$Tmpl__ = this.__$Container__;
				return this.__$Tmpl__;
			}
			
			iris.Include(p_htmlUrl);
			
			var tmplHtml = p_params ? _TemplateParse(_Includes[p_htmlUrl], p_params) : _Includes[p_htmlUrl];
			var $tmpl = $(tmplHtml);
			
			this.__$Tmpl__ = $tmpl;
			if ( $tmpl.size() > 1 ) {
				iris.E("Template must have only one root node", p_htmlUrl, _Includes[p_htmlUrl], $tmpl);
			}
			
			switch ( p_mode ) {
				case this.TEMPLATE_APPEND:
					this.__$Container__.append($tmpl);
					break;
				case this.TEMPLATE_REPLACE:
					this.__$Container__.replaceWith($tmpl);
					break;
				case this.TEMPLATE_BEFORE:
					this.__$Container__.before($tmpl);
					break;
				case this.TEMPLATE_AFTER:
					this.__$Container__.after($tmpl);
					break;
				default:
					iris.E("Unknown template mode", p_mode);
			}
			
		};

		this.Show = function () {
			this.__$Tmpl__.show();
		};

		this.Hide = function () {
			this.__$Tmpl__.hide();
		};
		
		this.Settings = function (p_settings) {
			$.extend(this.__Setting__, p_settings);
		};
		
		this.Setting = function (p_label, p_value) {
			if ( p_value === undefined ) {
				if ( !this.__Setting__.hasOwnProperty(p_label) ) {
					iris.W("The setting ", p_label, " is not in ", this.__Setting__, this);
				}
				return this.__Setting__[p_label];
			}
			else {
				this.__Setting__[p_label] = p_value;
			}
		};
		
		this.$Get = function (p_id, p_$tmpl) {
			var $tmpl = p_$tmpl === undefined ? this.__$Tmpl__ : p_$tmpl;
			
			if ( p_id ) {
				var
				  	id = "[data-id=" + p_id + "]"
				  , filter = $tmpl.filter(id)
				;
				return filter.length > 0 ? filter : $tmpl.find(id);
			}
			
			return $tmpl;
		};
		
		this.InstanceUI = function (p_idOrJq, p_jsUrl, p_uiSettings, p_$tmpl) {
			var $container = typeof p_idOrJq === "string" ? this.$Get(p_idOrJq, p_$tmpl) : p_idOrJq;
			
			if ( $container.size() == 1 ) {
				var uiInstance = _InstanceUI($container, $container.attr("data-id"), p_jsUrl, p_uiSettings);
				this.__UIComponents__.push(uiInstance);
				return uiInstance;
			}
			else if( $container.size() > 1 ) {
				iris.E("InstanceUI: Container [data-id=" + p_idOrJq + "] must be unique");
			} 
			else {
				iris.E("InstanceUI: Container [data-id=" + p_idOrJq + "] not found");
			}
			
		};
		
		this.$Container = function () {
			return this.__$Container__;
		};
		
		// To override functions
		this.Create = function () {};
		this.Awake = function () {};
		this.Sleep = function () {};
	};
	
	function _Deserialize (p_$form, p_data) {
		var element, tag, value;
		for ( name in p_data ) {
			element = p_$form.find('[name="' + name + '"]');
			if ( element.length > 0 ) {
				tag = element[0].tagName.toLowerCase();
				value = p_data[name];
				switch (tag) {
				case "select":
				case"textarea":
					$(element).val(value);
					break;
				case "input":
					switch (tag) {
					case "checkbox":
						if (value) {
							element.attr("checked", "checked"); 
						}
						break;
					case "radio":
						element.filter('[value="'+value+'"]').attr("checked", "checked");
						break;
					default:
						element.val(value);
					}
				}
			}
		};
	}
	
	function _Serialize (p_$form) {
		var json = {};
		$.map(p_$form.serializeArray(), function(p_obj, p_index){
			json[ p_obj['name'] ] = p_obj['value'];
		});
		return json;
	} 
	
	
	/** @namespace Gestnameón de pantallas: Añadir nueva pantalla, navegación entre pantallas, etc. */
	this.screen = {};
	
	/** @namespace Gestión de eventos: Añadir/eliminar listeners y disparar eventos. */
	this.event = {};
	
	/** @namespace Configuración de la aplicación: Cargar datos de configuración y entorno. */
	this.config = {};
	
	/** @namespace Interfaz de usuario: Interactuación con elementos HTML. */	
	this.ui = {};
	
	/** @namespace Peticiones HTTP asíncronas y URL Base. */
	this.net = {};
	
	/** @namespace Obtención de datos de configuración globales */
	this.global = {};
	
	/** @namespace Obtención de datos de configuración según entorno */
	this.local = {};
	
	/** @namespace Gestión del multiidioma: Carga de ficheros de idoma, obtención de textos traducidos, etc. */
	this.lang = {};

	/** @namespace Utilidades varias: Formateo de fechas. */
	this.util = {};
	
	/**
	 * Carga el JSON de configuración.
	 * Se puede usar iris sin necesidad de cargar este fichero.
	 * @function
	 * @param {JSON} config Contiene información sobre los entornos, valores de configuración globales y por entorno, nivel de registro de logs,..
	 * @example
	 * iris.config.Load({
	 * "environment-default" : "pro"
	 *,"environments-nocache" : "dev"
	 *   ,"environment": {
	 *        "localhost" : "dev"
	 *       ,"www.example.com" : "pro"
	 *   }
	 *   ,"log": {
	 *        "dev": "debug,warning,error"
	 *       ,"pro" : "debug,error"
	 *   }
	 *   ,"global": {
     *			"global-variable" : "example"
     *	 }
     *	 ,"local": {
     *		"local-variable" : {
     *		 	"dev" : "example-dev"
     *			,"pro" : "example-pro"
     *		}
     *	 }
	 *	});
	 * 
	 */
	this.config.Load = _ConfigLoad;
	
	/**
	 * Establece o devuelve el entorno actual.
	 * Si se carga un fichero de configuración este valor viene se determina por "environment",
	 * si no se encuentra ninguno que coincida toma el valor por defecto "environment-default".
	 * Las variables "local" puestas en el fichero de configuración dependerán de este valor.
	 * @function
	 * @param {String} [p_env] Nombre de entorno es opcional
	 * @example
	 * Ejemplo: URL=http://localhost:8080/admin
	 * Fichero configuración:
	 * ...
	 *  "environment": {
	 *        "localhost" : "dev"
	 *       ,"www.example.com" : "pro"
	 *  }
	 * ...
	 *   
	 * iris.config.Env(); // devuelve "dev"
	 * 
	 * iris.config.Env("pro"); // establece el entorno a "pro"
	 */
	this.config.Env = _GetEnv;
	
	/**
	 * Añade valores globales de configuración.
	 * Si se carga un fichero de configuración se carga el objeto "global".
	 * Vea {@link iris.global.Data} para más información.
	 * @function
	 * @param {Object} p_hash Objeto de tipo: { "name" : value, ... }
	 * @example
	 * iris.global.Load({"global-variable" : "value"});
	 * iris.global.Data("global-variable"); // devuelve "value"
	 */
	this.global.Load = _GlobalLoad;
	
	/**
	 * Obtiene/Configura el valor de una variable de configuración global.
	 * Si no especifica nombre, ni valor, se obtiene un Object con todos los valores.
	 * Vea {@link iris.global.Load} para más información.
	 * @function
	 * @param {String} [p_label] Nombre de la variable es opcional
	 * @param {String} [p_value] Valor de la variable es opcional
	 * @example
	 * iris.global.Data("global-variable");
	 */
	this.global.Data = _GlobalData;
	
	/**
	 * Añade valores de configuración que dependen del entorno.
	 * Si se carga un fichero de configuración se carga el objeto "local".
	 * Vea {@link iris.local.Data} para más información.
	 * @function
	 * @param {Object} p_hash Objeto de tipo: { "name" : {"environment" : value, ... }, ... }
	 * @example
	 * iris.global.Load({"global-variable" : "value"});
	 * iris.global.Data("global-variable"); // devuelve "value"
	 */
	this.local.Load = _LocalLoad;
	
	/**
	 * Obtiene/Configura el valor de una variable de configuración que depende del entorno actual.
	 * Si no especifica nombre, ni valor, se obtiene un Object con todos los valores.
	 * Vea {@link iris.local.Load} para más información.
	 * @function
	 * @param {String} [p_label] Nombre de la variable es opcional
	 * @param {String} [p_value] Valor de la variable es opcional
	 * @example
	 * iris.local.Data({
	 *  "local-variable" : {
     *    "dev" : "example-dev"
     *   ,"pro" : "example-pro"
     *	}
     * });
     *  
     * // Si entorno="dev" devuelve "example-dev"
     * iris.local.Data("local-variable");
	 */
	this.local.Data = _LocalData;
	
	/**
	 * Carga las traducciones del locale indicado.
	 * @function
	 * @param {String} p_locale Locale
	 * @param {Object} p_data Objeto de tipo { "LABEL" : "value", ... }
	 * @example
	 * iris.lang.Load("es-ES", {"LABEL":"etiqueta"});
	 */
	this.lang.Load = _LocaleLoad;
	
	/**
	 * Carga remotamente las traducciones del locale indicado.
	 * @function
	 * @param {String} p_locale Locale
	 * @param {String} p_uri URL a cargar
	 * @param {Object} p_settings {@code {"success" : function (p_locale) {}, "error" : function (p_locale) {}} }
	 * @example
	 * iris.lang.LoadFrom(
	 *      "es-ES"
	 *    , "http://example.com/lang"
	 *    , {"success":_OnLangLoad}
	 * );
	 */
	this.lang.LoadFrom = _LangLoadFrom;
	
	/**
	 * Obtiene el texto deseado según el Locale establecido o deseado.
	 * Vea {@link iris.local.Locale} para más información.
	 * @function
	 * @param {String} p_label Etiqueta
	 * @param {String} [p_locale] Locale es opcional
	 * @example
	 * iris.lang.Get("LABEL");
	 */
	this.lang.Get = _LangGet;
	
	/**
	 * Establece o devuelve el locale actual.
	 * @function
	 * @param {String} [p_locale] Locale es opcional
	 * @example
	 * iris.lang.Locale("es-ES");
	 */
	this.lang.Locale = _LocaleGet;
	
	/**
	 * Muestra por consola el texto deseado.
	 * @function 
	 * @param {arguments} 
	 * @example
	 * iris.L("texto", variable);
	 */
	this.L = _L;
	
	/**
	 * Muestra por consola el texto deseado. Solo lo muestra si esta el modo debug activado para el entorno actual.
	 * Vea {@link iris.config.Load} para más información.
	 * @function
	 * @param {arguments} 
	 * @example
	 * iris.D("texto", variable);
	 */
	this.D = _D;
	
	/**
	 * Muestra por consola el texto deseado. Solo lo muestra si esta el modo warning activado para el entorno actual.
	 * @function
	 * @see {@link iris.config.Load}
	 * @param {arguments} 
	 * @example
	 * iris.W("texto", variable);
	 */
	this.W = _W;
	
	/**
	 * Muestra pot consola el texto deseado. Solo lo muestra si esta el modo error activado para el entorno actual.
	 * Vea {@link iris.config.Load} para más información.
	 * @function
	 * @param {arguments} 
	 * @example
	 * iris.E("texto", variable);
	 */
	this.E = _E;
	
	/**
	 * Añade un manejador de evento.
	 * Vea {@link iris.event.Notify} y {@link iris.event.Remove} para más información.
	 * @function
	 * @param {String} p_eventName Identificador de evento
	 * @param {Function} f_func Función a ejecutar cuando se dispare el evento
	 * @example
	 * iris.event.Subscribe("user_select", _OnUserSelect);
	 */
	this.event.Subscribe = _EventSubscribe;
	
	/**
	 * Lanza el evento deseado.
	 * Vea {@link iris.event.Subscribe} y {@link iris.event.Remove} para más información.
	 * @function
	 * @param {String} p_eventName Identificador de evento
	 * @param {Object} p_data Objeto de cualquier tipo con los parámetros que le van a llegar al/los listeners
	 * @example
	 * iris.event.Notify(
	 *    "user_select"
	 *  , {"user_id" : 123, "name" : "John"}
	 * );
	 */
	this.event.Notify = _EventNotify;
	
	/**
	 * Elimina el evento deseado.
	 * Vea {@link iris.event.Subscribe} y {@link iris.event.Notify} para más información.
	 * @function
	 * @param {String} p_eventName Identificador de evento
	 * @param {String}  f_func Función que dejará de ejecutarse
	 * @example
	 * iris.event.Remove("user_select", _OnUserSelect);
	 */
	this.event.Remove = _EventRemove;
	
	/**
	 * Devuelve o establece la URL base de la aplicación. Si se define el tag HTML &lt;base &gt; lo concatena al final de URL.
	 * @function
	 * @param {String} [p_baseUri] URL base es opcional
	 * @example
	 * iris.net.BaseUri(); // devuelve http://www.example.com/
	 */
	this.net.BaseUri = _BaseUri;
	
	/**
	 * Realiza una petición Ajax. Accepta los mismo parámetros que jQuery.ajax()
	 * @function
	 * @see <a href="http://api.jquery.com/jQuery.ajax/">JQuery Ajax</a>.
	 * @example
	 * iris.net.Ajax(
	 *		{     "url" : "/s/myservice"
	 *			, "type" : "GET"
	 * 		}
	 * );
	 */
	this.net.Ajax = _Ajax;
	
	/**
	 * Registra un objeto Screen. Debe aparecer al principio de los ficheros de pantallas.
	 * @function
	 * @param {Function} f_screen La clase de la pantalla
	 * @example
	 * iris.Screen(
	 *   function (self) {
	 *   	self.Create = function () {
	 *   	}
	 *   
	 *   	self.Awake = function (p_params) {
	 *   	}
	 *   
	 *   	self.Sleep = function () {
	 *   	}
	 *   
	 *   	...
	 *   }
	 * );
	 */
	this.Screen = _ScreenCreate;
	
	/**
	 * Registra un objeto UI. Debe aparecer al principio de los ficheros (*.js) UI.
	 * @function
	 * @param {Function} f_ui La clase del objeto UI
	 * @example
	 * iris.UI(
	 *   function (self) {
	 *   	self.Create = function (p_domAttr, p_settings) {
	 *   	}
	 *   
	 *   	self.Awake = function (p_params) {
	 *   	}
	 *   
	 *   	self.Sleep = function () {
	 *   	}
	 *   
	 *   	...
	 *   }
	 * );
	 */
	this.UI =  _UICreate;
	
	/**
	 * Añade una ventana nueva.
	 * Se puede navegar hacia ella usando <code>iris.Goto</code>.
	 * @function
	 * @param {JQuery} p_$context Contenedor de la pantalla
	 * @param {String} p_screenPath Ruta de la pantalla
	 * @param {String} p_jsUrl Controlador de la pantalla
	 * @example
	 * var $screens = self.$Get("screens");
	 * iris.screen.Add(
	 *     $screens
	 *   , "#library/books/edit/details"
	 *   , "example/screen/book_details.js"
	 * );
	 * iris.Goto("#library/books/edit/details");
	 */
	this.screen.Add = _ScreenAdd;
	
	/**
	 * Copia los atributos del objecto JQuery a un objeto deseado.
	 * @function
	 * @param {JQuery} p_$obj Objeto vacío o con contenido
	 * @example
	 * var $obj = $("&lt;div data-id='test' _class='myclass'&gt;&lt;/div&gt;")
	 * var params = iris.ui.JqToHash($obj); 
	 * // devuelve: {"id" : "test", "class" : "myclass"}
	 */
	this.ui.JqToHash = _JqToHash;
	
	/**
	 * Pasa los valores del Object al objeto JQuery elegido.
	 * @function
	 * @param {Object} p_hash Objeto con los valores a copiar
	 * @param {JQuery} p_$obj Copiará los valores como atributos
	 * @param {String[]} [p_filter] Indica que valores se deben copiar únicamente (opcional)
	 * @example
	 * iris.ui.HashToJq(
	 *   { "class":"myclass", "other":"other_value" }
	 *  , $obj
	 *  , ["class"]
	 * ); // Solo crea el atributo class en $obj
	 */
	this.ui.HashToJq = _HashToJq;
	
	/**
	 * Carga los archivos JS o CSS especificados.
	 * La carga de estos ficheros se realiza de manera <b>síncrona</b>.
	 * @function
	 * @param {arguments} Strings con las rutas de los ficheros a cargar.
	 * @example
	 * iris.Include("app/service/myservice.js", "app/css/mycss.css");
	 */
	this.Include = _IncludeFiles;
	
	/**
	 * Formatea un objeto Date o timestamp al formato especificado y según el locale actual.<br>
	 * Para elaborar el formato se pueden utilizar los siguientes caractares especiales:<br><br>
	 *   <b>a</b>	'a.m.' or 'p.m.'<br>
	 *   <b>A</b>	'AM' or 'PM'<br>
	 *   <b>b</b>	Month, textual, 3 letters, lowercase.	'jan'<br>
	 *   <b>d</b>	Day of the month, 2 digits with leading zeros.	'01' to '31'<br>
	 *   <b>D</b>	Day of the week, textual, 3 letters.	'Fri'<br>
	 *   <b>F</b>	Month, textual, long.	'January'<br>
	 *   <b>h</b>	Hour, 12-hour format.	'01' to '12'<br>
	 *   <b>H</b>	Hour, 24-hour format.	'00' to '23'<br>
	 *   <b>i</b>	Minutes.	'00' to '59'<br>
	 *   <b>l</b>	Day of the week, textual, long.	'Friday'<br>
	 *   <b>m</b>	Month, 2 digits with leading zeros.	'01' to '12'<br>
	 *   <b>M</b>	Month, textual, 3 letters.	'Jan'<br>
	 *   <b>n</b>	Month without leading zeros.	'1' to '12'<br>
	 *   <b>s</b>	Seconds, 2 digits with leading zeros.	'00' to '59'<br>
	 *   <b>U</b>	Seconds since the Unix Epoch (January 1 1970 00:00:00 UTC)<br>
	 *   <b>y</b> 	Year, 2 digits.	'99'<br>
	 *   <b>Y</b>	Year, 4 digits.	'1999'<br>
	 * @function
	 * @param {Date|Timestamp} p_date Objeto Date o valor en milisegundos (UNIX timestamp)
	 * @param {String} [p_format] Cadena de texto que especifica el formato de la fecha deseado,
	 * 							si no se especifica se toma el formato definido por defecto
	 * 							para el locale actual
	 * @example
	 * iris.util.DateFormat(new Date(),"ymd");
	 * iris.util.DateFormat("1331954654564","d/m/y h:i:s"); // 17/03/12 04:24:14
	 * iris.util.DateFormat(1331954654564);
	 */
	this.util.DateFormat = _DateFormat;
	
	this.util.Deserialize = _Deserialize;
	this.util.Serialize = _Serialize;
	
	/**
	 * Realiza la navegación hacia la pantalla indicada.
	 * La pantalla debe añadirse anteriormente usando <code>iris.screen.Add</code>.
	 * 
	 * @param p_hashUri {String} Hash URL
	 * 
	 * @example
	 * iris.Goto("#profile/my-contacts")
	 */
	this.Goto = _Goto;
	
	/**
	 * Inicia la navegación usando el Hash que tenga la URL actual.
	 * Si no existe ningún Hash en la URL actual inicia la navegación 
	 * hacia la pantalla indicada en <code>p_defaultHashUrl</code>.
	 * 
	 * @param p_defaultUrlHash {String} Default URL Hash
	 * 
	 * @example
	 * iris.GotoUrlHash("#home/games")
	 */
	this.GotoUrlHash = _GotoUrlHash;
	
	/**
	 * Registra un objeto BE. Debe aparecer al principio de los ficheros (*.js) BE.
	 * @function
	 * @param {Function} f_be La clase del objeto BE
	 * @example
	 * iris.UI(
	 *   function (self) {
	 *   	self.Apply = function ( p_uis ) {
	 *   	}
	 *   	...
	 *   }
	 * );
	 */
	this.BE = _BECreate;
	this.ApplyBE = _ApplyBE;
	
	_Init();
	
};
