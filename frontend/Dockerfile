FROM node:20-alpine

WORKDIR /app

# Copia os ficheiros de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o resto do projeto
COPY . .

# Expõe a nova porta que definimos no server.js
EXPOSE 4000

# Comando para iniciar o servidor (usando o nodemon que configuraste)
CMD ["npm", "run", "dev"]