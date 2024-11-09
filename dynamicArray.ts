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
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n: number, queries: number[][]): number[] {
    // Write your code here
    const answers: number[] = [];
    const arr: number[][] = [];
    for( let i = 0; i < n; i++ ) {
        arr.push([]);
    }
    let lastAnswer = 0;
    
    for( let query of queries ) {
        let idx: number;
        switch(query[0]) {
            case 1:
                    idx = (query[1] ^ lastAnswer) % n;
                    console.log(idx);
                    arr[idx].push(query[2]);
                    break;
            case 2:
                    idx = (query[1] ^ lastAnswer) % n;
                    lastAnswer = arr[idx][query[2] % arr[idx].length];
                    answers.push(lastAnswer);   
                    break;
        }
    }
    return answers;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const q: number = parseInt(firstMultipleInput[1], 10);

    let queries: number[][] = Array(q);

    for (let i: number = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result: number[] = dynamicArray(n, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
