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
/**
 * 1. ถามอายุ รับตัวเลข ถ้าน้อยกว่า 18 ให้ตอบว่า "Kid" นอกนั้นบอกว่า "Adult"
 * 2. เกมส์เดาตัวเลข สุ่มตัวเลข 0-100 ป้อนค่าที่เดา ถ้าถูก จบเกมส์ ถ้าผิดให้ใบ้ว่า มากว่า หรือน้อยกว่านี้
 * Math.floor(Math.random() * 101);
 */
