document.addEventListener('DOMContentLoaded', () => {
  const { Quill } = window;

  // Initialize Quill editor
  const quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
    },
    placeholder: 'Write your Recipe blog here.',
  });

  // Save article button event listener
  document.getElementById('save-article').onclick = async () => {
    // const articleContent = quill.root.innerHTML;
    // console.log('Article Content:', articleContent);

    const form = document.getElementById('article-form');
    form.onsubmit = (e) => {
      // Append Quill content before submitting
      const content = document.querySelector('input[name=content]');
      content.value = quill.root.innerHTML.trim();
      console.log(content.value);

      if (content.value === '' || content.value === '<p><br></p>') {
        // Show error message
        document.getElementById('editor-error').style.display = 'block';
        e.preventDefault(); // Prevent form submission
      } else {
        // Hide error message if content is valid
        document.getElementById('editor-error').style.display = 'none';
      }
    };
    // const delta = quill.getContents();

    // You can send the content to your server here
    // Example:
    // const data = { content: 'hallo server' };
    // try {
    //   const response = await fetch('/article/data', {
    //     method: 'POST', // or 'PUT'
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ articleContent }),
    //   });

    //   const result = await response.text();
    //   console.log('Success:', result);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };
  const targetElement = document.querySelector('.image-preview-wrapper');
  const removeButton = targetElement.querySelector('.remove-btn');

  targetElement.addEventListener('mouseenter', () => {
    removeButton.style.display = 'block';
  });

  targetElement.addEventListener('mouseleave', () => {
    removeButton.style.display = 'none';
  });
});

const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');
const removeBtn = document.getElementById('remove-btn');
const imageInputContainer = document.querySelector('.cover-image-container');
const imagePreviewWrapper = document.querySelector('.image-preview-wrapper');

if (imageInput) {
  imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        imagePreview.setAttribute('src', event.target.result);
        imagePreview.style.display = 'block';
        // removeBtn.style.display = 'block';
        imageInputContainer.style.display = 'none';
        imagePreviewWrapper.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
  removeBtn.addEventListener('click', () => {
    imagePreview.setAttribute('src', '');
    imagePreview.style.display = 'none';
    removeBtn.style.display = 'none';
    imageInputContainer.style.display = 'block';
    imagePreviewWrapper.style.display = 'none';
    imageInput.value = '';
  });
}

function wrapElement(wrapperClass, targetSelector) {
  // Find the target element
  const targetElement = document.querySelector(targetSelector);
  if (targetElement) {
    // Create a new wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = wrapperClass;

    // Insert the wrapper before the target element
    targetElement.parentNode.insertBefore(wrapper, targetElement);

    // Move the target element into the wrapper
    wrapper.appendChild(targetElement);
  } else {
    console.error('Target element not found:', targetSelector);
  }
}

// Wait for Quill to initialize and then wrap the toolbar
window.onload = function () {
  // Wrap the element with class 'ql-toolbar' in a new div with class 'custom-wrapper'
  wrapElement('quill-toolbar-wrapper', '.ql-toolbar');
};
