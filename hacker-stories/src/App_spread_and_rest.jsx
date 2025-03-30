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

  const [searchTerm, setSearchTerm] = React.useState('React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

// Prop destructuring via Object destructuring
const user = {
  firstName: 'Robin',
  lastName: 'Wieruch',
};

// Without object destructuring
// const firstName = user.firstName;
// const lastName = user.lastName;

// This is object destructuring
// const { firstName, lastName } = user;


// Using obj destructuring to access different aspects of prop
// in one line.
// const {search, onSearch } = props;
// 
// Additionally, we can destructure in the function
// parameters instead if we don't want to refactor to 
// block body.
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

// Even below is impressive, we can make it even more
// using the "spread" operator (three dots)
//
// However, we can make it even MORE concise using the REST
// operater (three dots)
//
// The difference is that SPREAD takes place
// on the right side of the assignment, REST
// takes place on the left side.
const List = ({ list }) => (
  <ul>
    {list.map(({ objectID, ...item }) => (
      // Here, the ITEM component recieves the remaining attributes of the item */ }
      < Item key={objectID} {...item} />
    ))}
  </ul>
);

const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span><a href={url}>{title}</a></span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);
// Here, we destructure a prop via a nesting method.
// Instead of passing an item as an object from List to Item
// this allows us to pass every property of the "item" object
// const List = ({ list }) => (
//   <ul>
//     {list.map((item) => (
//       <Item
//         key={item.objectID}
//         title={item.title}
//         url={item.url}
//         author={item.author}
//         num_comments={item.num_comments}
//         points={item.points}
//       />
//     ))}
//   </ul>
// );

// Here we take the destructured prop from the list and create
// the list HTML in a more concise fashion.
// const Item = ({ title, url, author, num_comments, points }) => (
//   <li>
//     <span><a href={url}>{title}</a></span>
//     <span>{author}</span>
//     <span>{num_comments}</span>
//     <span>{points}</span>
//   </li>
// );
// Refactoring the props to be destructured in the function signature
// const List = ({ list }) => (
//   <ul>
//     {list.map((item) => (
//       <Item key={item.objectID} item={item} />
//     ))}
//   </ul>
// );
// 
// // Refactoring the props to be destructured in the function signature
// const Item = ({ item }) => (
//   <li>
//     <span>
//       <a href={item.url}>{item.title}</a>
//     </span>
//     <span>{item.author}</span>
//     <span>{item.num_comments}</span>
//     <span>{item.points}</span>
//   </li>
// );

export default App;


//----- PROPS HANDLING (ADVANCED) NOTES -----
// Props are passed from parent to child down the component tree.
// Since props transport info from component to component frequently,
// thus, it's useful to have a few tricks to make passing them more 
// convenient.
//
// When accessing different properties of an object, using a single line of code
// rather than multiple is more straighforward and elegant.
//
// So, knowing this, we can destructure props explicitly or within the function signature.
// I enjoy doing it in the signature so far, it also aligns with JS best practices.
//
// We can go further with more advanced techniques.
//
// Looking at the code, the "item" param in ITEM has sosmething in common with 
// the "props" parameter, they're both JS objects.
//
// NESTED DESTRUCTURING
//
// const user = {
//   firstName: 'Robin',
//   pet: {
//     name: 'Trixi',
//   },
// }
//
//-------- ADVANCED DESTRUCTURING --------
// // without object destructuring
// const firstName = user.firstName'
// const petName = user.pet.name;
//
// console.log(firstName + ' has a pet called ' + petName);
// 
// // With nested object destructuring
// const {
//   firstName,
//   pet: {
//     name,
//   },
// } = user;
// 
// console.log(firstName + ' has a pet called ' + name);
//-------- ADVANCED DESTRUCTURING END --------
// Spread and Rest operators
// First, we're going to refactor List and Item to a new implementation
//
// SPREAD gets you the attributes of an object,
// REST gets the attributes minus those mentioned
// in the assignment of the object.
//----- PROPS HANDLING (ADVANCED) END -----
