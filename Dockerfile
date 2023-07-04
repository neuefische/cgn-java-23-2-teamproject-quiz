FROM openjdk:20

ENV ENVIRONMENT=prod

EXPOSE 8080

LABEL maintainer="quiz-masters@neuefische.de"

ADD backend/target/quiz-masters.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]