iris.UI(
	function (self) {
		
		var
			 _Pagination
			,_$NoResults
			,_$Results
			,_$Pager
		;
		
		self.Settings({
			"numItems" : 10
		});
		
		self.Create = function () {
			self.Template(dbato.Resource("ui/discussion_list.html"));

			_$NoResults = self.$Get("no_results");
			_$Results = self.$Get("resutls");
			_$Pager = self.$Get("pager");
			
			iris.event.Subscribe( dbato.event.DISCUSSIONS_RELOADED, _GetAllDiscussions );
			
			_Pagination = self.InstanceUI(_$Pager, dbato.Resource("ui/pagination.js"), {"numItems" :  self.Setting("numItems")});
			
		};
		
		function _GetAllDiscussions(){
			dbato.service.Discussion.GetAll( _Inflate );
		}
		
		_Inflate = function( p_discussionList ){

			_$Pager.show();
			_$Results.show();
			_$NoResults.hide();
			
			self.$Get("items").html("");
			var f,F =  p_discussionList.length;
			for( f=0; f<F; f++){
				_AddItem( p_discussionList[f], f );
			}
			_Pagination.Clear();
			var totalPages = Math.ceil(p_discussionList.length / 10);
			
			_Pagination.AddPages( totalPages );
			_Pagination.Paginate( self.$Get("items") );
		};
		
		function _AddItem( p_discussion, p_index ){
			var visible = true;
			if( p_index > self.Setting("numItems") -1 ){
				visible = false;
			}
			var item = self.InstanceUI("items", dbato.Resource("ui/discussion_list_item.js"), {"visible" : visible});
			item.Inflate( p_discussion );
		};
		
		function _NoResults(){
			iris.D("_$Pager", _$Pager);
			iris.D("_$Results", _$Results);
			iris.D("_$NoResults", _$NoResults);
			
			
			_$Pager.hide();
			_$Results.hide();
			_$NoResults.show();
		}
		
		self.NoResults = _NoResults;
		self.Inflate = _Inflate;
	}
);
