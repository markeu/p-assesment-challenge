# Backend-Assesment-Case-Study

## Technologies

The major technologies used in this project are:

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [NestJS](https://nestjs.com/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)

## Getting Started

To run this project locally, follow the instructions below.

### Prerequisites

Make sure you have the following software installed on your machine:

- NodeJS
- NPM
- Docker

### Running Locally with Docker

If Docker is already installed and running on your machine, you can start the project by running the following command:

```sh
docker-compose up
```

This command will start the NestJS server in development mode with hot reloading support and a Redis server. The application will be accessible locally at `http://localhost:4000/status`.


To test the API locally, you can make a GET request to the following endpoint:

```
http://localhost:4000/ranking?language=javascript&limit=20&date=2023-01-01
```

### Running on Kubernetes

Follow the steps below to deploy the application on Kubernetes and access it.

Step 1: Build and Push Docker Image

- Build the Docker image for the application. Run the following command in the directory containing the DockerFile:

  ```sh
  docker build -t your-image-name:your-tag .
  ```

  Replace `your-image-name` and `your-tag` with your desired image name and tag. This command will build the Docker image based on the instructions in the Dockerfile and tag it with the specified name and tag.

- Push the Docker image to a container registry of your choice. This step allows Kubernetes to pull the image when deploying the application.

Step 2: Deploy Redis

To deploy Redis, create a Redis deployment and service using the provided YAML files:

```sh
kubectl apply -f redis-deployment.yaml
kubectl apply -f redis-service.yaml
```

This will create a Redis deployment and service, exposing port 6379.

Step 3: Deploy Application

To deploy the application, create an application deployment and service using the provided YAML files:

```sh
kubectl apply -f app-deployment.yaml
kubectl apply -f app-service.yaml
```

This will create a deployment and service for the application, exposing port 4000.

Step 4: Access the Application

Once the deployment and service are created, you can access the application by following these steps:

- Run the following command to get the external IP address of any Kubernetes node:

  ```sh
  kubectl get nodes -o wide
  ```

- Locate the external IP address under the `EXTERNAL-IP` column.

- Access the application by navigating to `http://<external-ip>:4000` in a web browser, replacing `<external-ip>` with the actual external IP address of the Kubernetes node.

- To access the Redis service, use the following connection details within your application:
  - Host: `redis-service`
  - Port: `6379`

<p align="center">
  <img src="diagram.png" alt="Architecture Diagram" width="500" />
</p>

