/*
List the usernames and uid of the users who have been most active in creating posts in the past N days, 
as well as the number of Posts they created.
*/

SELECT * 
FROM 
	(
	SELECT uid, COUNT("uid") AS c 
	FROM "Post"
	WHERE "timestamp" > NOW() - '1 day'::INTERVAL 
	GROUP BY "uid" 
	ORDER BY c DESC
	LIMIT 10
	) AS T1

	JOIN 

	(
	SELECT uid, username
	FROM "User"
	) AS T2
	
	ON T1.uid = T2.uid
ORDER BY c DESC;

