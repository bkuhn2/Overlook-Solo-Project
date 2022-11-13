
function retrieveData(source) {
  return fetch(source).then(response => response.json())
}

//need error handling
export default retrieveData;