iris.Screen(
	function (self) {
	
		var
			 _$Title
			,_$Text
			,_Reply
			,_$Replies
			,_$BestPro
			,_$BestNeu
			,_$BestAga
			,_$ShowMoreReplies
			,_DiscussionId
			,_TotalReplies
			,_CurrentReplies
			,_RepliesToShow
			,_HiddenReplies
			,_JustNevagiteRepliesLeft = false
			,_LoginUi
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			
			self.Template(dbato.Resource("screen/discussion_view.html"));
			
			_Reply = self.InstanceUI(
				  "post_reply"
				, dbato.Resource("ui/reply_form.js")
				, {"beforeReply" : _BeforeReply }
			);
			
			_LoginUi = self.InstanceUI("login", dbato.Resource("ui/login.js"));
			
			_$Replies = self.$Get("replies");
			_$Title = self.$Get("title");
			_$Text = self.$Get("text");
			_$HiddenRepliesMsg = self.$Get("hidden_replies_msg").hide();
			_$HiddenRepliesNumber = self.$Get("hidden_replies_num");
			_$ShowMoreReplies = self.$Get("show_more_replies").hide();
			
			
			_InflateEvents();
		};
		
		
		function _InflateEvents(){
			_$HiddenRepliesMsg.on("click", _ShowMoreReplies);
			_$ShowMoreReplies.on("click", _ShowMoreReplies);
		}
		
		self.Awake = function( p_params ){
			_DiscussionKey = p_params.id;
			_Reply.SetDiscussionKey( _DiscussionKey );
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );

			_RepliesToShow = 5; 
			_CurrentReplies = 0;
			_HiddenReplies = 0;
			_JustNevagiteRepliesLeft = false;
			
			if( dbato.USER != null ){
				_Reply.Show();
				_LoginUi.Hide();
			} else {
				_Reply.Hide();
				_LoginUi.Show();
			}
		}
		
		function _BeforeReply(){
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _Inflate( p_json ){
			_$Title.html( p_json.discussion.title );
			_$Text.html( p_json.discussion.text );
			
			_$Replies.html("");
			
			_TotalReplies = p_json.replies.length;
			_Replies = p_json.replies;
			_InflateReplies( _Replies );
			
		}
		
		function _InflateReplies( p_replies ){
			var reply;
			var f,F = _TotalReplies;
			var curRep = _CurrentReplies;
			for(f=curRep;f<F;f++){
				reply = p_replies[f].reply;
				
				if ( reply.votes < -10 && !_JustNevagiteRepliesLeft){
					_JustNevagiteRepliesLeft = true;
					_$HiddenRepliesMsg.show();
					_$HiddenRepliesNumber.html( _HiddenReplies );
					_RepliesToShow = _CurrentReplies;
					break;
				}
				
				var replyUI = self.InstanceUI( _$Replies, dbato.Resource("ui/reply.js"));
				replyUI.Inflate( p_replies[f] );
				
				_CurrentReplies = f + 1;
				
				if( f >= _RepliesToShow - 1 ) break;
			}
			
			_HiddenReplies = _TotalReplies - _CurrentReplies;
			
			if( _HiddenReplies > 0 ){
				if( _JustNevagiteRepliesLeft ){
					_$HiddenRepliesMsg.show();
					_$HiddenRepliesNumber.html( _HiddenReplies );
					_$ShowMoreReplies.hide();
				} else {
					_$ShowMoreReplies.show();	
				}
			} else {
				_$ShowMoreReplies.hide();
				_$HiddenRepliesMsg.hide();
			}
		}
		
		function _ShowMoreReplies(){
			_RepliesToShow = _RepliesToShow + 5;
			_InflateReplies( _Replies );
		}
		
	}
);
