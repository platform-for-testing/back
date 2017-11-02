#!/bin/bash
cd /home/deploy/back-dev/serv
npm stop
sleep 10
cd /home/deploy/back-dev/package
tar -xzf package.tgz
rm package.tgz
cd /home/deploy/back-dev/package/build/back
rm -rf /home/deploy/back-dev/serv
mkdir /home/deploy/back-dev/serv
rsync -av * /home/deploy/back-dev/serv --exclude=.git --exclude=test
rm -rf /home/deploy/back-dev/package/build
export MONGODB_URI=mongodb://backuser:backPass@ds127375.mlab.com:27375/testplatformdev
cd /home/deploy/back-dev/serv
npm run start:dev
