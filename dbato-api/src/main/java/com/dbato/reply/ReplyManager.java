package com.dbato.reply;

import java.util.List;

import com.igzcode.java.util.collection.NameValueArray;

public class ReplyManager extends ReplyFactory {

	public ReplyDto Get ( long p_replyId) {
		return _Get(p_replyId);
	}	

	public void Save ( ReplyDto p_reply ) {
		_Save( p_reply );
	}

	public List<ReplyDto> FindByDiscussion ( Long p_discussionId ) {
		NameValueArray filters = new NameValueArray();
		filters.Add("discussionKey =", p_discussionId);
		return _FindByProperties(filters, "-votes");
	}
	
	public Integer Vote( Integer p_vote, Long p_replyId ){
		System.out.println("VOTE REPLY ID" + p_replyId );
		ReplyDto reply = Get( p_replyId );
		
		reply.SetVotes( reply.GetVotes() + p_vote );
		reply.SetTotalVotes( reply.GetTotalVotes() + 1 );
		Save( reply );
		
		return reply.GetVotes();
	}
}
