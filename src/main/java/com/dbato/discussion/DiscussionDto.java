package com.dbato.discussion;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.PrePersist;

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

	private List<Long> votesUserAgainst;

	private List<Long> votesUserPro;

	private List<Long> repliesUserPro;

	private List<Long> repliesUserAgainst;

	private Date creationDate;
	private Date updateDate;
	private Date lastReplyDate;

	@PrePersist
	private void _SetCreatedAndUpdated () {
		if ( this.discussionId == null ) {
			this.creationDate = new Date();
		}
		this.updateDate = new Date();
	}

	public DiscussionDto() {
		super();

		this.numReplies = 0;
		this.votesUserPro = new ArrayList<Long>();
		this.votesUserAgainst = new ArrayList<Long>();
		this.repliesUserPro = new ArrayList<Long>();
		this.repliesUserAgainst = new ArrayList<Long>();
	}

	public void addRepliesUserPro(Long p_userKey){
		this.repliesUserPro.add(p_userKey);
	}

	public void addRepliesUserAgainst(Long p_userKey){
		this.repliesUserAgainst.add(p_userKey);
	}

	public List<Long> getRepliesUserPro() {
		return this.repliesUserPro;
	}

	public void setRepliesUserPro(List<Long> p_repliesUserPro) {
		this.repliesUserPro = p_repliesUserPro;
	}

	public List<Long> getRepliesUserAgainst() {
		return this.repliesUserAgainst;
	}

	public void setRepliesUserAgainst(List<Long> p_repliesUserAgainst) {
		this.repliesUserAgainst = p_repliesUserAgainst;
	}

	public List<Long> getVotesUserAgainst() {
		return this.votesUserAgainst;
	}

	public void setVotesUserAgainst(List<Long> p_votesUserAgainst) {
		this.votesUserAgainst = p_votesUserAgainst;
	}

	public List<Long> getVotesUserPro() {
		return this.votesUserPro;
	}

	public void setVotesUserPro(List<Long> p_votesUserPro) {
		this.votesUserPro = p_votesUserPro;
	}

	public void addVoteUserPro(Long p_userKey){
		this.votesUserPro.add(p_userKey);
	}

	public void addVoteUserAgainst(Long p_userKey){
		this.votesUserAgainst.add(p_userKey);
	}

	public Long getDiscussionId() {
		return this.discussionId;
	}

	public void setDiscussionId(Long p_discussionId) {
		this.discussionId = p_discussionId;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String p_title) {
		this.title = p_title;
	}

	public String getText() {
		return this.text;
	}

	public void setText(String p_text) {
		this.text = p_text;
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

	public List<String> getTags() {
		return this.tags;
	}

	public void setTags(List<String> p_tags) {
		this.tags = p_tags;
	}

	public Integer getNumReplies() {
		return this.numReplies;
	}

	public void setNumReplies(Integer p_numReplies) {
		this.numReplies = p_numReplies;
	}

	public Date getCreationDate() {
		return this.creationDate;
	}

	public void setCreationDate(Date p_creationDate) {
		this.creationDate = p_creationDate;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date p_updateDate) {
		this.updateDate = p_updateDate;
	}

	public Date getLastReplyDate() {
		return this.lastReplyDate;
	}

	public void setLastReplyDate(Date p_lastReplyDate) {
		this.lastReplyDate = p_lastReplyDate;
	}



}
