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
	}
	
	public void SetTags( List<String> p_tags){
		this.tags = p_tags;
	}
	
	public List<String> GetTags(){
		return this.tags;
	}

	public Long GetId() {
		return discussionId;
	}

	public void SetId(Long p_id) {
		this.discussionId = p_id;
	}

	public Date GetLastReplyDate() {
		return lastReplyDate;
	}

	public void SetLastReplyDate(Date p_lastReplyDate) {
		this.lastReplyDate = p_lastReplyDate;
	}

	public Long GetOwnerId() {
		return ownerId;
	}

	public void SetOwnerId(Long p_id) {
		this.ownerId = p_id;
	}

	public Integer GetNumReplies() {
		return numReplies;
	}

	public void SetNumReplies(Integer p_num) {
		this.numReplies = p_num;
	}

	public void SetText( String p_value ) {
		text = p_value;
	}
	
	public String GetText() {
		return text;
	}

	public void SetTitle( String p_value ) {
		title = p_value;
	}
	
	public String GetTitle() {
		return title;
	}

	public void SetOwner( String p_owner ) {
		owner = p_owner;
	}
	
	public String GetOwner() {
		return owner;
	}

}
