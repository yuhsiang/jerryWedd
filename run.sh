#!/bin/bash

#docker run -d haproxy-datadog -v

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker rm -fv jerry-website
docker run -d --name jerry-website \
  -v $DIR/client:/usr/src/app/client \
  -v $DIR/server:/usr/src/app/server \
  -v $DIR/data:/usr/src/app/data \
  -p 9080:9080 \
  jerry/wedding
