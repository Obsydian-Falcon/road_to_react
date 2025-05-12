
import * as React from 'react';

// The custom hook
// The key is needed so that if the hook is used more than
// once, then the 'value' isn't overwritten
const useStorageState = (key, initialState) => {
  // Using 'value' as the variable name allows for a generic implementation
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  // Return the state and the ability to change the state
  return [value, setValue];
};

// The App component
const App = () => {

  // An array of content to show on the site
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

  // The custom hook for using the state in storage
  // 'search' is the key and 'React' is the value
  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');


  // Search handler that is called from the return statement
  // Here, if the browser is closed, the search component remembers the most recent serach.
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get the stories and filter them based on the search input
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* Here, use the Search component and set the handler
          Also, send the searchTerm as a prop
      */}
      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      {/* Here, we return a list of the searched stories.
          The list will be passed as a prop
      */}
      <List list={searchedStories} />
    </div>
  );
};

// The search component, it deconstructs the props passed in from the App component
// Makes a label for the search and sets the value and onChange with the passed props.
const Search = ({ search, onSearch }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </div>
);

// Takes a list prop and creates a list html.
// Gets each item in the list and adds it to an unordered list
const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

// Encapsulates the contents of a list item
const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
);

export default App;

//----------REACT CUSTOM HOOKS NOTES ------
// So far, dealt with useEffect and useState
//
// Gonna make a custom hook called useStorageState, this will
// be used in a manner similar to the native useState hook.
//
// The new hook encapsulates the useState and useEffect hooks,
// however, it needs to receive an initial state
//
// Here, we follow the rules of hooks in React, first, the hook is 
// starting with the word 'use', second, the hook returns an array.
//
// We can make the hook more generic and reusable by changing the scope of the function
// from that of just the search to that of the whole application.
//
// Custom hooks can do a lot of non--trivial functions that don't belong within a component.
//----------REACT CUSTOM HOOKS NOTES END ------
