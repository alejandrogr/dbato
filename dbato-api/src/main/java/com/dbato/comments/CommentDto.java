package com.dbato.comments;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.PrePersist;

import com.igzcode.java.gae.pattern.AbstractEntity;

public class CommentDto extends AbstractEntity {

	@Id
	private Long commentId;

	private Long replyKey;

	private String text;
	
	private String owner;

	private Date creationDate;
	private Date updateDate;

	@PrePersist
	private void _SetCreatedAndUpdated() {
		if (commentId == null) {
			creationDate = new Date();
		}
		updateDate = new Date();
	}

	public CommentDto() {
		super();
	}

	public Long GetId() {
		return commentId;
	}

	public void SetId(Long p_id) {
		this.commentId = p_id;
	}

	public Long GetReplyId() {
		return replyKey;
	}

	public void SetReplyId(Long p_id) {
		this.replyKey = p_id;
	}

	public void SetText(String p_value) {
		text = p_value;
	}

	public String GetText() {
		return text;
	}

	public void SetOwner( String p_owner ) {
		owner = p_owner;
	}
	
	public String GetOwner() {
		return owner;
	}

}
