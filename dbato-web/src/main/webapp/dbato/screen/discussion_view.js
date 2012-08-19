iris.Screen(
	function (self) {
	
		var
			_$Title
			,_$Text
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			self.Template(dbato.Resource("screen/discussion_view.html"));
			
			_$Title = self.$Get("title");
			_$text = self.$Get("text");
		};
		
		self.Awake = function( p_params ){
			iris.D("AWAKE", p_params);
			dbato.service.Discussion.Get( p_params.id, _Inflate );
		}
		
		function _Inflate( p_json ){
			_$Title.html( p_json.title );
			_$text.html( p_json.text );
		}
		
	}
);
