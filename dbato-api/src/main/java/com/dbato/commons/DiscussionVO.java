/**
 * 
 */
package com.dbato.commons;

import java.util.List;

import com.dbato.discussion.DiscussionDto;
import com.dbato.reply.ReplyDto;




public class DiscussionVO {
	
	private DiscussionDto discussion;
	private List<ReplyDto> replies;
	
	public void SetDiscussion( DiscussionDto p_discussion ){
		discussion = p_discussion;
	}
	
	public void SetReplies( List<ReplyDto> p_replies ){
		replies = p_replies;
	}
}