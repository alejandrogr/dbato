iris.Screen(
	function (self) {
	
		var 
			_$
			,_$Container
			,_Login
			,_$Logout
		;
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/sidebar.html"));
			
			_$ = self.$Get();
			_$Container = _$.closest("[data-id='sidebar']");

			_Login = self.InstanceUI(
				"login"
				, dbato.Resource("ui/login.js")
				, {
					 "show_logout" : true
					,"show_welcome" : true
				}
			);
			
		};
		
		
	}
);
