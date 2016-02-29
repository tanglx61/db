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

BEGIN
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='siteVisited' GROUP BY "type" INTO a;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='postCreated' GROUP BY "type" INTO b;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='commentCreated' GROUP BY "type" INTO c;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='browsing' GROUP BY "type" INTO d;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='postUpvoted' GROUP BY "type" INTO e;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='postDownvoted' GROUP BY "type" INTO f;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='commentUpvoted' GROUP BY "type" INTO g;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='commentDownvoted' GROUP BY "type" INTO h;
	SELECT COUNT("type") FROM "Event" WHERE "uid"='1' AND "type"='postViewed' GROUP BY "type" INTO i;
	
	
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
	WHERE uid='1';
	
END
$$;;