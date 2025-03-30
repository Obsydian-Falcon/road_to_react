import * as React from 'react';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
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
    },
  ];

  // Setting searchTerm's state
  const [searchTerm, setSearchTerm] = React.useState('');

  // Here, making a filtered list to return 
  // Also, we make both the title and search term 
  // lower case, to allow for general searching.
  const searchedStories = stories.filter(function(story) {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Here the same function can be made more concise if we 
  // were to refactor
  //   const searr = stories.filter((story) =>
  //     story.title.includes(searchTerm)
  //   );

  // Search A
  const handleSearch = (e) => {
    console.log("Search Handler Activated");
    // Search
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/*Search B */}
      <Search onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

// Here, where will use State to filter a list
// before rendering it.
//
// Therefore, to avoid duplication, we'll move the
// serach state to the App component and handle it 
// with a callback handler
const Search = (props) => {
  console.log("Search Component Activated");
  return (
    <div>
      <label htmlFor="search">Search: </label>
      {/*Search C */}
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};

const List = (props) => {
  console.log("List Component Activated");
  return (
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
};

const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App;

// -------- LIFTING STATE IN REACT NOTES ---------
// What if we wanted searchTerm in the search component to filter
// stories by their title property in the App component before they are passed to
// the list component as props.
//
// In having the Search component's state managed by the App via callback,
// we can have the app handle updates of the component state.
//
// This process of giving the management of state from a child component
// to a parent is called LIFTING STATE
//
// Rule of thumb:
// 1: Keep state in the highest relevant component – The component that needs to manage the state should be the one that directly uses it or is above all components that need it.
// 
// 2: Pass state down as props – If a component below (a child) just needs to use the state (e.g., displaying data), the parent should pass it down as a prop.
// 
// 3: Pass functions down for updates – If a child component needs to change the state (e.g., a search bar updating a list), the parent should pass a function (a callback) that lets the child trigger an update.
// 
// Example
// App (Parent, holds state) → Search (Child, updates state) → List (Child, displays state)
// 
// App keeps the state. It passes the current list as a prop to List.
// 
// App also passes an update function to Search, so Search can trigger a state update when a user types something.
// // -------- LIFTING STATE IN REACT END ---------
