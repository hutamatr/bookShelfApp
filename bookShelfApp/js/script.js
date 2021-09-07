document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form-book');

  submitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addBookShelf();
  });

  if (isLocalStorageAvailable()) {
    loadDataBookFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {
  console.log('Data Buku Berhasil Disimpan.');
});

document.addEventListener('ondataloaded', () => {
  console.log('Data Buku Berhasil Diload.');
  refreshDataFromBook();
});

function createButton(buttonClass, evenListener) {
  const button = document.createElement('button');
  button.classList.add(buttonClass);
  button.addEventListener('click', function (e) {
    evenListener(e);
  });
  return button;
}

function createCheckButton() {
  return createButton('check-button', function (e) {
    addBookShelfToCompleted(e.target.parentElement.parentElement);
  });
}

function createDeleteButton() {
  return createButton('delete-button', function (e) {
    removeBookShelfFromCompleted(e.target.parentElement.parentElement);
  });
}

function createUndoButton() {
  return createButton('undo-button', function (e) {
    undoBookShelfFromCompleted(e.target.parentElement.parentElement);
  });
}
