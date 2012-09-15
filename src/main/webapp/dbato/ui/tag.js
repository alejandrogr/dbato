iris.UI(

	function(self) {

		var
			//TEMPLATE
			
			//VARS
			 _Text
			,_Count
		;
		
		self.Settings({
			 "label" : ""	//text
			,"onTagRemove" : null	//function
			,"onTagClick" : null	//function
			,"count" : null	//function
		});

		self.Create = function() {
			var tag = {};
			_Text = tag.label = self.Setting("label");
			_Count = tag.count = self.Setting("count");
			
			self.TemplateMode( self.TEMPLATE_APPEND);
			
			if( _Count ){
				tag.label = _Text + "( "+_Count+" )";
			}
			
			self.Template( dbato.Resource("ui/tag.html"), tag );
			
			_$ = self.$Get();
			
			if( self.Setting("onTagRemove") != null || self.Setting("onTagClick") != null ){
				_$.css("cursor" , "pointer" );
				_InflateEvents();
			}
		};
		
		function _InflateEvents(){
			if( self.Setting("onTagRemove") ){
				_$.on("click", _OnRemoveTag );
			} else if( self.Setting("onTagClick") ){
				_$.on("click", _OnClick );
			}  
		}
		
		function _OnRemoveTag( p_event ){
			p_event.preventDefault();
			
			self.Setting("onTagRemove")( _Text );
			
			_$.remove();
		}
		
		function _OnClick( p_event ){
			p_event.preventDefault();
			
			self.Setting("onTagClick")( _Text );
		}
		
	}
);