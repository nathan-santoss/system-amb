# Usa uma versão leve do Node.js
FROM node:20-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (para o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código do back-end
COPY . .

# Informa qual porta o back-end vai usar
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]