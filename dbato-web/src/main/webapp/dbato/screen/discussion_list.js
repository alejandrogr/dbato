iris.Screen(
	function (self) {
	
		var
			_DiscussionList
			,_$Filter
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			self.Template(dbato.Resource("screen/discussion_list.html"));

			_DiscussionList = self.InstanceUI("list", dbato.Resource("ui/discussion_list.js"));
			
			_$Filter = self.$Get("filter");
			_$Filter.hide();
		};
		
		self.Awake = function( p_params ){
			if( p_params.hasOwnProperty("list")){
				_DiscussionList.Inflate( p_params.list );
			} else if( p_params.hasOwnProperty("search")){
				_Search( p_params.search );
			} else {
				if( dbato.RELOAD_DISCUSSIONS ){
					dbato.RELOAD_DISCUSSIONS = false;
					_ReloadList();
				}
			}
		}
		
		function _RemoveSearch(){
			iris.Goto("#discussion#list");
			_ReloadList();
		}
		
		function _Search( p_text ){
			dbato.service.Discussion.Search( 
				  p_text
				, function( p_json ){
					  if( p_json.length == 1 ){
						  iris.Goto("#discussion#view?id=" + p_json[0].discussionId)
					  } else if( p_json.length > 1 ){
						  	_$Filter.html("");
						  	var alert = self.InstanceUI(
								  _$Filter
								, dbato.Resource("ui/alert_item.js")
								, {
									  "onDismiss" : _RemoveSearch
								  }
							);
							
							alert.Inflate("Discussions are filtered by \""+ p_text +"\", close to remove filter.");
						  	_$Filter.show();
						  	_DiscussionList.Inflate( p_json );
					  } else if( p_json.length == 0 ){
						  _$Filter.hide();
						  _DiscussionList.NoResults();
						  _NoResultsInSearch();
					  }
				}
			);
		}
		
		function _NoResultsInSearch(){
			dbato.alert.AlertError("No results", true);
		}
		
		function _ReloadList(){
			dbato.service.Discussion.GetAll(
				function( p_json ){
					  _DiscussionList.Inflate( p_json );
				}
			);
		}
		
		
	}
);
