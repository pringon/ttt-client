FROM node:10
MAINTAINER Dan Goje <gojedan98@gmail.com>

# Copy code.
ADD . /opt/server
WORKDIR /opt/server

# Install dependencies and build app.
RUN npm install
RUN npm run build

# Remove unecessary files.
RUN rm -rf src node_modules

# Install production dependencies.
RUN npm ci --only=production

# Expose port.
EXPOSE 3000

# Start app.
CMD [ "npm", "start" ]
