FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom and sources
COPY pom.xml .
COPY src ./src

# Build the jar using Maven from the image
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
