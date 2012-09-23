package com.dbato.discussion;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.PrePersist;

import com.dbato.commons.VoteVO;
import com.dbato.commons.Constant.ReplyType;
import com.igzcode.java.gae.pattern.AbstractEntity;
import com.igzcode.java.gae.tag.Searchable;


public class DiscussionDto extends AbstractEntity {
	
	@Id
	private Long discussionId;
	
	@Searchable
	private String title;

	@Searchable
	private String text;
	
	private String owner;

	private Long ownerId;
	
	private List<String> tags = new ArrayList<String>();
	
	private Integer numReplies;
	
	private List<VoteVO> votesUser; //users who voted in any reply, and what they vote
	
	private Date creationDate;
	private Date updateDate;
	private Date lastReplyDate;
	
	@PrePersist
	private void _SetCreatedAndUpdated () {
		if ( discussionId == null ) {
			creationDate = new Date();
		}
		updateDate = new Date();
	}
	
	public DiscussionDto() {
		super();
		
		numReplies = 0;
		votesUser = new ArrayList<VoteVO>();
	}

	public List<VoteVO> getVotesUser() {
		return votesUser;
	}

	public void setVotesUser(List<VoteVO> p_votesUser) {
		votesUser = p_votesUser;
	}
	
	public void addVoteUser(VoteVO p_vote){
		votesUser.add(p_vote);
	}

	public Long getDiscussionId() {
		return discussionId;
	}

	public void setDiscussionId(Long p_discussionId) {
		discussionId = p_discussionId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String p_title) {
		title = p_title;
	}

	public String getText() {
		return text;
	}

	public void setText(String p_text) {
		text = p_text;
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

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> p_tags) {
		tags = p_tags;
	}

	public Integer getNumReplies() {
		return numReplies;
	}

	public void setNumReplies(Integer p_numReplies) {
		numReplies = p_numReplies;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date p_creationDate) {
		creationDate = p_creationDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date p_updateDate) {
		updateDate = p_updateDate;
	}

	public Date getLastReplyDate() {
		return lastReplyDate;
	}

	public void setLastReplyDate(Date p_lastReplyDate) {
		lastReplyDate = p_lastReplyDate;
	}
	
	

}
