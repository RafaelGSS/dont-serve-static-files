FROM node:alpine

ARG PORT=3000
ENV PORT="$PORT"

WORKDIR /app
COPY . /app
RUN npm install

EXPOSE $PORT

CMD ["index.js"]
