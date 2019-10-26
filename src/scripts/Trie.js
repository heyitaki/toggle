export default class Trie {
  constructor(words) {
    this.rootNode = new TrieNode('\0', false);
    for (let i = 0; i < words.length; i++) this.insert(words[i]);
  }

  insert(word) {
    word = word.toLowerCase();
    let currNode = this.rootNode, childNode, currLetter;
    for (let i = 0; i < word.length; i++) {
      currLetter = word.charAt(i);
      if (currNode.children.has(currLetter)) 
        currNode = currNode.children.get(currLetter);
      else {
        childNode = new TrieNode(currLetter);
        currNode.children.set(currLetter, childNode);
        currNode = childNode;
      }
    }

    currNode.isWord = true;
  }

  find(word) {
    word = word.toLowerCase();
    let currNode = this.rootNode, currLetter;
    for (let i = 0; i < word.length; i++) {
      currLetter = word.charAt(i);
      if (currNode.children.has(currLetter))
        currNode = currNode.children.get(currLetter);
      else return false;
    }

    return currNode.isWord;
  }
}

class TrieNode {
  constructor(letter, isWord=false) {
    this.letter = letter;
    this.isWord = isWord;
    this.children = new Map();
  }
}