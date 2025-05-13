import * as React from 'react';
import { useState } from 'react';

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
  const initialStories = [
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

  // Now set the stories to their initial state
  const [stories, setStories] = useState(initialStories);

  // Callback function for removing a story 
  const handleRemoveStory = (item) => {
    // Get only stories that don't match the id of the given story
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    // Return a list of stories minus the given story
    setStories(newStories);
  };

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
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
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
const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

// Encapsulates the contents of a list item
const Item = ({ item, onRemoveItem }) => (

  // Here is the local handler that actually calls the function on the item
  // DESIGNATE AS HANDLER 1
  // const handleClick = () => {
  //   onRemoveItem(item);
  // };

  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    {/* This here will create the button and call the callback function via lamda expression */}
    <span>
      <button type='button' onClick={() => onRemoveItem(item)}>
        REMOVE
      </button>
    </span>
  </li>
);

export default App;

//----------INLINE HANDLER JSX NOTES ------
// Here, we want to add a remove button to each item shown in the list.
// To do this, we can set the initial list contents as the 'initialStories' array
// and then use 'useState' in order to set the default state.
//
// So, we define the callback handler within the App component,
// aftwerwards, we pass the handler down as a prop from the list component to the
// item component.
//
// Finally, in the item component, we make another callback to actually trigger the original function.
//
// Now, that's the normal way of doing it, howeve, we can replace HANDLER 1 with an inline
// expression that does the same job without making the code longer.
//
// eg. onClick={onRemoveItem.bind(null, item)} (javascript bind function)
// or
// eg. onClick={() => onRemoveItem(item)} (lambda function)
//
//
// If an inline handler turns out to be a block body instead of concise, it's best
// to move the handler outside of the JSX
//----------INLINE HANDLER JSX NOTES END ------
