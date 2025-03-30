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
// const list = [
//   {
//     title: 'React',
//     url: 'https://react.dev/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   }
// ]

const items = ['string', 'name', 'number'];

// This is a REACT COPMONENT, but it's specifically an APP COMPONENT
// Now, gonna change the APP function to an arrow function
const App = () => {
  // First try at making a prop (property), they should explain that
  const stories = [
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
  ];

  return (
    <>
      <div>
        {/* <h1>{welcome.greeting} {welcome.title}</h1> */}
        {/* Here, we us a function defined globally to get the title (title is passed as a parameter' */}
        <h1>Hello React</h1>
      </div>
      <hr />
      <Search />
      {/* Here, we use a map function to output a list */}
      <div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      {/* Here, we use the map method to get the title of each item in the list */}
      {/*<div>
        <ul>
          {list.map((object) => (
            <li key={object.objectID}>{object.title}</li>
          ))}
        </ul>
      </div>
      */}
      {/* Here, we do the same as above but with a fucntion */}
      {/*<div>
        <ul>
          {list.map(function(object, index) {
            return (
              <li key={index}>
                {object.title}
              </li>
            );
          })}
        </ul>
      </div>
      */}
      <hr />
      {/* Commenting out the old list to use a list that's passed as a prop */}
      {/* <List /> */}
      <List list={stories} />
    </>
  )
}

// Building our first component to handle the lists
// Changing this function to an arrow
// 
// Making this accept props
// PROPS come from PARENTS to CHILDREN
const List = (props) => {
  return (
    <div>
      {/* Render it All */}
      <ul>
        {/* Making an Item prop*/}
        {/* Since this is JSX code, it needs to be returned properly */}
        {props.list.map((item) => (
          <Item key={item.objectID} item={item} />
        ))}
        {/* Refactoring the map function */}
        {/* {props.list.map((object) => (
          <li key={object.objectID}>
            <span>{object.title}</span>
            <span><a href={object.url}>{object.title}</a></span>
            <span>{object.num_comments}</span>
            <span>{object.points}</span>
          </li>
        ))}
        */}
        {/*
        {list.map((object) => (
          <li key={object.objectID}>
            <span>{object.title}</span>
            <span><a href={object.url}>{object.title}</a></span>
            <span>{object.num_comments}</span>
            <span>{object.points}</span>
          </li>
        ))}
        */}
      </ul>
    </div>
  );
}

const Item = (props) =>
  <li>
    <span><a href={props.item.url}>{props.item.title}</a></span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>

// Since this just does a RETURN, we can shorten it as such
// However, block bodies may be neccesarry for more business logic
// So, write all as ACTUAL functions then refactor to simpler ones
//---FUNCTION IN A DIFFERENT STYLE ---
//const Search = () =>
//  <div>
//    {/* Remeber to use "htmlFor" */}
//   {/*<h2>THIS IS SEARCH COMPONENT</h2>*/}
//    <label htmlFor='search'>search</label>
//    <input id='search' type='text' />
//  </div>
//  -----FUNCTION END ------------

// New search while working with handlers
// Handler Function in JSX (book)
function Search() {
  // define a function (business logic) here
  const handleChange = (e) => {
    // synthetic event
    console.log(e);
    // value of the target (the input HTML element)
    console.log(e.target.value);
  };
  // Preface handlers with "handle". 
  // So handleClick, handBlur, etc... for the names
  const handleBlur = (e) => {

    console.log(e);
    console.log(e.taget.value);
    document.getElementById('search').style.background = 'blue';

  };

  return (
    <div>
      {/* Remeber to use "htmlFor" */}
      {/*<h2>THIS IS SEARCH COMPONENT</h2>*/}
      <label htmlFor='search'>search</label>
      {/* Here, we make the onChange handler CALL BACK to the handleChange method */}
      <input id='search' type='text' onChange={handleChange} onBlurCapture={handleBlur} />
    </div>
  );
}


// Extracting label an search into their own components
export default App;


//------ NOTES -----
/* React Fast Refresh is what bridges React and the dev server
* Though, on the server side, this bridge is called Hot Module Replacement
*
*JS and React componetnts are not related
*
* In JS, classes can define functions associated with a class instance.
* These are called methods or class methods. An instance is created with the
* "new" statement.
*
* Should  JS class decleration exist, one may createa multiple instances of it.
*
* Similar to JS classes with decleration and instantiation, a React component has only ONE 
* decleration but multiple instances.
* 
* Once a component is defined. We can use it as an ELEMENT anywher in our JSX.
* 
* An element is an instance of the component. 
*
* The React DOM is used once in the application to hook React into the native HTML world.
*
* The createRoot() method helps to instantiate React (declared in main.jsx)
*  Usually, there will only be one createRoot() method unlesss working with
*  legacy applications
*
*  The components created so far are "function components" this can be leveraged so that we can declare
*  functions in JS for them.
*
*  If an arrow function's only purpose is to return a value and it doesn't have
*  any business logic in bewtwen, the block body (curly braces) can be removed
*
*  in a CONCISE BODY, an IMPLICIT RETURN statement is attached, so the return staement can be removed
*
*  const addOne = (count) => {
*    return count + 1;
*  }
*         |
*  IS TURNED INTO 
*
*  const addOne = (count) =>
*   count + 1;
*
* Props allow us to pass variables as information from one component to another. 
* Even though these components are not pliced in the ame file at some point
*
* IMPORTANT: Props cannot be changeed, they are treated as an immutable data structure. 
* They only pass info DOWN the component hierarchy.
*
*/
