#!/usr/bin/env bash
ssh deploy@95.85.54.211 export MONGODB_URI=mongodb://USER:PASS@ds127375.mlab.com:27375/testplatformdev
ssh deploy@95.85.54.211 sh /home/deploy/back-dev/package/deploy.sh
ssh deploy@95.85.54.211 rm /home/deploy/back-dev/package/deploy.sh
