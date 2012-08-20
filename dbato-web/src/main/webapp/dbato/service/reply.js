dbato.service.Reply = new function () {
	this.Create = function (p_title, p_discussionKey, p_replyType, f_success, f_error ) {
		dbato.service.Post(
			"discussion/reply"
			, {
				"t" : p_title
				,"dk" : p_discussionKey
				,"rt" : p_replyType
			}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	};
};