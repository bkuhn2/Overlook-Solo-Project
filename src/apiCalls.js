
function retrieveData(source) {
  return fetch(source).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Issue getting the source data...');
    }
  })
}

function sendBookingData(endpoint, body) {
  return fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Response not OK - look at issue in body');
    }
  })
}

export {retrieveData, sendBookingData};