# Start from the latest OpenJDK image
FROM openjdk:latest

# Install Maven
RUN apt-get update && apt-get install -y maven

# Set the working directory in the container
WORKDIR /opt/app

# Copy the Maven project files
COPY pom.xml .

# Copy the source code
COPY src src

# Execute Maven build to compile and package the application
RUN mvn clean install -DskipTests

# Debugging: Print the contents of the /opt/app directory
RUN ls -al /opt/app

# Refer to Maven build -> finalName
ARG JAR_FILE=target/*.jar

# Copy the JAR file into the container
COPY ${JAR_FILE} app.jar

# java -jar /opt/app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
