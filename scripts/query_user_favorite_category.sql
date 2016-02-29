SELECT C.name as category, COUNT(name) as posts_upvoted FROM

	(SELECT "pid" FROM "PostVote" WHERE "uid"='5' AND "vote"='1') AS V
	
	JOIN 
	
	(SELECT "pid", "catId" FROM "PostCategory") AS PC
	
	ON V.pid = PC.pid
	
	JOIN
	
	(SELECT "catId", "name" FROM "Category") AS C
	
	ON PC."catId" = C."catId"
	
GROUP BY category
ORDER BY posts_upvoted DESC