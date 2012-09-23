package com.dbato.user;

import java.util.Date;

import javax.persistence.Id;
import javax.persistence.PrePersist;

import com.igzcode.java.gae.pattern.AbstractEntity;

public class UserDto extends AbstractEntity {

	@Id
	private Long userId;

	private String nick;

	private String email;
	
	private Boolean showHiddenReplies;
	
	private Boolean useNick; //use nick instead of email
	
	private Date creationDate;
	private Date updateDate;

	@PrePersist
	private void _SetCreatedAndUpdated() {
		if (userId == null) {
			creationDate = new Date();
		}
		updateDate = new Date();
	}

	public UserDto() {
		super();
		
		showHiddenReplies = false;
		useNick = false;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long p_userId) {
		userId = p_userId;
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String p_nick) {
		nick = p_nick;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String p_email) {
		email = p_email;
	}

	public Boolean getShowHiddenReplies() {
		return showHiddenReplies;
	}

	public void setShowHiddenReplies(Boolean p_showHiddenReplies) {
		showHiddenReplies = p_showHiddenReplies;
	}

	public Boolean getUseNick() {
		return useNick;
	}

	public void setUseNick(Boolean p_useNick) {
		useNick = p_useNick;
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
