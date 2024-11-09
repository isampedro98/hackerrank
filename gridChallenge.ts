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
 Given a square grid of characters in the range ascii[a-z], rearrange elements of each row alphabetically, ascending. 
 Determine if the columns are also in ascending alphabetical order, top to bottom. 
 Return YES if they are or NO if they are not.
 */

function gridChallenge(grid: string[]): string {
    // Write your code here
    const gridOrdered = grid.map((word) => word.split("").sort().join(""));
    
    for( let i = 0; i < gridOrdered.length; i++ ) {
        for( let j = 1; j < gridOrdered.length; j++ ) {
            if( gridOrdered[j][i] < gridOrdered[j-1][i]) {
                return "NO"
            }
        }
    }
    return "YES";
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        let grid: string[] = [];

        for (let i: number = 0; i < n; i++) {
            const gridItem: string = readLine();
            grid.push(gridItem);
        }

        const result: string = gridChallenge(grid);

        ws.write(result + '\n');
    }

    ws.end();
}
