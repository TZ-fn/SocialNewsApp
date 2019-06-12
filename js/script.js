'use strict';
window.onload = function () {
  const submitBtn = document.querySelector('#submitButton'),
    contentBox = document.querySelector('#content'),
    addLinkForm = document.querySelector('#add-link-form');
  const addLink = () => {
    addLinkForm.style.display = 'block';
  };
  submitBtn.addEventListener('click', () => addLink());
};