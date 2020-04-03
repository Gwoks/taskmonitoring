# Task Monitoring
CRUD React + Nodejs + Express + Mysql + JWT

----

## Getting Started
```bash
$ git clone https://github.com/Gwoks/taskmonitoring.git
$ cd taskmonitoring/backend/
# Update database configuration
$ nano .env 
$ npm i
$ npm start
$ cd ../../frontend
$ npm i
$ npm start
```
- backend running at `http://localhost:3000`
- frontend running at `http://localhost:8081`

## User
|username|password|Role
|:--------|:----------|:------------
admin|admin|Admin
manager|manager|Manager
user|user|User
user2|user|User
user3|user|User

## API
**Header**
```json
x-access-token: token
```

|Request URL|Method|Body|Description|Role
|:--------|:----------|:------------|:------------|:------------
`/api/auth/signup/user`|POST|full_name: Stirng<br>username: Stirng<br>email: Stirng<br>password: Stirng<br>|create employee|none
`/api/auth/signup/manager`|POST|full_name: Stirng<br>username: Stirng<br>email: Stirng<br>password: Stirng<br>|create manager|Admin
`/api/auth/signin`|POST|username: Stirng<br>password: Stirng<br>|sign in, will response token|none
`/api/users/all`|GET|none|get all user|Manager
`/api/tasks`|POST|title: Stirng<br>description: Stirng<br>userId: Stirng<br>|create new task|User
`/api/tasks`|GET|userId: Stirng<br>|get all task by user|User
`/api/tasks:taskId`|GET|userId: Stirng<br>|get task detail|User
`/api/tasks:taskId`|PUT|title: Stirng<br>description: Stirng<br>userId: Stirng<br>|update task|User
`/api/tasks:taskId`|DELETE|none|delete task|User
