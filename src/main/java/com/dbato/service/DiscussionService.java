package com.dbato.service;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
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

import com.dbato.comments.CommentDto;
import com.dbato.comments.CommentManager;
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
	@Path("/{discussionId}")
	@Produces("application/json;charset=UTF-8")
	public Response GetDiscussion(
			  @PathParam("discussionId") Long p_discussionId
			, @Context HttpServletRequest p_request ) throws Exception {
		Gson response = new Gson();

		DiscussionManager discussionM = new DiscussionManager();
		DiscussionDto discussion = discussionM.Get(p_discussionId);
		
		ReplyManager replyM = new ReplyManager();
		List<ReplyDto> replyL = replyM.FindByDiscussion(discussion.getDiscussionId());
		
		ReplyDto reply;
		List<CommentDto> comments;
		List<ReplyVO> repliesVo = new ArrayList<ReplyVO>();
		ReplyVO replyVo;
		CommentManager commentM = new CommentManager();
		for (int i = 0; i < replyL.size(); i++) {
			reply = replyL.get(i);
			comments = new ArrayList<CommentDto>();
			if (reply.getNumComments() > 0) {
				comments = commentM.FindByReply(reply.getReplyId());
			}
			replyVo = replyM.getReplyVO( reply, comments, (Long) p_request.getAttribute("userId") );
			repliesVo.add(replyVo);
		}
		
		DiscussionVO discusionVO = new DiscussionVO();
		discusionVO.SetDiscussion( discussion );
		discusionVO.SetReplies( repliesVo );
		
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
		discussion.setTitle(p_title);
		discussion.setText(p_text);
		discussion.setTags(p_tags);
		discussion.setOwner( (String) p_request.getAttribute("userDesc") );
		discussion.setOwnerId( (Long) p_request.getAttribute("userId") );
		discussionM.Save(discussion);

		long sheetId = discussion.getDiscussionId();

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
		DiscussionManager discussionM = new DiscussionManager();
		DiscussionDto discussion = new DiscussionDto();
		
		discussion = discussionM.Get( p_discussionKey );
		discussion.setNumReplies( discussion.getNumReplies() + 1 );
		discussion.setLastReplyDate( new Date() );
		discussionM.Save( discussion );

		ReplyDto reply = new ReplyDto();
		reply.setText( p_text );
		reply.setDiscussionKey( p_discussionKey );
		reply.setReplyType( p_replyType );
		reply.setOwner( (String) p_request.getAttribute("userDesc")  );
		reply.setOwnerId( (Long) p_request.getAttribute("userId") );
		replyM.Save(reply);

		long replyId = reply.getReplyId();

		URI location = new URI("/reply/" + replyId);
		
		return Response.created(location).entity(response.toJson(reply)).build();
	}

}
