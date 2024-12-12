FROM node:18-alpine

WORKDIR /app/

COPY db/ /app/db
COPY routes/ /app/routes
COPY index.ts /app/
COPY package.json /app/
COPY tsconfig.json /app/

RUN npm install

CMD ["npm", "start"]