

### Dependencies

- Node
- Yarn
- Docker-compose

### How to run locally?

```sh
yarn
yarn run start_db
yarn start

```
- [Here](https://documenter.getpostman.com/view/3683187/UVXdPK8c) is a simple postman documentation of the endpoints

### Code Overview

- [MySQL Docker Image](https://hub.docker.com/_/mysqls) was the choice of DB
- I have used the[PBF Approach](https://phauer.com/2020/package-by-feature/) for structing the file
- I have used the [JSend](https://github.com/omniti-labs/jsend) specification in returning success and error messages in a consistent format
- Abstraction was heavily used
- There were two entities in this project hence two "services". Although they're more or less of the same descendant (requirement)
- Typescript was used adopting an OOP paradigm
- Some principles of SOLID were applied
- Some Design patterns were used (Singleton, Facade, Repository amongst others)
- `src/clients/mysql` contains the connection code and the schema
- `src/services` contains the services and also the Daos (Data access object) which helps abstracts the complexity of services directly making database calls but instead an indirection 
- Used prepared query to reduce the risk of SQL Injection
- `src/routes/v1/tasklists/tasklists.test.ts` and `src/routes/v1/tasklists/tasklists.test.ts` have their tests in it. 
- API was implemented as Lambda functions using Serverless framework
- ORM was not used
- API Versioning was used

### ENV Content

- Create .env file in the root directory and put the content in it

```
MYSQL_DATABASE=dataminr
MYSQL_HOSTNAME=localhost
MYSQL_USER=root
MYSQL_PASSWORD=abc123
```

### Things i would have done
- Write more tests. Both unit and integration tests
- Validation, Authentication, Authorization
- Add seed data for the tests so as to be alot easier to setup up standalone tests