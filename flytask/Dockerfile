FROM openjdk:latest

# Refer to Maven build -> finalName
ARG JAR_FILE=target/*.jar

# cd /opt/app
WORKDIR /opt/app

# Copy the JAR file into the container
COPY ${JAR_FILE} app.jar

# Debugging: Print the contents of the /opt/app directory
RUN ls -al /opt/app

# java -jar /opt/app/app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
