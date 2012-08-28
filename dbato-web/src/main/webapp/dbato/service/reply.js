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
	
	this.Get = function( p_replyId,  f_success, f_error ){
		dbato.service.Get(
			"reply/" + p_replyId
			, {}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	}
	
	this.Vote = function( p_vote, p_replyId,  f_success, f_error ){
		dbato.service.Put(
			"reply/vote"
			, {
				"v" : p_vote
				,"ri" : p_replyId
			}
			,function ( p_json ) {
				f_success( p_json  );
			}
			, f_error
		);
	}
};