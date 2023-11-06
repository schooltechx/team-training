const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

async function main() {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question('What is 4x4 equals? ');
    let correctOrNot ="";
    if( Number(answer) === 16){
        correctOrNot = 'correct!' 
    }else{
        correctOrNot ='incorrect. Try again.';
    }
    console.log(`${answer} is ${correctOrNot}`);
    process.exit(1);
}
main()
