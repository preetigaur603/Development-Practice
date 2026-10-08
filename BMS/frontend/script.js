const books = [];
let editingIndex = null;

const bookList = document.querySelector("#bookList");
const form = document.querySelector("form");
const searchInput = document.querySelector("#search");

function fetchBooksFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (books.length > 0) {
        resolve("book added successfully");
      } else {
        reject("book not added");
      }
    }, 2000);
  });
}

fetchBooksFromServer()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });

async function fetchBooksFromAPI() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!response.ok) {
      throw new Error("Internal server error");
    }

    const res = await response.json();

    console.log(res);

    return res;
  } catch (err) {
    console.error(err);
  }
}

fetchBooksFromAPI()
  .then((res) => {
    res.forEach((book) => {
      const bookItem = document.createElement("div");

      bookItem.textContent = `
        Title: ${book.title}
        Description: ${book.body}
      `;

      bookList.appendChild(bookItem);
    });
  })
  .catch((err) => {
    console.error(err);
  });

function displayBooks(bookArray = books) {
  bookList.innerHTML = "";

  bookArray.forEach((book) => {
    const bookItem = document.createElement("div");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    bookItem.textContent = `
      Title: ${book.title}
      Author: ${book.author}
      ISBN: ${book.isbn}
      Publication Date: ${book.publicationDate}
      Genre: ${book.genre}
    `;

    editBtn.addEventListener("click", () => {
      const actualIndex = books.indexOf(book);
      const selectedBook = books[actualIndex];

      editingIndex = actualIndex;

      document.querySelector("#title").value = selectedBook.title;
      document.querySelector("#author").value = selectedBook.author;
      document.querySelector("#isbn").value = selectedBook.isbn;
      document.querySelector("#publication-date").value =
        selectedBook.publicationDate;
      document.querySelector("#genre").value = selectedBook.genre;
    });

    deleteBtn.addEventListener("click", () => {
      const actualIndex = books.indexOf(book);

      books.splice(actualIndex, 1);

      displayBooks();
    });

    bookList.appendChild(bookItem);
    bookItem.appendChild(editBtn);
    bookItem.appendChild(deleteBtn);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const isbn = document.querySelector("#isbn").value;
  const publicationDate =
    document.querySelector("#publication-date").value;
  const genre = document.querySelector("#genre").value;

  if (!title || !author || !isbn || !publicationDate || !genre) {
    console.log("Field cannot be empty");
    return;
  }

  if (isNaN(isbn) || isbn.length < 10 || isbn.length > 13) {
    console.log(
      "ISBN must be a number and should be between 10 and 13 digits"
    );
    return;
  }

  const book = {
    title: title,
    author: author,
    isbn: isbn,
    publicationDate: publicationDate,
    genre: genre
  };

  if (editingIndex === null) {
    books.push(book);
  } else {
    books[editingIndex] = book;
  }

  displayBooks();

  editingIndex = null;

  form.reset();

  console.log(books);
});

function searchBooks() {
  const search = searchInput.value.toLowerCase().trim();

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(search);
  });

  displayBooks(filteredBooks);
}

searchInput.addEventListener("input", searchBooks);
