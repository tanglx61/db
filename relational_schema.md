User(**uid**, username, password, email, photoUrl)

Post(**pid**, title, content, timestamp, votes, ownerUsername, *uid*)
* uid -\> User
* ownerUsername is denormalized for performance

Comment(**cid**, content, timestamp, votes, ownerUsername, *pid*, *uid*)
* pid -\> Post
* uid -\> User
* ownerUsername is denormalized for performance

Notification(**nid**, type, content, timestamp, read, *uid*)
* uid -\> User


Category(catId, name, description)

PostCategory(*pid*, *catId*)
* pid -\> Post
* catId -\> Category

Tag(**tagId**, name)

PostTag(*pid*, *tagId*)
* pid -\> Post
* tagId -\> Tag

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
