# Start from a Node.js 16 (LTS) image 
#FROM nikolaik/python-nodejs:python2.7-nodejs12-alpine

#RUN apk add g++ make py3-pip

#LABEL key="value"

# Specify the directory inside the image in which all commands will run 
#WORKDIR /usr/src/app

# Copy package files and install dependencies 
#COPY dist ./

#RUN npm install

#EXPOSE 8000

# The default command to run when starting the container 
#CMD [ "npm", "start" ]

# Start from a Node.js 16 (LTS) image 
#FROM node:16
FROM nikolaik/python-nodejs:python2.7-nodejs12-alpine

RUN apk add g++ make py3-pip

LABEL project="seneca-training-apigateway"

# Specify the directory inside the image in which all commands will run 
WORKDIR /usr/src/app

# Copy package files and install dependencies 
COPY dist ./

RUN npm install

EXPOSE 8000

# The default command to run when starting the container 
CMD [ "npm", "start" ]
