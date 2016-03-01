
INSERT INTO "Tag"("name") 
SELECT 'yolo' WHERE NOT EXISTS (SELECT 1 FROM "Tag" WHERE name='yolo');