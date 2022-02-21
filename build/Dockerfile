FROM node:12.16 as builder

COPY .ssh /root/.ssh
RUN chmod 600 /root/.ssh/id_rsa

WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
ADD .yarnrc /app/.yarnrc

RUN yarn
ADD . /app
RUN yarn lint
RUN yarn build

# +++++++++++++++++++++++++++++++++++++++++++++++++++
FROM nginx:stable
RUN mkdir -p web/logs

COPY --from=builder /app/dist/ /web/dist/
ADD build/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
