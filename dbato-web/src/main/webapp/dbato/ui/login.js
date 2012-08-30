iris.UI(

	function(self) {

		var
			 _$Login
			,_$Logout
			,_$Wellcome
			,_$Nickname
			,_$GoProfile
		;
		
		self.Settings({
			 "show_logout" : false
			,"show_welcome" : false
		});

		self.Create = function() {
			self.Template( dbato.Resource("ui/login.html") );

			_$Login = self.$Get("login");
			_$Logout = self.$Get("logout");
			_$Wellcome = self.$Get("wellcome");
			_$Nickname = self.$Get("nickname");
			_$GoProfile = self.$Get("go_profile");
			
			_$Logout.hide();
			_$Wellcome.hide();
			
			if( dbato.USER != null ){
				_$Login.hide();
				if( self.Setting("show_logout") == true ){
					_$Logout.show();
				}
				if( self.Setting("show_welcome") == true ){
					_$Wellcome.show();
					_$Nickname.html( dbato.USER.NICK );
				}
			}
			
			_InflateEvents();
		};
		
		function _InflateEvents(){
			_$Login.on("click", _Login );
			_$Logout.on("click", _Logout );
			_$GoProfile.on("click", _GoProfile );
		}
		
		function _Login( p_event ){
			p_event.preventDefault();
			document.location.href="login.jsp";
		}
		
		function _Logout(){
			document.location.href=dbato.LOGOUT;
		}
		
		function _GoProfile( p_event ){
			p_event.preventDefault();
			iris.Goto("#profile");
		}
		
	}
);