fs = require 'fs'

readInput = (filepath) ->
  await fs.promises.readFile filepath , 'utf-8'

calculateChecksum = (ids) -> 
  hasTwo = 0
  hasThree = 0
  for id in ids
    hasTwo += +hasTwoOfAnyLetter id
    hasThree += +hasThreeOfAnyLetter id
  hasTwo * hasThree

getIds = (input) ->
  input.split '\n'

hasTwoOfAnyLetter = (id) ->
  counts = countLetters id
  Object.values(counts).includes 2
  
hasThreeOfAnyLetter = (id) ->
  counts = countLetters id
  Object.values(counts).includes 3

getLetters = (id) ->
  id.split ''

countLetters = (id) ->
  letters = getLetters id
  counts = {}
  for letter in letters
    count = counts[letter]
    counts[letter] = if count then count + 1 else 1
  counts

do ->
  checksum = calculateChecksum getIds await readInput './02.input.txt'
  console.log checksum
