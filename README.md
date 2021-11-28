# WIDIS - Will Deliver It Soon

A simple using node and typescript to follow package delivery.

### Run the application

To run this application with in docker you will need *docker-compose*.

run `docker-compose up -d` to start mysql and application container.

Application will be available on http://localhost:3000 .

```typescript
interface Courier {
    id: number,
    max_capacity: number,
    current_load?: number
}
```

|method|route|data|response|
|---|---|---|---|
|GET|/couriers|{}|[Courier, Courier, ...]|
|POST|/couriers|{ id: number, max_capacity: number, current_load?: number }| Courier|
|GET|/couriers/:id|{}|Courier|
|POST|/couriers/load|{ id: number, load: number }| Courier|
|POST|/couriers/unload|{ id: number, load: number }| Courier|
|POST|/couriers/lookup|{ capacity_required: number }| [Courier, Courier, ...]|

### Stop the application

Once your application is up, you can stop it with `docker-compose down -rmi all`

### improvements & possibilities

This project is a quick start to demonstrate the possibilities of a dockerized nodeJS application. 
It has been down in a few hour and could be better in different ways. 

We may use a framework designed for web applications like Fastify or NestJS, in order to simplify 
design patterns uses. Moreover, a more specific ErrorHandler would avoid some code duplication. 
We should install a DSL library for SQL in order to avoid basic errors.
Finally, this application needs to be tested by Unit Tests and Integration Tests.