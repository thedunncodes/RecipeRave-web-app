document.getElementById('profile-image-input').addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagePreview = document.getElementById('profile-image-preview');
      const updateBtn = document.getElementById('img-submit-btn');
      const defaultImg = document.getElementById('default-profile-img');
      defaultImg.style.display = 'none';
      updateBtn.style.display = 'inline-block';
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    const imagePreview = document.getElementById('profile-image-preview');
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
  }
});

// document.getElementById('image-form').addEventListener('submit', (event) => {
//   const fileInput = document.getElementById('file-input');
//   if (!fileInput.value) {
//     event.preventDefault();
//     alert('Please select an image to upload.');
//   }
// });