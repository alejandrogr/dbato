iris.UI(
	function (self) {
		
		var
			 _$Replies
			,_$ShowMoreReplies
			,_DiscussionKey
			,_TotalReplies
			,_CurrentReplies
			,_RepliesToShow
			,_HiddenReplies
			,_JustNevagiteRepliesLeft = false
		;
	
		self.Settings({
			"replyType" : null //pro, against or new
		});
		
		self.Create = function () {
			self.Template(dbato.Resource("ui/reply_list.html"));
			
			_$HiddenRepliesMsg = self.$Get("hidden_replies_msg").hide();
			_$HiddenRepliesNumber = self.$Get("hidden_replies_num");
			_$ShowMoreReplies = self.$Get("show_more_replies").hide();
			
			
			
			_InflateEvents();
		};
	
		function _InflateEvents(){
			_$HiddenRepliesMsg.on("click", _ShowMoreReplies);
			_$ShowMoreReplies.on("click", _ShowMoreReplies);
		}
		
		function _Inflate( p_json ){
			self.$Get().addClass( self.Setting("replyType"));
			
			_RepliesToShow = 5; 
			_CurrentReplies = 0;
			_HiddenReplies = 0;
			_JustNevagiteRepliesLeft = false;
			
			_$HiddenRepliesMsg.hide();
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
			iris.D( self.Setting("replyType"), repliesToShow);
			_TotalReplies = repliesToShow.length;
			_InflateReplies( repliesToShow );
		}
		
		function _InflateReplies( p_replies ){
			var reply;
			var f,F = _TotalReplies;
			var curRep = _CurrentReplies;
			
			for(f=curRep;f<F;f++){
				reply = p_replies[f].reply;
				
				if( dbato.USER == null || ( dbato.USER != null && dbato.USER.SHOW_HIDDEN_REPLIES == false) ){
					if ( reply.votes < -10 && !_JustNevagiteRepliesLeft){
						_JustNevagiteRepliesLeft = true;
						_$HiddenRepliesMsg.show();
						_$HiddenRepliesNumber.html( _HiddenReplies );
						_RepliesToShow = _CurrentReplies;
						break;
					}
				}
				var replyUI = self.InstanceUI( "replies", dbato.Resource("ui/reply.js"));
				replyUI.Inflate( p_replies[f] );
				
				_CurrentReplies = f + 1;
				
				if( f >= _RepliesToShow - 1 ) break;
			}
			
			_HiddenReplies = _TotalReplies - _CurrentReplies;
			
			if( _HiddenReplies > 0 ){
				if( _JustNevagiteRepliesLeft ){
					_$HiddenRepliesMsg.show();
					_$HiddenRepliesNumber.html( _HiddenReplies );
					_$ShowMoreReplies.hide();
				} else {
					_$ShowMoreReplies.show();	
				}
			} else {
				_$ShowMoreReplies.hide();
				_$HiddenRepliesMsg.hide();
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
