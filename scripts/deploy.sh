#!/usr/bin/env bash
mkdir build
rsync -av --progress $TRAVIS_BUILD_DIR $TRAVIS_BUILD_DIR/build --exclude build
tar -czf package.tgz build
scp package.tgz $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
ssh $DEPLOY_USER@$DEPLOY_HOST $DEPLOY_PATH/deploy.sh