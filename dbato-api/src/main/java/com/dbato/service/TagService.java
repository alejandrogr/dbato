package com.dbato.service;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.dbato.tag.TagDto;
import com.dbato.tag.TagManager;
import com.google.gson.Gson;

@Path("/tag")
public class TagService {

	@GET
	@Produces("application/json;charset=UTF-8")
	public Response GetAll() throws Exception {
		Gson response = new Gson();

		TagManager tagM = new TagManager();
		List<TagDto> tagL = tagM.FindAll();

		return Response.ok().entity(response.toJson( tagL )).build();
	}

}
