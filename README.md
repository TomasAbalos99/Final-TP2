# Final TP2 - Taller de Programación 2

API REST desarrollada en **Node.js + Express** para la gestión de
productos (stock) y generación de archivo CSV a partir de un servicio
externo.

------------------------------------------------------------------------

## Tecnologías utilizadas

-   Node.js
-   Express
-   Persistencia con archivo local (`database.json`)
-   Middleware de autenticación mediante `x-api-key`
-   Fetch API (nativa en Node 18+)

------------------------------------------------------------------------

## Estructura del Proyecto

    src/
      controllers/
      services/
      repository/
      models/
      routes/
      middlewares/
    tests/
    database.json

### Arquitectura en capas

-   **Controller** → Manejo de request y response
-   **Service** → Lógica de negocio
-   **Model** → Validaciones y normalización de datos
-   **Repository** → Persistencia en archivo JSON
-   **Middleware** → Autenticación

------------------------------------------------------------------------

## Instalación y ejecución

1.  Instalar dependencias:

```bash
npm install
```

2.  Crear archivo `.env` en la raíz:

```env
PORT=3000
API_KEY=supersecreta123
```

3.  Ejecutar el servidor:

```bash
npm run dev
```

Servidor disponible en:

http://localhost:3000

------------------------------------------------------------------------

## Endpoints - Productos

Base URL:

    /api/v1/productos

### Crear producto

**POST** `/api/v1/productos`

Body:

``` json
{
  "producto": "Lapiz",
  "stockAmount": 5
}
```

------------------------------------------------------------------------

### Obtener todos los productos

**GET** `/api/v1/productos`

------------------------------------------------------------------------

### Obtener producto por ID

**GET** `/api/v1/productos/:id`

------------------------------------------------------------------------

### Actualizar producto (requiere API Key)

**PUT** `/api/v1/productos/:id`

Header requerido:

    x-api-key: supersecreta123

Body:

``` json
{
  "stockAmount": 10
}
```

------------------------------------------------------------------------

### Eliminar producto (requiere API Key)

**DELETE** `/api/v1/productos/:id`

Header requerido:

    x-api-key: supersecreta123

------------------------------------------------------------------------

## Endpoint Albums CSV

### Generar CSV con los primeros 15 albums

**GET** `/api/v1/albums/csv`

Este endpoint:

-   Consume `https://jsonplaceholder.typicode.com/albums`
-   Toma los primeros 15 registros
-   Genera el archivo `albums_15.csv` en la raíz del proyecto
-   Devuelve el contenido en formato `text/csv`

------------------------------------------------------------------------

## Formato de errores

Todas las respuestas de error tienen el siguiente formato:

``` json
{
  "statusCode": 400,
  "error": "Mensaje descriptivo"
}
```

------------------------------------------------------------------------

## Tests

Se incluyen archivos `.http` dentro de la carpeta `tests/` para probar
los endpoints utilizando la extensión REST Client de VS Code.

