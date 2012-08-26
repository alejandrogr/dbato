iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$Text
			,_$
			,_$VoteUp
			,_$VoteDown
			,_$Comment
			,_$CommentForm
			,_$NumComments
			,_$Comments
			//VARS
			,_ReplyId
			,_Comments
			//UIs
			,_CommentUI = null
		;
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND);  
			self.Template( dbato.Resource("ui/reply.html") );
			_$ = self.$Get();
			_$Text = self.$Get("text");
			
			_$VoteUp = self.$Get("vote_up");
			_$VoteDown = self.$Get("vote_down");
			_$Comment = self.$Get("comment");
			_$CommentForm = self.$Get("comment_form");
			_$NumComments = self.$Get("num_comments");
			_$Comments = self.$Get("comments");
			
			_InflateEvents();
		};
		
		function _Inflate( p_reply ){
			var reply = p_reply.reply;
			var comments = _Comments = p_reply.comments;
			
			_ReplyId = reply.replyId;
			_$Text.html( reply.text );
			_$NumComments.html( comments.length );
			_$.addClass( reply.replyType.toLowerCase() );
			
		}
		
		function _InflateEvents(){
			_$VoteUp.on("click", _VoteUp );
			_$VoteDown.on("click", _VoteDown );
			_$Comment.on("click", _ShowCommentBox );
		}
		
		function _VoteUp(){
			dbato.service.Reply.Vote( 1, _ReplyId );		
		}
		
		function _VoteDown(){
			dbato.service.Reply.Vote( -1, _ReplyId );
		}
		
		function _ShowCommentBox(){
			if ( !_CommentUI ){
				_CommentUI = self.InstanceUI(_$CommentForm, dbato.Resource("ui/comment_form.js"));
				_CommentUI.SetReplyKey( _ReplyId );
				var f,F = _Comments.length;
				var commentUi;
				for(f=0;f<F;f++){
					commentUi = self.InstanceUI(_$Comments, dbato.Resource("ui/comment.js"));
					commentUi.Inflate( _Comments[f] );
				}
			} else {
				_$Comments.toggle();
				_$CommentForm.toggle();
			}
		}
		
		self.Inflate = _Inflate;
	}
);