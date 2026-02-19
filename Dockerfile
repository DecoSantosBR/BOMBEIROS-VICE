# Use Node.js 22 base image
FROM node:22-slim

# Enable corepack and FORCE correct pnpm version
RUN corepack enable \
 && corepack prepare pnpm@10.15.1 --activate

# Install Chromium and required dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    libnspr4 \
    libnss3 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libgtk-3-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxkbcommon0 \
    libxshmfence1 \
    libasound2 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libpango-1.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    fonts-liberation \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app

# Copy only dependency files first (better Docker cache usage)
COPY package.json pnpm-lock.yaml ./

# Install dependencies (frozen will now work)
RUN pnpm install --frozen-lockfile

# Copy rest of project
COPY . .

# Build application
RUN pnpm run build

# Puppeteer configuration
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 3000

CMD ["pnpm", "run", "start"]
