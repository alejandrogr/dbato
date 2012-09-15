package com.dbato.reply;

import com.igzcode.java.gae.pattern.AbstractFactory;
import com.googlecode.objectify.ObjectifyService;

public class ReplyFactory extends AbstractFactory<ReplyDto> {
	
	static {
		ObjectifyService.register(ReplyDto.class);
	}
	
}
