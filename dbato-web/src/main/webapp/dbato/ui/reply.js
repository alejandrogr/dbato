iris.UI(
	function (self) {
		
		var
			 _$Text
			,_$ReplyType
			,_DiscussionId
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/reply.js"));
			self.Template(dbato.Resource("ui/reply.html"));
			
			_$Text = self.$Get("text");
			_$ReplyType = self.$Get("reply_type");
			self.$Get("create").on("click", _CreateReply);
			
			_$Text.wysihtml5();
			
		};
		
		function _CreateReply( p_event ){
			p_event.preventDefault();
			dbato.service.Reply.Create(
				  _$Text.val()
				, _DiscussionId 
				, _$ReplyType.val()
				, function( p_json ){
					  iris.D( p_json );
				}
			);
		}
		
		function _SetDiscussionKey( p_id ){
			_DiscussionId  = p_id;
		}
		
		
		
		self.SetDiscussionKey = _SetDiscussionKey;
		
	}
);
