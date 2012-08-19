package com.dbato.discussion;

import java.util.List;

public class DiscussionManager extends DiscussionFactory {

	public DiscussionDto Get ( long p_discussionId) {
		return _Get(p_discussionId);
	}	

	public void Save ( DiscussionDto p_example ) {
		_Save( p_example );
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
