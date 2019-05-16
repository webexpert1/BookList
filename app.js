// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;


}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
    let list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}
// clear fields
UI.prototype.clearFields = function() {
    document.querySelector('#title').value= '';
    document.querySelector('#author').value= '';
    document.querySelector('#isbn').value= '';
}
// Show Alert
UI.prototype.showAlert = function(message, className) {
    // create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    //  Timeout after 3 s
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Add Event Listener
document.querySelector('#book-form').addEventListener('submit', function(e) {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Instantiate Book 
    const book = new Book(title, author, isbn);
    
    // Instantiate UI
    const ui = new UI();
    
    // Validate
    if(title === '' || author === '' || isbn === '' ) {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // clear fields
        ui.clearFields();

        ui.showAlert('Successfully saved', 'success');
    }

    e.preventDefault();
})

// delete Event listenet
document.querySelector('#book-list').addEventListener('click',function(e) {
    // Instantiate UI
    const ui = new UI();
    
    ui.deleteBook(e.target);

    // show message
    ui.showAlert('Sucessfully deleted', 'success');

    e.preventDefault();
})