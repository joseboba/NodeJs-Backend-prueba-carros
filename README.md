
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
- GET      localhost:4000/user/renew
- GET      localhost:4000/user/get/:id
- DELETE   localhost:4000/user/:id

## Descripcion de rutas

```
Carros
```
- #### `POST      localhost:4000/car/`
Ruta para crear un carro y automaticamente autoasignado al usuario de la sesion activa
- #### `GET       localhost:4000/car/findAll`
Ruta para obtener todos los carros relacionados con el usuario de sesión activa
- #### `GET       localhost:4000/car/search/:placa`
Ruta para hacer una busqueda mediante la placa de un carro y obtener su informacion
- #### `PUT       localhost:4000/car/:id`
Ruta para actualizar un carro mediante el ID
- #### `DELETE    localhost:4000/car/:id`
Ruta para eliminar un carro mediante el ID

```
Usuarios
```

- #### `POST     localhost:4000/user/`
Ruta para crear un usuario
- #### `POST     localhost:4000/user/auth`
Ruta para la autenticación del usuario (login)
- #### `PUT      localhost:4000/user/:id` 
Ruta para la actualización del usuario mediante el ID
- #### `PUT      localhost:4000/user/secret/:id`
Ruta para la actualización de la contraseña del usuario mediante el ID
- #### `GET      localhost:4000/user/renew`
Ruta para la generación de un nuevo token
- #### `GET      localhost:4000/user/get/:id`
Ruta para la obtencion de un usuario mediante el ID
- #### `DELETE   localhost:4000/user/:id`
Ruta para la eliminación del usuario mediante el ID



## npm run dev
Para levantar el servicio en modo de desarrollo en el puerto 4000

## npm install
Es necesario para poder instalar los modulos de node y que el servicio pueda levantar.

## Base de datos
Las credenciales son manipulables en el archivo database/config.js
La base de datos debe de ser creada
```
CREATE DATABASE carros
```


