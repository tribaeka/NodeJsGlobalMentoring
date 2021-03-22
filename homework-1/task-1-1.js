import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const reverseString = str => [...str].reverse().join('');

rl.on('line', input => {
    console.log(reverseString(input));
});
