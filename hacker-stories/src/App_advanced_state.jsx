import * as React from 'react';

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

// Setup the promise
const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      5000 // Set the loading to five seconds
    )
  );

//A: Setup the reducer outside components
// Reducer's must recieve a state and an action and return a new state when finished
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STORIES':
      // Reducer actions are associated with some "type" and a payload (as a best practice)
      return action.payload;
    case 'REMOVE_STORY': // Filter the stories to remove the given one.
      return state.filter((story) => action.payload.objectID !== story.objectID);
    default:
      throw new Error();
  };
}

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  // This hook receives a reducer function and initial state arguments.
  // It returns an array with two items. The first item is the current state
  // and the second item is the updater function (dispatch function)
  const [stories, dispatchStories] = React.useReducer(storiesReducer, []);
  // Boolean to keep track of whether the page is loading or not
  const [isLoading, setIsLoading] = React.useState(true);
  // Boolean to keep track of errors returned by the API (API doesn't exist in this example)
  const [isError, setIsError] = React.useState(false);

  // The side-effect to get the data for the client
  React.useEffect(() => {
    getAsyncStories().then(result => {
      //B: Here, we use the reducer update function to set the stories
      dispatchStories({
        type: 'SET_STORIES',
        payload: result.data.stories,
      });
      setIsLoading(false); // Once the data is set, stop loading
    })
      .catch(() => setIsError(true)); // Let there be an error-setting piece
  }, []);

  // Change this to use a reducer
  const handleRemoveStory = (item) => {
    //C: Use the reducer function in order to remove a story
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {isError && <h1>SOMETHING WENT WRONG</h1>}

      {/* JSX in order to ensure that loading shows up when it needs to */}
      {isLoading ? (
        <h1>LOADING....</h1>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

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

const Item = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

export default App;

//----- REACT ADVNANCED STATE NOTES ----
// So far, state management has been controlled via the "useState" hook.
//
// "useReducer" is another hook that can be used to manage state in a more complex way.
// Using the reducer is useful when there are multiple stateful values that depend on each
// other or are related to one domain.
// eg. (stories, isLoading, and error) all relate to data fetching
//
// If there is one thing to be updated, a useReducer wouldn't make too much sense,
// however, if we need to track multiple states, it may do the job
//----- REACT ADVNANCED STATE NOTES END ----
