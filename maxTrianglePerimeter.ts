// Given an array of stick lengths, use  of them to construct a non-degenerate triangle with the maximum possible perimeter. Return an array of the lengths of its sides as  integers in non-decreasing order.

// If there are several valid triangles having the maximum perimeter:

// Choose the one with the longest maximum side.
// 1. If more than one has that maximum, choose from them the one with the longest minimum side.
// 2. If more than one has that maximum as well, print any one them.
// 3. If no non-degenerate triangle exists, return [-1].

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
 * Complete the 'maximumPerimeterTriangle' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY sticks as parameter.
 */

function maximumPerimeterTriangle(sticks: number[]): number[] {
    // Write your code here
    let maxPerimeter = 0;
    let maxPerimeterTriangle: number[] = [];
    sticks = sticks.sort( (a,b) => a - b );
    
    for( let i = 0; i < sticks.length - 2; i++ ) {
        for( let j = i + 1; j < sticks.length - 1; j++ ) {
            for( let k = j + 1; k < sticks.length; k++ ) {
                const A = sticks[i], B = sticks[j], C = sticks[k];
                if( A + B > C && B + C > A && C + A > B) {
                    if( A + B + C > maxPerimeter ) {
                        maxPerimeterTriangle = [A,B,C];
                        maxPerimeter = A + B + C;
                    }
                }
            }
        }
    }
    
    return maxPerimeterTriangle.length === 3 ? maxPerimeterTriangle: [-1];
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const sticks: number[] = readLine().replace(/\s+$/g, '').split(' ').map(sticksTemp => parseInt(sticksTemp, 10));

    const result: number[] = maximumPerimeterTriangle(sticks);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
