iris.Screen(
	function (self) {
	
		var 
			_TagSelector
			,_$Title
			,_$Text
		;
		
		self.Create = function () {
			self.Template(dbato.Resource("screen/discussion_create.html"));

			iris.Include(dbato.Resource("service/discussion.js"));
			self.$Get("create").on("click", _CreateDiscussion);
			
			_TagSelector = self.InstanceUI("tag_selector", dbato.Resource("ui/tag_selector.js"));
			
			_$Title = self.$Get("title");
			_$Text = self.$Get("desc");
			
			_$Text.wysihtml5();
			
			 dbato.service.Tag.GetAll( _TagSelector.Inflate );
		};

		function _CreateDiscussion( p_event ){
			p_event.preventDefault();
			dbato.service.Discussion.Create(
			      _$Title.val()
				, _$Text.val()
				, _TagSelector.Values()
				, function( p_json ){
					  _TagSelector.Clean();
					  dbato.RELOAD_DISCUSSIONS = true;
					  dbato.service.Tag.Load();
					  iris.Goto("#discussion#list");
					  dbato.alert.Alert("Discussion \""+_$Title.val()+"\" was succesful created", true);
					  _$Title.val("");
					  _$Text.data("wysihtml5").editor.clear();
				}
			);
		}
		
	}
);
