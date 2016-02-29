DO $$
DECLARE a integer;
DECLARE b integer;
DECLARE c integer;
DECLARE d integer;
DECLARE e integer;
DECLARE f integer;
DECLARE g integer;
DECLARE h integer;
DECLARE i integer;
DECLARE uidVar CONSTANT integer := {0};

BEGIN
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='siteVisited' GROUP BY "type"), 0) INTO a;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='postCreated' GROUP BY "type"), 0) INTO b;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='commentCreated' GROUP BY "type"), 0) INTO c;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='browsing' GROUP BY "type"), 0) INTO d;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='postUpvoted' GROUP BY "type"), 0) INTO e;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='postDownvoted' GROUP BY "type"), 0) INTO f;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='commentUpvoted' GROUP BY "type"), 0) INTO g;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='commentDownvoted' GROUP BY "type"), 0) INTO h;
	SELECT COALESCE((SELECT COUNT("type") FROM "Event" WHERE "uid"=uidVar and type='postViewed' GROUP BY "type"), 0) INTO i;
	

	
	UPDATE "AnalyticsProfile" SET 
		"total_visits"=a, 
		"total_posts"=b,
		"total_comments"=c,
		"total_browsing_duration"=d,
		"total_post_upvotes"=e,
		"total_post_downvotes"=f,
		"total_comment_upvotes"=g,
		"total_comment_downvotes"=h,
		"total_post_views"=i
	WHERE "uid"=uidVar;
	
END
$$;;