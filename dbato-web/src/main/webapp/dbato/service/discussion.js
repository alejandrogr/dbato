dbato.service.Discussion = new function () {
	this.GetAll = function ( p_user, f_success, f_error ) {
		
		dbato.service.Get(
			"discussion"
			, {}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
	
	this.Create = function ( p_title, p_desc, f_success, f_error ) {
		dbato.service.Post(
			"discussion"
			, {"t" : p_title, "c" : p_desc }
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