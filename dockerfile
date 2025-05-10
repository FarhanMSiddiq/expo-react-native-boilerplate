
FROM node:18.18.2
RUN npm install -g expo-cli
WORKDIR /app

COPY .env .env

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG EXPO_PORT=8081
EXPOSE $EXPO_PORT

CMD ["expo", "start", "--port", "$EXPO_PORT", "--tunnel"]
