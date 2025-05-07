# Share
A system to easily share things

### Applications

- [Client/Frontend](./client) ([README.md](./client/README.md))
- [Server/Backend](./server) ([README.md](./server/README.md))

### Use correct node version

The node version for this project is saved in the `.nvmrc` file. Please install and use this version with the following commands:

```sh
nvm install $(cat .nvmrc)
```

```sh
nvm use $(cat .nvmrc)
```

### Deployment

This application is containerized with Docker. Docker Compose is configured so that the application can run on a VPS or a self hosted server with minimal setup (e. g. for HTTPS).

The following containers are used:

- share-client: client application, frontend
- share-server: server application, backend
- share-db: MySQL database for saving everything
- share-caddy: reverse-proxy for routing and automatic HTTPS configuration
  - Caddy automatically requests SSL certificates and renews them if necessary. It also redirects any HTTP requests to HTTPS.



For deploying the application on a server, do the following:

1. Clone the app from GitHub
2. Run `docker-compose up -d`



#### Commands

Build application:

```sh
docker-compose build
```

Build without cache:

```sh
docker-compose build --no-cache
```



Start application:

```sh
docker-compose up -d
```



Shutdown application:

```sh
docker-compose down
```

Shutdown application and remove all volumes (**WILL DELETE DATA**):

```sh
docker-compose down -v
```



When restarting, the following error might appear: `ERROR: for [service] 'ContainerConfig'`. If that error comes up, make sure that all services are shut down:

```sh
docker-compose down
```

When starting the application without the `-d` flag and cancelling with `ctrl + c` afterwards, it might happen that some services like caddy won't get shut down.
