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
	}
	
	public Long GetId() {
		return replyId;
	}

	public void SetId(Long p_id) {
		this.replyId = p_id;
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

	public ReplyType GetReply() {
		return replyType;
	}

	public void SetReply(ReplyType p_reply) {
		this.replyType = p_reply;
	}

}
