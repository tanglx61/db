SELECT type, count(type)
FROM "Event"
WHERE uid=3
GROUP BY "type"
