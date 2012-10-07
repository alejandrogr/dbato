package com.dbato.reply;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.PrePersist;

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

	private List<Long> votesUserKeys; //array with users who already vote this reply

	private Integer numComments;

	private Date creationDate;
	private Date updateDate;

	@PrePersist
	private void _SetCreatedAndUpdated () {
		if ( this.replyId == null && this.creationDate == null ) {
			this.creationDate = new Date();
		}
		this.updateDate = new Date();
	}

	public ReplyDto() {
		super();

		this.votesUserKeys = new ArrayList<Long>();
		this.votes = 0;
		this.numComments = 0;
	}

	public List<Long> getVotesUserKeys() {
		return this.votesUserKeys;
	}

	public void setVotesUserKeys(List<Long> p_votesUserKeys) {
		this.votesUserKeys = p_votesUserKeys;
	}

	public Date getCreationDate(){
		return this.creationDate;
	}

	public void setCreationDate( Date p_creationDate ){
		this.creationDate = p_creationDate;
	}

	public Long getReplyId() {
		return this.replyId;
	}

	public void setReplyId(Long p_replyId) {
		this.replyId = p_replyId;
	}

	public Long getDiscussionKey() {
		return this.discussionKey;
	}

	public void setDiscussionKey(Long p_discussionKey) {
		this.discussionKey = p_discussionKey;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String p_text) {
		this.text = p_text;
	}

	public ReplyType getReplyType() {
		return this.replyType;
	}

	public void setReplyType(ReplyType p_replyType) {
		this.replyType = p_replyType;
	}

	public String getOwner() {
		return this.owner;
	}

	public void setOwner(String p_owner) {
		this.owner = p_owner;
	}

	public Long getOwnerId() {
		return this.ownerId;
	}

	public void setOwnerId(Long p_ownerId) {
		this.ownerId = p_ownerId;
	}

	public Integer getVotes() {
		return this.votes;
	}

	public void setVotes(Integer p_votes) {
		this.votes = p_votes;
	}

	public Integer getNumComments() {
		return this.numComments;
	}

	public void setNumComments(Integer p_numComments) {
		this.numComments = p_numComments;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date p_updateDate) {
		this.updateDate = p_updateDate;
	}

	public void addVoteUser( Long p_userKey ) {
		this.votesUserKeys.add(p_userKey);
	}


}
