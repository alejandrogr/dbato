package com.dbato.example;

import java.sql.Timestamp;

import com.igzcode.java.gae.pattern.AbstractEntity;
import com.igzcode.java.gae.tag.Searchable;

import javax.persistence.Id;


public class DiscussionDto extends AbstractEntity {
	
	@Id
	private Long _DiscussionId;
	
	@Searchable
	private String _Title;

	@Searchable
	private String _Text;
	
	
	public DiscussionDto() {
		super();
	}

	public Long GetId() {
		return _DiscussionId;
	}

	public void SetId(Long p_id) {
		this._DiscussionId = p_id;
	}

	public void SetText( String p_value ) {
		_Text = p_value;
	}
	
	public String GetText() {
		return _Text;
	}

	public void SetTitle( String p_value ) {
		_Title = p_value;
	}
	
	public String GetTitle() {
		return _Title;
	}

}
