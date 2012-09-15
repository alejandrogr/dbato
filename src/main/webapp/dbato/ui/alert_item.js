iris.UI(

	function(self) {

		var
			//TEMPLATE
			 _$Close
			,_$Msg
			,_$
			,_Pos
			,_AutoDismiss
		;
		
		self.Settings({
			"onDismiss" : null
		});
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND );
			self.Template( dbato.Resource("ui/alert_item.html") );

			_$Close = self.$Get("close");
			_$Msg = self.$Get("msg");
			_$ = self.$Get();
		};
		
		function _Inflate( p_msg, p_type ){
			_$Msg.html( p_msg );
			if( p_type != "" ){
				_$.addClass("alert-" + p_type);
			}
			
			if ( self.Setting("onDismiss") != null ){
				_$.on("closed", function(){
					iris.D("DISMISS" , _Pos);
					self.Setting("onDismiss")( _Pos );
				});
			}
		}
		
		function _Show( p_pos, p_autoDismiss ){
			_Pos = p_pos;
			
			if( p_autoDismiss == true ){
				setInterval(
					function(){
						_$.trigger("closed");
						_$.remove();
					}
					,4000
				);
			}
			
			var pos = p_pos * 40;
			_$.animate({top:pos+"px"});
		}
		
		function _Relocate( p_pos ){
			iris.D("RELOCATE" , p_pos, _Pos);
			
			if ( _Pos >= p_pos ){
				_Pos --;
				var pos = _Pos * 40;
				_$.animate({top:pos+"px"});
			}
		}
		
		self.Show = _Show;
		self.Inflate = _Inflate;
		self.Relocate = _Relocate;
	}
);