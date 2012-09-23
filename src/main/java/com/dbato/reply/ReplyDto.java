package com.dbato.reply;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.PrePersist;

import com.dbato.commons.VoteVO;
import com.dbato.commons.Constant.ReplyType;
import com.igzcode.java.gae.pattern.AbstractEntity;


public class ReplyDto extends AbstractEntity {
	
	@Id
	private Long replyId;
	
	private Long discussionKey;
	
	private String text;
	
	private ReplyType replyType;

	private String owner;
	
	private Long ownerId;
	
	private Integer votes;
	
	private List<VoteVO> votesUser;
	
	private Integer numComments;
	
	private Date creationDate;
	private Date updateDate;
	
	@PrePersist
	private void _SetCreatedAndUpdated () {
		if ( replyId == null && creationDate == null ) {
			creationDate = new Date();
		}
		updateDate = new Date();
	}
	
	public ReplyDto() {
		super();

		votesUser = new ArrayList<VoteVO>();
		votes = 0;
		numComments = 0;
	}
	
	public Date getCreationDate(){
		return creationDate;
	}
	
	public void setCreationDate( Date p_creationDate ){
		this.creationDate = p_creationDate;
	}

	public Long getReplyId() {
		return replyId;
	}

	public void setReplyId(Long p_replyId) {
		replyId = p_replyId;
	}

	public Long getDiscussionKey() {
		return discussionKey;
	}

	public void setDiscussionKey(Long p_discussionKey) {
		discussionKey = p_discussionKey;
	}

	public String getText() {
		return text;
	}

	public void setText(String p_text) {
		text = p_text;
	}

	public ReplyType getReplyType() {
		return replyType;
	}

	public void setReplyType(ReplyType p_replyType) {
		replyType = p_replyType;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String p_owner) {
		owner = p_owner;
	}

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long p_ownerId) {
		ownerId = p_ownerId;
	}

	public Integer getVotes() {
		return votes;
	}

	public void setVotes(Integer p_votes) {
		votes = p_votes;
	}

	public List<VoteVO> getVotesUser() {
		return votesUser;
	}

	public void setVotesUser(List<VoteVO> p_votesUser) {
		votesUser = p_votesUser;
	}

	public Integer getNumComments() {
		return numComments;
	}

	public void setNumComments(Integer p_numComments) {
		numComments = p_numComments;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date p_updateDate) {
		updateDate = p_updateDate;
	}

	public void addVoteUser(VoteVO p_vote) {
		votesUser.add(p_vote);
	}


}
