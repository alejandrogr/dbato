iris.UI(

	function(self) {

		var
			//TEMPLATE
			 _$
			,_$Number
			,_Num
		;
		
		self.Settings({
			 "prev" : false
			,"next" : false
			,"num" : null
			,"active" : true
			,"onGoto" : null
		});
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND );
			self.Template( dbato.Resource("ui/pagination_item.html") );
			_$ = self.$Get();
			_$Number = self.$Get("number");
			
			if( self.Setting("prev") == true ){
				_$Number.html("<<");
			} else if( self.Setting("next") == true ){
				_$Number.html(">>");
			} else {
				_Num = self.Setting("num") + 1;
				_$Number.html( _Num );
			}
			
			if( self.Setting("active") == false ){
				_$.addClass("disabled");
			}
			
			_InflateEvents();
		};
		
		function _InflateEvents(){
			_$Number.on("click", _GotoPage );
		}
		
		function _GotoPage( p_event ){
			p_event.preventDefault();
			
			if( self.Setting("active") == true ){
				if( self.Setting("prev") == true ){
					self.Setting("onGoto")("prev");
				} else if( self.Setting("next") == true ){
					self.Setting("onGoto")("next");
				} else {
					self.Setting("onGoto")(_Num);
				}
			}
		}
		
		function _Toggle( p_page, p_last ){

			self.Setting("active", true);
			_$.removeClass("disabled");
			
			if( _Num == p_page ){
				_$.addClass("disabled");
				self.Setting("active", false);
			}
			if( self.Setting("prev") == true && p_page == 1){
				_$.addClass("disabled");
				self.Setting("active", false);
			}
			if( self.Setting("next") == true && p_last == true){
				_$.addClass("disabled");
				self.Setting("active", false);
			}
		}
		
		self.Toggle = _Toggle;
	}
);