iris.UI(

	function(self) {

		var
			//TEMPLATE
			
			//VARS
			_Text
		;
		
		self.Settings({
			 "label" : ""	//text
			,"onTagRemove" : null	//function
			,"canRemove" : true
		});

		self.Create = function() {
			var tag = {};
			_Text = tag.label = self.Setting("label");
			
			self.TemplateMode( self.TEMPLATE_APPEND);  
			self.Template( dbato.Resource("ui/tag.html"), tag );
			
			_$ = self.$Get();
			
			if( self.Setting("canRemove") == true){
				_$.css("cursor" , "pointer" );
				_InflateEvents();
			}
		};
		
		function _InflateEvents(){
			_$.on("click", _OnRemoveTag );
		}
		
		function _OnRemoveTag( p_event ){
			p_event.preventDefault();
			
			if( self.Setting("onTagRemove") ){
				self.Setting("onTagRemove")( _Text );
			}
			
			_$.remove();
		}
		
	}
);