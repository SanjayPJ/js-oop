class Book{
	constructor(title, author, isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}
class UI{
	add_book_to_list(book){
		const list = document.getElementById('book-list');
		//create a table row element
		const row = document.createElement('tr');
		row.innerHTML = `<td>${book.title}</td>
						 <td>${book.author}</td>
						 <td>${book.isbn}</td>
						 <td><a href="" class="delete"><i class="fas fa-trash-alt"></i></a></td>`;
		list.appendChild(row);
	}
	clear_fields(){
		const title = document.getElementById('title').value = "",
		  author = document.getElementById('author').value = "",
		  isbn = document.getElementById('isbn').value = "";
	}
	show_alert(message, class_name){
		const div = document.createElement('div');
		div.className = `alert ${class_name}`;
		div.appendChild(document.createTextNode(message));
		//get parent
		const container	= document.querySelector('.container');
		const form = document.querySelector('#book-form');
		// insert alert
		container.insertBefore(div, form);
		setTimeout(function(){
			document.querySelector('.alert').remove();
		}, 3000);
	}
	delete_book(target, ui){
		if(target.className === 'fas fa-trash-alt'){
			target.parentElement.parentElement.parentElement.remove();
			ui.show_alert('Book Removed', 'success');
		}
	}
}

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
	//get form values
	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;
	//instantiate book
	const book =  new Book(title, author, isbn);
	//instatiate ui
	const ui = new UI()
	//validate
	if(title === '' || author === '' || isbn === ''){
		//do something
		ui.show_alert('Please fill in all fields', 'error');
	}else{
		ui.add_book_to_list(book);
		ui.show_alert('Book Added!', 'success');
		ui.clear_fields();
	}
	e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
	const ui = new UI();
	ui.delete_book(e.target, ui);
	e.preventDefault();
});