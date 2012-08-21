iris.Screen(
	function (self) {
	
		var
			_$Title
			,_$Text
			,_Reply
			,_$Replies
			,_DiscussionId
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			
			self.Template(dbato.Resource("screen/discussion_view.html"));
			
			_Reply = self.InstanceUI(
				  "post_reply"
				, dbato.Resource("ui/reply_form.js")
				, {"beforeReply" : _BeforeReply }
			);
			_$Replies = self.$Get("replies");
			_$Title = self.$Get("title");
			_$text = self.$Get("text");
		};
		
		self.Awake = function( p_params ){
			iris.D("AWAKE", p_params);
			_DiscussionKey = p_params.id;
			_Reply.SetDiscussionKey( _DiscussionKey );
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _BeforeReply(){
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _Inflate( p_json ){
			_$Title.html( p_json.discussion.title );
			_$text.html( p_json.discussion.text );
			
			_$Replies.html("");
			
			var f,F = p_json.replies.length;
			for(f=0;f<F;f++){
				var reply = self.InstanceUI( _$Replies, dbato.Resource("ui/reply.js"));
				reply.Inflate( p_json.replies[f] );
			}
		}
		
	}
);
