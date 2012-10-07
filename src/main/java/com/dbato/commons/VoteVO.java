package com.dbato.commons;

import java.io.Serializable;
import java.util.Date;

import com.dbato.commons.Constant.ReplyType;


public class VoteVO implements Serializable {
	private static final long serialVersionUID = 812803410701362509L;
	public Long voteId;
	public Long replyKey;
	public Long userKey;
	public ReplyType replyType;
	public Date creationDate;
}
