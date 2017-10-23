#!/usr/bin/env bash
scp package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
ssh $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/deploy.sh
