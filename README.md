# Lottie Server

Lottie Server is the backend server for the Lottie Editor application. It handles real-time synchronization, GraphQL API requests, and websocket connections to facilitate collaboration and animation editing.

## Table of Contents

- [Features](#features)
- [Live](#live)
- [Installation](#installation)
- [Database and Architecture](#database-and-architecture)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [GraphQL and Codegen](#graphql-and-codegen)
- [Testing](#testing)
- [Deplopyment](#deployment)
- [Open Issues](#open-issues)
- [Contributing](#contributing)
- [License](#license)

## Features

### Development
- Built using `TypeScript` and `Fastify`
- Complete integration of `eslint` and `prettier`
- Integrates `graphql-codegen` for generating graphql schemas
- Integrates `mongodb` and `mongoose` to talk to db using models
- Uses `graphql-yoga` for handling GraphQL requests
- Integrates `socket.io` for handling websockets

### User
- Real-time synchronization of Lottie animations
- GraphQL API for CRUD operations on animations
- Websocket support for real-time updates
- Collaboration support with multiple users

## Live

https://lottie-editor.onrender.com/

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/karanhudia/lottie-server.git
   cd lottie-server

2.  **Install dependencies:**
    ```sh
    yarn

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following environment variables:

    ```sh
    PORT= # Port on which you want to run your application (default is 4000)
    MONGODB_URI= # MongoDB URL along with /databasename
    MONGODB_COLLECTION_NAME= # Collection name for the database
    ```

## Database and Architecture

This project is using MongoDB with only one collection at the moment to store the lottie animation json information. You can find the details below.
The database is hosted on https://cloud.mongodb.com/

![image](https://github.com/karanhudia/lottie-server/assets/12070443/82d915df-5f1a-48e9-b9ff-2fe8d7e2b976)

## Usage

To start the development server, run:

   ```
   yarn start
   ```

This will start your fastify application and start listening on http://localhost:4000. The app will reload automatically as you make changes to the code.

## Scripts

    yarn start: Starts the development server.
    yarn build: Builds the app for production.
    yarn test: Runs tests with jest
    yarn type-check: Runs tsc check
    yarn lint: Runs linting with eslint
    yarn codegen: Generates new GraphQL types (server should be running)

## Project Structure
    
    src/
    ├── controllers/      # Controllers for handling requests
    ├── graphql/          # GraphQL schema and generated types
    ├── models/           # Database models for mongoose
    ├── plugins/          # Fastify plugins to decorate the instance
    ├── routes/           # API and GraphQL routes
    ├── utils/            # Utility functions
    └── index.ts          # Entry point of the server

## GraphQL and Codegen

We are using [graphql-codegen](https://the-guild.dev/graphql/codegen) to generate GraphQL types for the schemas used.
You can find the configuration file for the [codegen here](https://github.com/karanhudia/lottie-server/blob/main/codegen.ts).

The script has to be run everytime you change the 
[schema.graphql](https://github.com/karanhudia/lottie-server/blob/main/src/graphql/schema.graphql#L17) file.
This will generate new types based on the updated `schema.graphql` file. The changes need to be pushed in the commit.

## Testing

The test setup is using jest with TypeScript support. There are other several libraries being used to support the tests, for example-

- `mongodb-memory-server` to create mongodb database in memory
- `socket.io-client` to mock client socket connection

## Deployment

The app uses Render server to trigger deployment pipeline through `main` branch.

**WebSocket address-** https://lottie-editor.onrender.com/

**GraphQL address-** https://lottie-editor.onrender.com/graphql

## Open Issues

- [ ] Creating rooms for websockets to limit sending updates to all connected clients (top priority)
- [ ] Testing GraphQL endpoint
- [ ] MongoDb Collection for authorization users for private editing

## Contributing

I welcome contributions to improve Lottie Server! Here’s how you can contribute:

- Fork the repository.
- Create a new branch with a descriptive name.
- Make your changes.
- Open a pull request describing your changes.

## License
    
This project is licensed under the MIT License.

Feel free to reach out if you have any questions or need further assistance. Happy coding!
