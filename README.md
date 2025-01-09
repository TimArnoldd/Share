# Share (WIP)
A system to easily share things



## Applications

- [Backend](./backend) ([README.md](./backend/README.md))
- [Web-Frontend](./web-frontend) ([README.md](./web-frontend/README.md))



## Docker Startup

You can use Docker Compose to easily start the entire application or host it on any machine, that supports Docker Compose:

- Building the app: `docker compose build`
- Starting the containers: `docker compose up -d`
  - `-d` for detached
- Stopping (and deleting) the containers: `docker compose down`



## Docker Volume Backup

In order to backup the `db` volume you can use the following command:

```shell
docker run --rm --volumes-from db -v "%cd%":/backup ubuntu tar cvf /backup/backup.tar /var/lib/mysql
```



For restoring a backup the `mysql`-container needs to be already existing. The containers for the share application can be created with the command: `docker compose create`

The command for restoring the `db` volume is as follows:

```shell
docker run --rm --volumes-from db -v "%cd%":/backup ubuntu bash -c "cd /var && tar xvf /backup/backup.tar --strip 1
```



For Unix systems the part `"%cd%"` needs to be replaced with `$(pwd)`.
