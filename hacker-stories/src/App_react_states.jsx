import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const App = () => {
  console.log("App renders")
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
    <div>
      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      {/* Commenting out the old list to use a list that's passed as a prop */}
      {/* <List /> */}
      <List list={stories} />
    </div>
  );
};

// Building our first component to handle the lists
// Changing this function to an arrow
// 
// Making this accept props
// PROPS come from PARENTS to CHILDREN
const List = (props) => {
  console.log("List renders")
  return (
    <div>
      {/* Render it All */}
      <ul>
        {/* Making an Item prop*/}
        {/* Since this is JSX code, it needs to be returned properly */}
        {props.list.map((item) => (
          <Item key={item.objectID} item={item} />
        ))}
      </ul>
    </div>
  );
};

const Item = (props) =>
  <li>
    <span><a href={props.item.url}>{props.item.title}</a></span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>

// New search while working with handlers
// Handler Function in JSX (book)
const Search = () => {
  console.log("Search renders")
  // Now, when a user types text into the input field,
  // the user will want to see this info (state)
  // displayed next to it.
  const [searchTerm, setSearchTerm] = useState(''); // useState sets the variable name and additionally gives us a function to set the value

  const handleChange = (e) => {
    // Now, when the user types into the input field, 
    // the input field's "onChange" uses the event handler
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {/* Remeber to use "htmlFor" */}
      {/*<h2>THIS IS SEARCH COMPONENT</h2>*/}
      <label htmlFor='search'>search</label>
      {/* Here, we make the onChange handler CALL BACK to the handleChange method */}
      <input id='search' type='text' onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );

};


// Extracting label an search into their own components
export default App;


// ----------------- REACT STATE NOTES ----------------
// React props are not mutable, but aa STATE introduces a 
// mutable datastructure. Thus, these values get instantiated into
// a React component as state. They can be passed with props but also
// get mutated by using a function to modify the state
//
// Mutating a state will make all the child components re-render
//
// Props are used to pass info down the hierarchy
// States are used to modify information over time
//
// Now, when components change, ONLY those components and
// their children re-render.
//
// "useState" is a REACT HOOK. One of several.
// Can have as many "useState" as we want.
//
// React batches state updates and re-renders asynchrynously,
// calling setState won't guerantee an immediate re-render.
//
// "useState" relies on "Closure" which is essnetially when a function
// relies on an inner function that allows cousin functions to 
// change the shared information.
// There's an example below
//
// -- Use State Example ---
// function getEmployeeFactory() {
//   let employeeNumber = 1;
//   return function(name, country) {
//     return { employeeNumber: employeeNumber++, name, country };
//   };
// }
// 
// const getEmployee = getEmployeeFactory();
// 
// const employeeOne = getEmployee('Robin', 'Germany');
// const employeeTwo = getEmployee('Markus', 'Canada');
// 
// const employees = [employeeOne, employeeTwo];
// 
// console.log(employees);

// [
//   { employeeNumber: 1, name: 'Robin', country: 'Germany' },
//   { employeeNumber: 2, name: 'Markus', country: 'Canada' },
// ]
// -- Use State Example End ---
// ----------------- REACT STATE END ----------------
