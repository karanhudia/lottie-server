# Lottie Server

Lottie Server is the backend server for the Lottie Editor application. It handles real-time synchronization, GraphQL API requests, and websocket connections to facilitate collaboration and animation editing.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
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

## Database

This project is using MongoDB with only one collection at the moment to store the lottie animation json information. You can find the details below.
The database is hosted on https://cloud.mongodb.com/

<img src="https://github.com/karanhudia/lottie-server/assets/12070443/5c338ae7-efbe-4b36-908e-b9c1813fc1b8" alt="Database Model" width="30%">

## Usage

To start the development server, run:

   ```
   yarn start
   ```

This will start your fastify application and start listening on http://localhost:4000. The app will reload automatically as you make changes to the code.

## Scripts

    yarn start: Starts the development server.
    yarn build: Builds the app for production.

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

## Deployment

The app uses Render server to trigger deployment pipeline through `main` branch.

**WebSocket address-** https://lottie-editor.onrender.com/

**GraphQL address-** https://lottie-editor.onrender.com/graphql

## Open Issues

- [ ] Creating rooms for websockets to limit sending updates to all connected clients (top priority)
- [ ] Testing framework and tests for fastify
- [ ] Testing socket.io
- [ ] Adding Mocks and testing database connection 
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
