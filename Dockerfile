FROM node:8.9

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN chmod 755 /usr/src/app/bin/ -R

RUN apt update && \
    apt -y install ruby ruby-json bundler tzdata ruby-dev

RUN echo 'gem: --no-document' > /etc/gemrc && \
    gem install cf-uaac

RUN rm -rf /var/lib/apt/lists/*

RUN npm install
RUN npm run build
