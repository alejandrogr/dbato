package com.dbato.service;

import java.net.URI;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.dbato.DbatoManager;
import com.dbato.commons.Constant.ReplyType;
import com.dbato.commons.DiscussionVO;
import com.dbato.discussion.DiscussionDto;
import com.dbato.discussion.DiscussionManager;
import com.dbato.reply.ReplyDto;
import com.google.gson.Gson;

@Path("/discussion")
public class DiscussionService {

	protected static final Logger logger = Logger.getLogger(DiscussionService.class.getName());

	@GET
	@Produces("application/json;charset=UTF-8")
	public Response GetAll() throws Exception {
		Gson response = new Gson();

		DiscussionManager discussionM = new DiscussionManager();
		List<DiscussionDto> discussionL = discussionM.FindAll();

		return Response.ok().entity(response.toJson(discussionL)).build();
	}

	@GET
	@Path("/search/{queryString}")
	@Produces("application/json;charset=UTF-8")
	public Response FindDiscussions(
			@PathParam("queryString") String p_queryString ) throws Exception {
		Gson response = new Gson();

		DiscussionManager discussionM = new DiscussionManager();
		List<DiscussionDto> discussionL = discussionM.Find( p_queryString );

		return Response.ok().entity(response.toJson(discussionL)).build();
	}

	@GET
	@Path("/mines")
	@Produces("application/json;charset=UTF-8")
	public Response GetMines( @Context HttpServletRequest p_request ) throws Exception {
		Gson response = new Gson();
		Long userId = (Long) p_request.getAttribute("userId");

		logger.info(userId+" < userId");

		DiscussionManager discussionM = new DiscussionManager();
		List<DiscussionDto> discussionL = discussionM.FindByUserKey( userId );

		return Response.ok().entity(response.toJson(discussionL)).build();
	}


	@GET
	@Path("/{discussionId}")
	@Produces("application/json;charset=UTF-8")
	public Response GetDiscussion(
			@PathParam("discussionId") Long p_discussionId
			, @Context HttpServletRequest p_request ) throws Exception {
		Gson response = new Gson();

		Long userId = (Long) p_request.getAttribute("userId");

		DbatoManager dbatoM = new DbatoManager();
		DiscussionVO discussion = dbatoM.getDiscussionVO(p_discussionId, userId);

		return Response.ok().entity(response.toJson(discussion)).build();
	}

	@POST
	@Produces("application/json;charset=UTF-8")
	public Response Create(
			@FormParam("t") String p_title
			, @FormParam("c") String p_text
			, @FormParam("ta") List<String> p_tags
			, @Context HttpServletRequest p_request) throws Exception {

		Gson response = new Gson();

		String userDesc = (String) p_request.getAttribute("userDesc");
		Long userId = (Long) p_request.getAttribute("userId");

		DbatoManager dbatoM = new DbatoManager();
		DiscussionDto discussion = dbatoM.createDiscussion(p_tags, p_title, p_text, userDesc, userId);

		URI location = new URI("" + discussion.getDiscussionId());
		return Response.created(location).entity(response.toJson(discussion)).build();
	}

	@POST
	@Path("/reply")
	@Produces("application/json;charset=UTF-8")
	public Response CreateReply(
			@FormParam("t") String p_text
			, @FormParam("dk") Long p_discussionKey
			, @FormParam("rt") ReplyType p_replyType
			, @Context HttpServletRequest p_request) throws Exception {

		Gson response = new Gson();


		String userDesc = (String) p_request.getAttribute("userDesc");
		Long userId = (Long) p_request.getAttribute("userId");

		DbatoManager dbatoM = new DbatoManager();
		ReplyDto reply = dbatoM.replyToDiscussion(p_discussionKey, p_text, p_replyType, userDesc, userId);

		URI location = new URI("/reply/" + reply.getReplyId());

		return Response.created(location).entity(response.toJson(reply)).build();
	}

}
