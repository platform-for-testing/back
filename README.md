# back

[![Build Status](https://travis-ci.org/platform-for-testing/back.svg?branch=develop)](https://travis-ci.org/platform-for-testing/back)

## Dev env

```
npm i
```

### Local db

run mongodb from container https://hub.docker.com/_/mongo/
`docker ps` - show runing containers
`docker ps -a` - show all containers
`docker images` - show images
`docker exec -it {container id} bash` - connect to container bash


```
docker pull mongo
docker run -p 27017:27017 --name some-mongo -d mongo

docker exec -it 01d bash
```