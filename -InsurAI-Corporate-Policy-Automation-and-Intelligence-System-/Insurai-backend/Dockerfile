# Multi-stage build for optimized image size
FROM maven:3.9-eclipse-temurin-17-alpine AS build

WORKDIR /app

# Copy pom.xml and download dependencies (caching layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render will provide PORT env variable)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "-Dserver.port=${PORT:-8080}", "app.jar"]
```

## 2. .dockerignore
```
target/
!target/*.jar
.mvn/
mvnw
mvnw.cmd
*.log
.env
.git
.gitignore
.DS_Store
*.md
