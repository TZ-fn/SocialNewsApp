'use strict';
window.onload = function () {

  const socialNews = function () {
    let links = [{
        title: 'facebook',
        url: 'www.facebook.com',
        author: 'wtf'
      },
      {
        title: 'google',
        url: 'www.google.com',
        author: 'Tomek'
      },
      {
        title: 'dodo',
        url: 'www.dodo.pl',
        author: 'Babcia'
      },
      {
        title: 'gogol',
        url: 'www.gogol.com',
        author: 'Tomek'
      },
      {
        title: 'joma',
        url: 'jomada.jo',
        author: 'Tomek'
      }
    ];

    const commandChoice = function () {
      let choice = Number(prompt(`Choose an option:
1. Show links.
2. Add a link.
3. Remove a link.
4. Quit.`));

      switch (choice) {
        case 1:
          showLinks();
          break;
        case 2:
          addLink();
          break;
        case 3:
          rmLink();
          break;
        case 4:
          alert('Quitting...');
          break;
        default:
          alert('Please enter valid command number.');
          commandChoice();
      }
    };
    commandChoice();

    function showLinks() {
      if (links.length > 0) {
        alert((links.map(link => `${links.indexOf(link) + 1}. ${link.title} (${link.url}) ${link.author}
`)).join(''));
        commandChoice();
      } else {
        alert('No links available!');
        commandChoice();
      }
    }

    function addLink() {
      let newTitle = prompt('Please enter link title.'),
        newUrl = prompt('Please enter link url.'),
        newAuthor = prompt('Please enter link author.');
      if (/^http:\/\//.test(newUrl) || (/^https:\/\//.test(newUrl))) {
        links.push({
          title: newTitle,
          url: newUrl,
          author: newAuthor
        });
      } else {
        newUrl = `http://${newUrl}`;
        links.push({
          title: newTitle,
          url: newUrl,
          author: newAuthor
        });
      }
      commandChoice();
    }

    function rmLink() {
      if (links.length > 0) {
        let delChoice = Number(prompt(`Enter the link index number from 1 to ${links.length} or enter 0 to return to menu.`));
        if (delChoice > 0 && delChoice <= links.length) {
          links.splice(delChoice - 1, 1);
          alert('Link deleted!');
          commandChoice();
        } else if (delChoice === 0) {
          commandChoice();
        } else {
          alert(`Please enter the link index number from 1 to ${links.length} or enter 0 to return to menu.`);
          rmLink();
        }
      } else {
        alert('There are no links to delete!');
        commandChoice();
      }
    }

  };
  socialNews();
};