package com.dbato.tag;

import com.igzcode.java.gae.pattern.AbstractFactory;
import com.googlecode.objectify.ObjectifyService;

public class TagFactory extends AbstractFactory<TagDto> {
	
	static {
		ObjectifyService.register(TagDto.class);
	}
	
}
