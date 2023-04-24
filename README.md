# Requirements to run bot
* Node.js
* npm

# How to run bot
* Clone this repository
* Run `npm install` in the directory of the repository
* Run `npm build` in the directory of the repository
* Copy `.env.example` file with name `.env` and edit with your secrets
* Run `node .` in the directory of the repository

## Bot Details
### How does leveling system work?
* Every message sent in a server with the bot will give you XP between 1 and 10
* Every level needs {level}*{level}*10 XP for example level 2 needs 40 XP

### How to configure level rewards?
* You can use add-levelreward, remove-levelreward and list-levelrewards commands to configure level rewards in your server.

