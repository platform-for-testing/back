#!/usr/bin/env bash
echo"deploying using ssh connection"
scp package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH -o StrictHostKeyChecking=no
ssh $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/deploy.sh