package com.dbato.discussion;

import java.util.List;

import com.dbato.exception.NeedUserException;
import com.dbato.tag.TagDto;
import com.dbato.tag.TagManager;
import com.googlecode.objectify.Query;
import com.igzcode.java.util.collection.NameValueArray;

public class DiscussionManager extends DiscussionFactory {

	public DiscussionDto Get ( long p_discussionId) {
		return this._Get(p_discussionId);
	}

	public void Save ( DiscussionDto p_discussion ) throws NeedUserException {
		if( p_discussion.getOwner() != null && p_discussion.getOwnerId() != null ){
			this._Save( p_discussion );
		} else {
			throw new NeedUserException("Discussion must have a valid owner");
		}
	}

	public List<DiscussionDto> FindByUserKey ( Long p_userKey ) {
		NameValueArray filters = new NameValueArray();
		filters.Add("ownerId", p_userKey);

		return this._FindByProperties(filters, "-lastReplyDate");
	}

	public List<DiscussionDto> Find ( String p_queryString ) {
		TagManager tagM = new TagManager();
		List<TagDto> tagL = tagM.Find(p_queryString);
		if( tagL.size() > 0 ){
			Query<DiscussionDto> query = this._GetQuery();
			query.filter("tags", p_queryString);
			return query.list();
		} else {
			return this._Find(p_queryString, "lastReplyDate");
		}
	}

	public List<DiscussionDto> FindByTag ( String p_tag ) {
		Query<DiscussionDto> query = this._GetQuery();
		query.filter("tags", p_tag);
		return query.list();
	}

	public List<DiscussionDto> FindAll() {
		return this._FindAll("-updateDate");
	}

	public void DeleteAll () {
		this._DeleteAll();
	}
}
