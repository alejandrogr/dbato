dbato.service.Tag = new function () {
	this.TagList = [];
	
	this.GetAll = function ( f_success, f_error ) {
		if( dbato.service.Tag.TagList.length != 0 ){
			f_success( dbato.service.Tag.TagList );
		} else {			
			this.Load( f_success );
		}
	};
	
	this.Load = function( f_success, f_error ){
		dbato.service.Get(
			"tag"
			, {}
			,function ( p_json ) {
				dbato.service.Tag.TagList = p_json;
				if( typeof f_success == "function"){
					f_success( p_json  );					
				} else {
					iris.event.Notify( dbato.event.TAGS_RELOADED );
				}
			}
			, f_error
		);
	}
};