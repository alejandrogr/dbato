iris.UI(

	function(self) {

		var
			_$
		;
		

		self.Create = function() {
			self.Template( dbato.Resource("ui/login.html") );
			
			_$ = self.$Get();
			_InflateEvents();
		};
		
		function _InflateEvents(){
			_$.on("click", _Login );
		}
		
		function _Login( p_event ){
			p_event.preventDefault();
			document.location.href="login.jsp";
		}
		
	}
);