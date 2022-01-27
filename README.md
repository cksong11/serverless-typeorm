# serverless-nestJS-typeORM-crud

##### This is example how to nestjs using the serverless framework
  - TypeORM
  - MySql
  - CRUD
  
## setup mysql connection in serverless.yml
```
# Custom Variables
custom:
  ...
  mysqlHost:
    local: localhost
  mysqlUser:
    local: user
  mysqlPassword:
    local: password
  mysqlDatabase:
    local: dbname
  mysqlPort:
    local: '3306'
```


## Development

```
$ npm run sls:offline 

Serverless: ANY /api/users

Serverless: Offline listening on http://localhost:3000
```

## OpenAPI
api.yaml
