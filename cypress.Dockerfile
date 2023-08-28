FROM cypress/browsers:node18.12.0-chrome107

RUN apt-get update && apt-get install -y time libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN npm install -g pnpm@8.6.5


WORKDIR /workdir

COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm i --frozen-lockfile

ENV PATH="/workdir/node_modules/cypress/bin/:${PATH}"

COPY . .
