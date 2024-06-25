# Lottie Server

Lottie Server is the backend server for the Lottie Editor application. It handles real-time synchronization, GraphQL API requests, and websocket connections to facilitate collaboration and animation editing.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Testing](#testing)
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

## Usage

To start the development server, run:

   ```
   yarn start
   ```

This will start your fastify application and start listening on http://localhost:4000. The app will reload automatically as you make changes to the code.

## Scripts

    yarn start: Starts the development server.
    yarn build: Builds the app for production.
    yarn test: Runs the test suite.

## Testing

The project uses React Testing Library for unit and integration tests.

To run the test suite, use: `yarn test`

## Project Structure
    
    src/
    ├── controllers/      # Controllers for handling requests
    ├── graphql/          # GraphQL schema and generated types
    ├── models/           # Database models for mongoose
    ├── routes/           # API and GraphQL routes
    ├── test/             # Test related mocks and utils
    ├── utils/            # Utility functions
    └── index.ts          # Entry point of the server

## Deployment

The app uses Render server to trigger deployment pipeline through `main` branch.

**WebSocket address-** https://lottie-editor.onrender.com/

**GraphQL address-** https://lottie-editor.onrender.com/graphql

## Contributing

I welcome contributions to improve Lottie Server! Here’s how you can contribute:

- Fork the repository.
- Create a new branch with a descriptive name.
- Make your changes.
- Ensure all tests pass.
- Open a pull request describing your changes.

## License
    
This project is licensed under the MIT License.

Feel free to reach out if you have any questions or need further assistance. Happy coding!
