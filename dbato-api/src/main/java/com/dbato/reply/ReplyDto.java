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
	
	private Integer relevance;
	
	private Integer votes;
	
	private Integer totalVotes;
	
	private Date creationDate;
	private Date updateDate;
	
	@PrePersist
	private void _SetCreatedAndUpdated () {
		if ( replyId == null ) {
			creationDate = new Date();
		}
		updateDate = new Date();
	}
	
	public ReplyDto() {
		super();

		votes = 0;
		totalVotes = 0;
	}
	
	public Long GetId() {
		return replyId;
	}

	public void SetId(Long p_id) {
		this.replyId = p_id;
	}
	
	public void SetRelevance( Integer p_relevance ){
		relevance = p_relevance;
	}
	
	public Integer GetRelevance(){
		return relevance;
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

}
