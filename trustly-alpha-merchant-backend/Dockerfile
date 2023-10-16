FROM --platform=linux/amd64 node:18

#  Navigate to the container working directory 
WORKDIR /usr/src/app
#  Copy package.json
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]