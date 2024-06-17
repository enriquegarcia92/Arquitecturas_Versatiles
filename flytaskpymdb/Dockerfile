# Usa una imagen base de Python
FROM python:3.9

# Establece variables de entorno para la ejecución en un contenedor
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Instala las dependencias de la aplicación
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código de la aplicación al contenedor
COPY . /app/

# Copia el entrypoint.sh y dale permisos de ejecución
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Puerto en el que la aplicación Django va a ejecutarse
EXPOSE 8001

# Usa entrypoint.sh como el punto de entrada
ENTRYPOINT ["/app/entrypoint.sh"]
