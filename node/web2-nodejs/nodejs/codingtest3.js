const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];

rl.on('line', function (line) {
    lines.push(line.trim());
}).on('close', function () {
    processInput(lines);
    process.exit(0);
});

function processInput(input) {
    
    const deposit = 80000;
    const deduction = 20000;

    for (let line of input) {
        let [name, absentCount] = line.split(' ');
        let remaining = deposit - deduction * Number(absentCount);

        if (remaining < 0) {
            remaining = 0;
        }

        console.log(`${name}: ${remaining}`);
    }
}






