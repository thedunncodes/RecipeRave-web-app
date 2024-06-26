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

  document.getElementById('save-article').onclick = async () => {

    const form = document.getElementById('article-form');
    form.onsubmit = (e) => {
      const content = document.querySelector('input[name=content]');
      content.value = quill.root.innerHTML.trim();
      console.log(content.value);

      if (content.value === '' || content.value === '<p><br></p>') {
        document.getElementById('editor-error').style.display = 'block';
        e.preventDefault(); 
      } else {
        document.getElementById('editor-error').style.display = 'none';
      }

      const category = document.querySelector('input[name=category]');

      if (category.value === '') {
        document.querySelector('.category-error').style.display = 'block';
        e.preventDefault();
      } else {
        document.querySelector('.category-error').style.display = 'none';
      }
    };
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
  const targetElement = document.querySelector(targetSelector);
  if (targetElement) {
    const wrapper = document.createElement('div');
    wrapper.className = wrapperClass;

    targetElement.parentNode.insertBefore(wrapper, targetElement);

    wrapper.appendChild(targetElement);
  } else {
    console.error('Target element not found:', targetSelector);
  }
}

window.onload = function () {
  wrapElement('quill-toolbar-wrapper', '.ql-toolbar');
};