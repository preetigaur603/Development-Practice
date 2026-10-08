const books = [];
let editingIndex= null;
const bookList = document.querySelector("#bookList");
const form = document.querySelector('form');
function displayBooks(){
  bookList.innerHTML = "";
  books.forEach((book,index)=>{
    const bookItem = document.createElement("div");
    const editBtn  = document.createElement("button");
    editBtn.textContent = "Edit";
    bookItem.textContent = `Title:${book.title}
    Author:${book.author}
    ISBN: ${book.isbn}
    Publication Date: ${book.publicationDate}
    Genre: ${book.genre}
    `;
    editBtn.addEventListener("click",()=>{
      const selectedBook = books[index];
      editingIndex = index;
      document.querySelector("#title").value = selectedBook.title;
      document.querySelector("#author").value = selectedBook.author;
      document.querySelector("#isbn").value = selectedBook.isbn;
      document.querySelector("#publication-date").value = selectedBook.publicationDate;
      document.querySelector("#genre").value = selectedBook.genre;
    });
    bookItem.appendChild(editBtn);
    bookList.appendChild(bookItem);
  });
}
form.addEventListener("submit",(event)=>{
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const isbn = document.querySelector("#isbn").value;
  const publicationDate = document.querySelector("#publication-date").value;
  const genre = document.querySelector("#genre").value;

  if(!title  || !author || !isbn  || !publicationDate  || !genre)
  {
    console.log("field can not be empty");
    return;
  }
  if(isNaN(isbn) || isbn.length <10 || isbn.length >13 ){
    console.log("ISBN must be a number and  should be 10 digit minimum or 13 digit maximimum");
  return;
  }
  const book = {
    title:title,
    author:author,
    isbn:isbn,
    publicationDate:publicationDate,
    genre:genre
  };
  if (editingIndex === null){
    books.push(book);
  }
  else{
    books[editingIndex] = book;
  }
  
  displayBooks();
  editingIndex = null;
  console.log(books); 
  
});

