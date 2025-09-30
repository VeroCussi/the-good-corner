# Docker Setup for The Good Corner

Este proyecto incluye configuración Docker para ejecutar tanto el backend como el frontend en contenedores.

## Prerrequisitos

- Docker
- Docker Compose

## Estructura de archivos Docker

```
├── backend/
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile
│   └── .dockerignore
└── docker-compose.yml
```

## Comandos básicos

### Construir y ejecutar todo el proyecto

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build
```

### Comandos individuales

```bash
# Solo construir las imágenes
docker-compose build

# Ejecutar servicios
docker-compose up

# Parar servicios
docker-compose down

# Ver logs
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend

# Ver estado:
docker-compose ps
```

### Construir servicios individualmente

```bash
# Backend
cd backend
docker build -t good-corner-backend .

# Frontend
cd frontend
docker build -t good-corner-frontend .
```

## Acceso a la aplicación

- **Frontend**: http://localhost (puerto 80)
- **Backend**: http://localhost:4000 (puerto 4000)

## Notas importantes

1. **Base de datos**: El archivo SQLite se monta como volumen para persistir los datos
2. **Frontend**: Usa Nginx para servir los archivos estáticos en producción
3. **Backend**: Ejecuta con ts-node-dev para desarrollo, pero se puede optimizar para producción
4. **Network**: Ambos servicios están en la misma red Docker para comunicación interna

## Optimización para producción

Para el backend en producción, considera:

1. Compilar TypeScript a JavaScript
2. Usar `node` en lugar de `ts-node-dev`
3. Añadir health checks
4. Configurar variables de entorno apropiadas

### Ejemplo de Dockerfile optimizado para backend en producción:

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/good_corner.sqlite ./
EXPOSE 4000
CMD ["node", "dist/index.js"]
```

## Troubleshooting

- Si hay problemas de permisos con SQLite, verifica los permisos del archivo
- Para desarrollo, puedes montar el código fuente como volumen para hot reload
- Verifica que los puertos 80 y 4000 no estén siendo usados por otros servicios 