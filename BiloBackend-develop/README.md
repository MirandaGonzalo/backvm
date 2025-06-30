# Bilo's Backend

Este es el backend para el proyecto **Bilo**, desarrollado con **NestJS**, **Prisma** y **PostgreSQL**. A continuación, se explica cómo ejecutar el proyecto, configurar el entorno y las dependencias necesarias.

## Prerequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **npm**: Viene con Node.js
- **PostgreSQL**: Debes tener una base de datos PostgreSQL configurada (local o en un servicio en la nube como Render)
- **Prisma**: Para interactuar con la base de datos

## Configuración del Proyecto

### Paso 1: Clonar el Repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu_usuario/bilo-backend.git
cd bilo-backend
```

### Paso 2: Instalar Dependencias

Instala todas las dependencias del proyecto utilizando npm:

```bash
npm install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega la configuración para conectar el backend a tu base de datos PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/base_de_datos?schema=public"
```

- Asegúrate de reemplazar los valores `usuario`, `contraseña`, `host`, `puerto` y `base_de_datos` con los datos correctos de tu base de datos.

### Paso 4: Generar Prisma Client

Ejecuta el siguiente comando para generar Prisma Client, que es utilizado para interactuar con la base de datos:

```bash
npx prisma generate
```

### Paso 5: Realizar Migraciones

Si es necesario, aplica las migraciones de la base de datos para crear las tablas según tu esquema:

```bash
npx prisma migrate dev --name init
```

### Paso 6: Iniciar el Servidor

Finalmente, para iniciar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm run start:dev
```

El backend debería estar corriendo en `http://localhost:3000` de forma predeterminada.

## Endpoints Disponibles

### **Crear Usuario**

- **Método**: `POST`
- **Ruta**: `/usuario`
- **Cuerpo**:

```json
{
  "nombre": "Juan Perez",
  "email": "juan@example.com",
  "contraseña": "contraseña123"
}
```

### **Obtener Usuario por ID**

- **Método**: `GET`
- **Ruta**: `/usuario/:id`
- **Respuesta**:

```json
{
  "id": 1,
  "nombre": "Juan Perez",
  "email": "juan@example.com"
}
```

## Testing

### Paso 1: Instalar dependencias de test

Para ejecutar las pruebas, primero instala las dependencias necesarias:

```bash
npm install --save-dev jest @nestjs/testing
```

### Paso 2: Ejecutar pruebas

Ejecuta las pruebas utilizando el siguiente comando:

```bash
npm run test
```

### GitHub Actions

Este proyecto tiene configurado un flujo de trabajo en **GitHub Actions** para verificar que el servidor corra correctamente antes de subir cambios a la rama `develop`.

## Notas

- Asegúrate de que el servidor de base de datos esté en funcionamiento antes de intentar realizar operaciones con Prisma.
- Si encuentras algún error relacionado con Prisma, asegúrate de haber ejecutado correctamente `prisma generate`.
