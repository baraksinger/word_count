# word_count

installation:
run npm install (only dependancy is node-fetch)

api:
wordCount recieves [url|file|string]
-creates a file ./wordMap.json with the word count table, if file exist updates new words to file 
-persists between function calls

wordLookup (string)
 returns the count for the word in file ./wordMap.json, 0 if not found. 

usage: 

from cmd line: 
node wordCount [url|file|string]
node wordLookup [string]

