iris.UI(

	function(self) {

		var
			//VARS
			_$TagList
		;
		
		self.Settings({
			"max_tags" : 10
		});

		self.Create = function() {
			iris.Include( dbato.Resource("service/tag.js") );
			self.Template( dbato.Resource("ui/tag_list.html") );
			
			_$TagList = self.$Get("tag_list");
			
			iris.event.Subscribe( dbato.event.TAGS_RELOADED, _GetAllTags );
			
			dbato.service.Tag.GetAll( _Inflate );
		};
		
		function _GetAllTags(){
			dbato.service.Tag.GetAll( _Inflate );
		}
		
		function _Inflate( p_tagList ){
			var f,F=p_tagList.length;
			
			_$TagList.html("");
			
			for(f=0;f<F;f++){
				
				self.InstanceUI(
					  _$TagList
					, dbato.Resource("ui/tag.js")
					, {
						 "label" : p_tagList[f].text
						,"count" : p_tagList[f].count
						,"onTagClick" : _SearchByTag
					  }
				);
				
				if( f >= self.Setting("max_tags")){
					break;
				}
			}
		}
		
		function _SearchByTag( p_text ){
			iris.Goto("#discussion#list?search=" + p_text);
		}
		
	}
);