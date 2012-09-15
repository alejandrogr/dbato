package com.dbato.reply;

import java.util.Date;

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
	
	private Integer totalVotes;
	
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

		votes = 0;
		totalVotes = 0;
		numComments = 0;
	}
	
	public Date getCreationDate(){
		return creationDate;
	}
	
	public void setCreationDate( Date p_creationDate ){
		this.creationDate = p_creationDate;
	}
	
	public Long GetId() {
		return replyId;
	}

	public void SetId(Long p_id) {
		this.replyId = p_id;
	}

	public Long GetOwnerId() {
		return ownerId;
	}

	public void SetOwnerId(Long p_id) {
		this.ownerId = p_id;
	}
	
	public void SetNumComments( Integer p_numComments ){
		numComments = p_numComments;
	}
	
	public Integer GetNumComments(){
		return numComments;
	}
	
	public void SetVotes( Integer p_votes ){
		votes = p_votes;
	}
	
	public Integer GetVotes(){
		return votes;
	}
	
	public void SetTotalVotes( Integer p_totalVotes ){
		totalVotes = p_totalVotes;
	}
	
	public Integer GetTotalVotes(){
		return totalVotes;
	}
	
	public Long GetDiscussionKey() {
		return discussionKey;
	}

	public void SetDiscussionKey(Long p_id) {
		this.discussionKey = p_id;
	}

	public void SetText( String p_value ) {
		text = p_value;
	}
	
	public String GetText() {
		return text;
	}

	public ReplyType GetReplyType() {
		return replyType;
	}

	public void SetReplyType(ReplyType p_reply) {
		this.replyType = p_reply;
	}

	public void SetOwner( String p_owner ) {
		owner = p_owner;
	}
	
	public String GetOwner() {
		return owner;
	}

}
