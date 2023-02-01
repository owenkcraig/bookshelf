import './App.css';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get our database we must import the corresponding firebase modules
import { getDatabase, onValue, push, remove, ref } from 'firebase/database';

function App() {
  // create books state that will store our database info
  const [books, setBooks] = useState([]);
  // create stateful value that is bound to input
  const [userInput, setUserInput] = useState('');

  // event that will fire every time there is a change in our input
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = (event) => {
    // prevent default behaviour on submit (refresh)
    event.preventDefault();
    // create a reference to our database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // get the information from our userInput State and...
    // send it off to our database using push
    push(dbRef, userInput);
    // reset the input after submitting by changing the state to empty string
    setUserInput('');
  }

  const handleRemoveBook = (bookId) => {
    console.log('removing book');
    // create a reference to the book to be removed in our database
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${bookId}`);
    // call remove() with the referenced node
    remove(dbRef); 
  }

  // get useEffect function to run side effects on component mount
  useEffect( () => {
    // create a variable that holds our database details
    const database = getDatabase(firebase);
    // create a variable that makes a reference to our database
    const dbRef = ref(database);
    // get database info on load or on change 
    // use event listener onValue
    onValue(dbRef, (response) => {
      // use Firebase's .val() to parse our database info into the format we need
      const data = response.val();
      // create an empty array 
      const newState = [];
      // data is an object, so we iterate through it using a for in loop to access each book name
      for (let key in data) {
        // inside the loop, we push each book name to the empty array 
        newState.push(
          {key: key, name: data[key]}
        );

      }
      // set state to match no-longer-empty array
      setBooks(newState);
    })

  }, []);

  return (
    <div className="">
      <form action="submit">
        <label htmlFor="newBook">Add a book to your bookshelf</label>
        <input 
          onChange={handleInputChange} 
          type="text" 
          id="newBook" 
          value={userInput} />
        <button onClick={handleSubmit}>Add Book</button>
      </form>
      <ul>
        {/* map over books state to display each book in <li> */}
        {books.map( (book) => {
          return (
            <li key={book.key}>
              <p>{book.name} 📕</p>
              <button onClick={() => handleRemoveBook(book.key)}>Remove</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;

