FROM node:22-alpine
RUN apk add --no-cache python3 make g++ cairo-dev jpeg-dev pango-dev giflib-dev chromium nss freetype harfbuzz ca-certificates ttf-freefont
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx vite build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npx", "tsx", "server/_core/index.ts"]
