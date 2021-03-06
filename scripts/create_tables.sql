CREATE TABLE "User" (
	"uid" serial,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"photo_url" text,
    "created_on" timestamp NOT NULL DEFAULT NOW(),
	PRIMARY KEY ("uid")
);


CREATE TABLE "Post" (
    "pid" serial,
    "title" text NOT NULL,
    "content" text NOT NULL,
    "timestamp" timestamp NOT NULL DEFAULT NOW(),
    "votes" integer NOT NULL DEFAULT '0',
    "uid" integer NOT NULL,
    PRIMARY KEY ("pid"),
    FOREIGN KEY ("uid") REFERENCES "User"("uid")
);


CREATE TABLE "Comment" (
	"cid" serial,
	"content" text NOT NULL,
	"timestamp" timestamp NOT NULL DEFAULT NOW(),
	"votes" integer NOT NULL DEFAULT '0',
    "pid" integer NOT NULL,
    "uid" integer NOT NULL,
    PRIMARY KEY ("cid"),
    FOREIGN KEY ("pid") REFERENCES "Post"("pid"),
    FOREIGN KEY ("uid") REFERENCES "User"("uid")
);


CREATE TABLE "Notification" (
    "nid" serial,
    "type" text NOT NULL,
    "content" text NOT NULL,
    "timestamp" timestamp NOT NULL DEFAULT NOW(),
    "read_on" timestamp, 
    "uid" integer NOT NULL,
    "from" integer,
    PRIMARY KEY ("nid"),
    FOREIGN KEY ("uid") REFERENCES "User"("uid"),
    FOREIGN KEY ("from") REFERENCES "User"("uid")
);

CREATE TABLE "Category" (
    "catId" serial,
    "name" text NOT NULL,
    "description" text NOT NULL,
    PRIMARY KEY ("catId")
);


CREATE TABLE "PostCategory" (
    "pid" integer NOT NULL,
    "catId" integer NOT NULL,
    FOREIGN KEY ("pid") REFERENCES "Post"("pid"),
    FOREIGN KEY ("catId") REFERENCES "Category"("catId")
);


CREATE TABLE "Tag" (
    "name" text NOT NULL UNIQUE,
    PRIMARY KEY ("name")
);


CREATE TABLE "PostTag" (
    "pid" integer NOT NULL,
    "tag" text NOT NULL,
    FOREIGN KEY ("pid") REFERENCES "Post"("pid"),
    FOREIGN KEY ("tag") REFERENCES "Tag"("name")
);



CREATE TABLE "PostVote" (
    "pid" integer NOT NULL,
    "uid" integer NOT NULL,
    "vote" integer NOT NULL CHECK ("vote"='1' OR "vote"='-1'),
    "timestamp" timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("pid") REFERENCES "Post"("pid"),
    FOREIGN KEY ("uid") REFERENCES "User"("uid")
);


CREATE TABLE "CommentVote" (
    "cid" integer NOT NULL,
    "uid" integer NOT NULL,
    "vote" integer NOT NULL,
    FOREIGN KEY ("cid") REFERENCES "Comment"("cid"),
    FOREIGN KEY ("uid") REFERENCES "User"("uid")
);



CREATE TABLE "AnalyticsProfile" (
    "apid" serial,
    "total_visits" integer NOT NULL DEFAULT '0',
    "total_posts" integer NOT NULL DEFAULT '0',
    "total_comments" integer NOT NULL DEFAULT '0',
    "total_browsing_duration" integer NOT NULL DEFAULT '0',
    "total_post_upvotes" integer NOT NULL DEFAULT '0',
    "total_post_downvotes" integer NOT NULL DEFAULT '0',
    "total_comment_upvotes" integer NOT NULL DEFAULT '0',
    "total_comment_downvotes" integer NOT NULL DEFAULT '0',
    "total_post_views" integer NOT NULL DEFAULT '0',
    "last_update" timestamp NOT NULL DEFAULT NOW(),
    "uid" integer NOT NULL,
    PRIMARY KEY ("apid"),
    FOREIGN KEY ("uid") REFERENCES "User"("uid")
);

CREATE TABLE "Event" (
    "eid" serial,
    "type" text NOT NULL,
    "data" integer,
    "timestamp" timestamp NOT NULL DEFAULT NOW(),
    "uid" integer NOT NULL,
    PRIMARY KEY ("eid"),
    FOREIGN KEY ("uid") REFERENCES "User"("uid")
);




