/**
 * 
 */
package com.dbato.commons;

import java.io.Serializable;
import java.util.List;

import com.dbato.comments.CommentDto;
import com.dbato.reply.ReplyDto;



public class ReplyVO implements Serializable{

	private static final long serialVersionUID = -3598903694519453636L;

	private ReplyDto reply;
	private List<CommentDto> comments;
	private Boolean userCanVote;

	public ReplyDto getReply() {
		return this.reply;
	}

	public void setReply(ReplyDto p_reply) {
		this.reply = p_reply;
	}

	public List<CommentDto> getComments() {
		return this.comments;
	}

	public void setComments(List<CommentDto> p_comments) {
		this.comments = p_comments;
	}

	public Boolean getUserCanVote() {
		return this.userCanVote;
	}

	public void setUserCanVote(Boolean p_userCanVote) {
		this.userCanVote = p_userCanVote;
	}


}