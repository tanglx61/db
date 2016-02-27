DO $$
DECLARE current_pid integer;
BEGIN
INSERT INTO "Post"("content", "title", "uid") VALUES ('testContent', 'testTitle', '3') RETURNING pid INTO current_pid;

INSERT INTO "PostCategory"("pid", "catId") VALUES (current_pid, '3');
INSERT INTO "PostCategory"("pid", "catId") VALUES (current_pid, '9');

END
$$;