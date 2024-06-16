# Usa una imagen base de Node.js para el desarrollo de la aplicación
FROM node:20 AS development

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

ENV VITE_URL_API=$VITE_URL_API
ENV VITE_BASE_ROUTES=$VITE_BASE_ROUTES
ENV VITE_BASE_PORT=$VITE_BASE_PORT

# Expon el puerto 5176 para Vite
EXPOSE $BASE_CONFIG_PORT

# Comando por defecto para ejecutar Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
