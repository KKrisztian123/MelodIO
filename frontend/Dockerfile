FROM node:18-alpine
WORKDIR /app/frontend
COPY package.json .
COPY package-lock.json .
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm
RUN npm i
# COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--host"]