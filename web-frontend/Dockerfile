FROM node:18-alpine

WORKDIR /app/

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY tsconfig.json /app/

RUN npm install
RUN npm run build
CMD ["npx", "serve", "-s", "build", "-l", "8000"]