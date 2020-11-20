
## Rutas Globales

- localhost:4000/car
- localhost:4000/user

## Rutas con autenticación por Token
```
Carros
```
- POST      localhost:4000/car/
- GET       localhost:4000/car/findAll
- GET       localhost:4000/car/search/:placa
- PUT       localhost:4000/car/:id
- DELETE    localhost:4000/car/:id

```
Usuarios
```

- PUT      localhost:4000/user/:id 
- PUT      localhost:4000/user/secret/:id 
- GET      localhost:4000/user/renew/:id 
- GET      localhost:4000/user/get/:id
- DELETE   localhost:4000/user/:id


## `npm run dev`
Para levantar el servicio en modo de desarrollo en el puerto 4000

## `npm install`
Es necesario para poder instalar los modulos de node y que el servicio pueda levantar.

## `Base de datos`
Las credenciales son manipulables en el archivo database/config.js
La base de datos debe de ser creada
```
CREATE DATABASE carros
```


