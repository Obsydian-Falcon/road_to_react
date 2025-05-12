
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
      <InputWithLabel
        id='search'
        value={searchTerm}
        onInputChange={handleSearch}
      >
        {/* This is component composition, this particular input will be named 'Search' */}
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {/* Here, we return a list of the searched stories.
          The list will be passed as a prop
      */}
      <List list={searchedStories} />
    </div>
  );
};

// Here, the search component has been changed to an InputWithLabel
// to make it more generic and reusable.
// 
// Here, instead of a label value, we look at the children of the component and
// set that as the label name.
const InputWithLabel = ({ id, value, type = 'text', onInputChange, children }) => (
  <>
    <label htmlFor={id}>{children} </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
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

//----------REACT COMPONENT COMPOSITION NOTES ------
// A react application is essentially just a bunch of components arranged in a tree structure.
// 
// Now, react component's elements behave similarly to HTML. Everything passed between a component's elements
// can be accessed via the children prop.
//
// Not gonna lie, this kinda confuses me, it seems like overcomplication for no apparent reason
//----------REACT COMPONENT COMPOSITION NOTES END ------
