var old = {
  a: {name: 'a', value: 'a2'},
  b: {name: 'b', value: 'b2'}
}

var buildResponse = (slots) => {
  var response = {}
  for (var key in slots) {
    response[key] = slots[key].value
  }
  return response;
}

console.log(buildResponse(old))
