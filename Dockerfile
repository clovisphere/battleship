# --- SECTION: Metadata ---
ARG BUN_VERSION=1.2

FROM oven/bun:${BUN_VERSION}-alpine

LABEL maintainer="Clovis Mugaruka <clovis.mugaruka@gmail.com>"

# Define build-time arguments
ARG PORT=3000

# --- SECTION: App ---
WORKDIR /app

# Copy only what the server needs at runtime
COPY package.json server.js index.html ./
COPY public/ ./public/

# --- SECTION: Execution ---
EXPOSE ${PORT}

CMD ["bun", "run", "server.js"]
