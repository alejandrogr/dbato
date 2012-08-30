package com.dbato.user;

import com.igzcode.java.gae.pattern.AbstractFactory;
import com.googlecode.objectify.ObjectifyService;

public class UserFactory extends AbstractFactory<UserDto> {
	
	static {
		ObjectifyService.register(UserDto.class);
	}
	
}
