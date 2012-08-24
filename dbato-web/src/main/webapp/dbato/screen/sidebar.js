iris.Screen(
	function (self) {
	
		var 
			_$
			,_$Container
		;
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/sidebar.html"));
			
			iris.event.Subscribe(dbato.EVENTS.SHOW_SIDEBAR, _Display );
			iris.event.Subscribe(dbato.EVENTS.HIDE_SIDEBAR, _Hide );
			
			_$ = self.$Get();
			_$Container = _$.closest("[data-id='sidebar']");
		};

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
