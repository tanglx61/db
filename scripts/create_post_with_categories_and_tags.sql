DO $$ 
DECLARE current_pid integer;
BEGIN
INSERT INTO "Post"("title","content","uid") VALUES 
('virtual harness platforms','http://lorempixel.com/640/480','20') RETURNING pid INTO current_pid;
INSERT INTO "PostCategory"("pid", "catId") VALUES (current_pid, '8');
INSERT INTO "PostCategory"("pid", "catId") VALUES (current_pid, '6');
INSERT INTO "Tag"("name") SELECT 'protocol' WHERE NOT EXISTS (SELECT 1 FROM "Tag" WHERE name='protocol');
INSERT INTO "Tag"("name") SELECT 'override' WHERE NOT EXISTS (SELECT 1 FROM "Tag" WHERE name='override');
INSERT INTO "PostTag"("pid","tag") VALUES 
(current_pid,'protocol'),
(current_pid,'override');
END $$;