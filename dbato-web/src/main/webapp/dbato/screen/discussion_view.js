iris.Screen(
	function (self) {
	
		var
			 _$Title
			,_$Text
			,_Reply
			,_DiscussionKey
			,_RepliesPro
			,_RepliesAgainst
			,_RepliesNew
			,_$Meta
			,_LoginUi
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			
			self.Template(dbato.Resource("screen/discussion_view.html"));
			_$Meta = self.$Get("meta");
			
			_Reply = self.InstanceUI(
				  "post_reply"
				, dbato.Resource("ui/reply_form.js")
				, {"beforeReply" : _BeforeReply }
			);
			
			_RepliesPro = self.InstanceUI(
				  "replies_pro"
				, dbato.Resource("ui/reply_list.js")
				, {"replyType":dbato.CONSTANTS.REPLY_PRO}
			);
			
			_RepliesAgainst =  self.InstanceUI(
				  "replies_against"
				, dbato.Resource("ui/reply_list.js")
				, {"replyType":dbato.CONSTANTS.REPLY_AGAINST}
			);
			_RepliesNew =  self.InstanceUI(
				  "replies_new"
				, dbato.Resource("ui/reply_list.js")
				, {"replyType":dbato.CONSTANTS.REPLY_NEW}
			);
			
			_LoginUi = self.InstanceUI("login", dbato.Resource("ui/login.js"));

			if( dbato.USER != null ){
				_Reply.Show();
				_LoginUi.Hide();
			} else {
				_Reply.Hide();
				_LoginUi.Show();
			}
			
			_$Title = self.$Get("title");
			_$Text = self.$Get("text");
			
		};
		
		
		
		self.Awake = function( p_params ){
			_DiscussionKey = p_params.id;
			_Reply.SetDiscussionKey( _DiscussionKey );
			_RepliesPro.SetDiscussionKey( _DiscussionKey );
			_RepliesAgainst.SetDiscussionKey( _DiscussionKey );
			_RepliesNew.SetDiscussionKey( _DiscussionKey );

			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _BeforeReply(){
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _Inflate( p_json ){
			_$Title.html( p_json.discussion.title );
			_$Text.html( p_json.discussion.text );
			_$Meta.html( "By " + p_json.discussion.owner + " on " + p_json.discussion.updateDate);
			
			_Replies = p_json.replies;

			_RepliesPro.Inflate( _Replies );
			_RepliesAgainst.Inflate( _Replies );
			_RepliesNew.Inflate( _Replies );
			
		}
		
		
		
	}
);
