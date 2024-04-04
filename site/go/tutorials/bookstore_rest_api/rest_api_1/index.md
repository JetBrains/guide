---
type: TutorialStep
date: 2024-03-20
title: "Creating Models: Book & Author"
topics:
  - go
  - web
author: mm
subtitle: "Defining models and establishing database connection."
thumbnail: ./thumbnail.png
---

## Database Connection

Let's first create a database connection.
But before that you need to create
additional directories under the `core`.

![additional_dir](./images/additional_directories.png)

- `abstract` - Contains interface, part of the interaction layer in a database-oriented application,
  often in combination with an ORM library like gorm.
- `controllers` - Stores all the HTTP handlers and routes.
- `database` - Initializing db connection and GORM models.
- `util.go` - re-usable code shared across the application.

Create `db.go` file under `database` directory.

![image1](./images/image1.png)

_db.go_

```go
package database

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
	"strconv"
)

type DBClient interface {
	DBMigrate() error
}

type Client struct {
	db *gorm.DB
}

func NewClient() (DBClient, error) {
	databaseHost := os.Getenv("DB_HOST")
	databaseUsername := os.Getenv("DB_USERNAME")
	databasePassword := os.Getenv("DB_PASSWORD")
	databaseName := os.Getenv("DB_NAME")
	databasePort := os.Getenv("DB_PORT")
	dbPort, err := strconv.Atoi(databasePort)
	if err != nil {
		log.Fatal("Invalid DB Port")
	}

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=%s",
		databaseHost, databaseUsername, databasePassword, databaseName, dbPort, "disable")

	dbInfo, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	client := Client{db: dbInfo}
	return client, nil
}

func (c Client) DBMigrate() error {
	return nil

}

func (c Client) CloseDBConnection() {
	db, err := c.db.DB()
	if err != nil {
		panic("Failed to close connection from database")
	}
	db.Close()
}

```

1. `type DBClient` interface - This interface defines what methods a DBClient should have. In this case, it is DBMigrate() error, which is a method for migrating the database. The exact implementation of DBMigrate() is left to the structs that implement the DBClient interface.
   <br><br>
2. `type Client` struct - This struct contains a pointer to a GORM DB object. This is the main object that the application will use to interact with the database.
   <br><br>
3. `func NewClient() (DBClient, error)` - This function initializes a new Client object. It reads environment variables to get the database connection details (host, username, password, database name, and port). It then uses these details to open a new connection to the Postgres database. If successful, it returns a client that implements the DBClient interface (since Client struct implements DBMigrate() method from DBClient interface). If not successful, it returns an error.
   <br><br>
4. `func (c Client) DBMigrate() error` - This is a "placeholder" method for the database migration operation. In this structure, it just returns nil signifying no error. However, in a real application, you would put the code to migrate your database here.
   <br><br>
5. `func (c Client) CloseDBConnection()` - This method is closing the database connection. It attempted to access the general SQL database handle and then close it off. If it fails to get the handle, it panics with an error message.

Next, make sure to update the environment variables.

```go
databaseHost := os.Getenv("DB_HOST")
databaseUsername := os.Getenv("DB_USERNAME")
databasePassword := os.Getenv("DB_PASSWORD")
databaseName := os.Getenv("DB_NAME")
databasePort := os.Getenv("DB_PORT")
```

![image2](./images/image2.png)
