iris.UI(
	function (self) {
	
		var 
			  _$Title
			, _$Id
		;
		
		self.Create = function () {
			self.TemplateMode( self.TEMPLATE_APPEND );
			self.Template(dbato.Resource("ui/discussion_list_item.html"));
			_$Id = self.$Get("id");
			_$Title = self.$Get("title");
		};
		
		self.Inflate = function( p_data ){
			_$Id.html( p_data["_DiscussionId"] );
			_$Title.html( p_data["_Text"] );
		};
		
	}
);
