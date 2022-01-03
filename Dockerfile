# ============= #
# === Build === #
# ============= #
FROM node:lts-alpine AS build

WORKDIR /service-cms

# First retrieve the package.json and install all the dependencies.
# This eliminates the need for re-installing all of the packages when the application code changes.
COPY package*.json ./
RUN npm install

# Copy all of the source files into our image
COPY . ./

# Run unit-tests
RUN npm run test:unit

# Build the application
RUN npm run build

# ================== #
# === Production === #
# ================== #
FROM nginx:stable-alpine AS production

# Copy the contents of the local default.conf into the nginx default.conf
COPY --from=build /service-cms/default.conf /etc/nginx/conf.d/default.conf

# Copy the compiled application into nginx
COPY --from=build /service-cms/dist/ /usr/share/nginx/html/

# Run nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
