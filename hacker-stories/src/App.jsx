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

  // Here, we get the local storage value if it exists for the initial state
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'

    // This vesion of the method uses the nullish coalescing operator,
    // here, if one were to backspace in search, the refreshed value would 
    // be an empty string instead of "React"
    // localStorage.getItem('search') ?? 'React'
  );

  // Handle the side-effect of the localized search storage in 
  // a dedicated useEffect
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]); // Here, "searchTerm" serves as a dependency array that useEffect needs

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Here we store the search in local storage
    // localStorage.setItem('search', e.target.value)
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

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

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

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


//-------- REACT SIDE EFFECTS --------
// Currently search terms in the React App are dissapearing 
// once the browser is closed and opened again.
//
// Remembering the most recent search would be a neat feature
// wouldn't it?
//
// So a side effect would store the browser's recent search history
// in local storage and retreive it upon initial component initialization.
//
// So now, with the initial state saved in local storage, if the tab
// is refreshed, the user will still have their last search stored.
//
// However, now that the handler has a side-effect, we've got to be aware
// of not adding any bugs whilst doing this
//-------- REACT SIDE EFFECTS END --------
