import Library from './modules/books.js';

import {
  listBtn, listSection, addBtn, addSection, contactBtn, contactSection,
} from './modules/show.js';

import {
  DateTime,
} from './modules/luxon.js';

const obj = new Library();

const stringCollection = localStorage.getItem('collection');

if (stringCollection) {
  const parsedCollection = JSON.parse(stringCollection);
  obj.collection = parsedCollection;
}

const getBooks = () => {
  let innerhtml = '';

  obj.collection.forEach((book, index) => {
    innerhtml += `
    <div>
 
     <p>  "${book.title}" by 
         ${book.author} 
     </p>
        <button id="remove-btn${index}">Remove</button>
            </div>
            
    `;
  });

  const booklist = document.querySelector('#booklist');

  booklist.innerHTML = innerhtml;

  obj.collection.forEach((book, index) => {
    const removeBtn = document.getElementById(`remove-btn${index}`);
    removeBtn.addEventListener('click', () => {
      obj.removeBook(index);
      getBooks();
    });
  });

  localStorage.setItem('collection', JSON.stringify(obj.collection));
};

getBooks();

const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const buttonAdd = document.getElementById('add-btn');

buttonAdd.addEventListener('click', (event) => {
  event.preventDefault();
  obj.addBook(inputTitle.value, inputAuthor.value);
  getBooks();

  inputTitle.value = '';
  inputAuthor.value = '';
});

listBtn.addEventListener('click', () => {
  listSection.style.display = 'block';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
});

addBtn.addEventListener('click', () => {
  addSection.style.display = 'block';
  listSection.style.display = 'none';
  contactSection.style.display = 'none';
});

contactBtn.addEventListener('click', () => {
  addSection.style.display = 'none';
  listSection.style.display = 'none';
  contactSection.style.display = 'block';
});

setInterval(() => {
  const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  document.getElementById('date').innerHTML = currentDate;
}, 1000);