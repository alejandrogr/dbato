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
		
		user.setEmail("alejandrogr@gmail.com");
		user.setNick("Ale");
		userM.Save( user );
		
		DiscussionDto discussionDto;
		ReplyDto replyDto;
		CommentDto commentDto;
		
		int numDiscussions = 30;
		int numReplies, votes, numComments;
		ReplyType replyType = ReplyType.AGAINST;
		List<String> tagL = new ArrayList<String>();
		List<String> tagL2 = new ArrayList<String>();
		List<String> tags;
		
		tagL.add("politics");
		tagL.add("tech");
		tagL.add("sport");

		tagL2.add("politics");
		tagL2.add("religion");
		
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
			
			discussionDto.setTitle("Tittle " + i);
			discussionDto.setText("Discussion " + i + " text.");
			discussionDto.setTags( tags );
			discussionDto.setOwner( user.getEmail() );
			discussionDto.setOwnerId( user.getUserId() );
			discussionM.Save( discussionDto );
		
			numReplies = (int) ( Math.random() * 30);
			for( int r = 0; r<numReplies; r++){

				votes = 0; //(int) ( Math.random() * 30);
				
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
				replyDto.setDiscussionKey( discussionDto.getDiscussionId() );
				replyDto.setReplyType( replyType );
				replyDto.setText("Reply text " + r);
				replyDto.setVotes( votes );
				replyDto.setOwner( user.getEmail() );
				replyDto.setOwnerId( user.getUserId() );
				
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

					Long replyKey = replyDto.getReplyId();
					
					for( int c = 0; c < numComments; c++){
						commentDto = new CommentDto();
						commentDto.setText("Comment" + c + " text");
						commentDto.setReplyKey( replyKey );
						commentM.Save( commentDto );
					}
					replyDto = replyM.Get( replyKey );
					replyDto.setNumComments( numComments );
					replyM.Save( replyDto );
				}
				
			}
			
			discussionDto.setNumReplies( numReplies );
			discussionM.Save( discussionDto );
			
		}
		
		return Response.ok().entity("{\"OK\":\"OK\"}").build();
	}
}
