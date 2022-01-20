<p align="center">
  <a href="https://github.com/lezvieprod/react-pagination-bar">
    <img src="https://raw.githubusercontent.com/lezvieprod/react-pagination-bar/main/logo.png" alt="RPB Logo" width="500" />
  </a>
</p>

<h1 align="center">React Pagination Bar</h1>
<p align="center">Lightweight component for pagination of application pages on react</p>

## Features

- Customizing class names without using style overrides
- Multiple pagination display modes.
- Accessible. React Pagination Bar follow the WAI-ARIA guidelines specifications.
  and have the right `aria-*` attributes.
- Lightweight :P

## Getting Started

Install the library using one of these commands:

```sh
$ npm i react-pagination-bar

# or

$ yarn add react-pagination-bar
```

## Usage

To start using the library, add import Pagination and place the component in your code.

Simple usage without react-router-dom:

```jsx
import { Pagination } from "react-pagination-bar"

const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
  { id: 6, title: 'Post 6' },
  { id: 7, title: 'Post 7' },
  { id: 8, title: 'Post 8' },
  { id: 9, title: 'Post 9' },
  { id: 10, title: 'Post 10' },
  { id: 11, title: 'Post 11' },
  { id: 12, title: 'Post 12' },
];

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 3;

  return (
    <div className="App">
      {posts
        .slice(
          (currentPage - 1) * pagePostsLimit,
          (currentPage - 1) * pagePostsLimit + pagePostsLimit
        )
        .map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })}
      <Pagination
        initialPage={currentPage}
        itemPerPage={pagePostsLimit}
        onChangePage={(pageNumber) => setCurrentPage(pageNumber)}
        totalItems={posts.length}
        pageNeighbours={2}
      />
    </div>
  );
};
```

## More examples

Coming soon...


## License

MIT © [Ilya Sokol](https://github.com/lezvieprod)
