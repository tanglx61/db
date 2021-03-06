

SELECT V.pid, title, upvotes 
FROM 
	(
	SELECT pid, COUNT("pid") AS upvotes
	FROM "PostVote" 
	WHERE "timestamp" > NOW() - '5 days'::INTERVAL AND "vote"='1'
	GROUP BY "pid"
	ORDER BY upvotes DESC
	LIMIT 10
	) AS V

	JOIN

	(SELECT "title", "pid" FROM "Post") AS P
	
	ON V.pid=P.pid;