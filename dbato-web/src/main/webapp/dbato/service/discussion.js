dbato.service.Discussion = new function () {
	this.DiscussionList = [];
	
	this.Load = function ( f_success, f_error ) {
		dbato.service.Get(
			 "discussion"
			, {}
			,function ( p_json ) {
				dbato.service.Discussion.DiscussionList = p_json;
				if( typeof f_success == "function"){
					f_success( p_json  );					
				} else {
					iris.event.Notify( dbato.event.DISCUSSIONS_RELOADED );
				}
			}
			, f_error
		);
	};
	
	this.GetAll = function ( f_success, f_error ) {
		if( dbato.service.Discussion.DiscussionList.length != 0 ){
			f_success( dbato.service.Discussion.DiscussionList );
		} else {			
			this.Load( f_success );
		}
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
			,"t=" + p_title + "&c=" + p_desc + ta
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
	
	
	
	this.Search = function ( p_query, f_success, f_error ) {
		dbato.service.Get(
			"discussion/search/" + p_query
			, {}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
};