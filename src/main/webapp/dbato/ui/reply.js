iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$Text
			,_$
			,_$VoteUp
			,_$Comment
			,_$CommentForm
			,_$NumComments
			,_$Comments
			,_$CommentContainer
			//VARS
			,_ReplyId
			,_Comments
			,_CommentsShown = false
			//UIs
			,_CommentUI = null
			,_LoginUI = null
		;
		
		self.Create = function() {
			iris.Include( dbato.Resource("service/reply.js"));
			
			self.TemplateMode( self.TEMPLATE_APPEND);  
			self.Template( dbato.Resource("ui/reply.html") );
			_$ = self.$Get();
			_$Text = self.$Get("text");
			
			_$VoteUp = self.$Get("vote_up");
			_$Comment = self.$Get("comment");
			_$CommentForm = self.$Get("comment_form");
			_$NumComments = self.$Get("num_comments");
			_$Comments = self.$Get("comments");
			_$CommentContainer = self.$Get("comment_container");
			
			_InflateEvents();
		};
		
		function _Inflate( p_reply ){
			var reply = p_reply.reply;
			var comments = _Comments = p_reply.comments;
			var userCanVote = p_reply.userCanVote;
			
			_ReplyId = reply.replyId;
			_$Text.html( reply.text );
			_$NumComments.html( comments.length );
			
			if ( !userCanVote ){
				_$VoteUp.unbind();
				_$VoteUp.addClass("disabled");
				_$VoteUp.attr("title", "already voted");
			}
		}
		
		function _InflateEvents(){
			_$VoteUp.on("click", _VoteUp );
			_$Comment.on("click", _ShowCommentBox );
		}
		
		function _VoteUp(){
			_$VoteUp.unbind();
			_$VoteUp.addClass("disabled");
			_$VoteUp.attr("title", "already voted");
			dbato.service.Reply.Vote( 1, _ReplyId, function(){} );		
		}
		
		function _ShowCommentBox(){
			if ( !_CommentsShown ){
				if( dbato.USER != null ){
					_CommentUI = self.InstanceUI("comment_form", dbato.Resource("ui/comment_form.js"), {"beforeComment" : _ReloadComments });
					_CommentUI.SetReplyKey( _ReplyId );
				} else {
					_LoginUI = self.InstanceUI("comment_form", dbato.Resource("ui/login.js"));
				}
				_CommentsShown = true;
				_InflateComments( _Comments );
			} else {	
				_$CommentContainer.toggle();
			}
		}
		
		function _InflateComments( p_comments ){
			_$Comments.html("");
			var f,F = p_comments.length;
			var commentUi;
			for(f=0;f<F;f++){
				commentUi = self.InstanceUI("comments", dbato.Resource("ui/comment.js"));
				commentUi.Inflate( _Comments[f] );
			}
		}
		
		function _ReloadComments(){
			dbato.service.Reply.Get( 
				  _ReplyId
				, function( p_json ){
					  _Comments = p_json.comments;
					  _CommentUI.Clear();
					  _InflateComments( _Comments );
				  }
			);
		}
		
		self.Inflate = _Inflate;
	}
);