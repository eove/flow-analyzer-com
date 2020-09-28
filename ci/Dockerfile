FROM node:10.22

ARG CI_TOKEN
WORKDIR /usr/src/app
COPY . .

RUN ./ci/install.sh "${CI_TOKEN}"
RUN npm test
