package com.dbato.tag;

import javax.persistence.Id;

import com.igzcode.java.gae.pattern.AbstractEntity;
import com.igzcode.java.gae.tag.Searchable;


public class TagDto extends AbstractEntity {
	
	@Id
	private Long tagId;
	
	@Searchable
	private String text;
	
	private Long count;
	
	public TagDto() {
		super();
	}
	
	public void UpdateCount(){
		count = count + 1;
	};
	
	public Long GetId() {
		return tagId;
	}

	public void SetId(Long p_id) {
		this.tagId = p_id;
	}

	public void SetText( String p_value ) {
		text = p_value;
	}
	
	public String GetText() {
		return text;
	}

	public void SetCount( Long p_value ) {
		count = p_value;
	}
	
	public Long GetCount() {
		return count;
	}

}
