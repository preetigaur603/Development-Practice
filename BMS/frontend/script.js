const books = [];
const form = document.querySelector('form');
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
  books.push(book);
  console.log(books);
  
});
