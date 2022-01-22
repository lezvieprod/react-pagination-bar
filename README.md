<p align="center">
  <a href="https://github.com/lezvieprod/react-pagination-bar">
    <img src="https://raw.githubusercontent.com/lezvieprod/react-pagination-bar/main/logo.png" alt="RPB Logo" width="500" />
  </a>
</p>

<h1 align="center">React Pagination Bar</h1>
<p align="center">Lightweight component for pagination of application pages on react</p>
<p align="center"><a href="https://react-pagination-bar.vercel.app/" rel="nofollow" target="_blank">Demo</a></p>

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
If you are not going to customize the styles of the component, don't forget to add the default styles:
```jsx
import 'react-pagination-bar/dist/index.css'
```

Simple usage without react-router-dom:

```jsx
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'

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
        .slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
        .map((post) => <div key={post.id}>{post.title}</div>)}
      <Pagination
        initialPage={currentPage}
        itemsPerPage={pagePostsLimit}
        onPageСhange={(pageNumber) => setCurrentPage(pageNumber)}
        totalItems={posts.length}
        pageNeighbours={2}
      />
    </div>
  );
};
```
## Props
<table>
  <thead>
    <tr>
      <th>Prop name</th>
      <th>Type</th>
      <th>Default value</th>
      <th>Description</th>
      <th>Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>totalItems</td>
      <td>Number</td>
      <td>None</td>
      <td>Total number of items on the server.</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>onPageСhange</td>
      <td>((pageNumber: number) => void)</td>
      <td>None</td>
      <td>Callback triggered on page change.</td>
      <td>Yes</td>
    </tr>
     <tr>
      <td>initialPage</td>
      <td>Number</td>
      <td>1</td>
      <td>Page number to be shown first.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>itemsPerPage</td>
      <td>Number</td>
      <td>10</td>
      <td>Callback triggered on page change.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>startLabel</td>
      <td>String</td>
      <td>'Start'</td>
      <td>The text of the button that sends to the first page.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>endLabel</td>
      <td>String</td>
      <td>'End'</td>
      <td>The text of the button that sends to the last page.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>prevLabel</td>
      <td>String</td>
      <td>'Prev'</td>
      <td>The text of the button that sends to the previous page.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>nextLabel</td>
      <td>String</td>
      <td>'Next'</td>
      <td>The text of the button that sends to the next page.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>pageNeighbours</td>
      <td>Number</td>
      <td>4</td>
      <td>The number of pages displayed next to the currently selected.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>withProgressBar</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Shows the progress bar under pagination.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>onlyPageNumbers</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Removes buttons and leaves only pages.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>onlyPaginationButtons</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Removes pages leaves only buttons.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>withGoToInput</td>
      <td>Boolean</td>
      <td>false</td>
      <td>Shows the input field to go to the page.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>customClassNames</td>
      <td>Object</td>
      <td>*Take a look at the example with component customization*</td>
      <td>Replaces default class names.</td>
      <td>No</td>
    </tr>
    <tr>
      <td>withDebug</td>
      <td>Boolean</td>
      <td>false</td>
      <td>When changing the page, it shows the current state of the component.</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

## More examples

Coming soon...


## License

MIT © [Ilya Sokol](https://github.com/lezvieprod)
