package com.dbato.discussion;

import java.util.List;

import com.dbato.exception.NeedUserException;

public class DiscussionManager extends DiscussionFactory {

	public DiscussionDto Get ( long p_discussionId) {
		return _Get(p_discussionId);
	}	

	public void Save ( DiscussionDto p_discussion ) throws NeedUserException {
		if( p_discussion.GetOwner() != null && p_discussion.GetOwnerId() != null ){
			_Save( p_discussion );
		} else {
			throw new NeedUserException("Discussion must have a valid owner");
		}
	}

	public List<DiscussionDto> Find ( String p_queryString ) {
		return _Find(p_queryString, "_Text");
	}
		
	public List<DiscussionDto> FindAll() {
        return _FindAll();
    }
	
	public void DeleteAll () {
		_DeleteAll();
	}
}
