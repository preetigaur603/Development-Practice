const form = document.querySelector('form');
form.addEventListener("submit",function (event) {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const isbn = document.querySelector("#isbn").value;
  const publicationDate = document.querySelector("#publication-date").value;
  const genre = document.querySelector("#genre").value;

  if(!title  || !author || !isbn  || !publicationDate  || !genre)
  {
    console.log("field can not be empty");
  }
});
