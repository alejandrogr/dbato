iris.config.Load({
	 "environment-default" : "pro" //default environment
	,"environments-nocache" : "dev" //define the cache por each environment
	,"environment" : { //define some environments with their identifier URI
		 "localhost" : "dev"
		,"www.dbato.com" : "pro"
	}
	,"log" : { //console log levels for environments
		 "dev" : "debug,warning,error"
		,"pro" : "error"
	}
	,"global" : { //define some global data, content in this node is not mandatory
		"locales" : {
			  "es" : "es-ES"
		}
		,"default-locale" : "es-ES"
		,"appPath" : "dbato" //directory of your application. 
	}
});

iris.lang.Load("es-ES", {
	 "APP_NAME": "App Name"
	,"ERROR_UNKNOW" : "Ocurrió un error inesperado"
	,"EXEC_SERVICE" : "Ejecutar Servicio"
	,"NEXT_SCREEN" : "Siguiente Pantalla"
});



var dbato = new function () {
	
	this.CONSTANTS = {
		 REPLY_PRO : "PRO"
		,REPLY_AGAINST : "AGAINST"
		,REPLY_NEW : "NEW"
	};
	
	
	this.Resource = function( p_resource ){
		return iris.global.Data("appPath") + "/" + p_resource;
	};
	
	this.EVENTS = {
		 SERVICE_KO : "SERVICE_KO"
		,NOTIFICATION_MESSAGE : "NOTIFICATION_MESSAGE"
		,REPLY_COLUMN_SELECTED : "REPLY_COLUMN_SELECTED"
		,REPLY_COLUMN_SHOW : "REPLY_COLUMN_SHOW"
	};
	
	this.service = new function () {
		
		function _NotifyError (p_service, p_msg, f_error) {
			iris.E("service error", p_service, p_msg);
			
			iris.event.Notify(dbato.EVENTS.SERVICE_KO, {"msg" : iris.lang.Get(p_msg)});
			
			if ( f_error ) {
				f_error();
			}
		}
		function _Call (p_method, p_service, p_params, f_success, f_error){
			iris.D("[_Call]", p_service);
			
			iris.net.Ajax(
				{ "url" : "/s/" + p_service
				, "type" : p_method
				, "data" : p_params
				, "cache" : false
				, "dataType" : "json"
				, "async" : true
				, "success" : function (p_json) {
					if ( p_json.hasOwnProperty("E") ) {
						_NotifyError(p_service, p_json["E"], f_error);
					}
					else {
						if ( p_json.hasOwnProperty("W") ) {
							_NotifyWarning(p_service, p_json["W"]);
						}
						
						f_success( p_json );
					}
				}
				, "error" :
					function (p_request, p_textStatus, p_errorThrown) {
						iris.E(p_service, "load error status[" + p_request.status + "] description[" + p_textStatus + "] errorThrown[" + p_errorThrown + "]");
						_NotifyError(p_service, "ERROR_UNKNOW");
					}
				}
			);
		}
		this.Get = function (p_service, p_params, f_success, f_error){
			_Call("GET", p_service, p_params, f_success, f_error);
		};
		this.Put = function (p_service, p_params, f_success, f_error){
			_Call("PUT", p_service, p_params, f_success, f_error);
		};
		this.Post = function (p_service, p_params, f_success, f_error){
			_Call("POST", p_service, p_params, f_success, f_error);
		};
		this.Delete = function (p_service, p_params, f_success, f_error){
			_Call("DELETE", p_service, p_params, f_success, f_error);
		};
	};
};


$(document).ready(
	function () {
		
		if( USER.EMAIL != "null" ){
			dbato.USER = USER;
			dbato.LOGOUT = USER.LOGOUT;
		} else {
			dbato.USER = null;
		}
		
		iris.screen.WelcomeScreen(dbato.Resource("screen/main.js"));
	}
);
