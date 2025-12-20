# call the VITE_API_URL in the "args" section under the "frontend" in the docker-compose.yml file
# The variable $VITE_API_URL represents the "ARG VITE_API_URL" called

FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]