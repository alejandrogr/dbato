iris.UI(
	function (self) {
		
		self.Create = function () {
			self.Template(dbato.Resource("ui/discussion_list.html"));
		};
		
		self.Inflate = function( p_discussionList ){
			self.$Get("items").html("");
			var f,F =  p_discussionList.length;
			for( f=0; f<F; f++){
				_AddItem( p_discussionList[f]);
			}
		};
		
		function _AddItem( p_discussion ){
			
			var item = self.InstanceUI("items", dbato.Resource("ui/discussion_list_item.js"));
			item.Inflate( p_discussion );
		};
	}
);
