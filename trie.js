export class Trie {
  constructor() {
    this.words = 0;
    this.prefixes = 0;
    this.children = {};
  }

  insert(str, pos = 0) {
    if (str.length === 0) {
      return;
    }
    if (pos === str.length) {
      this.words++;
      return;
    }
    this.prefixes++;
    const k = str[pos];
    if (!this.children[k]) {
      this.children[k] = new Trie();
    }
    this.children[k].insert(str, pos + 1);
  }

  remove(str, pos = 0) {
    if (pos === str.length) {
      this.words--;
    }
    if (str.length === 0) {
      return;
    }
    this.prefixes--;
    const k = str[pos];
    if (this.children[k]) {
      this.children[k].remove(str, pos + 1);
    }
  }

  getAllWords(str = '', wordStack = []) {
    if (this.words > 0) {
      wordStack.push(str);
    }

    for (const k in this.children) {
      this.children[k].getAllWords(str + k, wordStack);
    }
    return wordStack;
  }

  autoComplete(str, pos = 0) {
    const k = str[pos];

    if (!this.children[k]) return [];

    if (pos == str.length - 1) {
      return this.children[k].getAllWords(str);
    }
    return this.children[k].autoComplete(str, pos + 1);
  }
}

/*Test Cases 
let trie = new Trie();
trie.insert("mango");
trie.insert("maple");
trie.insert("mop");
trie.insert("peach");
console.log(trie.autoComplete("ma"));
console.log(trie);
*/
