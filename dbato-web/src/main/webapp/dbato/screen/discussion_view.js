iris.Screen(
	function (self) {
	
		var
			_$Title
			,_$Text
			,_Reply
			,_$Replies
			,_$BestPro
			,_$BestNeu
			,_$BestAga
			,_DiscussionId
		;
		
		self.Create = function () {
			iris.Include(dbato.Resource("service/discussion.js"));
			
			self.Template(dbato.Resource("screen/discussion_view.html"));
			
			_Reply = self.InstanceUI(
				  "post_reply"
				, dbato.Resource("ui/reply_form.js")
				, {"beforeReply" : _BeforeReply }
			);
			_$Replies = self.$Get("replies");
			_$Title = self.$Get("title");
			_$text = self.$Get("text");
			_$BestPro = self.$Get("best_pro");
			_$BestNeu = self.$Get("best_neutral");
			_$BestAga = self.$Get("best_aga");
			
		};
		
		self.Awake = function( p_params ){
			iris.D("AWAKE", p_params);
			_DiscussionKey = p_params.id;
			_Reply.SetDiscussionKey( _DiscussionKey );
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _BeforeReply(){
			dbato.service.Discussion.Get( _DiscussionKey, _Inflate );
		}
		
		function _Inflate( p_json ){
			_$Title.html( p_json.discussion.title );
			_$text.html( p_json.discussion.text );
			
			_$Replies.html("");
			_$BestPro.html("");
			_$BestNeu.html("");
			_$BestAga.html("");
			
			var bestPro, bestAgainst, bestNeutral = false;
			var container;
			
			var f,F = p_json.replies.length;
			for(f=0;f<F;f++){
				
				container = _$Replies;
				
				if( p_json.replies[f].replyType == "PRO" && !bestPro ){
					container = _$BestPro;
					bestPro = true;
				}
				if( p_json.replies[f].replyType == "AGAINST" && !bestAgainst ){
					container = _$BestAga;
					bestAgainst = true;
				}
				if( p_json.replies[f].replyType == "NEUTRAL" && !bestNeutral ){
					container = _$BestNeu;
					bestNeutral = true;
				}
				
				var reply = self.InstanceUI( container, dbato.Resource("ui/reply.js"));
				reply.Inflate( p_json.replies[f] );
			}
		}
		
	}
);
