iris.UI(
	function (self) {
	
		var 
			_$
			,_Login
			,_$Logout
		;
		
		self.Create = function () {
			self.Template(dbato.Resource("ui/sidebar.html"));
			
			_$ = self.$Get();

			_Login = self.InstanceUI(
				"login"
				, dbato.Resource("ui/login.js")
				, {
					 "show_logout" : true
					,"show_welcome" : true
				}
			);
			
			self.InstanceUI( "tag_list", dbato.Resource("ui/tag_list.js"));
			
		};
		
		
	}
);
