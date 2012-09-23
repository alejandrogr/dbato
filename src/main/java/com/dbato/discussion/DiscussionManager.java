package com.dbato.discussion;

import java.util.List;

import com.dbato.exception.NeedUserException;
import com.dbato.tag.TagDto;
import com.dbato.tag.TagManager;
import com.googlecode.objectify.Query;

public class DiscussionManager extends DiscussionFactory {

	public DiscussionDto Get ( long p_discussionId) {
		return _Get(p_discussionId);
	}	

	public void Save ( DiscussionDto p_discussion ) throws NeedUserException {
		if( p_discussion.getOwner() != null && p_discussion.getOwnerId() != null ){
			_Save( p_discussion );
		} else {
			throw new NeedUserException("Discussion must have a valid owner");
		}
	}

	public List<DiscussionDto> Find ( String p_queryString ) {
		TagManager tagM = new TagManager();
		List<TagDto> tagL = tagM.Find(p_queryString);
		if( tagL.size() > 0 ){
			Query<DiscussionDto> query = _GetQuery();
			query.filter("tags", p_queryString);
			return query.list();
		} else {
			return _Find(p_queryString, "lastReplyDate");
		}
	}
	
	public List<DiscussionDto> FindByTag ( String p_tag ) {
		Query<DiscussionDto> query = _GetQuery();
		query.filter("tags", p_tag);
		return query.list();
	}
		
	public List<DiscussionDto> FindAll() {
        return _FindAll("-updateDate");
    }
	
	public void DeleteAll () {
		_DeleteAll();
	}
}
