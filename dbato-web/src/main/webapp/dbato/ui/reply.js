iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$Text
			,_$
			//VARS
		;
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND);  
			self.Template( dbato.Resource("ui/reply.html") );
			_$ = self.$Get();
			_$Text = self.$Get("text");
		};
		
		function _Inflate( p_reply ){
			_$Text.html( p_reply.text );
			_$.addClass( p_reply.replyType.toLowerCase() );
		}
		
		self.Inflate = _Inflate;
	}
);