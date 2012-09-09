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
			,_LoginUi
			,_$SelectPro
			,_$SelectNew
			,_$SelectAgainst
			,_$UnSelectAll
			,_NumColumns
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			
			self.Template(dbato.Resource("screen/discussion_view.html"));
			_$Meta = self.$Get("meta");
			
			_$SelectPro = self.$Get("select_pro");
			_$SelectNew = self.$Get("select_new");
			_$SelectAgainst = self.$Get("select_against");
			_$UnSelectAll = self.$Get("unselect_all");
			
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
			_$Text = self.$Get("text");
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
			_$Title.html( p_json.discussion.title );
			_$Text.html( p_json.discussion.text );
			_$Meta.html( "By " + p_json.discussion.owner + " on " + p_json.discussion.updateDate);
			
			_Replies = p_json.replies;

			_RepliesPro.Inflate( _Replies );
			_RepliesAgainst.Inflate( _Replies );
			_RepliesNew.Inflate( _Replies );
			
		}
		
		function _InflateEvents(){
			_$SelectPro.on("click", function(){
				_SelectColumn($(this), dbato.CONSTANTS.REPLY_PRO);
			});
			_$SelectNew.on("click", function(){
				_SelectColumn($(this), dbato.CONSTANTS.REPLY_NEW);
			});
			_$SelectAgainst.on("click", function(){
				_SelectColumn($(this), dbato.CONSTANTS.REPLY_AGAINST);
			});
			_$UnSelectAll.on("click", _UnselectAll);
		}
		
		function _SelectColumn( p_btn, p_type ){
			if ( p_btn.data("selected") === false ){
				_NumColumns ++;
				iris.event.Notify( dbato.EVENTS.REPLY_COLUMN_SELECTED, {"type": p_type, "num_columns" : _NumColumns} );
				p_btn.data("selected", true);
				iris.D("SELECTED", p_type);
			} else {
				_NumColumns --;
				iris.event.Notify( dbato.EVENTS.REPLY_COLUMN_UNSELECTED, {"type": p_type, "num_columns" : _NumColumns} );
				p_btn.data("selected", false);
				iris.D("UNSELECTED", p_type);
			}
		}

		function _UnselectAll(){
			_NumColumns = 3;
			iris.event.Notify( dbato.EVENTS.REPLY_COLUMN_SHOW, {"num_columns" : _NumColumns} );
		}
		
		
	}
);
