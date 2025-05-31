FROM node:22-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar código fonte
COPY . .

# Script para criar .env dinamicamente e iniciar a aplicação
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "NEXT_PUBLIC_API_URL=$API_URL" > /app/.env.local' >> /app/start.sh && \
    echo 'yarn build' >> /app/start.sh && \
    echo 'yarn start' >> /app/start.sh && \
    chmod +x /app/start.sh

# Expor porta
EXPOSE 3000

# Usar o script de inicialização
CMD ["/app/start.sh"]