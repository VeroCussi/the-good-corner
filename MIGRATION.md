# Migración de SQLite a PostgreSQL

## Resumen de cambios realizados

### 1. Dependencias actualizadas
- Removido: `sqlite3` y `@types/sqlite3`
- Agregado: `pg` y `@types/pg`

### 2. Configuración de base de datos
- Actualizado `backend/src/config/db.ts` para usar PostgreSQL
- Agregadas variables de entorno para configuración

### 3. Docker Compose
- Agregado servicio PostgreSQL
- Configuradas variables de entorno
- Agregado volumen persistente para datos

## Pasos de migración

### Paso 1: Instalar nuevas dependencias
```bash
cd backend
npm install
```

### Paso 2: Exportar datos de SQLite (IMPORTANTE: hacer antes de cambiar a PostgreSQL)
```bash
cd backend
npm run export-data
```

### Paso 3: Levantar PostgreSQL con Docker
```bash
# Desde el directorio raíz del proyecto
docker-compose up db -d
```

### Paso 4: Importar datos a PostgreSQL
```bash
cd backend
# Configurar variables de entorno
export DB_HOST=localhost
export DB_PORT=5432
export DB_USERNAME=postgres
export DB_PASSWORD=password
export DB_NAME=good_corner

npm run import-data
```

### Paso 5: Verificar la migración
```bash
# Conectarse a PostgreSQL para verificar
docker exec -it $(docker-compose ps -q db) psql -U postgres -d good_corner
```

## Variables de entorno necesarias

Para desarrollo local, crear un archivo `.env` en `backend/`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=good_corner
NODE_ENV=development
```

## Comandos útiles

### Reiniciar completamente
```bash
# Parar y eliminar contenedores
docker-compose down -v

# Reconstruir y levantar
docker-compose up --build
```

### Ver logs de PostgreSQL
```bash
docker-compose logs db
```

### Backup de PostgreSQL
```bash
docker exec $(docker-compose ps -q db) pg_dump -U postgres good_corner > backup.sql
```

## Notas importantes

1. **Backup**: Siempre hacer backup de `good_corner.sqlite` antes de migrar
2. **Sincronización**: TypeORM está configurado con `synchronize: true` para desarrollo
3. **Producción**: En producción, usar migraciones en lugar de `synchronize: true`
4. **Volumen**: Los datos de PostgreSQL se persisten en el volumen `postgres_data`

## Troubleshooting

### Error de conexión a PostgreSQL
- Verificar que el contenedor de PostgreSQL esté corriendo
- Verificar las variables de entorno
- Verificar el puerto 5432

### Error en importación de datos
- Verificar que los archivos JSON de exportación existan
- Verificar que PostgreSQL esté inicializado
- Revisar los logs para errores específicos 