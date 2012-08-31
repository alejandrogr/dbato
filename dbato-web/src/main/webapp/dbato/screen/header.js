iris.Screen(
	function (self) {
	
		var 
			 _$DiscussionCreate
			,_$MyDiscussions
			,_$Profile
			,_$Search
			,_$SearchForm
		;
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/header.html"));
			
			_$DiscussionCreate = self.$Get("discussion_create");
			_$MyDiscussions = self.$Get("my_discussions");
			_$Profile = self.$Get("profile");
			_$Search = self.$Get("search");
			_$SearchForm = self.$Get("search_form");
			
			dbato.alert = self.InstanceUI( $("[data-id='alert']"), dbato.Resource("ui/alert.js") );
			
			_InflateEvents();
		};
		
		self.Awake = function(){
			if( dbato.USER != null ){
				_$DiscussionCreate.show();
				_$MyDiscussions.show();
				_$Profile.show();
			} else{
				_$DiscussionCreate.hide();
				_$MyDiscussions.hide();
				_$Profile.hide();
			} 
		}
		
		function _InflateEvents(){
			_$SearchForm.on("submit", _DoSearch);
		}
		
		function _NoResultsInSearch(){
			dbato.alert.AlertError("No results", true);
		}
		
		function _DoSearch( p_event ){
			p_event.preventDefault();
			if( _$Search.val() != "" ){
				dbato.service.Discussion.Search( 
					  _$Search.val()
					, function( p_json ){
						  if( p_json.length == 1 ){
							  _$Search.val("");
							  iris.Goto("#discussion#view?id=" + p_json[0].discussionId)
						  } else if( p_json.length > 1 ){
							  _$Search.val("");
							  iris.Goto("#discussion#list", {"list" : p_json });
							  iris.event.Notify(dbato.event.RELOAD_DISCUSSION_LIST, {"list" : p_json })
						  } else if( p_json.length == 0 ){
							  _NoResultsInSearch();
						  }
					}
				);
			}
		}
		
	}
);
