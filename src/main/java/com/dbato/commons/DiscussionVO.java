/**
 * 
 */
package com.dbato.commons;

import java.util.List;

import com.dbato.discussion.DiscussionDto;




public class DiscussionVO {
	
	private DiscussionDto discussion;
	private List<ReplyVO> replies;
	
	public void SetDiscussion( DiscussionDto p_discussion ){
		discussion = p_discussion;
	}
	
	public void SetReplies( List<ReplyVO> p_replies ){
		replies = p_replies;
	}
}