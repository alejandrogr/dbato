package com.dbato.comments;

import com.igzcode.java.gae.pattern.AbstractFactory;
import com.googlecode.objectify.ObjectifyService;

public class CommentFactory extends AbstractFactory<CommentDto> {
	
	static {
		ObjectifyService.register(CommentDto.class);
	}
	
}
