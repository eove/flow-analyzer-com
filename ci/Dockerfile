FROM node:10.22

WORKDIR /usr/src/app
COPY . .

RUN ./ci/install.sh
RUN npm test
