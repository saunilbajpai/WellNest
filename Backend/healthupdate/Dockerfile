FROM openjdk:22

# Set the working directory (optional but cleaner)
WORKDIR /app

# Copy the compiled JAR file
COPY target/healthupdate-0.0.1-SNAPSHOT.jar app.jar

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
