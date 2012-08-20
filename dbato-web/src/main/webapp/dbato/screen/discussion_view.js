iris.Screen(
	function (self) {
	
		var
			_$Title
			,_$Text
			,_Reply
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			
			self.Template(dbato.Resource("screen/discussion_view.html"));
			
			_Reply = self.InstanceUI("post_reply", dbato.Resource("ui/reply.js"));
			
			_$Title = self.$Get("title");
			_$text = self.$Get("text");
		};
		
		self.Awake = function( p_params ){
			iris.D("AWAKE", p_params);
			_Reply.SetDiscussionKey( p_params.id );
			dbato.service.Discussion.Get( p_params.id, _Inflate );
		}
		
		function _Inflate( p_json ){
			_$Title.html( p_json.discussion.title );
			_$text.html( p_json.discussion.text );
		}
		
	}
);
