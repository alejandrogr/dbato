iris.Screen(
	function (self) {
	
		var
			 _$Title
			,_$Text
			,_Reply
			,_DiscussionKey
			,_RepliesPro
			,_RepliesAgainst
			,_RepliesNew
			,_$Meta
			,_$Replies
			,_$NoReplies
			,_LoginUi
			,_$SelectPro
			,_$SelectNew
			,_$SelectAgainst
			,_$UnSelectAll
			,_$VoteAdvices
			,_$AlreadyReplyed
			,_$AlreadyVoted
			,_$AlreadyVotedBtn
			,_NumColumns
			,_RepliesProArray = []
			,_RepliesNewArray = []
			,_RepliesAgainstArray = []
			,_$
			,_NumMaxColumns
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			
			self.Template(dbato.Resource("screen/discussion_view.html"));
			
			_$ = self.$Get();
			
			_$Meta = self.$Get("meta");
			
			_$SelectPro = self.$Get("select_pro");
			_$SelectNew = self.$Get("select_new");
			_$SelectAgainst = self.$Get("select_against");
			_$UnSelectAll = self.$Get("unselect_all");
			
			_$VoteAdvices = self.$Get("vote_advices");
			_$Replies = self.$Get("replies");
			_$NoReplies = self.$Get("no_replies");
			_$AlreadyVoted = self.$Get("already_voted");
			_$AlreadyVotedBtn = self.$Get("already_voted_btn");
			_$AlreadyReplyed = self.$Get("already_replyed");
			
			_$SelectPro.data("selected", true);
			_$SelectNew.data("selected", true);
			_$SelectAgainst.data("selected", true);
			
			_Reply = self.InstanceUI(
				  "post_reply"
				, dbato.Resource("ui/reply_form.js")
				, {"beforeReply" : _BeforeReply }
			);
			
			_RepliesPro = self.InstanceUI(
				  "replies_pro"
				, dbato.Resource("ui/reply_list.js")
				, {"replyType":dbato.CONSTANTS.REPLY_PRO}
			);
			
			_RepliesAgainst =  self.InstanceUI(
				  "replies_against"
				, dbato.Resource("ui/reply_list.js")
				, {"replyType":dbato.CONSTANTS.REPLY_AGAINST}
			);
			
			_RepliesNew =  self.InstanceUI(
				  "replies_new"
				, dbato.Resource("ui/reply_list.js")
				, {"replyType":dbato.CONSTANTS.REPLY_NEW}
			);
			
			_LoginUi = self.InstanceUI("login", dbato.Resource("ui/login.js"));

			if( dbato.USER != null ){
				_Reply.Show();
				_LoginUi.Hide();
			} else {
				_Reply.Hide();
				_LoginUi.Show();
			}
			
			_$Title = self.$Get("title");
			_$Text = self.$Get("d-text");
			_NumColumns = 3;
			
			_InflateEvents();
		};
		
		self.Awake = function( p_params ){
			_DiscussionKey = p_params.id;
			_Reply.SetDiscussionKey( _DiscussionKey );
			_RepliesPro.SetDiscussionKey( _DiscussionKey );
			_RepliesAgainst.SetDiscussionKey( _DiscussionKey );
			_RepliesNew.SetDiscussionKey( _DiscussionKey );

			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _BeforeReply(){
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _Inflate( p_json ){
			_EnableAllColumns();
			
			_$Title.html( p_json.discussion.title );
			_$Text.html( p_json.discussion.text );
			_$Meta.html( "By " + p_json.discussion.owner + " on " + p_json.discussion.updateDate);
			
			_Replies = p_json.replies;
			
			var canVotePro = p_json.userCanVotePro;
			var canVoteAgainst = p_json.userCanVoteAgainst;
			
			_ShowVotedLabel( canVotePro, canVoteAgainst );
			
			if(  p_json.userCanReply == false ){
				_Reply.Hide();
				_$AlreadyReplyed.show();
			} else {
				_Reply.Show();
				_$AlreadyReplyed.hide();
			}

			if( _Replies.length > 0 ){
				_GetRepliesForColumns( _Replies );
				_RepliesPro.Inflate( _RepliesProArray, canVotePro );
				_RepliesAgainst.Inflate( _RepliesAgainstArray, canVoteAgainst );
				_RepliesNew.Inflate( _RepliesNewArray, false );
				
				iris.D("PRO", _RepliesProArray);
				iris.D("AGA", _RepliesAgainstArray);
				iris.D("NEW", _RepliesNewArray);
				
					
				if( _RepliesAgainstArray.length == 0 ){
					_NumColumns = _NumColumns - 1;
					_DisableAgainstColumn();
				}

				if( _RepliesProArray.length == 0 ){
					_NumColumns = _NumColumns - 1;
					_DisableProColumn();
				}

				if( _RepliesNewArray.length == 0 ){
					_NumColumns = _NumColumns - 1;
					_DisableNewColumn();
				}
				
				if( _NumColumns == 1 ){
					_$SelectPro.addClass("disabled");
					_$SelectAgainst.addClass("disabled");
					_$SelectNew.addClass("disabled");
					_$UnSelectAll.addClass("disabled");
				}
				
				_NumMaxColumns = _NumColumns;
				_RepliesNew.Adjust( _NumColumns );
				_RepliesPro.Adjust( _NumColumns );
				_RepliesAgainst.Adjust( _NumColumns );
				
			} else {
				_NoRepliesFound();
			}
		}
		
		function _ShowVotedLabel(p_canVoteAgainst, p_canVotePro){
			if( p_canVoteAgainst && p_canVotePro ){
				_$VoteAdvices.show();
				_$AlreadyVoted.hide();
			} else {
				_$VoteAdvices.hide();
				_$AlreadyVoted.show();
				if( p_canVoteAgainst ){
					_$AlreadyVotedBtn.removeClass("btn-success");
					_$AlreadyVotedBtn.addClass("btn-warning");
				} else if( p_canVotePro ){
					_$AlreadyVotedBtn.removeClass("btn-warning");
					_$AlreadyVotedBtn.addClass("btn-success");
				}
			}
		}
		
		function _EnableAllColumns(){
			_$SelectPro.removeClass("disabled");
			_$SelectAgainst.removeClass("disabled");
			_$SelectNew.removeClass("disabled");
			_$UnSelectAll.removeClass("disabled");
			
			_RepliesPro.Show();
			_RepliesNew.Show();
			_RepliesAgainst.Show();
			
			_NumColumns = 3;
			_NumMaxColumns = 3;
		}
		
		function _DisableProColumn(){
			_$SelectPro.addClass("disabled");
			_RepliesPro.Hide();
		}
		
		function _DisableNewColumn(){
			_$SelectNew.addClass("disabled");
			_RepliesNew.Hide();
		}
		
		function _DisableAgainstColumn(){
			_$SelectAgainst.addClass("disabled");
			_RepliesAgainst.Hide();
		}
		
		function _GetRepliesForColumns( p_replies ){
			var replyDate; 
			var today = new Date();
			var yesterday = new Date();
			yesterday.setDate( yesterday.getDate() -1 ); 
			
			_RepliesNewArray = [];
			_RepliesAgainstArray = [];
			_RepliesProArray = [];
			
			var f,F = p_replies.length;
			for(f=0;f<F;f++){
				reply = p_replies[f].reply;
				replyDate = new Date(reply.creationDate);
				
				if( replyDate > yesterday){
					_RepliesNewArray[_RepliesNewArray.length] = p_replies[f];
				} else if( reply.replyType == dbato.CONSTANTS.REPLY_PRO ){
					_RepliesProArray[_RepliesProArray.length] = p_replies[f];
				} else if( reply.replyType == dbato.CONSTANTS.REPLY_AGAINST ){
					_RepliesAgainstArray[_RepliesAgainstArray.length] = p_replies[f];
				}
			}
		}
		
		function _NoRepliesFound(){
			_$Replies.hide();
			_$NoReplies.show();
		}
		
		function _InflateEvents(){
			_$SelectPro.on("click", function(){
				if( $(this).hasClass("disabled")) return;
				_SelectColumn($(this), dbato.CONSTANTS.REPLY_PRO);
			});
			_$SelectNew.on("click", function(){
				if( $(this).hasClass("disabled")) return;
				_SelectColumn($(this), dbato.CONSTANTS.REPLY_NEW);
			});
			_$SelectAgainst.on("click", function(){
				if( $(this).hasClass("disabled")) return;
				_SelectColumn($(this), dbato.CONSTANTS.REPLY_AGAINST);
			});
			_$UnSelectAll.on("click", _UnselectAll);
			
			iris.event.Subscribe( dbato.EVENTS.VOTE_REPLY, _ReplyVoted );
		}
		
		function _ReplyVoted( p_params ){
			_$VoteAdvices.hide();
			iris.D(p_params);
			
			var canVoteAgainst = !( p_params.replyType == dbato.CONSTANTS.REPLY_PRO );
			var canVotePro = !canVoteAgainst;
			
			 _ShowVotedLabel(canVoteAgainst, canVotePro);
		}
		
		function _SelectColumn( p_btn, p_type ){
			
			if ( p_btn.data("selected") === false ){
				_NumColumns ++;
				iris.event.Notify( dbato.EVENTS.REPLY_COLUMN_SELECTED, {"type": p_type, "num_columns" : _NumColumns} );
				p_btn.data("selected", true);
			} else {
				if( _NumColumns == 1 ){
					p_btn.addClass("active");
					return; //do not hide the last column
				}
				_NumColumns --;
				iris.event.Notify( dbato.EVENTS.REPLY_COLUMN_UNSELECTED, {"type": p_type, "num_columns" : _NumColumns} );
				p_btn.data("selected", false);
			}
		}

		function _UnselectAll(){
			if( $(this).hasClass("disabled")) return;
			
			_NumColumns = _NumMaxColumns;
			
			_$SelectPro.removeClass("active");
			_$SelectNew.removeClass("active");
			_$SelectAgainst.removeClass("active");
			
			_$SelectPro.data("selected", true);
			_$SelectNew.data("selected", true);
			_$SelectAgainst.data("selected", true);

			iris.event.Notify( dbato.EVENTS.REPLY_COLUMN_SHOW, {"num_columns" : _NumColumns} );
		}
		
		
	}
);
