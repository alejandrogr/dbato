package com.dbato.commons;

import java.util.Date;

import com.dbato.commons.Constant.ReplyType;


public class VoteVO {
	
	private Long voteId;
	
	private Long replyKey;
	
	private Long userKey;
	
	private ReplyType replyType;
	
	private Date creationDate;

	public ReplyType getReplyType() {
		return replyType;
	}

	public void setReplyType(ReplyType p_replyType) {
		replyType = p_replyType;
	}

	public Long getVoteId() {
		return voteId;
	}

	public void setVoteId(Long p_voteId) {
		voteId = p_voteId;
	}

	public Long getReplyKey() {
		return replyKey;
	}

	public void setReplyKey(Long p_replyKey) {
		replyKey = p_replyKey;
	}

	public Long getUserKey() {
		return userKey;
	}

	public void setUserKey(Long p_userKey) {
		userKey = p_userKey;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date p_creationDate) {
		creationDate = p_creationDate;
	}
}
