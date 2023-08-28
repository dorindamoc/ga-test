FROM node:19@sha256:bff0e689cb433913ab411af7a58253d54c7fd8c3134ffeb25287cdf24d9a5972

RUN apt-get update && apt-get install -y zip time
RUN npm install -g pnpm@8.6.5

WORKDIR /workdir/

COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm i --frozen-lockfile

COPY . ./

RUN time -po /testtime.log \
    pnpm test

ARG baseurl="/"

ARG artifact="captureWeb"
ENV ARTIFACT_PATH="products/${artifact}"

ARG version="1.1.0.0"
ENV VITE_VERSION="${version}"

RUN time -po /buildtime.log \
    pnpm vite build $ARTIFACT_PATH --base=$baseurl

# Create zip with files located at builds/public_html
# This is to not break automated deployment scripts operated by capture-operations
RUN mkdir builds
RUN mv $ARTIFACT_PATH/dist ./builds/public_html
RUN zip -r /builds.zip ./builds

RUN mv ./builds/public_html ./production
WORKDIR /workdir/production
CMD node server.cjs
