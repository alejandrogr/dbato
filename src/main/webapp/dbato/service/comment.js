dbato.service.Comment = new function () {
	this.Create = function (p_text, p_replyKey, f_success, f_error ) {
		dbato.service.Post(
			"reply/comment"
			, {
				"t" : p_text
				,"rk" : p_replyKey
			}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
};