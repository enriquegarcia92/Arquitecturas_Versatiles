# Start from a base image with Maven and Java installed
FROM maven:3.8.4-openjdk-17-slim AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .

# Copy the source code
COPY src src/

# Build the application
RUN mvn clean install -DskipTests

# Start from a new base image
FROM openjdk:17-slim


# Set the working directory
WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=builder /app/target/*.jar app.jar

# Specify the entry point
ENTRYPOINT ["java", "-jar", "app.jar"]
