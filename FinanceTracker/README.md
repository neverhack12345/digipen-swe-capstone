# Financial Tracker Back-End

## How to Use

### Install dependencies

Install via Maven:

```bash
mvnw.cmd install
```

### Update application.properties

Update configuration in application.properties located in FinanceTracker\src\main\resources\application.properties:

#### Database configuration
- spring.datasource.url=jdbc:mariadb://localhost:3306/<database>
- spring.datasource.username=<username>
- spring.datasource.password=<password>
- spring.datasource.driver-class-name=<driver>

#### Hibernate configuration

Set spring.sql.init.mode to always to create and seed database on every server start based on schema.sql and data.sql, else set to none.

### Run Spring Boot

Run via Maven:

```bash
mvnw.cmd spring-boot:run
```

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
