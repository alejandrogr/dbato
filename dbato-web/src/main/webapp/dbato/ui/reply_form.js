iris.UI(
	function (self) {
		
		var
			 _$Text
			,_$ReplyType
			,_DiscussionId
		;
		
		self.Settings({
			"beforeReply" : null
		});
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/reply.js"));
			self.Template(dbato.Resource("ui/reply_form.html"));
			
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
					  if ( self.Setting("beforeReply") != null ){
						  self.Setting("beforeReply")();
					  }
				}
			);
		}
		
		function _SetDiscussionKey( p_id ){
			_DiscussionId  = p_id;
		}
		
		
		
		self.SetDiscussionKey = _SetDiscussionKey;
		
	}
);
