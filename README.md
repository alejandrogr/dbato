# DBATO  
  
Dbato is a tool and a platform for discussing and debating all kind of themes. Dbato claims to keep clean discussions and order the replies acording to user votes and relevance. this way when you start reading opinions and arguments about a discussion you can read only intresting things related to the main topic without reading unuseful stuff.
  
Dbato has three main concepts:
  
* __Discussions__ these are the main topic we are goin to discuss.
* __Replies__ these are responses with info, personal opinions, relevant links and so, always referencing or answering a discussion. Replies can be reordered at any time so them cannot reference previous replies.
* __Comments__ when you want to say something about a reply you comment it, opening a new line of discussion from a reply. comments always keeps attached to replies and ordered by date.
  
In Dbato users can vote for importance and relevance of the replies and them are ordered by votes. Users vote replies by his coherence, well-formed, relevant info... but not by his conformity of the reply. Comments cannot be voted only can be reported for abuse or verbal attacks.
  
There are to kinds of votes in Dbato:
* Regular votes: when users who does not participate on a discussion vote a reply, it count as a regular vote.
* Relevant vote: when a user who participate in the discussion vote a reply it count as a relevant vote. Relevant votes count more than regular votes.
  
To post in Dbato you need to be logged in with a Google account. However you can post as a hidden user to protect your email.
  
## To Launch the app
    
    cd dbato
    mvn clean install
    cd dbato-web
    mvn gae:unpack
    mvn gae:run

Then navigate to http://localhost:8080/s/DBDummie to fill the datastore with test some data. 
Nagiate to http://localhost:8080
Welcome to Dbato.


## CURRENT FEATURES
* Create discussions
* Tags in discussions
* Search discussion by title, text or tag
* Reply to discussions
* List discussions
* Vote replies
* View discussions with ordered replies
* Comments on replies

## TODO (until beta release)
* Asociate comments with users in backend
* Disallow multiple votes on a same reply by same user
* Difference between regular and relevant votes
* App redesign
* Tag filters
* List My Discussions or discussions which have any of my replies
* List all my replies
* Report a discussion, reply or comment.
* Add Google Channels to update cliente contet
  
## ROADMAP (for the future)
* Allow OpenID
* Allow user registration
* Allow posting with alias
* Allow post as hidden user
* Share a reply or discussion
* Favorite discussions
* Watch a discussion (warn by email on new replies)
* Tag cloud
* Private discussions
* Request a hangout
