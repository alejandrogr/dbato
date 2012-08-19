dbato.service.Discussion = new function () {
	this.GetAll = function ( f_success, f_error ) {
		dbato.service.Get(
			"discussion"
			, {}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
	
	this.Get = function ( p_id, f_success, f_error ) {
		dbato.service.Get(
			"discussion/" + p_id 
			, {}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
	
	this.Create = function ( p_title, p_desc, p_tags, f_success, f_error ) {
		var ta = "";
		for( var j = 0; j < p_tags.length ; j ++ ){
			ta += "&ta=" + p_tags[j];
		}
		
		dbato.service.Post(
			"discussion"
			,"?t=" + p_title + "&c=" + p_desc + ta
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
	
	this.List = function ( f_success, f_error ) {
		dbato.service.Get(
			"discussion"
			, {}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
};