package com.dbato.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.dbato.commons.Constant.ReplyType;
import com.dbato.discussion.DiscussionDto;
import com.dbato.discussion.DiscussionManager;
import com.dbato.reply.ReplyDto;
import com.dbato.reply.ReplyManager;
import com.dbato.tag.TagDto;
import com.dbato.tag.TagManager;
import com.google.gson.Gson;

@Path("/test")
public class TestService {

	@GET
	@Produces("application/json;charset=UTF-8")
	public Response FillDB() throws Exception {
		
		DiscussionManager discussionM = new DiscussionManager();
		TagManager tagM = new TagManager();
		ReplyManager replyM = new ReplyManager();
		
		DiscussionDto discussionDto;
		ReplyDto replyDto;
		
		int numDiscussions = 10;
		int numReplies, totalVotes, votes;
		ReplyType replyType = ReplyType.AGAINST;
		List<String> tagL = new ArrayList<String>();
		
		tagL.add("politica");
		tagL.add("tecnología");
		tagL.add("deportes");
		
		for (int i = 0; i < tagL.size(); i++) {
			tagM.AddUpdateTag(tagL.get(i));
		}
		
		for( int i = 0; i<numDiscussions; i ++){
			discussionDto = new DiscussionDto();
			
			discussionDto.SetTitle("Tittle " + i);
			discussionDto.SetText("Discussion " + i + " text.");
			discussionDto.SetTags( tagL );
			discussionM.Save( discussionDto );
		
			numReplies = (int) ( Math.random() * 10);
			for( int r = 0; r<numReplies; r++){

				totalVotes = (int) ( Math.random() * 10);
				votes = (int) ( Math.random() * 30) * ( ( Math.random() > 0.5) ? 1 : -1);
				
				double re = Math.random();
				if ( re < 0.3){
					replyType = ReplyType.PRO;
				} else if( re >= 0.3 && re <= 0.6 ){
					replyType = ReplyType.NEUTRAL;
				} else if( re > 0.6 ){
					replyType = ReplyType.AGAINST;
				}
				
				replyDto = new ReplyDto();
				replyDto.SetDiscussionKey( discussionDto.GetId() );
				replyDto.SetReplyType( replyType );
				replyDto.SetText("Reply text " + r);
				replyDto.SetTotalVotes( totalVotes );
				replyDto.SetVotes( votes );
				replyM.Save( replyDto );
			}
		}
		
		return Response.ok().entity("{\"OK\":\"OK\"}").build();
	}
}
