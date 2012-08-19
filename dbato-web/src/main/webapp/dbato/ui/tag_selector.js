iris.UI(
	function (self) {
		
		var 
			_Tags = []
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/tag.js"));
			self.Template(dbato.Resource("ui/tag_selector.html"));
			iris.event.Subscribe( dbato.EVENTS.TAG_UPDATED, _Inflate );
			
			_$TagText = self.$Get("tag_text");
			_$TagList = self.$Get("tag_list");
			
			self.$Get("add_tag").on("click", _AddTag);
		};
		
		self.Inflate = function( p_data ){
			if( p_data.length > 0 ){
				_$TagText.typeahead({"source":p_data});
			}
		};
		
		function _Inflate( p_data ){
			self.Inflate( p_data.tagList );
		}
		
		function _AddTag( p_event ){
			p_event.preventDefault();
			
			_Tags[_Tags.length] = _$TagText.val();
			
			_$TagList.append('<span class="label label-success">'+_$TagText.val()+'</span>');
			
			_$TagText.val("");
		}
		
		function _Values(){
			return _Tags;
		}
		
		function _Clean(){
			_$TagText.val("");
			_$TagList.html("");
			_Tags = [];
		}
		
		self.Values = _Values;
		self.Clean = _Clean;
	}
);
