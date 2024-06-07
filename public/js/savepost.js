const savePostBtn = document.getElementById('save-post');
const removePostBtn = document.getElementById('remove-post');

if (savePostBtn) {
  savePostBtn.addEventListener('click', (event) => {
    // event.preventDefault(); // Prevent the default link behavior

    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts.slice(-1)[0];
    console.log(postId);

    // Create the data object to be sent as JSON
    const data = {
      articleId: postId,
    };
    // console.log(data);
    // console.log(JSON.stringify(data))

    // Send the POST request
    fetch('/save-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // Handle the JSON response data
        console.log('Success:', data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  });
}

const path = window.location.pathname;
const parts = path.split('/');
const postId = parts.slice(-1)[0];
console.log(postId);

if (removePostBtn) {
  removePostBtn.addEventListener('click', (event) => {
  // event.preventDefault(); // Prevent the default link behavior

    const path = window.location.pathname;
    const parts = path.split('/');
    const postId = parts.slice(-1)[0];
    console.log(postId);

    // Create the data object to be sent as JSON
    const data = {
      articleId: postId,
    };
    // console.log(data);
    // console.log(JSON.stringify(data))

    // Send the POST request
    fetch('/remove-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        //   if (!response.ok) {
        //     throw new Error('Network response was not ok');
        //   }
        console.log(response);
        return response.json();
      })
      .then((data) => {
      // Handle the JSON response data
        console.log('Success:', data);
      })
      .catch((error) => {
      // Handle any errors
        console.error('Error:', error);
      });
  });
}
