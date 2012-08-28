package com.dbato.reply;

import java.util.ArrayList;
import java.util.List;

import com.dbato.comments.CommentDto;
import com.dbato.comments.CommentManager;
import com.dbato.commons.ReplyVO;
import com.igzcode.java.util.collection.NameValueArray;

public class ReplyManager extends ReplyFactory {

	public ReplyDto Get(long p_replyId) {
		return _Get(p_replyId);
	}

	public void Save(ReplyDto p_reply) {
		_Save(p_reply);
	}

	public List<ReplyVO> FindByDiscussion(Long p_discussionId) {

		NameValueArray filters = new NameValueArray();
		filters.Add("discussionKey =", p_discussionId);
		List<ReplyDto> replies = _FindByProperties(filters, "-votes");

		ReplyDto reply;
		List<CommentDto> comments;
		List<ReplyVO> repliesVo = new ArrayList<ReplyVO>();
		ReplyVO replyVo;
		CommentManager commentM = new CommentManager();
		for (int i = 0; i < replies.size(); i++) {

			reply = replies.get(i);
			comments = new ArrayList<CommentDto>();
			replyVo = new ReplyVO();

			if (reply.GetNumComments() > 0) {
				comments = commentM.FindByReply(reply.GetId());
			}
			replyVo.SetReply(reply);
			replyVo.SetComments(comments);
			repliesVo.add(replyVo);
		}

		return repliesVo;
	}

	public ReplyVO GetById(Long p_replyId) {
		ReplyDto reply = _Get( p_replyId );
		List<CommentDto> comments;
		List<ReplyVO> repliesVo = new ArrayList<ReplyVO>();
		ReplyVO replyVo;
		CommentManager commentM = new CommentManager();

		comments = new ArrayList<CommentDto>();
		replyVo = new ReplyVO();

		if (reply.GetNumComments() > 0) {
			comments = commentM.FindByReply(reply.GetId());
		}
		replyVo.SetReply(reply);
		replyVo.SetComments(comments);
		repliesVo.add(replyVo);
		
		return replyVo;
	}

	public Integer Vote(Integer p_vote, Long p_replyId) {
		System.out.println("VOTE REPLY ID" + p_replyId);
		ReplyDto reply = Get(p_replyId);

		reply.SetVotes(reply.GetVotes() + p_vote);
		reply.SetTotalVotes(reply.GetTotalVotes() + 1);
		Save(reply);

		return reply.GetVotes();
	}
}
