iris.Screen(
	function (self) {
	
		var
			_DiscussionList
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			self.Template(dbato.Resource("screen/my_discussions.html"));

			_DiscussionList = self.InstanceUI("list", dbato.Resource("ui/discussion_list.js"));

			_GetMyDiscussions();
		};
		
		function _GetMyDiscussions(){
			dbato.service.Discussion.GetMy(
				function( p_json ){
					if( p_json.length > 0 ){
						_DiscussionList.Inflate( p_json );
					} else {
						_DiscussionList.Hide();
						self.$Get("title").hide();
						self.$Get("no_discussions").show();
					}
				}
			);
		}
	}
);
