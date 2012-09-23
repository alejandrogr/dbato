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
	
	public void updateCount(){
		count = count + 1;
	}

	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long p_tagId) {
		tagId = p_tagId;
	}

	public String getText() {
		return text;
	}

	public void setText(String p_text) {
		text = p_text;
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long p_count) {
		count = p_count;
	};
	
	

}
