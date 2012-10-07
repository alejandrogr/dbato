package com.dbato.user;

import java.util.List;

import com.dbato.exception.ParamsException;
import com.igzcode.java.util.collection.NameValueArray;

public class UserManager extends UserFactory {

	public UserDto Get ( long p_userId) {
		return this._Get(p_userId);
	}

	public UserDto GetByEmail ( String p_email) {
		NameValueArray filters = new NameValueArray();
		filters.Add("email =", p_email);
		List<UserDto> userL = this._FindByProperties(filters);
		UserDto user = null;
		if( userL.size() > 0 ){
			user = userL.get(0);
		}
		return user;
	}

	public void Save ( UserDto p_user ) throws ParamsException {
		if( p_user.getNick().equals("")){
			throw new ParamsException("Nick can't be empty");
		} else {
			this._Save( p_user );
		}
	}
	public void DeleteAll () {
		this._DeleteAll();
	}
}
