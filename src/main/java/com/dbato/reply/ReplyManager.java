package com.dbato.reply;

import java.util.List;
import java.util.logging.Logger;

import com.dbato.comments.CommentDto;
import com.dbato.commons.Constant.ReplyType;
import com.dbato.commons.ReplyVO;
import com.dbato.discussion.DiscussionDto;
import com.dbato.discussion.DiscussionManager;
import com.dbato.exception.DbatoException;
import com.dbato.exception.NeedUserException;
import com.igzcode.java.util.collection.NameValueArray;

public class ReplyManager extends ReplyFactory {

	protected static final Logger logger = Logger.getLogger(ReplyManager.class.getName());

	public ReplyDto Get(long p_replyId) {
		return this._Get(p_replyId);
	}

	public void Save(ReplyDto p_reply) throws NeedUserException {
		if( p_reply.getOwner() != null && p_reply.getOwnerId() != null ){
			this._Save( p_reply );
		} else {
			throw new NeedUserException("Reply must have a valid owner");
		}
	}

	public List<ReplyDto> FindByDiscussion(Long p_discussionId) {
		NameValueArray filters = new NameValueArray();
		filters.Add("discussionKey =", p_discussionId);
		return this._FindByProperties(filters, "-votes");
	}

	public ReplyDto GetById(Long p_replyId) {
		return this._Get( p_replyId );
	}

	public void Vote(Long p_replyKey, Long p_userKey) throws DbatoException, NeedUserException {
		ReplyDto reply = this.Get(p_replyKey);

		//users can vote only one time on each reply
		if( !reply.getVotesUserKeys().contains(p_userKey)){
			//VoteManager voteM = new VoteManager();
			DiscussionManager discusionM = new DiscussionManager();

			reply.setVotes(reply.getVotes() + 1);
			reply.addVoteUser( p_userKey );
			this.Save(reply);

			DiscussionDto discussion = discusionM.Get( reply.getDiscussionKey() );

			if( reply.getReplyType().equals(ReplyType.PRO) ){
				discussion.addVoteUserPro(p_userKey);
			} else {
				discussion.addVoteUserAgainst(p_userKey);
			}
			discusionM.Save(discussion);
		} else {
			throw new DbatoException("User already vote this reply");
		}
	}

	public ReplyVO getReplyVO(ReplyDto p_reply, List<CommentDto> p_comments, Long p_userId) {
		ReplyVO replyVo = new ReplyVO();
		replyVo.setReply(p_reply);
		replyVo.setComments(p_comments);

		Boolean canVote = !( p_userId == null || p_reply.getVotesUserKeys().contains( p_userId ));
		replyVo.setUserCanVote( canVote );
		return replyVo;
	}

	public void DeleteAll () {
		this._DeleteAll();
	}
}
