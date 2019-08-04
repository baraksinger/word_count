const fs = require('fs');
const fetch = require("node-fetch");

if (process.argv.length <= 2) {
    console.error('Expected at least one argument!');
    process.exit(-1);
}

run().then(() => {
        console.log('Done!');
    }
);

async function run() {

    //input arguments
    let args = process.argv.slice(2);

    //parse input to text
    let text = await parse(args);

    // load the table from the ./wordMap.json file or create a new file object if it does'nt exist
    let table = loadWordMap() || {};

    //update the current table with the new words
    updateWordMap(text, table);

    console.log('table: ' + JSON.stringify(table));

    //write table back to file
    fs.writeFileSync('./wordMap.json', JSON.stringify(table, null, 2), 'utf-8');
}

async function parse(args) {
    let firstArg = args[0];

    if(isURL(firstArg)){
        return await parseURL(firstArg);
    }
    else if (isFile(firstArg)) {
        return fs.readFileSync(firstArg).toString();
    }
    else{
        return args.join(' ');
    }
}

async function parseURL(arg){
    let response = await fetch(arg);
    let data = await response.json();
    return JSON.stringify(data);
}

function isFile(arg){
    return fs.existsSync(arg);
}

function loadWordMap() {
    if (fs.existsSync('./wordMap.json')) {
        return JSON.parse(fs.readFileSync('./wordMap.json'));
    }
}

function updateWordMap(text, table){

    //remove first and last ' in case input is  a string such as: 'example string'
    if(text[0] === "'"){
        text = text.substring(1);
    }
    if(text[text.length-1] === "'"){
        text = text.substring(0, text.length - 1);
    }

    // Split up the text case insensitive with regex matching all non word characters except '
    let allWords = text.toLowerCase().split(/(?!['])\W+/g);

    // Increment the count for a word
    for(let w of allWords){
        if(!/^[0-9]*$/.test(w)) {
            !table[w]? table[w] = 1 : table[w]++;
        }
    }
}

function isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}
