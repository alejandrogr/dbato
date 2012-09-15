dbato.service.User = new function () {
	this.Update = function ( p_nick, p_showHiddenReplies, p_useNick, f_success, f_error ) {
		dbato.service.Put(
			"user"
			, {
				 "n" : p_nick
				,"sh" : p_showHiddenReplies
				,"un" : p_useNick
			}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
};