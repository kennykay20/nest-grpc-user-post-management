#!/bin/bash

# set -x # debug mode

set -eo pipefail

BASEDIR=$(dirname "$0")
#cd "${BASEDIR}"/../

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts_proto"
proto_ts="./generated_ts_proto"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"

if [ ! -d proto_ts ]; then
    mkdir -p "${proto_ts}"
fi;

for f in ./proto/*; do

    # skip the non proto files
    if [ "$(basename "$f")" == "index.ts" ]; then
        continue
    fi
    # # Javascript and grpc code generating
    ${GRPC_TOOLS_NODE_PROTOC} \
        --js_out=import_style=commonjs,binary:"${proto_ts}" \
        --grpc_out="${proto_ts}" \
        --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
        --proto_path="./proto/" \
        -I "${f}"\
        "${f}"/*.proto

    # echo "directory of f = ${f}"
    # typescript code generating
    ${GRPC_TOOLS_NODE_PROTOC} \
        --plugin="${PROTOC_GEN_TS_PATH}" \
        --ts_proto_out="${proto_ts}" \
        --ts_proto_opt=nestJs=true \
        --proto_path="./proto/" \
        -I "${f}" \
        "${f}"/*.proto
    
done
