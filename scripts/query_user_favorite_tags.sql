SELECT tag, COUNT(tag) AS count FROM 

	(SELECT "uid" FROM "User" WHERE "username"='Timmothy62') AS U
	
	JOIN
	
	(SELECT "uid", "pid" FROM "PostVote" WHERE "vote"='1') AS V
	
	ON U.uid = V.uid
	
	JOIN
	
	"PostTag" AS T
	
	ON T.pid = V.pid

GROUP BY tag
ORDER BY count DESC
LIMIT 10;