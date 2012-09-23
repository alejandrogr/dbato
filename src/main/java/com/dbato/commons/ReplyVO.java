/**
 * 
 */
package com.dbato.commons;

import java.util.List;

import com.dbato.comments.CommentDto;
import com.dbato.reply.ReplyDto;



public class ReplyVO {
	
	private ReplyDto reply;
	private List<CommentDto> comments;
	private Boolean userCanVote;
	
	public ReplyDto getReply() {
		return reply;
	}

	public void setReply(ReplyDto p_reply) {
		reply = p_reply;
	}

	public List<CommentDto> getComments() {
		return comments;
	}

	public void setComments(List<CommentDto> p_comments) {
		comments = p_comments;
	}

	public Boolean getUserCanVote() {
		return userCanVote;
	}

	public void setUserCanVote(Boolean p_userCanVote) {
		userCanVote = p_userCanVote;
	}
	
	
}