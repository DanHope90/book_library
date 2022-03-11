MySQL Book Library API

In this repository I have created an Express API using mySQL2, Sequelize, Mocha/Chai, and Superfast for testing. This project was part of the back-end module at Manchester Codes.


Project Setup

Install Docker 

Run and pull MySQL image 
docker run -d -p 3306:3306 --name book_library  -e MYSQL_ROOT_PASSWORD=pass mysql

Create a new dictionary on your computer 

Clone repository with SHH link from github 

Initalise new NPM project with npm init

Run npm install

Create a .env and .env.test file with the following configuration - 

.env

DB_PASSWORD=pass
DB_NAME=APP_NAME
DB_USER=root
DB_HOST=localhost
DB_PORT=3306

.env.test

DB_PASSWORD=pass
DB_NAME=APP_NAME.test
DB_USER=root
DB_HOST=localhost
DB_PORT=3306

At this point you should be able to listen to run npm start 



Controllers

There are five controllers in total designed to translate the users commands when searching or creating book details in the database.

The controllers for author, book, genre, and reader have the same functionality. 
For example - 

Author
createAuthor 
getAuthor
getAuthorById
updateAuthor
deleteAuthor

Book
createBook
getBook
getBookById
updateBook
deleteBook

Genre 
createGentre
getGenre
getGenreById
updateGenre
deleteGenre

Reader
createReader
getReader
getReaderById
updateGenre
deleteGenre

The Helper controller’s concept is slightly different as it mimics the functionality of the other controllers described above so that their code can be simplified to avoid repetition and cleaner code. 

Helper
createItem
getAllItems
getItemById
updateItem
deleteItem

Routes

Author
Requires and authors name: 

createsAuthor: creates and authors name (POST)
getAuthors: gets all authors (GET)
getAuthorById: gets individual authors name (GET)
updateAuthor: updates individual authors name (PATCH)
deleteAuthor: deletes individual authors name (DELETE)

Book
Requires book title, authorId genreId and ISBN: 

createsBook: creates and book name (POST)
getBook: gets all books (GET)
getBookById: gets individual book name (GET)
updateBook: updates individual book name (PATCH)
deleteBook: deletes individual book name (DELETE)

Genre 
Requires genre name: 

createsGenre: creates and genre name (POST)
getGenre: gets all genre (GET)
getGenreById: gets individual genre name (GET)
updateGenre: updates individual genre name (PATCH)
deleteGenre: deletes individual genre name (DELETE)

Reader
Requires readers name, email, password. 

createsReader: creates and reader name (POST)
getReader: gets all reader (GET)
getReaderById: gets individual reader name (GET)
updateReader: updates individual reader name (PATCH)
deleteReader: deletes individual reader name (DELETE)






