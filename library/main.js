//books - main div holding aLL the books

const books = document.querySelector(".books");

//array of books
const myLibrary = [
  {
    title: "Book1",
    author: "me",
    pages: 500,
    read: true,
  },
  {
    title: "Book",
    author: "you",
    pages: 5000,
    read: false,
  },
];

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
      renderBooks();
    } else {
      bookItem.setAttribute("class", "card book read-unchecked");
      book.read = false;
      renderBooks();
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
};

//create dummy icons
// const createIcons = () => {
//   const div = createBookElement("div", null, "icons");
//   const icon1 = document.createElement("img");
//   icon1.src = "../images/pencil-image.png";
//   const icon2 = document.createElement("img");
//   icon2.src = "../images/pencil-image.png";
//   const icon3 = document.createElement("img");
//   icon3.src = "../images/pencil-image.png";

//   div.appendChild(icon1);
//   div.appendChild(icon2);
//   div.appendChild(icon3);
// };

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
  books.insertAdjacentElement("afterbegin", bookItem);
};

//function to render all the books
const renderBooks = () => {
  books.innerHTML = "";
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
};

//render on page load
renderBooks();
