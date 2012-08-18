iris.Screen(
	function (self) {
	
		var
			_DiscussionList
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			self.Template(dbato.Resource("screen/discussion_list.html"));
			
			_DiscussionList = self.InstanceUI("list", dbato.Resource("ui/discussion_list.js"));
		};
		
		self.Awake = function(){
			_ReloadList();
		}
		
		function _ReloadList(){
			dbato.service.Discussion.List(
				function( p_json ){
					  iris.D( p_json );
					  _DiscussionList.Inflate( p_json );
				}
			);
		}
		
		
	}
);
