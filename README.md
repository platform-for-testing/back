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

### GIT doc
1. Create folder on your machine -> In this folder run: git clone
https://github.com/platform-for-testing/front.git (cloning front project);
git clone https://github.com/platform-for-testing/back.git (cloning back project)
1.1 - git fetch ; will fetch all of remote branches to you, could checkout from any branches;
1.2 git checkout -b <name of your branch> <name of remote> ; (make
local working copy from remote branch)
1.2.1 - git checkout <name of branch> ; change working branch
1.3 git pull ; - if you need to update application
2. git add . ; - add file to your branch;
3. git commit -m "any text" ; add snaphot of application
4. git push ; -load your app on repositoriy
