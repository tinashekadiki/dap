FROM node:14-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm cache clean --force
RUN npm install
RUN npm install -g @angular/cli@9.1.7
# If you are building your code for production
COPY . .
CMD ng serve --host 0.0.0.0 --port 81 --disable-host-check

# Bundle app source
# COPY . .

# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY --from=build /usr/src/app/dist/dealerform /usr/share/nginx/html
