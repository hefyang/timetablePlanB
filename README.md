# TimeTablePlan-B
AIP Plan B project

Contributors:

Qijun Yang - 12790794

Hefei Yang - 12630087

##TEST ACCOUNT

test account: 12345678

test password: 1q2w3e4r

new user password requirement: at least 8 characters

##Introduction

This project was designed to help IT students to plan their timetables.

Students could view some information same as UTS handbook and start to enrol subjects. After that, select the section and add them to the database make a timetable.

The demo of this project(version week11) runs on AWS server: 54.79.64.214 until 30 Nov 2018.

In order to deploy this app on server, the minimum requirement of the port numbers are 22,25,80,433,465 (SSH,SMTP,HTTP,HTTPS,SMTPS)

According to the ip address in the email confirmation function, the email sent to the user should includes the domain name / ip address  / ipv6 address. Therefore, some adaptations are nessessary.

##How to start

####1. install the dependency package needed in this project.

#####server side:

cd server

npm install

#####client side:

cd client

npm install


####2. run the server and client 

npm run dev

the application would run at http://localhost:4200/ 

##Dependency of this project


If there is a dependency or deploy issue, the following solutions should be considered carefully.

.npmrc or node-gyp issue:

https://stackoverflow.com/questions/46001516/beanstalk-node-js-deployment-node-gyp-fails-due-to-permission-denied/46001517#46001517

You may setup some dependency on the environment which is trying to run this application with following commands:
#####!!! Important,  sudo / -global or any other kinds of admin permissions are required !!!

Angular:

npm install -g @Angular/Cli

Bcrypt:

npm install -g bcrypt

Concurrently:

npm install -g concurrently

Nodemon:

npm install -g nodemon

Sqlite3:

npm install -g sqlite3


public.key & private.key:
 
 They are stored in the server_env folder under the server folder. Make sure these keys exist.



