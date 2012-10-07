package com.dbato;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import com.dbato.comments.CommentDto;
import com.dbato.comments.CommentManager;
import com.dbato.commons.Constant.ReplyType;
import com.dbato.commons.DiscussionVO;
import com.dbato.commons.ReplyVO;
import com.dbato.discussion.DiscussionDto;
import com.dbato.discussion.DiscussionManager;
import com.dbato.exception.DbatoException;
import com.dbato.exception.NeedUserException;
import com.dbato.reply.ReplyDto;
import com.dbato.reply.ReplyManager;
import com.dbato.tag.TagManager;

public class DbatoManager {

	protected static final Logger logger = Logger.getLogger(DbatoManager.class.getName());

	public DbatoManager() {
		// TODO Auto-generated constructor stub
	}

	public ReplyDto replyToDiscussion(Long p_discussionKey, String p_text, ReplyType p_replyType, String p_userDesc, Long p_userKey ) throws NeedUserException, DbatoException{

		ReplyManager replyM = new ReplyManager();
		DiscussionManager discussionM = new DiscussionManager();
		DiscussionDto discussion = new DiscussionDto();
		ReplyDto reply = new ReplyDto();

		discussion = discussionM.Get( p_discussionKey );

		if( this.userCanReplyInDiscussion(discussion, p_userKey)) {
			discussion.setNumReplies( discussion.getNumReplies() + 1 );
			discussion.setLastReplyDate( new Date() );

			reply.setText( p_text );
			reply.setDiscussionKey( p_discussionKey );
			reply.setReplyType( p_replyType );
			reply.setOwner( p_userDesc  );
			reply.setOwnerId( p_userKey );

			if( p_replyType.equals(ReplyType.AGAINST)) {
				discussion.addRepliesUserAgainst( p_userKey );
			} else if( p_replyType.equals(ReplyType.PRO)) {
				discussion.addRepliesUserPro( p_userKey );
			}

			replyM.Save(reply);
			discussionM.Save( discussion );

			return reply;
		} else {
			throw new DbatoException("User cant reply to this discussion");
		}
	}

	public Boolean userCanReplyInDiscussion(DiscussionDto p_discussion, Long p_userKey ){
		return !(p_discussion.getRepliesUserPro().contains(p_userKey) || p_discussion.getRepliesUserAgainst().contains(p_userKey));
	}

	public DiscussionDto createDiscussion(List<String> p_tags, String p_title, String p_text, String p_userDesc, Long p_userKey) throws NeedUserException{
		DiscussionManager discussionM = new DiscussionManager();

		TagManager tagM = new TagManager();
		for (int i = 0; i < p_tags.size(); i++) {
			tagM.AddUpdateTag(p_tags.get(i));
		}

		DiscussionDto discussion = new DiscussionDto();
		discussion.setTitle(p_title);
		discussion.setText(p_text);
		discussion.setTags(p_tags);
		discussion.setOwner( p_userDesc );
		discussion.setOwnerId( p_userKey );
		discussionM.Save(discussion);

		return discussion;
	}

	public DiscussionVO getDiscussionVO( Long p_discussionKey, Long p_userKey ){
		DiscussionManager discussionM = new DiscussionManager();
		DiscussionDto discussion = discussionM.Get(p_discussionKey);

		ReplyManager replyM = new ReplyManager();
		List<ReplyDto> replyL = replyM.FindByDiscussion(discussion.getDiscussionId());

		ReplyDto reply;
		List<CommentDto> comments;
		List<ReplyVO> repliesVo = new ArrayList<ReplyVO>();
		ReplyVO replyVo;
		CommentManager commentM = new CommentManager();
		for (int i = 0; i < replyL.size(); i++) {
			reply = replyL.get(i);
			comments = new ArrayList<CommentDto>();
			if (reply.getNumComments() > 0) {
				comments = commentM.FindByReply(reply.getReplyId());
			}
			replyVo = replyM.getReplyVO( reply, comments, p_userKey );
			repliesVo.add(replyVo);
		}

		DiscussionVO discusionVO = new DiscussionVO();
		discusionVO.SetDiscussion( discussion );
		discusionVO.SetReplies( repliesVo );
		if( discussion.getVotesUserPro().contains(p_userKey)) {
			discusionVO.setUserCanVotePro(true);
			discusionVO.setUserCanVoteAgainst(false);
		} else if( discussion.getVotesUserAgainst().contains(p_userKey)) {
			discusionVO.setUserCanVoteAgainst(true);
			discusionVO.setUserCanVotePro(false);
		} else {
			discusionVO.setUserCanVoteAgainst(true);
			discusionVO.setUserCanVotePro(true);
		}

		discusionVO.setUserIsOwner( discussion.getOwnerId().equals(p_userKey) );
		discusionVO.setuserCanReply( this.userCanReplyInDiscussion(discussion, p_userKey));

		return discusionVO;
	}

}
