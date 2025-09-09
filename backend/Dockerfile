FROM node:24

#install application dependencies
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
CMD [ "npm", "start" ]
