package com.dbato.example;

import com.igzcode.java.gae.pattern.AbstractFactory;
import com.googlecode.objectify.ObjectifyService;

public class DiscussionFactory extends AbstractFactory<DiscussionDto> {
	
	static {
		ObjectifyService.register(DiscussionDto.class);
	}
	
}
