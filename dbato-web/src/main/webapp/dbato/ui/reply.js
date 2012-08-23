iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$Text
			,_$
			,_$VoteUp
			,_$VoteDown
			//VARS
			,_ReplyId
		;
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND);  
			self.Template( dbato.Resource("ui/reply.html") );
			_$ = self.$Get();
			_$Text = self.$Get("text");
			
			_$VoteUp = self.$Get("vote_up");
			_$VoteDown = self.$Get("vote_down");
			
			_InflateEvents();
		};
		
		function _Inflate( p_reply ){
			_ReplyId = p_reply.replyId;
			_$Text.html( p_reply.text );
			_$.addClass( p_reply.replyType.toLowerCase() );
		}
		
		function _InflateEvents(){
			_$VoteUp.on("click", _VoteUp );
			_$VoteDown.on("click", _VoteDown );
			
		}
		
		function _VoteUp(){
			dbato.service.Reply.Vote( 1, _ReplyId );		
		}
		
		function _VoteDown(){
			dbato.service.Reply.Vote( -1, _ReplyId );
		}
		
		self.Inflate = _Inflate;
	}
);