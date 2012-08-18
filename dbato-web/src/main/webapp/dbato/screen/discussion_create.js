iris.Screen(
	function (self) {
	
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/discussion_create.html"));

			iris.Include(dbato.Resource("service/discussion.js"));
			self.$Get("create").on("click", _CreateDiscussion);
		};
		

		function _CreateDiscussion( p_event ){
			p_event.preventDefault();
			dbato.service.Discussion.Create(
				  self.$Get("title").val()
				, self.$Get("desc").val()
				, function( p_json ){
					  iris.D( p_json );
					  iris.Goto("#discussion#list");
				}
			);
		}
		
	}
);
