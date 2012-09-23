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

	public Long getCommentId() {
		return commentId;
	}

	public void setCommentId(Long p_commentId) {
		commentId = p_commentId;
	}

	public Long getReplyKey() {
		return replyKey;
	}

	public void setReplyKey(Long p_replyKey) {
		replyKey = p_replyKey;
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

}
