iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$Text
		;
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND);  
			self.Template( dbato.Resource("ui/comment.html") );

			_$Text = self.$Get("text");
		};
		
		function _Inflate( p_comment ){
			_$Text.html( p_comment.text );
		}
			
		self.Inflate = _Inflate;
	}
);