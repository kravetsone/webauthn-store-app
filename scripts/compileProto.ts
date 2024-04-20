import { $ } from "bun";

await $`protoc data.proto --go_out=../ --proto_path=./`.cwd("../proto");

// await $`npx protoc data.proto --ts_out=../frontend/src/proto --proto_path=./`.cwd("../proto");
