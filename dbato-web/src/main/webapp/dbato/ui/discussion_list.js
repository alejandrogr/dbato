iris.UI(
	function (self) {
		
		var
			_Pagination
		;
		
		self.Settings({
			"numItems" : 10
		});
		
		self.Create = function () {
			self.Template(dbato.Resource("ui/discussion_list.html"));
			
			_Pagination = self.InstanceUI("pager", dbato.Resource("ui/pagination.js"), {"numItems" :  self.Setting("numItems")});
		};
		
		self.Inflate = function( p_discussionList ){
			self.$Get("items").html("");
			var f,F =  p_discussionList.length;
			for( f=0; f<F; f++){
				_AddItem( p_discussionList[f], f );
			}
			_Pagination.Clear();
			var totalPages = parseInt(p_discussionList.length / 10);
			_Pagination.AddPages( totalPages );
			_Pagination.Paginate( self.$Get("items") );
		};
		
		function _AddItem( p_discussion, p_index ){
			var visible = true;
			if( p_index > self.Setting("numItems") ){
				visible = false;
			}
			var item = self.InstanceUI("items", dbato.Resource("ui/discussion_list_item.js"), {"visible" : visible});
			item.Inflate( p_discussion );
		};
	}
);
