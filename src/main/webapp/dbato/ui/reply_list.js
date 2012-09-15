iris.UI(
	function (self) {
		
		var
			 _$Replies
			,_$ShowMoreReplies
			,_DiscussionKey
			,_TotalReplies
			,_CurrentReplies
			,_RepliesToShow
			,_JustNevagiteRepliesLeft = false
			,_ColumnTitle
			,_HiddenReplies
			,_$
		;
	
		self.Settings({
			"replyType" : null //pro, against or new
		});
		
		self.Create = function () {
			self.Template(dbato.Resource("ui/reply_list.html"));
			
			_$ShowMoreReplies = self.$Get("show_more_replies").hide();
			_ColumnTitle = self.$Get("column_title");
			_$Replies = self.$Get("replies");
			
			_$ = self.$Get();
			
			_SetSelectColumnText();
			_InflateEvents();
		};
	
		function _InflateEvents(){
			_$ShowMoreReplies.on("click", _ShowMoreReplies);
			iris.event.Subscribe( dbato.EVENTS.REPLY_COLUMN_SELECTED, _ColumnSelected );
			iris.event.Subscribe( dbato.EVENTS.REPLY_COLUMN_UNSELECTED, _ColumnUnselected );
			iris.event.Subscribe( dbato.EVENTS.REPLY_COLUMN_SHOW, _ShowColumn );
		}
		
		function _ColumnSelected( p_params ){
			if( p_params.type == self.Setting("replyType") ){
				_Adjust(p_params.num_columns);
				_$.show();
			} else {
				_Adjust(p_params.num_columns);
			}
		}
		
		function _ShowColumn( p_params ){
			_Adjust(p_params.num_columns);
			_$.show();
		}
		
		function _SetSelectColumnText(){
			if( self.Setting("replyType") == dbato.CONSTANTS.REPLY_PRO ){
				_ColumnTitle.html("Pro Replies");
			} else if( self.Setting("replyType") == dbato.CONSTANTS.REPLY_AGAINST ){
				_ColumnTitle.html("Against Replies");
			} else if( self.Setting("replyType") == dbato.CONSTANTS.REPLY_NEW ){
				_ColumnTitle.html("New Replies");
			}
		}
		
		function _HideColumn(){
			_$.hide();
		}
		
		function _ColumnUnselected( p_params ){
			if( p_params.type == self.Setting("replyType") ){
				_$.hide();
			} else {
				_Adjust(p_params.num_columns);
			}
		}
		
		function _Adjust( p_ncols ){
			if( p_ncols == 1 ){
				_$.removeClass("span3").removeClass("span5").addClass("span9");
			} else if( p_ncols == 2 ){
				_$.removeClass("span3").removeClass("span9").addClass("span5");
			} else if( p_ncols == 3 ){
				_$.removeClass("span5").removeClass("span9").addClass("span3");
			}
		}
		
		function _Inflate( p_json ){
			self.$Get().addClass( self.Setting("replyType"));
			
			_RepliesToShow = 5; 
			_CurrentReplies = 0;
			_JustNevagiteRepliesLeft = false;
			
			_$ShowMoreReplies.hide();
			
			var repliesToShow = [];
			var replyDate; 
			var today = new Date();
			var yesterday = new Date();
			yesterday.setDate( yesterday.getDate() -1 ); 
			var f,F = p_json.length;
			for(f=0;f<F;f++){
				reply = p_json[f].reply;
				replyDate = new Date(reply.creationDate);
				
				if( replyDate > yesterday){
					if( dbato.CONSTANTS.REPLY_NEW == self.Setting("replyType") ){
						repliesToShow[repliesToShow.length] = p_json[f];
					}
				} else if( reply.replyType == self.Setting("replyType") ){
					repliesToShow[repliesToShow.length] = p_json[f];
				}
			}
			iris.D(repliesToShow);
			_TotalReplies = repliesToShow.length;
			_InflateReplies( repliesToShow );
		}
		
		function _InflateReplies( p_replies ){
			var reply;
			var f,F = _TotalReplies;
			var curRep = _CurrentReplies;
			
			for(f=curRep;f<F;f++){
				reply = p_replies[f].reply;

				var replyUI = self.InstanceUI( "replies", dbato.Resource("ui/reply.js"));
				replyUI.Inflate( p_replies[f] );
				
				_CurrentReplies = f + 1;
				if( f >= _RepliesToShow - 1 ) break;
			}
			
			_HiddenReplies = _TotalReplies - _CurrentReplies;
			
			if( _HiddenReplies > 0 ){
				_$ShowMoreReplies.show();	
			} else {
				_$ShowMoreReplies.hide();
			}
		}
		
		function _ShowMoreReplies(){
			_RepliesToShow = _RepliesToShow + 5;
			_InflateReplies( _Replies );
		}
		
		function _SetDiscusionKey( p_discusionKey ){
			_DiscussionKey = p_discusionKey;
		}
	
		self.SetDiscussionKey = _SetDiscusionKey;
		self.Inflate = _Inflate;
	}
);
