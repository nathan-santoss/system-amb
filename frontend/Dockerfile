FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Mudamos de 'npm ci' para 'npm install' para recalcular as dependências do Tailwind v4
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]