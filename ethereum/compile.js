const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const budgetPath = path.resolve(__dirname, "contracts", "budget.sol");
const source = fs.readFileSync(budgetPath, "utf8");
var input = {
    language: 'Solidity',
    sources: {
        'budget.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 
var output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

for (var contractName in output.contracts['budget.sol']) {
    fs.outputJSONSync(
            path.resolve(buildPath, contractName + ".json"),
            output.contracts['budget.sol'][contractName]
    );

}
