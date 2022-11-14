
function retrieveData(source) {
  return fetch(source).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Issue getting the source data...');
    }
  })
}

export default retrieveData;