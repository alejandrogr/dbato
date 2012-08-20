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
		System.out.println( p_discussionId );
		filters.Add("discussionKey =", p_discussionId);
		return _FindByProperties(filters);
	}
}
