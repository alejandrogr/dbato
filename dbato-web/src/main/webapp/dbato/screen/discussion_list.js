iris.Screen(
	function (self) {
	
		var
			_DiscussionList
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			self.Template(dbato.Resource("screen/discussion_list.html"));

			_DiscussionList = self.InstanceUI("list", dbato.Resource("ui/discussion_list.js"));
			
			iris.event.Subscribe(dbato.event.RELOAD_DISCUSSION_LIST, _ReloadEvent);
			
			_ReloadList();
		};
		
		self.Awake = function( p_params ){
			if( p_params.hasOwnProperty("list")){
				_DiscussionList.Inflate( p_params.list );
			}
		}
		
		function _ReloadEvent( p_params ){
			_DiscussionList.Inflate( p_params.list );
		}
		
		function _ReloadList(){
			dbato.service.Discussion.List(
				function( p_json ){
					  _DiscussionList.Inflate( p_json );
				}
			);
		}
		
		
	}
);
