package com.dbato.reply;

import java.util.List;

import com.dbato.comments.CommentDto;
import com.dbato.commons.ReplyVO;
import com.dbato.commons.VoteVO;
import com.dbato.discussion.DiscussionDto;
import com.dbato.discussion.DiscussionManager;
import com.dbato.exception.DbatoException;
import com.dbato.exception.NeedUserException;
import com.igzcode.java.util.collection.NameValueArray;

public class ReplyManager extends ReplyFactory {

	public ReplyDto Get(long p_replyId) {
		return _Get(p_replyId);
	}

	public void Save(ReplyDto p_reply) throws NeedUserException {
		if( p_reply.getOwner() != null && p_reply.getOwnerId() != null ){
			_Save( p_reply );
		} else {
			throw new NeedUserException("Reply must have a valid owner");
		}
	}

	public List<ReplyDto> FindByDiscussion(Long p_discussionId) {
		NameValueArray filters = new NameValueArray();
		filters.Add("discussionKey =", p_discussionId);
		return _FindByProperties(filters, "-votes");
	}

	public ReplyDto GetById(Long p_replyId) {
		return _Get( p_replyId );
	}

	public void Vote(Long p_replyKey, Long p_userKey) throws DbatoException, NeedUserException {
		ReplyDto reply = this.Get(p_replyKey);
		
		//users can vote only one time on each reply
		if( !reply.getVotesUser().contains( p_userKey)){
			//VoteManager voteM = new VoteManager();
			DiscussionManager discusionM = new DiscussionManager();
			
			reply.setVotes(reply.getVotes() + 1);
			
			VoteVO vote = new VoteVO();
			vote.setReplyKey( p_replyKey );
			vote.setUserKey( p_userKey );
			vote.setReplyType( reply.getReplyType() );
			//voteM.Save(vote);

			reply.addVoteUser( vote );
			this.Save(reply);
			
			DiscussionDto discussion = discusionM.Get( reply.getDiscussionKey() );
			discussion.addVoteUser(vote);
			discusionM.Save(discussion);
		} else {
			throw new DbatoException("User already vote this reply");
		}
	}

	public ReplyVO getReplyVO(ReplyDto p_reply, List<CommentDto> p_comments, Long p_userId) {
		ReplyVO replyVo = new ReplyVO();
		replyVo.setReply(p_reply);
		replyVo.setComments(p_comments);
		Boolean canVote = !( p_userId == null || p_reply.getVotesUser().contains( p_userId ));
		replyVo.setUserCanVote( canVote );
		return replyVo;
	}
}
