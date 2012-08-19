package com.dbato.tag;

import java.util.List;

public class TagManager extends TagFactory {

	public void AddUpdateTag( String p_text ){
		List<TagDto> found = Find(p_text);
		TagDto tag;
		if ( found.size() > 0 ){
			tag = found.get(0);
			tag.UpdateCount();
			Save( tag );
		} else if( found.size() == 0 ){
			tag = new TagDto();
			tag.SetText( p_text );
			tag.SetCount( 1L );
			Save( tag );
		}
	}
	
	public TagDto Get ( long p_tagId) {
		return _Get(p_tagId);
	}	

	public void Save ( TagDto p_tag ) {
		_Save( p_tag );
	}

	public List<TagDto> Find ( String p_queryString ) {
		return _Find(p_queryString, "text");
	}
		
	public List<TagDto> FindAll() {
        return _FindAll();
    }
	
	public void DeleteAll () {
		_DeleteAll();
	}
}
