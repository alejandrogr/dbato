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
			
			iris.event.Subscribe(dbato.EVENTS.SHOW_SIDEBAR, _Display );
			iris.event.Subscribe(dbato.EVENTS.HIDE_SIDEBAR, _Hide );
			
			_$ = self.$Get();
			_$Container = _$.closest("[data-id='sidebar']");

			_Login = self.InstanceUI("login", dbato.Resource("ui/login.js"));
			_$Logout = self.$Get("logout");
			
			if( dbato.USER != null ){
				_Login.Hide();
				_$Logout.show();
			} else {
				_Login.Show();
				_$Logout.hide();
			}
			
			_InflateEvents();
		};

		function _InflateEvents(){
			_$Logout.on("click", _Logout);
		}
		
		function _Logout(){
			document.location.href=dbato.LOGOUT;
		}
		
		function _Display(){
			dbato.MainContainer().addClass("span10");
			_$Container.show();
		}
		
		function _Hide(){
			dbato.MainContainer().removeClass("span10");
			_$Container.hide();
		}
		
	}
);
