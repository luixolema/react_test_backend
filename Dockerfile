FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./

ARG DATABASE_URI
ARG MONGODB_DEBUG
ARG COGNITO_USER_POOL_ID
ARG COGNITO_CLIENT_ID

ENV DATABASE_URI $DATABASE_URI
ENV MONGODB_DEBUG $MONGODB_DEBUG
ENV COGNITO_USER_POOL_ID $COGNITO_USER_POOL_ID
ENV COGNITO_CLIENT_ID $COGNITO_CLIENT_ID

RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main"]