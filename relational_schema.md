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


AnalyticsProfile(**apid**, total_visits, total_posts, total_comments, total_posts_viewed, total_browsing_duration, total_post_upvotes, total_post_downvotes, total_comment_upvotes, total_comment_downvotes, , lastUpdatedOn, *uid*)
* uid -\> User

Event(**eid**, type, data, timestamp, *uid* )
* uid -\> User
