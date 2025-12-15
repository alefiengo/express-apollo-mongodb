# express-apollo-mongodb

API GraphQL para gestión de tareas construida con Express, Apollo Server y MongoDB.

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (local o remoto)
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd express-apollo-mongodb
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

Edita el archivo `.env` con tu configuración:
```
MONGODB_URI=mongodb://localhost:27017/tasks
PORT=3000
```

## Uso

### Modo Desarrollo

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

GraphQL Playground estará disponible en `http://localhost:3000/graphql`

### Usando GraphQL Playground

Una vez que el servidor esté corriendo, abre tu navegador en `http://localhost:3000/graphql`. Verás una interfaz interactiva donde puedes:

1. Escribir queries y mutations en el panel izquierdo
2. Ver los resultados en el panel derecho
3. Explorar el schema en la pestaña "DOCS" o "SCHEMA"

Ejemplo básico para empezar:

```graphql
# Crear tu primera tarea
mutation {
  createTask(task: {
    title: "Aprender GraphQL"
    description: "Practicar con queries y mutations"
  }) {
    id
    title
    description
  }
}

# Ver todas las tareas
query {
  getAllTasks {
    id
    title
    description
  }
}
```

### Producción

```bash
node app.js
```

## API GraphQL

### Queries

**Obtener todas las tareas:**
```graphql
query {
  getAllTasks {
    id
    title
    description
  }
}
```

**Obtener una tarea específica:**
```graphql
query {
  getTask(id: "64f1a2b3c4d5e6f7g8h9i0j1") {
    id
    title
    description
  }
}
```

### Mutations

**Crear una tarea:**
```graphql
mutation {
  createTask(task: {
    title: "Mi nueva tarea"
    description: "Descripción de la tarea"
  }) {
    id
    title
    description
  }
}
```

**Actualizar una tarea:**
```graphql
mutation {
  updateTask(
    id: "64f1a2b3c4d5e6f7g8h9i0j1"
    task: {
      title: "Tarea actualizada"
      description: "Nueva descripción"
    }
  ) {
    id
    title
    description
  }
}
```

**Eliminar una tarea:**
```graphql
mutation {
  deleteTask(id: "64f1a2b3c4d5e6f7g8h9i0j1")
}
```

## Estructura del Proyecto

```
.
├── app.js              # Configuración del servidor Express y Apollo
├── db.js               # Conexión a MongoDB
├── typeDefs.js         # Definiciones de tipos GraphQL
├── resolvers.js        # Lógica de las operaciones CRUD
├── models/
│   └── Task.js         # Modelo de datos de tarea
├── package.json
└── README.md
```

## Modelo de Datos

### Task
- `id`: ID (generado automáticamente)
- `title`: String (requerido, no puede estar vacío)
- `description`: String (opcional)

## Validaciones

- El título es obligatorio y no puede estar vacío
- Los espacios en blanco al inicio y final del título se eliminan automáticamente
- Se valida que el ID sea válido al buscar, actualizar o eliminar tareas
- Se devuelven errores descriptivos cuando una operación falla

## Tecnologías Utilizadas

- **Express.js**: Framework web
- **Apollo Server**: Servidor GraphQL
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **dotenv**: Manejo de variables de entorno

## Licencia

ISC
