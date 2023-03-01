FROM node:latest 

WORKDIR /usr/src/api 

COPY . .

COPY ./prod.env ./.env 

RUN yarn install --silent --ignore-optional

RUN yarn build 

EXPOSE 3333

ENV PORT 3333

CMD ["yarn","start:prod"] 