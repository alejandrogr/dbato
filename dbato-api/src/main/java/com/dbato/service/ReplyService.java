package com.dbato.service;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.dbato.reply.ReplyDto;
import com.dbato.reply.ReplyManager;
import com.google.gson.Gson;

@Path("/reply")
public class ReplyService {

	@PUT
	@Path("/vote")
	@Produces("application/json;charset=UTF-8")
	public Response GetAll(
		  @FormParam("v") Integer p_vote
	    , @FormParam("ri") Long p_replyId
		, @Context HttpServletRequest p_request	) throws Exception {
		Gson response = new Gson();

		System.out.println("REPLY VOTE");
		
		ReplyManager replyM = new ReplyManager();
		replyM.Vote( p_vote, p_replyId );

		ReplyDto reply = replyM.Get( p_replyId );
		
		return Response.ok().entity(response.toJson( reply )).build();
	}
		

}
