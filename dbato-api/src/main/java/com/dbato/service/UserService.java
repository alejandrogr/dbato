package com.dbato.service;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.dbato.user.UserDto;
import com.dbato.user.UserManager;
import com.google.gson.Gson;

@Path("/user")
public class UserService {

	@PUT
	@Produces("application/json;charset=UTF-8")
	public Response UpdateProfile(
			  @FormParam("n") String p_nick
			, @FormParam("sh") Boolean p_showHiddenReplies
			, @FormParam("un") Boolean p_useNick
			, @Context HttpServletRequest p_request) throws Exception {
		Gson response = new Gson();

		UserManager userM = new UserManager();
		UserDto user = userM.Get((Long)p_request.getAttribute("userId"));
		
		user.SetNick( p_nick );
		user.SetShowHiddenReplies( p_showHiddenReplies );
		user.SetUseNick( p_useNick );
		userM.Save( user );
		
		return Response.ok().entity(response.toJson(user)).build();
	}
	
}
