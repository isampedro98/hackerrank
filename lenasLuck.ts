// Lena is preparing for an important coding competition that is preceded by a number of sequential preliminary contests. 
// Initially, her luck balance is 0. She believes in "saving luck", and wants to check her theory. 
// Each contest is described by two integers, L[i] and T[i]:
//   L[i] is the amount of luck associated with a contest. If Lena wins the contest, her luck balance will decrease by L[i]; if she loses it, her luck balance will increase by L[i].
//   T[i] denotes the contest's importance rating. It's equal to 1 if the contest is important, and it's equal to 0 if it's unimportant.
// If Lena loses no more than k important contests, what is the maximum amount of luck she can have after competing in all the preliminary contests? This value may be negative.

'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'luckBalance' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. 2D_INTEGER_ARRAY contests
 */

function luckBalance(k: number, contests: number[][]): number {
    // Write your code here
    let importantMatchesLuck = [];
    let maxLuck = 0;
    for( let i = 0; i < contests.length; i++ ) {
        if( contests[i][1] === 1 ) {
            importantMatchesLuck.push(contests[i][0]);
        } else {
            maxLuck += contests[i][0];
        }
    }
    const luckSorted = importantMatchesLuck.sort((a,b) => a-b);
    console.log(maxLuck, luckSorted)
    for( let i = 0; i < luckSorted.length; i++ ) {
        if( i < k ) {
            maxLuck += luckSorted[luckSorted.length - i - 1];    
        } else {
            maxLuck -= luckSorted[luckSorted.length - i - 1];    
        }
        
    }
    
    return maxLuck;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    let contests: number[][] = Array(n);

    for (let i: number = 0; i < n; i++) {
        contests[i] = readLine().replace(/\s+$/g, '').split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
    }

    const result: number = luckBalance(k, contests);

    ws.write(result + '\n');

    ws.end();
}
