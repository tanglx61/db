User(**uid**, username, password, email, photo_url, created_on)

Post(**pid**, title, content, timestamp, votes, *uid*)
* uid -\> User

Comment(**cid**, content, timestamp, votes, *pid*, *uid*)
* pid -\> Post
* uid -\> User

Notification(**nid**, type, content, timestamp, read_on, *uid*, *from*)
* uid -\> User
* from -\> User


Category(catId, name, description)

PostCategory(*pid*, *catId*)
* pid -\> Post
* catId -\> Category

Tag(**tag_name**)

PostTag(*pid*, *tag_name*)
* pid -\> Post
* tag_name_ -\> Tag

PostVote(*uid*, *pid*, vote)
* uid -\> User
* pid -\> Post

CommentVote(*uid*, *cid*, vote)
* uid -\> User
* cid -\> Comment


AnalyticsProfile(**apid**, totalVisits, totalPosts, totalComments, totalPostsViewed, totalBrowsingDuration, totalPostVotes, totalCommentVotes, totalPostViewed, lastUpdatedOn, *uid*)
* uid -\> User

Event(**eid**, type, data, timestamp, *apid* )
* apid -\> AnalyticsProfile
