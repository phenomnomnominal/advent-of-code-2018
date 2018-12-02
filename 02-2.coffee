fs = require 'fs'

readInput = (filepath) ->
  await fs.promises.readFile filepath , 'utf-8'

getIds = (input) ->
  input.split '\n'

hamming = (a, b) ->
  distance = 0
  for letter, i in a
    distance += 1 if a[i] isnt b[i]
  distance

do ->
  ids = getIds await readInput './02.input.txt'
  pairs = []
  (if x isnt y then pairs.push { x, y }) for x in ids for y in ids

  match = null
  for pair in pairs
    if hamming(pair.x, pair.y) is 1
      match = pair
      break

  common = ''
  common += letter for letter, i in match.x when match.x[i] is match.y[i]
  console.log common
