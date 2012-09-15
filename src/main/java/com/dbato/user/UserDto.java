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

	public Long GetId() {
		return userId;
	}

	public void SetId(Long p_id) {
		this.userId = p_id;
	}

	public void SetNick(String p_value) {
		nick = p_value;
	}

	public String GetNick() {
		return nick;
	}

	public void SetEmail(String p_value) {
		email = p_value;
	}

	public String GetEmail() {
		return email;
	}

	public void SetShowHiddenReplies(Boolean p_value) {
		showHiddenReplies = p_value;
	}

	public Boolean GetShowHiddenReplies() {
		return showHiddenReplies;
	}

	public void SetUseNick(Boolean p_value) {
		useNick = p_value;
	}

	public Boolean GetUseNick() {
		return useNick;
	}
}
