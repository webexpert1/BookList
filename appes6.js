class Book() {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI() {
    addBookToList(book) {
    const list = document.getElementById('book-list');

    // Create tr
    const row = document.createElement('tr');
    
    row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class='delete'>X</a></td>
    `;

    list.appendChild(row);
    
    }

    deleteBookFromList(target) {
     if(target.className == 'delete') {
        target.parentElement.parentElement.remove();
      }  
    }

    clearFields() {
       document.getElementById('title').value = '';
       document.getElementById('author').value = '';
       document.getElementById('isbn').value = '';
    }

    showAlert(message, className) {
        // Create Div
        const div = document.createElement('div');
        // Add Class
        div.className = `alert ${className}`;
        // Add Text
        div.appendChild(document.createTextNode(message));
        // Get Parent
        const container = document.querySelector('.container');
        // Get Form
        const form = document.querySelector('#book-form');
        // Insert alert
        container.insertBefore(div, form);
        // Timeout after 3 s
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// Event Listners
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

   // Instantiate UI
   const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Alert Error
        ui.showAlert('Please fill all fields!', 'error');
    } else {
    //  Add book to list
    ui.addBookToList(book);

    //    Clear book
    ui.clearFields();

    }
   
    e.preventDefault();
});
// Event listners for Delete 
document.getElementById('book-list').addEventListener('click', function(e) {
    // console.log(e.target.className);

    // Instantiate UI
    const ui = new UI;

    // Delete book
    ui.deleteBookFromList(e.target)

    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});