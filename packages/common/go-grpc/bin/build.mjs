#!/usr/bin/env zx

const protoPath=`${__dirname}/../../../../proto/`;
const protocGenTsPluginPath=`${__dirname}/../node_modules/.bin/protoc-gen-ts`;
const tsOutput=`${__dirname}/../src/proto`;
const tsIndexOut=`${__dirname}/../src/index.ts`;

const protoFiles = (await $`ls ${protoPath}`).stdout.split('\n').filter(Boolean);

await $`rm -rf ${tsOutput} 2> /dev/null`
await $`mkdir -p ${tsOutput}`
await $`rm -f ${tsIndexOut} 2> /dev/null`
await $`protoc --plugin="protoc-gen-ts=${protocGenTsPluginPath}" --ts_out="service=grpc-node:${tsOutput}" --proto_path="${protoPath}" ${protoPath}*.proto`;

protoFiles.forEach(async (protoName) => {
  $`echo "export * from './proto/${protoName.replace('.proto', '')}';" >> ${tsIndexOut}`;
});
$`echo "export * from './server';" >> ${tsIndexOut}`
$`node_modules/.bin/tsc`
