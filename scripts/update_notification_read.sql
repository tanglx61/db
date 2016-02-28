/* update a notification by nid */
UPDATE "Notification"
SET "read_on"=NOW()
WHERE "nid"=1;


/* update all user's notification by uid */
UPDATE "Notification"
SET "read_on"=NOW()
WHERE "uid"=20;



