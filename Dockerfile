 #  base image

 FROM node:20-alpine

 # create work directory

 WORKDIR /app
 
 # copy package.json and copy package-lock.json
    COPY package*.json ./

# install dependencies
    RUN npm i

# copy the rest of the files
 COPY . .

 # expose port
    EXPOSE 4000

 # run the server
    CMD ["npm", "start"]
 