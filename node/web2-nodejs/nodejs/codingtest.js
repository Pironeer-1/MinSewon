const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (input) {
    processInput(input.trim());
    rl.close();
});

function processInput(input) {
    
    const num = Number(input);

    for (let i = 1; i < 10; i++) {
        console.log(`${num} * ${i} = ${num * i}`);
    }
}
