const LOCAL_STORAGE = 'BOOK_SHELF';

let books = [];

function isLocalStorageAvailable() {
  if (typeof Storage === undefined) {
    alert(' Local Storage is not available');
    return false;
  } else {
    return true;
  }
}

function saveDataBook() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(LOCAL_STORAGE, parsed);
  document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataBookFromStorage() {
  const loadData = localStorage.getItem(LOCAL_STORAGE);

  let data = JSON.parse(loadData);
  if (data !== null) books = data;

  document.dispatchEvent(new Event('ondataloaded'));
}

function updateBookToStorage() {
  if (isLocalStorageAvailable()) saveDataBook();
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year: parseInt(year),
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let indexBook = 0;
  for (book of books) {
    if (book.id === bookId) return indexBook;

    indexBook++;
  }

  return -1;
}

function refreshDataFromBook() {
  let listUncompleted = document.getElementById(uncompleteBookShelfID);
  let listCompleted = document.getElementById(completedBookShelfID);

  for (book of books) {
    const newBookShelf = makeBookShelf(book.title, book.author, book.year, book.isCompleted);
    newBookShelf[bookShelfItemId] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBookShelf);
    } else {
      listUncompleted.append(newBookShelf);
    }
  }
}
