#!/usr/bin/env bash
ssh $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/deploy.sh  -o StrictHostKeyChecking=no
scp package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
