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
			
			iris.Include("js/regula.min.js");
			regula.bind();
			
			self.$Get("create").on("click", _CreateDiscussion);
			self.$Get("clean").on("click", _Clean);
			
			_TagSelector = self.InstanceUI("tag_selector", dbato.Resource("ui/tag_selector.js"));
			
			_$Title = self.$Get("title");
			_$Text = self.$Get("desc");
			
			_$Text.wysihtml5();
			
			 dbato.service.Tag.GetAll( _TagSelector.Inflate );
		}
		
		self.Awake = function () {
			_Clean();
		}

		function _CreateDiscussion( p_event ){
			p_event.preventDefault();
			
			var validationResults = regula.validate(), errors="<ul>";
	        if ( validationResults.length == 0 ) {
	        	
	        	dbato.service.Discussion.Create(
	        			  _$Title.val()
	        			, _$Text.val()
	        			, _TagSelector.Values()
	        			, function( p_json ){
	        				dbato.service.Tag.Load();
	        				dbato.alert.Alert("Discussion \""+_$Title.val()+"\" was succesful created", true);
	        				iris.Goto("#discussion-mines");
	        			}
	        	);
	        	
	        } else {
	        	for(var i = 0; i < validationResults.length; i++) {
		        	errors += "<li>" + validationResults[i].message + "</li>";
		        }
		        dbato.alert.AlertError("You must resolve the following errors before create a new discussion:" + errors + "</ul>", true);
	        }
			
		}
		
		function _Clean () {
			_TagSelector.Clean();
			_$Title.val("");
			_$Text.data("wysihtml5").editor.clear();
		}
		
	}
);
