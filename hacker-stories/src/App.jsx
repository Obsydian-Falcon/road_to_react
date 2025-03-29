import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const title = "React"

// Creating a JS object
const welcome = {
  title: "React",
  greeting: "Hey",
}

// A function for getting the title
function getTitle(title) {
  return title;
}
const list = [
  {
    title: 'React',
    url: 'https://react.dev/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
]

const items = ['string', 'name', 'number'];

// This is a REACT COPMONENT, but it's specifically an APP COMPONENT
function App() {
  return (
    <>
      <div>
        {/* <h1>{welcome.greeting} {welcome.title}</h1> */}
        {/* Here, we us a function defined globally to get the title (title is passed as a parameter' */} 
        <h1>Hello {getTitle('React')}</h1>
      </div>
      <div>
        {/* Remeber to use "htmlFor" */}
        <label htmlFor='search'>search</label>
        <input id='search'type='text' />
      </div>
      {/* Here, we use a map function to output a list */} 
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.indexOf}>{item}</li> 
          ))}
        </ul>
      </div>
      {/* Here, we use the map method to get the title of each item in the list */} 
      <div>
        <ul>
          {list.map((object) => (
            <li key={object.objectID}>{object.title}</li> 
          ))}
        </ul>
      </div>
      {/* Here, we do the same as above but with a fucntion */} 
      <div>
        <ul>
          {list.map(function (object, index) {
            return (
              <li key={index}>
                {object.title}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {/* Render it All */}
        <ul>
          {list.map((object) => (
            <li key={object.objectID}>
              <span>{object.title}</span>
              <span><a href={object.url}>{object.title}</a></span>
              <span>{object.num_comments}</span>
              <span>{object.points}</span>
            </li>
          ))}
        </ul>
      </div>
  
    </>
  )
}

export default App;

/* React Fast Refresh is what bridges React and the dev server
* Though, on the server side, this bridge is called Hot Module Replacement
*/
