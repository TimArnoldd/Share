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



### DB-Backups

Database backups can be made by dumping the entire database to an SQL file. The file can then be loaded in the database container for rolling back or migrating to a other server/container.

The commands need to be run while the container is running. The `backup.sql` file will be saved to the current working directory on the host machine.



Command to create the backup file:

```sh
docker exec share-db mysqldump -u root -prootpassword --all-databases > backup.sql
```



Command to apply the backup:

```sh
docker exec -i share-db mysql -u root -prootpassword < backup.sql
```

