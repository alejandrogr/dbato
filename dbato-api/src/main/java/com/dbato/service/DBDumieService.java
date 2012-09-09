package com.dbato.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.dbato.comments.CommentDto;
import com.dbato.comments.CommentManager;
import com.dbato.commons.Constant.ReplyType;
import com.dbato.discussion.DiscussionDto;
import com.dbato.discussion.DiscussionManager;
import com.dbato.reply.ReplyDto;
import com.dbato.reply.ReplyManager;
import com.dbato.tag.TagManager;
import com.dbato.user.UserDto;
import com.dbato.user.UserManager;

@Path("/DBDummie")
public class DBDumieService {

	@GET
	@Produces("application/json;charset=UTF-8")
	public Response FillDB() throws Exception {
		
		DiscussionManager discussionM = new DiscussionManager();
		UserManager userM = new UserManager();
		TagManager tagM = new TagManager();
		ReplyManager replyM = new ReplyManager();
		CommentManager commentM = new CommentManager();
		
		UserDto user = new UserDto();
		
		user.SetEmail("alejandrogr@gmail.com");
		user.SetNick("Ale");
		userM.Save( user );
		
		DiscussionDto discussionDto;
		ReplyDto replyDto;
		CommentDto commentDto;
		
		int numDiscussions = 30;
		int numReplies, totalVotes, votes, numComments;
		ReplyType replyType = ReplyType.AGAINST;
		List<String> tagL = new ArrayList<String>();
		List<String> tagL2 = new ArrayList<String>();
		List<String> tags;
		
		tagL.add("política");
		tagL.add("tecnología");
		tagL.add("deportes");

		tagL2.add("politica");
		tagL2.add("religión");
		
		double tagList,re;
		int changeDate;
		Date replyDate;
		
		for( int i = 0; i<numDiscussions; i ++){
			tagList = Math.random();
			
			if( tagList > 0.5 ){
				tags = tagL;
			} else {
				tags = tagL2;
			}

			for (int t = 0; t < tags.size(); t++) {
				tagM.AddUpdateTag(tags.get(t));
			}
			
			discussionDto = new DiscussionDto();
			
			discussionDto.SetTitle("Tittle " + i);
			discussionDto.SetText("Discussion " + i + " text.");
			discussionDto.SetTags( tags );
			discussionDto.SetOwner( user.GetEmail() );
			discussionDto.SetOwnerId( user.GetId() );
			discussionM.Save( discussionDto );
		
			numReplies = (int) ( Math.random() * 30);
			for( int r = 0; r<numReplies; r++){

				totalVotes = (int) ( Math.random() * 10);
				votes = (int) ( Math.random() * 30) * ( ( Math.random() > 0.5) ? 1 : -1);
				
				re = Math.random();
				if ( re < 0.3){
					replyType = ReplyType.PRO;
				} else if( re >= 0.3 && re <= 0.6 ){
					replyType = ReplyType.NEUTRAL;
				} else if( re > 0.6 ){
					replyType = ReplyType.AGAINST;
				}
				
				changeDate = (int) (Math.random() * 3);
				
				replyDto = new ReplyDto();
				replyDto.SetDiscussionKey( discussionDto.GetId() );
				replyDto.SetReplyType( replyType );
				replyDto.SetText("Reply text " + r);
				replyDto.SetTotalVotes( totalVotes );
				replyDto.SetVotes( votes );
				replyDto.SetOwner( user.GetEmail() );
				replyDto.SetOwnerId( user.GetId() );
				
				replyDate = new Date();
				Calendar cal = Calendar.getInstance();
				cal.setTime( replyDate );
				cal.add( Calendar.DATE, -changeDate );
				replyDate.setTime( cal.getTimeInMillis() );
				replyDto.setCreationDate( replyDate );
				
				replyM.Save( replyDto );
				
				double hasComments = Math.random();
				
				if( hasComments > 0.4 ){
					numComments = (int) (Math.random() * 10);

					Long idReply = replyDto.GetId();
					
					for( int c = 0; c < numComments; c++){
						commentDto = new CommentDto();
						commentDto.SetText("Comment" + c + " text");
						commentDto.SetReplyId( idReply );
						commentM.Save( commentDto );
					}
					replyDto = replyM.Get( idReply );
					replyDto.SetNumComments( numComments );
					replyM.Save( replyDto );
				}
				
			}
			
			discussionDto.SetNumReplies( numReplies );
			discussionM.Save( discussionDto );
			
		}
		
		return Response.ok().entity("{\"OK\":\"OK\"}").build();
	}
}