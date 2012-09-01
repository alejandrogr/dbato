iris.UI(

	function(self) {

		var
			//TEMPLATE
			_$
			,_$Pagination
			,_$TrItems
			,_Pages = []
			,_CurrentPage = 1
		;

		self.Settings({
			"numItems" : 10
		});
		
		self.Create = function() {
			self.TemplateMode( self.TEMPLATE_APPEND );
			self.Template( dbato.Resource("ui/pagination.html") );
			_$ = self.$Get();
			_$Pagination = self.$Get("pagination");
		};
		
		function _Paginate( p_items ){
			_$TrItems = $("TR", p_items);
		}
		
		function _AddPages( p_number ){
			var first = {"prev":true,"active" : false, "onGoto" : _OnGoto};
			var last = {"next":true, "active" : ((p_number == 1) ? false : true), "onGoto" : _OnGoto};
			var num = {"num":0, "active" : true, "onGoto" : _OnGoto};
			
			_Pages[_Pages.length] = self.InstanceUI(_$Pagination, dbato.Resource("ui/pagination_item.js"),first)
			
			for( f=0;f<p_number;f++){
				num.active = (f==0)?false:true;
				num.num = f;
				
				_Pages[_Pages.length] = self.InstanceUI(_$Pagination, dbato.Resource("ui/pagination_item.js"), num)
			}

			_Pages[_Pages.length] = self.InstanceUI(_$Pagination, dbato.Resource("ui/pagination_item.js"),last)
			
		}
		
		function _OnGoto( p_page ){
			if( p_page == "next"){
				p_page = _CurrentPage + 1;
			} else if( p_page == "prev"){
				p_page = _CurrentPage - 1;
			} 
			
			_CurrentPage = p_page;
			
			var num = self.Setting("numItems");
			var from = num * ( p_page - 1);
			var to = from + num;
			
			_$TrItems.each(function(p_i, p_el){
				if( p_i >= from && p_i < to ){
					$(p_el).show();
				} else {
					$(p_el).hide();
				}
			});
			
			var f,F=_Pages.length;
			for(f=0;f<F;f++){
				_Pages[f].Toggle( p_page, (p_page==_Pages.length-2)?true:false );
			}
		}
		
		function _Clear(){
			_Pages = [];
			_$Pagination.html("");
			_$TrItems = "";
			_CurrentPage = 1;
		}
		
		self.Paginate = _Paginate;
		self.AddPages = _AddPages;
		self.Clear = _Clear;
	}
);