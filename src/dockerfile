# Usar una imagen oficial de Node.js como base
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm ci

# Copiar el resto del código fuente al directorio de trabajo
COPY . .

# Construir el proyecto Angular en modo de producción
RUN npm run build -- --prod --output-path=dist

# Utilizar una imagen oficial de NGINX para servir la aplicación
FROM nginx:1.21

# Copiar la configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de la aplicación construida a la imagen de NGINX
COPY --from=0 /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para que el contenedor sea accesible
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
