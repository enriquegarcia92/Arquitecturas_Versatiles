# Start from Ubuntu image
FROM ubuntu:latest

# Install necessary packages
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    maven

# Set the working directory
WORKDIR /opt/app

# Copy the Maven project files
COPY pom.xml .

# Copy the source code
COPY src src/

# Build the application
RUN mvn clean install -DskipTests

# Refer to Maven build -> finalName
ARG JAR_FILE=target/*.jar


# cp target/spring-boot-web.jar /opt/app/app.jar
COPY ${JAR_FILE} app.jar

# java -jar /opt/app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]
