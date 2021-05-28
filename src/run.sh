#bash

#Do not forget to chmod +x run.sh

echo "Running Typescript transpiler"
tsc test_reqif.ts -outDir ./build/

echo "Running transpiled script"
node ./build/test_reqif.js 