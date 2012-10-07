package com.dbato.comments;

import java.util.List;

import com.igzcode.java.util.collection.NameValueArray;

public class CommentManager extends CommentFactory {

	public CommentDto Get ( long p_replyId) {
		return this._Get(p_replyId);
	}

	public void Save ( CommentDto p_comment ) {
		this._Save( p_comment );
	}

	public List<CommentDto> FindByReply ( Long p_replyId ) {
		NameValueArray filters = new NameValueArray();
		filters.Add("replyKey =", p_replyId);
		return this._FindByProperties(filters, "-creationDate");
	}

	public void DeleteAll () {
		this._DeleteAll();
	}
}
