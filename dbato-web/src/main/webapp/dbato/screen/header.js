iris.Screen(
	function (self) {
	
		var 
			 _$DiscussionCreate
			,_$MyDiscussions
			,_$Profile
		;
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/header.html"));
			
			_$DiscussionCreate = self.$Get("discussion_create");
			_$MyDiscussions = self.$Get("my_discussions");
			_$Profile = self.$Get("profile");
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
		
	}
);
