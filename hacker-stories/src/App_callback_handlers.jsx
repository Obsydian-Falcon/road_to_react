import * as React from 'react';

const App = () => {
  console.log("App Rendered");
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

  // A 
  // This is the callback start, the event handler
  const handleSearch = (e) => {
    // D
    // Here, the handler exececuted in "C" is "called back",
    // thus triggering the event it was designed to handle
    // Now, App won't re-render itself, but be aware of the change.
    console.log("Handler Working" + e.target.value)
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* B 
      // Here, the event handler is sent as a function
      // in props. Thus, it can reach another component.
      //
      */}
      <Search onSearch={handleSearch} />

      <hr />

      <List list={stories} />
    </div>
  );
};

const Search = (props) => {
  console.log("Search Rendered");
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    // C
    // Here, the function passed via a prop is executed as a handler.
    props.onSearch(e);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
};

const List = (props) => {
  console.log("List Rendered");
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
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

// --------- CALLBACK HANDLERS IN JSX NOTES -----------
// Props allow us to transport info to descendent components,
// state helps us make information stateful, but it's only passed
// on using a prop (thus only to descendents).
//
// The "Search" component doesn't share its state with other components.
// But what if we wanted "Serarch" to have a filter?
//
// The Code above, with A, B, C, and D labelled, that code shows
// that an EVENT HANDLER is only a CALLBACK HANDLER, if it includes
// A, B, C, and D
// --------- CALLBACK HANDLERS IN JSX NOTES -----------
