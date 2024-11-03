# Car Rental Service

This project is a car rental service application with a frontend built using Angular and a backend created with Nest.js. The application interacts with a MongoDB database managed via Docker.

## Getting Started

Follow the steps below to set up and run the application on your local machine for development and testing purposes.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 19.9 or later)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/) 
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hubanton/CarRentalService
   cd CarRentalService
   ```

2. Navigate to the `frontend` directory and install the Angular dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Navigate to the `backend` directory and install the Nest.js dependencies:
   ```bash
   cd ../backend
   npm install
   ```

## Running the Application

### Frontend

1. Open a terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Start the Angular application:
   ```bash
   ng serve
   ```

3. The application will be accessible at `http://localhost:4200`.

### Backend

1. Open another terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Start the Nest.js application:
   ```bash
   npm run start
   ```

3. The backend will be accessible at `http://localhost:3000`.

### Database

1. In the root directory of the project, start the MongoDB database using Docker Compose:
   ```bash
   docker-compose -f mongodb.yml up -d
   ```

2. Ensure that the database is running by checking the Docker containers:
   ```bash
   docker ps
   ```
