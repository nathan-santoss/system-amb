# Usa uma versão leve do Node.js
FROM node:20-alpine

# Define a pasta de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código do front-end
COPY . .

# Informa qual porta o Vite (React) usa
EXPOSE 5173

# Inicia o Vite expondo para a rede externa do container
CMD ["npm", "run", "dev", "--", "--host"]