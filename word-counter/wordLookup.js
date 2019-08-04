const fs = require('fs');

if (process.argv.length <= 2) {
    console.error('Expected input string for lookup!');
    process.exit(-1);
}

let lookupWord = process.argv[2];

// load the table from the ./wordMap.json
let table = loadWordMap();
if(!table){
    console.log('file ./wordMap.json not found');
    return 0;
}

// Get the count for a word
return getCount(lookupWord);

function loadWordMap(){
    if (fs.existsSync('./wordMap.json')){
        return JSON.parse(fs.readFileSync('./wordMap.json')) || null;
    }
}

function getCount(){
    if(!table[lookupWord]) {
        console.log('word does not exist');
        return 0;
    }
    console.log(table[lookupWord]);
    return table[lookupWord];
}