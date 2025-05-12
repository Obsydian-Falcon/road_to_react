
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
        label='Search'
        value={searchTerm}
        onInputChange={handleSearch}
      />

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
const InputWithLabel = ({ id, label, value, type = 'text', onInputChange }) => (
  // By having the type set in the signature, this component will be the default
  // type if it isn't specified.
  //
  // Now, this component can take data types of text or num or whatever is specified 
  // by the caller.
  <>
    <label htmlFor={id}>{label}: </label>
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

//----------REUSABLE REACT COMPONENTS NOTES ------
// Right now, the search is only good for appearing once, we can make it 
// reusable by transforming it into a generic component.
//----------REUSABLE REACT COMPONENTS NOTES END ------
