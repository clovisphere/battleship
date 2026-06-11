FROM oven/bun:1.2-alpine
WORKDIR /app
COPY package.json server.js index.html ./
COPY public/ ./public/
EXPOSE 3000
CMD ["bun", "run", "server.js"]
