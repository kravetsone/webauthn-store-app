import { $ } from "bun";

await $`protoc data.proto --go_out=../ --proto_path=./`.cwd("../proto");

// await $`npx protoc *.proto --plugin=../external/protobuf-javascript/bazel-bin/generator/protoc-gen-js --js_out=../frontend/src/proto --proto_path=../proto/`;
