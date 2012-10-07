/**
 * 
 */
package com.dbato.commons;

import java.io.Serializable;
import java.util.List;

import com.dbato.discussion.DiscussionDto;

public class DiscussionVO implements Serializable {

	private static final long serialVersionUID = 8503693323463603887L;

	private DiscussionDto discussion;
	private List<ReplyVO> replies;
	private Boolean userCanVotePro;
	private Boolean userCanVoteAgainst;
	private Boolean userIsOwner;
	private Boolean userCanReply;



	public DiscussionVO() {
		super();
		this.userCanVoteAgainst = false;
		this.userCanVotePro = false;
	}

	public void SetDiscussion( DiscussionDto p_discussion ){
		this.discussion = p_discussion;
	}

	public void SetReplies( List<ReplyVO> p_replies ){
		this.replies = p_replies;
	}

	public void setUserCanVotePro(Boolean p_userCanVote) {
		this.userCanVotePro = p_userCanVote;
	}


	public void setuserCanReply(Boolean p_userCanReply) {
		this.userCanReply = p_userCanReply;
	}

	public void setUserIsOwner(Boolean p_userIsOwner) {
		this.userIsOwner = p_userIsOwner;
	}

	public void setUserCanVoteAgainst(Boolean p_userCanVote) {
		this.userCanVoteAgainst = p_userCanVote;
	}
}