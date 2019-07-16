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

  const addLink = (author, name, address) => {
    if (author === '' || name === '' || address === '') {
      alert('Please fill missing data.');
    } else {
      address = (address.slice(0, 7) === 'http://' || address.slice(0, 8) === 'https://') ? address : `http://${address}`;
      let link = {
        id: `${author.slice(0, 3)}${name.slice(0, 3)}${address.slice(10, 13)}`,
        author: author,
        name: name,
        address: address
      };
      fetch('https://social-news-appli.herokuapp.com/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(link)
        })
        .then(response => response.json())
        .then(() => loadLinks());
      linkAdded.classList += ' success';
      linkAdded.innerHTML = `<p>The link was ${link.name} successfully added!</p>`;
      authorInput.value = '';
      nameInput.value = '';
      addressInput.value = '';
      addLinkForm.classList.toggle('display-block');
    }
  };

  const deleteLink = button => {
    fetch('https://social-news-appli.herokuapp.com/deletePost/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([button.dataset.id])
      })
      .then(() => loadLinks());
  };

  const showAddLink = () => {
    addLinkForm.classList.toggle('display-block');
  };

  const loadLinks = () => {
    fetch('https://social-news-appli.herokuapp.com/links')
      .then(response => response.json())
      .then(response => {
        contentBox.innerHTML = '';
        renderLinks(response[0]);
      });
  };

  const renderLinks = links => {
    links.forEach(post => {
      let link = document.createElement('div');
      link.innerHTML += `
            <div class="link">
              <button aria-label="Delete this post." title="Delete this post." data-id="${post.id}" class="btn btn-danger delete-post-btn glyphicon glyphicon-remove"></button>
              <h4 class="linkHeadline">
                <a class="linkTitle" href='${post.address}' target="_blank">${post.name}</a>
                <span class="linkUrl">${post.address}</span>
              </h4>
              <span class="linkAuthor">Submitted by ${post.author}</span>
            </div>
            `;
      contentBox.prepend(link);
    });
    const deletePostBtn = document.querySelectorAll('.delete-post-btn');
    deletePostBtn.forEach(button => {
      button.addEventListener('click', (e) => deleteLink(e.target));
    });
  };

  loadLinks();

  addLinkBtn.addEventListener('click', () => addLink(authorInput.value.trim(), nameInput.value.trim(), addressInput.value.trim()));
  submitBtn.addEventListener('click', () => showAddLink());
  linkAdded.addEventListener('animationend', () => linkAdded.classList = 'link-added alert alert-success');
};