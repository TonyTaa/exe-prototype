import { Pagination } from 'react-bootstrap';

function AppPagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  const items = [];

  for (let page = 1; page <= totalPages; page += 1) {
    items.push(
      <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange?.(page)}>
        {page}
      </Pagination.Item>,
    );
  }

  return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
}

export default AppPagination;
