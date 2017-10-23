#!/usr/bin/env bash
ssh -o "UserKnownHostsFile=/dev/null" -o "StrictHostKeyChecking=no" $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/deploy.sh
scp package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
