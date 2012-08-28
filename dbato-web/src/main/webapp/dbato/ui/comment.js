iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$Text
			,_$Date
		;
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND);  
			self.Template( dbato.Resource("ui/comment.html") );

			_$Text = self.$Get("text");
			_$Date = self.$Get("date");
		};
		
		function _Inflate( p_comment ){
			_$Text.html( p_comment.text );
			_$Date.html( p_comment.creationDate );
		}
			
		self.Inflate = _Inflate;
	}
);