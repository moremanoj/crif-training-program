# Start from a Node.js 16 (LTS) image 
FROM node:16

LABEL key="value"

# Specify the directory inside the image in which all commands will run 
WORKDIR /usr/src/app

# Copy package files and install dependencies 
COPY dist/* ./

EXPOSE 8000

# The default command to run when starting the container 
CMD [ "npm", "start" ]
