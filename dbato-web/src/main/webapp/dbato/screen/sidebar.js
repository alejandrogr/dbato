iris.Screen(
	function (self) {
	
		var 
			_$
			,_$Container
			,_Login
			,_$Logout
			,_$TagList
		;
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/sidebar.html"));
			
			_$ = self.$Get();
			_$TagList = self.$Get("tag_list");
			_$Container = _$.closest("[data-id='sidebar']");

			_Login = self.InstanceUI(
				"login"
				, dbato.Resource("ui/login.js")
				, {
					 "show_logout" : true
					,"show_welcome" : true
				}
			);
			
			self.InstanceUI( _$TagList, dbato.Resource("ui/tag_list.js"));
			
		};
		
		
	}
);
