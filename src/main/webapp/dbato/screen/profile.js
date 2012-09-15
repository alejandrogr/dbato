iris.Screen(
	function (self) {
	
		var
			_$Nick
			,_$ShowHiddenReplies
			,_$UpdateProfile
			,_$UseNick
		;
		
		self.Create = function () {
			iris.Include( dbato.Resource("service/user.js"));
			self.Template(dbato.Resource("screen/profile.html"));
			
			_$Nick = self.$Get("nick");
			_$ShowHiddenReplies = self.$Get("show_hidden_replies");
			_$UseNick = self.$Get("use_nick");
			_$UpdateProfile = self.$Get("update_profile");
			
			_$Nick.val( dbato.USER.NICK );
			if ( dbato.USER.SHOW_HIDDEN_REPLIES == true ){
				_$ShowHiddenReplies.attr('checked','checked');
			}
			if ( dbato.USER.USE_NICK == true ){
				_$UseNick.attr('checked','checked');
			}
			
			_InflateEvents();
		};


		function _InflateEvents(){
			_$UpdateProfile.on("click", _UpdateProfile);
		}

		function _UpdateProfile( p_event ){
			p_event.preventDefault();
			
			dbato.service.User.Update(
				 _$Nick.val()
				,_$ShowHiddenReplies.is(":checked")
				,_$UseNick.is(":checked")
				,function( p_json ){
					dbato.alert.Alert("Profile succesful saved!", true);
				}
			);
		}
		
		
	}
);
