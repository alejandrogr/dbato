iris.UI(
	function (self) {
		
		var
			 _$Text
			,_ReplyId
		;
		
		self.Settings({
			"beforeComment" : null
		});
		
		self.Create = function () {
			self.TemplateMode( self.TEMPLATE_APPEND);
			iris.Include(dbato.Resource("service/comment.js"));
			self.Template(dbato.Resource("ui/comment_form.html"));
			
			_$Text = self.$Get("text");
			self.$Get("create").on("click", _CreateComment);
			
			_$Text.wysihtml5();
		};
		
		function _CreateComment( p_event ){
			p_event.preventDefault();
			dbato.service.Comment.Create(
				  _$Text.val()
				, _ReplyId
				, function( p_json ){
					  iris.D( p_json );
					  if ( self.Setting("beforeComment") != null ){
						  self.Setting("beforeComment")();
					  }
				}
			);
		}
		
		function _Clear(){
			_$Text.data("wysihtml5").editor.clear();
		}
		
		function _SetReplyKey( p_id ){
			_ReplyId  = p_id;
		}
		
		self.SetReplyKey = _SetReplyKey;
		self.Clear = _Clear;
	}
);
