package com.dbato.service;

import java.net.URI;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.dbato.example.DiscussionDto;
import com.dbato.example.DiscussionManager;
import com.google.gson.Gson;

@Path("/discussion")
public class DiscussionService {
	
	 @GET
	 @Produces("application/json;charset=UTF-8")
	 public String GetAll() throws Exception {
		 Gson response = new Gson();
		 
		 DiscussionManager discussionM = new DiscussionManager();
		 List<DiscussionDto> discussionL = discussionM.FindAll();
		 
		 return response.toJson(discussionL);
	 }
	
	 @GET
	 @Path("/{discussionId}")
	 @Produces("application/json;charset=UTF-8")
	 public String GetDiscussion( @PathParam("discussionId") Long p_discussionId ) throws Exception {
		 Gson response = new Gson();
		 
		 DiscussionManager discussionM = new DiscussionManager();
		 DiscussionDto discussion = discussionM.Get(p_discussionId);
		 
		 return response.toJson(discussion);
	 }
	 
	 @POST
	 @Produces("application/json;charset=UTF-8")
	 public Response Create(
			 @FormParam("t") String p_title
			,@FormParam("c") String p_text
			,@Context HttpServletRequest p_request) throws Exception {
		 
		 Gson response = new Gson();
		 DiscussionManager discussionM = new DiscussionManager();
		 
		 DiscussionDto discussion = new DiscussionDto();
		 discussion.SetText( p_text );
		 discussion.SetTitle( p_text );
		 discussionM.Save( discussion );
		 
		 long sheetId = discussion.GetId();
		 
		 URI location = new URI(""+sheetId);
		 return Response.created(location).entity(response.toJson(discussion)).build();
	 }
	 
	 
}
