iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$
			//VARS
			,_Alerts = []
		;
		
		self.Create = function() {
			self.Template( dbato.Resource("ui/alert.html") );
			_$ = self.$Get();
		};
		
		function _ShowError( p_msg, p_autoDismiss ){
			_Show( p_msg, p_autoDismiss, "error" )
		}
		
		function _Show( p_msg, p_autoDismiss, p_type ){
			var msg = self.InstanceUI( _$, dbato.Resource("ui/alert_item.js"), {"onDismiss" : _AlertDismissed});

			var type = "";
			if( p_type != "undefined"){
				type = p_type;
			}
			
			_Alerts[_Alerts.length] = msg;
			msg.Inflate( p_msg, type );
			msg.Show( _Alerts.length, p_autoDismiss );
		}
		
		function _AlertDismissed( p_pos ){
			Alerts = _Alerts.splice(p_pos-1,1);
			var f,F=_Alerts.length;
			for(f=0;f<F;f++){
				_Alerts[f].Relocate( p_pos );
			}
		}
		
		self.Alert = _Show;
		self.AlertError = _ShowError;
	}
);