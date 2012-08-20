iris.UI(
	function (self) {
	
		var 
			  _$Title
			, _$Id
			, _$
		;
		
		self.Create = function () {
			self.TemplateMode( self.TEMPLATE_APPEND );
			self.Template(dbato.Resource("ui/discussion_list_item.html"));
			_$Id = self.$Get("id");
			_$Title = self.$Get("title");
			_$Tags = self.$Get("tags");
			_$ = self.$Get();
			
			_$.on("click", _GotoDiscussion );
		};
		
		self.Inflate = function( p_data ){
			_$Id.html( p_data["discussionId"] );
			_$Title.html( p_data["title"] );
			_$.data("id", p_data["discussionId"]);
			_AddTags( p_data );
		};
		
		function _GotoDiscussion(){
			iris.Goto("#discussion#view?id=" + _$.data("id"));
		}
		
		function _AddTags( p_data ){
			var f,F=p_data.tags.length;
			for(f=0;f<F;f++){
				var tag = p_data.tags[f];
				_$Tags.append('<span class="label label-success">'+tag+'</span>');
			}
			
		}
		
	}
);
