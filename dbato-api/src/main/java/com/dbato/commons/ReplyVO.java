/**
 * 
 */
package com.dbato.commons;

import java.util.List;

import com.dbato.comments.CommentDto;
import com.dbato.reply.ReplyDto;




public class ReplyVO {
	
	private ReplyDto reply;
	private List<CommentDto> comments;
	
	public void SetReply( ReplyDto p_reply){
		reply = p_reply;
	}
	
	public void SetComments( List<CommentDto> p_comments ){
		comments = p_comments;
	}
}