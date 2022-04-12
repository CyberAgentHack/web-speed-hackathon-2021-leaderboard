FROM mcr.microsoft.com/playwright:v1.20.0-focal AS development

RUN rm -rf /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# install chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add && \
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list && \
apt-get update && \
apt-get install -y google-chrome-stable

WORKDIR /app

RUN mkdir scripts
COPY package.json yarn.lock ./
COPY scripts/measure/package.json ./scripts/measure/
COPY scripts/scoring/package.json ./scripts/scoring/
COPY scripts/vrt/package.json ./scripts/vrt/
RUN yarn install --frozen-lockfile

FROM development AS production

RUN groupadd -g 1001 nodejs
RUN useradd -u 1001 --gid 1001 fastify

COPY --chown=fastify:nodejs scripts/measure ./scripts/measure
COPY --chown=fastify:nodejs scripts/scoring ./scripts/scoring
COPY --chown=fastify:nodejs scripts/vrt ./scripts/vrt
RUN yarn workspaces run build && chown -R fastify:nodejs /app

USER fastify

CMD ["yarn", "start:measure"]
