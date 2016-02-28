1. install Node JS (https://nodejs.org/en/)
2. ```git clone https://github.com/tanglx61/db```
3. ```cd db```
4. ```npm install```
5. ```node app {arg1} {arg2}```

arg1 | arg2 | description
-----| ---- | ------------
-i | | reinitialize and repopulate using predefined values in app/config.js
-r | | reinitialize (drop and recreate) all tables
-d | | drop all tables
--users | n: Int | populate n users
--categories | | populate categories (predefined)
--posts | n: Int | populate n posts
--comments | n: Int | populate n comments
--notifications | n: Int | populate n notifications
--postvotes | n: Int | populate n postvotes
--commentvotes | n: Int | populate n commentvotes