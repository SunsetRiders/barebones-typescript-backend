# Barebones Typescript Backend
This is a base code to work with typescript for nodejs backend projects.

## Layers and Responsibilities

 - **Controller**: This layer is responsable for handle the router it shouldn't contain any business logic.
 - **Entity**: The entity class **aka** value object or model.
 - **Interface**: General interfaces to attend the code typing.
 - **Microservice**: In this layer should contain the client **(stub)** to other micro services.
 - **Repository**: Layer that handles the CRUD behavior like **create, read, update and delete.**
 
 ## Getting Started
 
 ### Installation
 ```shell
 git clone git@github.com:SunsetRiders/barebones-typescript-backend.git
 cd barebones-typescript-backend
 npm install
 ```
 
### Execution for production
 ```shell
npm start
 ```
 
### Execution for development
 ```shell
# Type this in a terminal window

# This watch-ts command will transpile the typescript into javascript
# and will also watch for file changes to automatically retranspile.
npm run watch-ts

# Type this in another terminal window

# This watch command will restart the project with 
# nodemon everytime the watch-ts transpile some file.

npm run watch
 ```