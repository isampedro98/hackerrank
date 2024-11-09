/*
  This challenge can be solved efficiently in TypeScript with a Trie
  
  https://www.youtube.com/watch?app=desktop&v=3CbFFVHQrk4&ab_channel=JacobSorber
  
  Trie:
    Data Structure for retrieving things (any sequence of symbols). It's optimal for storing and retrieving sets of strings, due to it's hierarchical structure.
    This structure allos efficient prefix-based searching, commonly used in autocomplete systems and search algorithms, where each sequence is stored by mapping characters to nodes sequentially.
    
    It's basically a tree where each node is going to represent a symbol in a sequence .
    For each end of a word (or gene in this algorithm), we need to mark them  on the tree as terminal nodes.

  This Trie-based approach is indeed ideal for algorithms requiring efficient pattern matching
*/

'use strict';

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

// https://www.geeksforgeeks.org/trie-insert-and-search/
// https://www.youtube.com/watch?app=desktop&v=3CbFFVHQrk4&ab_channel=JacobSorber
class TrieNode {
    children: { [key: string]: TrieNode } = {};
    geneIndexes: number[] = [];
}

class Trie {
    root: TrieNode = new TrieNode();


    /*
        We start off at the root of the tree
        We need to see if the first character is a direct child of the root.
        If it's not, it creates it as a TrieNode and stores the char there.

        The same happens with the following characters. We keep going down the character tree.

        Once we finish inserting the gene inside the Tree, we store the index of the gene in the node, for us to know that the word is in there, and which score (health) it has
    */
    insert(gene: string, index: number) {
        let node = this.root;
        
        for (const char of gene) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.geneIndexes.push(index);
    }

    /*
      For each character in the dna, we need to look if it's the beginning of a gene
      If it doesn't belong to the first character of a gene, it doesn't matter to us

      If it does, we are going to search for the following character, until we reach the end of a gene.
      When we reach the end of a gene (geneIndexes will have the gene in there), we add the gene's health to the total health
      of the DNA string.
      We do need to take into consideration if the gene is between first and last beneficial genes.
    */
    search(dna: string, genes: string[], health: number[], first: number, last: number): number {
        let sumHealth = 0;
        for (let i = 0; i < dna.length; i++) {
            let node = this.root;
            for (let j = i; j < dna.length; j++) {
                const char = dna[j];
                if (!node.children[char]) break;
                node = node.children[char];
                for (const geneIndex of node.geneIndexes) {
                    if (geneIndex >= first && geneIndex <= last) {
                        sumHealth += health[geneIndex];
                    }
                }
            }
        }
        return sumHealth;
    }
}

function main() {
    const n: number = parseInt(readLine().trim(), 10);
    const genes: string[] = readLine().trim().split(' ');
    const health: number[] = readLine().trim().split(' ').map(Number);
    const s: number = parseInt(readLine().trim(), 10);

    let minHealth = Number.MAX_SAFE_INTEGER;
    let maxHealth = Number.MIN_SAFE_INTEGER;

    // Build the Trie with all genes
    const trie = new Trie();
    for (let i = 0; i < n; i++) {
        trie.insert(genes[i], i);
    }

    /*
      Once the Trie is built, we can start searching for each gene string.
    */
    for (let sItr = 0; sItr < s; sItr++) {
        const [firstStr, lastStr, d] = readLine().trim().split(' ');
        const first = parseInt(firstStr, 10);
        const last = parseInt(lastStr, 10);

        const sumHealth = trie.search(d, genes, health, first, last);

        minHealth = Math.min(minHealth, sumHealth);
        maxHealth = Math.max(maxHealth, sumHealth);
    }

    console.log(minHealth, maxHealth);
}
