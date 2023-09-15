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
    const total = Number(input[0]); // 영수증에 적힌 총 금액
    let cnt = Number(input[1]); // 구매한 물건의 종류의 수
    let sum = 0;

    for (let i = 2; i < cnt + 2; i++) {
        let data = input[i].split(' '); // 가격과 개수를 공백으로 나누어 줌
        let real = Number(data[0]) * Number(data[1]); // real = 가격 * 개수
        sum += real; // real이 누적되어 sum을 도출함
    }

    if (sum === total) {
        console.log("Yes");
    } else {
        console.log("No");
    }
}