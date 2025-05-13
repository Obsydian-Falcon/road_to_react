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

  const [stories, setStories] = React.useState([]);
  // Boolean to keep track of whether the page is loading or not
  const [isLoading, setIsLoading] = React.useState(true);
  // Boolean to keep track of errors returned by the API (API doesn't exist in this example)
  const [isError, setIsError] = React.useState(false);

  // The side-effect to get the data for the client
  React.useEffect(() => {
    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoading(false); // Once the timeout ends, the data is set and loading is set to false
    })
      .catch(() => setIsError(true)); // Let there be an error-setting piece
    setIsLoading(true); // While the data is not set, loading is true
  }, []);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
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

//----- REACT CONDITIONAL RENDERING NOTES ----
// Here, we're going to try and have some loading going on while we wait for 
// async data to come back
//
// Basically, we just have a loading state that will show on the page
// if there is no data in the story array/list. Same goes for errors, (though)
// we're not using a real API yet.
//----- REACT CONDITIONAL RENDERING NOTES END ----
