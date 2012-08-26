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

import com.dbato.commons.Constant.ReplyType;
import com.dbato.commons.DiscussionVO;
import com.dbato.commons.ReplyVO;
import com.dbato.discussion.DiscussionDto;
import com.dbato.discussion.DiscussionManager;
import com.dbato.reply.ReplyDto;
import com.dbato.reply.ReplyManager;
import com.dbato.tag.TagManager;
import com.google.gson.Gson;

@Path("/discussion")
public class DiscussionService {

	@GET
	@Produces("application/json;charset=UTF-8")
	public Response GetAll() throws Exception {
		Gson response = new Gson();

		DiscussionManager discussionM = new DiscussionManager();
		List<DiscussionDto> discussionL = discussionM.FindAll();

		return Response.ok().entity(response.toJson(discussionL)).build();
	}

	@GET
	@Path("/{discussionId}")
	@Produces("application/json;charset=UTF-8")
	public Response GetDiscussion(
			@PathParam("discussionId") Long p_discussionId ) throws Exception {
		Gson response = new Gson();

		DiscussionManager discussionM = new DiscussionManager();
		DiscussionDto discussion = discussionM.Get(p_discussionId);
		
		ReplyManager replyM = new ReplyManager();
		List<ReplyVO> replyL = replyM.FindByDiscussion(discussion.GetId());
		
		DiscussionVO discusionVO = new DiscussionVO();
		discusionVO.SetDiscussion( discussion );
		discusionVO.SetReplies( replyL );
		
		return Response.ok().entity(response.toJson(discusionVO)).build();
	}

	@POST
	@Produces("application/json;charset=UTF-8")
	public Response Create(
			  @FormParam("t") String p_title
			, @FormParam("c") String p_text
			, @FormParam("ta") List<String> p_tags
			, @Context HttpServletRequest p_request) throws Exception {

		Gson response = new Gson();
		DiscussionManager discussionM = new DiscussionManager();

		TagManager tagM = new TagManager();
		for (int i = 0; i < p_tags.size(); i++) {
			tagM.AddUpdateTag(p_tags.get(i));
		}

		DiscussionDto discussion = new DiscussionDto();
		discussion.SetTitle(p_title);
		discussion.SetText(p_text);
		discussion.SetTags(p_tags);
		discussionM.Save(discussion);

		long sheetId = discussion.GetId();

		URI location = new URI("" + sheetId);
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
		ReplyManager replyM = new ReplyManager();

		ReplyDto reply = new ReplyDto();
		reply.SetText( p_text );
		reply.SetDiscussionKey( p_discussionKey );
		reply.SetReplyType( p_replyType );
		replyM.Save(reply);

		long replyId = reply.GetId();

		URI location = new URI("/reply/" + replyId);
		
		return Response.created(location).entity(response.toJson(reply)).build();
	}

}
