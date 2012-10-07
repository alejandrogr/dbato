iris.Screen(
	function (self) {
	
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/main.html"));
			
			self.AddScreen( "screens", "#home", dbato.Resource("screen/home.js") );

			self.AddScreen( "screens", "#discussion-create", dbato.Resource("screen/discussion_create.js") );
			self.AddScreen( "screens", "#discussion-list", dbato.Resource("screen/discussion_list.js") );
			self.AddScreen( "screens", "#discussion-view", dbato.Resource("screen/discussion_view.js") );
			self.AddScreen( "screens", "#discussion-mines", dbato.Resource("screen/my_discussions.js") );
			self.AddScreen( "screens", "#profile", dbato.Resource("screen/profile.js") );
						
			dbato.alert = self.InstanceUI("alert", dbato.Resource("ui/alert.js") );
			
			self.InstanceUI( "header", dbato.Resource("ui/header.js"));
			self.InstanceUI( "footer", dbato.Resource("ui/footer.js"));
			self.InstanceUI( "sidebar", dbato.Resource("ui/sidebar.js"));
			
			if ( !document.location.hash ) {
			    iris.Goto("#home");
			}
		};
		
	}
);
