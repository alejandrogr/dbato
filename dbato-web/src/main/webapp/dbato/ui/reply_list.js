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
			,_SelectColumnBtn
			,_HiddenReplies
			,_$
		;
	
		self.Settings({
			"replyType" : null //pro, against or new
		});
		
		self.Create = function () {
			self.Template(dbato.Resource("ui/reply_list.html"));
			
			_$ShowMoreReplies = self.$Get("show_more_replies").hide();
			_SelectColumnBtn = self.$Get("select_column");
			_$Replies = self.$Get("replies");
			
			_$ = self.$Get();
			
			_SetSelectColumnText();
			_InflateEvents();
		};
	
		function _InflateEvents(){
			_$ShowMoreReplies.on("click", _ShowMoreReplies);
			_SelectColumnBtn.on("click", _OnSelectColumn);
			iris.event.Subscribe( dbato.EVENTS.REPLY_COLUMN_SELECTED, _OnAnotherColumnSelected );
		}
		
		function _OnSelectColumn( p_event ){
			p_event.preventDefault();
			_SelectColumn();
		}
		
		function _OnAnotherColumnSelected( p_params ){
			if( p_params.type != self.Setting("replyType") ){
				_HideColumn();
			}
		}
		
		function _SetSelectColumnText(){
			if( self.Setting("replyType") == dbato.CONSTANTS.REPLY_PRO ){
				_SelectColumnBtn.html("Pro Replies");
				_SelectColumnBtn.addClass("btn-success");
			} else if( self.Setting("replyType") == dbato.CONSTANTS.REPLY_AGAINST ){
				_SelectColumnBtn.html("Against Replies");
				_SelectColumnBtn.addClass("btn-warning");
			} else if( self.Setting("replyType") == dbato.CONSTANTS.REPLY_NEW ){
				_SelectColumnBtn.html("New Replies");
				_SelectColumnBtn.addClass("btn-info");
			}
		}
		
		function _SetSelectColumnIcon(){
			_SelectColumnBtn.html('<i class="icon-search"></i');
		}
		
		function _HideColumn(){
			_$Replies.hide();
			_$ShowMoreReplies.hide();
			_SetSelectColumnIcon();
			_$.removeClass("span3").removeClass("span9").addClass("span1");
		}
		
		function _ShowColumn(){
			_$Replies.show();
			if( _HiddenReplies > 0 ){
				_$ShowMoreReplies.show();
			}
			_SetSelectColumnText();
			_$.removeClass("span1").removeClass("span9").addClass("span3");
		}
		
		function _SelectColumn(){
			_$Replies.show();
			if( _HiddenReplies > 0 ){
				_$ShowMoreReplies.show();
			}
			_SetSelectColumnText();
			_$.removeClass("span1").removeClass("span3").addClass("span9");
			iris.event.Notify( dbato.EVENTS.REPLY_COLUMN_SELECTED, {"type": self.Setting("replyType")} );
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
