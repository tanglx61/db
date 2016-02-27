DO $$
DECLARE current_id integer;
BEGIN
INSERT INTO "User"("username", "password", "email", "photoUrl") VALUES ('spongebob', 'spongepassword', 'spongebobsqureaants@gmail.com', '1111') RETURNING uid INTO current_id;
INSERT INTO "AnalyticsProfile"("uid", "last_update") VALUES (current_id, NOW());
END
$$;