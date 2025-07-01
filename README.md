
# Store Microservice

## Descripción

Microservicio para la gestión de tienda desarrollado con [NestJS](https://github.com/nestjs/nest), un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.

## Requisitos previos

- Node.js (versión 20.11 o superior)
- MongoDB (versión 6.0 o superior)
- npm (incluido con Node.js)

## Instalación y configuración

### 1. Clonar el repositorio

```bash
$ git clone <url-del-repositorio>
$ cd store-microservice
```

### 2. Instalar dependencias

```bash
$ npm install
```

### 3. Configurar MongoDB

1. Instalar MongoDB Community Edition:
   - [Instrucciones de instalación para Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
   - [Instrucciones de instalación para macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-macos/)
   - [Instrucciones de instalación para Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

2. Iniciar el servicio de MongoDB:
   - Windows: El servicio debería iniciarse automáticamente después de la instalación
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. Verificar que MongoDB esté funcionando:
   ```bash
   $ mongosh
   ```

### 4. Ejecutar el proyecto

```bash
# Modo desarrollo
$ npm run start

# Modo desarrollo con recarga automática
$ npm run dev

# Modo producción
$ npm run start:prod
```

El servidor se iniciará en http://localhost:3002/api/store

### 5. Acceder a la documentación de la API

Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación de Swagger en:

```
http://localhost:3002/api/docs
```

## Estructura del proyecto

El proyecto está organizado en los siguientes módulos:

- **Products**: Gestión de productos
- **Orders**: Gestión de pedidos
- **Suppliers**: Gestión de proveedores
- **Reviews**: Gestión de reseñas
- **Dashboard**: Estadísticas de la tienda

## Ejecutar pruebas

```bash
# Pruebas unitarias
$ npm run test

# Pruebas e2e
$ npm run test:e2e

# Cobertura de pruebas
$ npm run test:cov
```
# ---------------------------------------------------------------------------------------

# Plataforma de Comercio Electrónico - Arquitectura de Microservicios (RESUMEN TODO EL PROYECTO)

## Descripción General

Este proyecto implementa una plataforma completa de comercio electrónico utilizando una arquitectura de microservicios. Cada componente está diseñado para funcionar de manera independiente, permitiendo escalabilidad, mantenimiento y desarrollo más eficientes.

## Arquitectura

![Arquitectura de Microservicios]

### Componentes Principales

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| Frontend (Next.js) | 3000 | Interfaz de usuario para clientes y tiendas |
| Microservicio de Usuarios | 3001 | Gestión de usuarios, autenticación y perfiles |
| Microservicio de Tienda | 3002 | Gestión de productos, pedidos y tiendas |

## Tecnologías Utilizadas

- **Frontend**: Next.js, React, TypeScript
- **Backend**: NestJS, TypeScript
- **Base de Datos**: MongoDB
- **Autenticación**: JWT
- **Comunicación**: REST API, TCP (microservicios)
- **Documentación API**: Swagger
- **Contenedores**: Docker (opcional)

## Microservicios

### 1. Frontend (insane)

Aplicación web construida con Next.js que proporciona la interfaz de usuario para todos los tipos de usuarios.

```bash
# Instalación
cd insane
npm install

# Ejecución
npm run dev
```

**Características principales:**
- Catálogo de productos
- Carrito de compras
- Gestión de pedidos
- Panel de administración para tiendas
- Autenticación de usuarios

### 2. Microservicio de Usuarios (microservicio-Usuario)

Gestiona la autenticación, registro y perfiles de usuarios.

```bash
# Instalación
cd microservicio-Usuario
npm install


# Ejecución
npm run start:dev
```

**Características principales:**
- Registro y autenticación de usuarios
- Gestión de perfiles
- Roles y permisos
- Recuperación de contraseña
- Comunicación por microservicios (TCP puerto 3001)

### 3. Microservicio de Tienda (store-microservice-f)

Gestiona productos, pedidos, proveedores y reseñas.

```bash
# Instalación
cd store-microservice-f
npm install

# Ejecución
npm run dev
```

**Características principales:**
- Gestión de productos
- Procesamiento de pedidos
- Gestión de proveedores
- Sistema de reseñas
- Panel de estadísticas

## Configuración de Base de Datos

Todos los microservicios utilizan MongoDB. Asegúrate de tener MongoDB instalado y ejecutándose


La base de datos predeterminada es `DbWeb` y se ejecuta en `localhost:27017`.

## Flujo de Comunicación

1. El cliente interactúa con el frontend (Next.js)
2. El frontend se comunica con los microservicios a través de API REST
3. Los microservicios se comunican entre sí mediante TCP cuando es necesario
4. Cada microservicio gestiona su propia conexión a la base de datos

## Endpoints Principales

### Microservicio de Usuarios (http://localhost:3000/api)
- **Autenticación**: `/auth/login`, `/auth/register`
- **Usuarios**: `/users`, `/users/:id`
- **Perfiles**: `/users/profile`

### Microservicio de Tienda (http://localhost:3002/api/store)
- **Productos**: `/products`, `/products/:id`
- **Pedidos**: `/orders`, `/orders/:id`
- **Proveedores**: `/suppliers`, `/suppliers/:id`
- **Reseñas**: `/reviews`, `/reviews/:id`
- **Dashboard**: `/dashboard`

## Desarrollo

### Requisitos Previos
- Node.js (v16+)
- MongoDB
- npm o yarn



