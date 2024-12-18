FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
RUN rm -rf .git
RUN rm -rf .vscode
RUN rm -rf .env
EXPOSE 8080
CMD ["npm", "run", "serve"] 