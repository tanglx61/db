INSERT INTO "Notification"("uid","from","type","content") 
	SELECT '30', '10', 'postUpvote', ("username" || ' upvoted your post') FROM "User" WHERE "uid"='10'
