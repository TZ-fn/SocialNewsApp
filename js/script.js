'use strict';
window.onload = function () {
  const submitBtn = document.querySelector('#submitButton');
  const addLinkBtn = document.querySelector('#addLinkBtn');
  const contentBox = document.querySelector('#content');
  const addLinkForm = document.querySelector('#addLinkForm');
  const authorInput = document.querySelector('#authorInput');
  const nameInput = document.querySelector('#nameInput');
  const addressInput = document.querySelector('#addressInput');
  const linkAdded = document.querySelector('#linkAdded');

  const showAddLink = () => {
    addLinkForm.style.display = 'block';
  };

  const addLink = (author, name, address) => {
    if (author === '' || name === '' || address === '') {
      alert('Please fill missing data.');
    } else {
      address = (address.slice(0, 7) === 'http://' || address.slice(0, 8) === 'https://') ? address : `http://${address}`;
      let link = document.createElement('div');
      link.innerHTML += `
      <div class="link">
          <h4 class="linkHeadline">
            <a class="linkTitle" href='${address}'>${name}</a>
            <span class="linkUrl">${address}</span>
          </h4>
          <span class="linkAuthor">Submitted by ${author}</span>
        </div>
      `;
      contentBox.prepend(link);
      linkAdded.classList += ' success';
      linkAdded.innerHTML = `<p>The link ${name} was successfully added!</p>`;
      authorInput.value = '';
      nameInput.value = '';
      addressInput.value = '';
      addLinkForm.style.display = 'none';
    }
  };

  addLinkBtn.addEventListener('click', () => addLink(authorInput.value.trim(), nameInput.value.trim(), addressInput.value.trim()));
  submitBtn.addEventListener('click', () => showAddLink());
  linkAdded.addEventListener('animationend', () => linkAdded.classList = 'link-added alert alert-success');
};