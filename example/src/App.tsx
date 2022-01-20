import { useState } from 'react';
import { Pagination } from 'react-pagination-bar';
import 'react-pagination-bar/dist/index.css';

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

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 3;

  return (
    <div className="App" style={{ margin: '20px' }}>
      <h1>React Pagination Bar</h1>
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
