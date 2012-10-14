package com.dbato.service;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.dbato.channels.ChannelManager;
import com.dbato.comments.CommentDto;
import com.dbato.comments.CommentManager;
import com.dbato.commons.ReplyVO;
import com.dbato.reply.ReplyDto;
import com.dbato.reply.ReplyManager;
import com.google.gson.Gson;

@Path("/reply")
public class ReplyService {

	@PUT
	@Path("/vote")
	@Produces("application/json;charset=UTF-8")
	public Response Vote(
			@FormParam("v") Integer p_vote
			, @FormParam("ri") Long p_replyId
			, @Context HttpServletRequest p_request	) throws Exception {
		Gson response = new Gson();

		ReplyManager replyM = new ReplyManager();
		replyM.Vote( p_replyId, (Long)p_request.getAttribute("userId") );

		ReplyDto reply = replyM.Get( p_replyId );

		ChannelManager.sendMessageToAllClients("hello channel world!");

		return Response.ok().entity(response.toJson( reply )).build();
	}

	@GET
	@Path("/{replyId}")
	@Produces("application/json;charset=UTF-8")
	public Response GetDiscussion(
			@PathParam("replyId") Long p_replyId
			, @Context HttpServletRequest p_request ) throws Exception {
		Gson response = new Gson();

		ReplyManager replyM = new ReplyManager();
		CommentManager commentM = new CommentManager();
		ReplyDto reply = replyM.GetById(p_replyId);
		List<CommentDto> comments = new ArrayList<CommentDto>();

		if (reply.getNumComments() > 0) {
			comments = commentM.FindByReply(reply.getReplyId());
		}

		ReplyVO replyVo = replyM.getReplyVO( reply, comments, (Long)p_request.getAttribute("userId"));
		return Response.ok().entity(response.toJson(replyVo)).build();
	}

	@POST
	@Path("/comment")
	@Produces("application/json;charset=UTF-8")
	public Response CreateReply(
			@FormParam("t") String p_text
			, @FormParam("rk") Long p_replyKey
			, @Context HttpServletRequest p_request) throws Exception {

		Gson response = new Gson();
		CommentManager commentM = new CommentManager();
		ReplyManager replyM = new ReplyManager();

		ReplyDto reply = new ReplyDto();
		reply = replyM.Get( p_replyKey );
		reply.setNumComments( reply.getNumComments() + 1 );
		replyM.Save(reply);

		CommentDto comment = new CommentDto();
		comment.setText( p_text );
		comment.setReplyKey( p_replyKey );
		commentM.Save(comment);

		long commentId = comment.getCommentId();

		URI location = new URI("/comment/" + commentId);

		return Response.created(location).entity(response.toJson(comment)).build();
	}


}
