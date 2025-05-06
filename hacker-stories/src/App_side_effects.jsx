import * as React from 'react';

// Coming back from a month hiatus, gonna just note this up

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
 
  //B: Set the search immediately, if there's no stored state, use the default, "React"
  const [searchTerm, setSearchTerm] = React.useState(
    //A: Setting the side-effect and retrieve it upon component initialization
    localStorage.getItem('search') || 'React'
  );

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

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

// ----- REACT SIDE-EFFECTS NOTES -----
// A react component has output defined by its props and state.
// 
// Side-effects may affect the output of components since they are used to
// interact with third-party APIs (like localStorage)
// 
// With A and B, upon refresh, the browser tab will remember the last input,
// this is basically syncing browser local state with React state
//
// There is a flaw, the hadnler has a side-effect. If we use the "setSearchTerm" function
// later in our application, we break the feature because local storage doesn't update.
//
// So we handle the side-effect in a centralized plaace instead.
//
// Basically, with useEffect hook instead of managing the side-effect in the event handler has made the application more robust
// Whenever and wherever the searchTerm state is updated with setSearchTerm, the browser's local storage will update
// ----- REACT SIDE-EFFECTS NOTES END -----