//books - main div holding aLL the books

const books = document.querySelector(".books");

//array of books
let myLibrary = [];
const addBook = document.querySelector(".add-book");
const modal = document.querySelector("#modal");
const span = document.querySelector(".close");

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

addBook.addEventListener("click", () => {
  modal.style.display = "block";
  document.querySelector(".form-title").textContent = "Add Book";
  document.querySelector(".form-add-button").textContent = "Add";
});

function Book(title, author, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.id = Math.floor(Math.random() * 10000000000);
}

const addBookToLibrary = (title, author, pages, read) => {
  myLibrary.push(new Book(title, author, pages, read));
  saveAndRenderBooks();
};

const addBookForm = document.querySelector(".add-book-form");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  let newBook = {};
  for (let [name, value] of data) {
    if (name === "book-read") {
      newBook["book-read"] = true;
      //ignore
    } else {
      newBook[name] = value || "";
    }
  }
  if (!newBook["book-read"]) {
    newBook["book-read"] = false;
  }
  addBookToLibrary(
    newBook["book-title"],
    newBook["book-author"],
    newBook["book-pages"],
    newBook["book-read"]
  );
});

const addLocalStorage = () => {
  // localStorage => save things in key value pairs - key = library : myLibrary

  myLibrary = JSON.parse(localStorage.getItem("library")) || [];
  saveAndRenderBooks();
};

//helper function to create html elements with textcontent and classes
const createBookElement = (el, content, className) => {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute("class", className);
  return element;
};

//helper function to create an input with event listener for if a book is read
const createReadElement = (bookItem, book) => {
  const read = document.createElement("div");
  read.setAttribute("class", "book-read");
  read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
  const input = document.createElement("input");
  input.type = "checkbox";
  input.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.setAttribute("class", " card book read-checked");
      book.read = true;
      saveAndRenderBooks();
    } else {
      bookItem.setAttribute("class", "card book read-unchecked");
      book.read = false;
      saveAndRenderBooks();
    }
  });
  if (book.read) {
    input.checked = true;
    bookItem.setAttribute("class", "card book read-checked");
  }
  read.appendChild(input);

  return read;
};

//create the edit icon
const createEditIcon = (book) => {
  const editIcon = document.createElement("img");
  editIcon.src = "../images/pencil-image.png";
  editIcon.setAttribute("class", "edit-icon");
  editIcon.addEventListener("click", (e) => {
    console.log(book);
  });
  return editIcon;
};

//create dummy icons
const createIcons = () => {
  const div = createBookElement("div", null, "icons");
  const icon1 = document.createElement("img");
  icon1.src = "../images/pencil-image.png";
  const icon2 = document.createElement("img");
  icon2.src = "../images/pencil-image.png";
  const icon3 = document.createElement("img");
  icon3.src = "../images/pencil-image.png";

  div.appendChild(icon1);
  div.appendChild(icon2);
  div.appendChild(icon3);

  const books = document.querySelector(".books");
  books.appendChild(div);
  return div;
};

const deleteBook = (index) => {
  myLibrary.splice(index, 1);
  localStorage.setItem("library", JSON.stringify(myLibrary));
  saveAndRenderBooks();
};

//Function to create all of the book content on the book dom card
const createBookItem = (book, index) => {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.setAttribute("class", "card book");
  bookItem.appendChild(
    createBookElement("h1", `Title:${book.title}`, "book-title")
  );
  bookItem.appendChild(
    createBookElement("h1", `Author:${book.author}`, "book-author")
  );
  bookItem.appendChild(
    createBookElement("h1", `Pages:${book.pages}`, "book-pages")
  );
  bookItem.appendChild(createReadElement(bookItem, book));
  bookItem.appendChild(createBookElement("button", "X", "delete"));
  bookItem.querySelector(".delete").addEventListener("click", () => {
    deleteBook(index);
  });
  books.insertAdjacentElement("afterbegin", bookItem);
};

//function to render all the books
const renderBooks = () => {
  books.textContent = "";
  books.innerHTML = "";
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
};

const saveAndRenderBooks = () => {
  localStorage.setItem("library", JSON.stringify(myLibrary));
  renderBooks();
};

//render on page load
addLocalStorage();
