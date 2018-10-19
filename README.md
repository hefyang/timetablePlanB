# TimeTablePlan-B
AIP Plan B project
Contributors:
Qijun Yang - 12790794
Hefei Yang - 12630087


This project was designed to help IT students to plan their timetables.

Students could view some information same as UTS handbook and start to enrol subjects. After that, select the section and add them to the database make a timetable.

The demo of this project(version week11) runs on AWS server: 54.79.64.214 until 30 Nov 2018.

#How to start

####1. install the dependency package needed in this project.

#####server side:

cd server

npm install

#####client side:

cd client

npm install


####2. run the server and client 

npm run dev

the http://localhost:5000/api/users/register 

#Dependency of this project


If there is a dependency or deploy issue, the following solutions should be considered carefully.

.npmrc or node-gyp issue:

https://stackoverflow.com/questions/46001516/beanstalk-node-js-deployment-node-gyp-fails-due-to-permission-denied/46001517#46001517

You may setup some dependency on the environment which is trying to run this application with following commands:
#####!!! Important,  sudo / -global or any other kinds of admin permissions are required !!!

Angular:

npm install -g @Angular/Cli

Bcrypt:

npm install -g bcrypt

Sqlite3:

npm install -g sqlite3

Nodemon:

npm install -g nodemon

Concurrently:

npm install -g concurrently

public.key & private.key:
 
 They are stored in the server_env folder under the server folder. Make sure these keys exist.



