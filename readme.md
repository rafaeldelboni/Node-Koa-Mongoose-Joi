# Todo List (Node/Koa/Mongoose/Joi) App

Simple app to test the stack Node/Koa/Mongoose/Joi, everything inside some docker containers ;)

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

## Setup

Run `docker-compose build`. It will

* install all dependencies from the package.json locally
* expose the following ports: 3000 for the API and 27017 MongoDB to the host
* instruct the container to execute `run.sh` script on start up.

## Start

Run `docker-compose up` to:

* Create and start both `api-crowd-decision` and `db-crowd-decision` containers.
* Execute `nodemon -L api/index.js`
* The api should then be running on your docker daemon on port 3000.

## Debug

Run `docker-compose -f .\docker-compose.debug.yaml up` to:

* Create and start both `api-crowd-decision` and `db-crowd-decision` containers.
* Execute `nodemon -L --debug=5858 api/index.js`
* The api should then be running on your docker daemon on port 3000 and 5858 for debug.

## Test

Run `docker-compose -f docker-compose.test.yaml up --abort-on-container-exit` to:

* Create and start both `api-crowd-decision` and `db-crowd-decision` containers.
* Execute `mocha api/*/*spec.js`
* The api should be tested and then stoped.
* Code will be linted

## Lint

Run `npm run lint` to lint code

# Credits

* [@chicocode](https://github.com/chicocode)
* [@rafaeldelboni](https://github.com/rafaeldelboni)
