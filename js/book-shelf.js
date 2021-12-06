const uncompleteBookShelfID = 'uncompleteBookShelf';
const completedBookShelfID = 'completeBookShelf';
const localStorageBookShelf = 'localStorageBookShelf';
const bookShelfItemId = 'itemId';

function addBookShelf() {
  const uncompleteBookShelf = document.getElementById(uncompleteBookShelfID);

  const titleBookShelf = document.getElementById('inputBookTitle').value;
  const authorBookShelf = 'Author: ' + document.getElementById('inputBookAuthor').value;
  const yearBookShelf = document.getElementById('inputBookYear').value;
  const completeBookShelf = document.getElementById('inputBookComplete').checked;

  let bookShelf = makeBookShelf(titleBookShelf, authorBookShelf, yearBookShelf, false);
  const bookObject = composeBookObject(titleBookShelf, authorBookShelf, yearBookShelf, false);

  bookShelf[bookShelfItemId] = bookObject.id;
  books.push(bookObject);

  if (completeBookShelf) {
    addBookShelfToCompleted(bookShelf);
  } else {
    uncompleteBookShelf.append(bookShelf);
  }

  updateBookToStorage();
}

function makeBookShelf(title, author, year, isCompleted) {
  const bookTitle = document.createElement('h3');
  bookTitle.innerText = title;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = author;

  const bookYear = document.createElement('p');
  bookYear.innerText = year;

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('action');

  const bookContainer = document.createElement('article');
  bookContainer.classList.add('book-item');

  titleContainer.append(bookTitle, bookAuthor, bookYear);

  bookContainer.append(titleContainer, buttonContainer);

  if (isCompleted) {
    buttonContainer.append(createUndoButton(), createDeleteButton());
  } else {
    buttonContainer.append(createCheckButton(), createDeleteButton());
  }

  return bookContainer;
}

function addBookShelfToCompleted(bookElement) {
  const listCompletedBookShelf = document.getElementById(completedBookShelfID);
  const bookTittleToCompleted = bookElement.querySelector('.book-item > .title-container > h3').innerText;
  const bookParagraf = bookElement.querySelectorAll('.book-item > .title-container > p');
  const bookAuthorToCompleted = bookParagraf[0].innerText;
  const bookYearToCompleted = bookParagraf[1].innerText;

  const newBookShelf = makeBookShelf(bookTittleToCompleted, bookAuthorToCompleted, bookYearToCompleted, true);

  const book = findBook(bookElement[bookShelfItemId]);
  book.isCompleted = true;
  newBookShelf[bookShelfItemId] = book.id;

  listCompletedBookShelf.append(newBookShelf);

  bookElement.remove();

  updateBookToStorage();
}

function undoBookShelfFromCompleted(bookElement) {
  const listUncompleted = document.getElementById(uncompleteBookShelfID);

  const bookTitleUndo = bookElement.querySelector('.book-item > .title-container > h3').innerText;
  const bookAuthorUndo = bookElement.querySelectorAll('.book-item > .title-container > p')[0].innerText;
  const bookYearUndo = bookElement.querySelectorAll('.book-item > .title-container > p')[1].innerText;

  const newBookUndo = makeBookShelf(bookTitleUndo, bookAuthorUndo, bookYearUndo, false);

  const book = findBook(bookElement[bookShelfItemId]);
  book.isCompleted = false;
  newBookUndo[bookShelfItemId] = book.id;

  listUncompleted.append(newBookUndo);

  bookElement.remove();

  updateBookToStorage();
}

function removeBookShelfFromCompleted(bookElement) {
  const bookPosition = findBook(bookElement[bookShelfItemId]);

  books.splice(bookPosition, 1);

  alert('Buku Berhasil Didelete');
  bookElement.remove();

  console.log('Data Buku Berhasil Didelete.');
  updateBookToStorage();
}

const submitButton = document.getElementById('submitSearchBook');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const inputSearchBook = document.getElementById('inputSearchBook').value;
  const elementTitle = document.querySelectorAll('article');

  for (title of elementTitle) {
    if (title.childNodes[0].innerText.toLowerCase().includes(inputSearchBook.toLowerCase())) {
      title.setAttribute('style', 'display: block;');
    } else {
      title.setAttribute('style', 'display: none;');
    }
  }
});
