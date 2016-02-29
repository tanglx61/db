1. install Node JS (https://nodejs.org/en/)
2. ```git clone https://github.com/tanglx61/db && cd db && npm install```
3. change ```dbpath``` in ```app/config.js```
5. now you are ready to run, ```node app {arg1} {arg2}```

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
--events-browsing | n: Int | populate n browsing events
--events-visits | n: Int | populate n site visits events
--events-postviews | n: Int | populate n post view events
--analyze | uid: Int | update AnalyticsProfile for a the user with uid. Or do not input any uid to run analysis over the entire User set (from 1 to config.users)