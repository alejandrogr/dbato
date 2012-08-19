dbato.service.Tag = new function () {
	this.GetAll = function ( f_success, f_error ) {
		dbato.service.Get(
			"tag"
			, {}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
};