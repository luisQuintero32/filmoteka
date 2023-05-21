function generatePages(currentPage, totalPages) {
  let li = '';

  const createListItem = (pageNumber, isCurrent = false) => {
    const listItemClass = isCurrent ? 'currentPage' : '';
    return `<li class="${listItemClass} listStylePagination">${pageNumber}</li>`;
  };

  const createDots = () => '<li>...</li>';

  if (totalPages < 10) {
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        li += createListItem(i, true);
      } else {
        li += createListItem(i);
      }
    }
  } else {
    if (currentPage > 4 && currentPage <= totalPages - 4) {
      li += createListItem(1);
      li += createDots();
      li += createListItem(currentPage - 2);
      li += createListItem(currentPage - 1);
      li += createListItem(currentPage, true);
      li += createListItem(currentPage + 1);
      li += createListItem(currentPage + 2);
      li += createDots();
      li += createListItem(totalPages);
    } else if (currentPage === 4) {
      li += createListItem(currentPage - 3);
      li += createListItem(currentPage - 2);
      li += createListItem(currentPage - 1);
      for (let i = currentPage; i < currentPage + 5; i++) {
        if (i === currentPage) {
          li += createListItem(i, true);
        } else {
          li += createListItem(i);
        }
      }
      li += createDots();
      li += createListItem(totalPages);
    } else if (currentPage === 3) {
      li += createListItem(currentPage - 2);
      li += createListItem(currentPage - 1);
      for (let i = currentPage; i < currentPage + 5; i++) {
        if (i === currentPage) {
          li += createListItem(i, true);
        } else {
          li += createListItem(i);
        }
      }
      li += createDots();
      li += createListItem(totalPages);
    } else if (currentPage === 2) {
      li += createListItem(currentPage - 1);
      for (let i = currentPage; i < currentPage + 6; i++) {
        if (i === currentPage) {
          li += createListItem(i, true);
        } else {
          li += createListItem(i);
        }
      }
      li += createDots();
      li += createListItem(totalPages);
    } else if (currentPage === 1) {
      for (let i = currentPage; i < currentPage + 7; i++) {
        if (i === currentPage) {
          li += createListItem(i, true);
        } else {
          li += createListItem(i);
        }
      }
      li += createDots();
      li += createListItem(totalPages);
    } else if (currentPage + 4 > totalPages) {
      li += createListItem(1);
      li += createDots();

      if (currentPage === totalPages - 3) {
        li += createListItem(currentPage - 3);
        li += createListItem(currentPage - 2);
        li += createListItem(currentPage - 1);
        li += createListItem(currentPage, true);
        for (let i = 1; i < 4; i++) {
          li += createListItem(currentPage + i);
        }
      } else if (currentPage === totalPages - 2) {
        li += createListItem(currentPage - 4);
        li += createListItem(currentPage - 3);
        li += createListItem(currentPage - 2);
        li += createListItem(currentPage - 1);
        li += createListItem(currentPage, true);

        for (let i = 1; i < 3; i++) {
          li += createListItem(currentPage + i);
        }
      } else if (currentPage === totalPages - 1) {
        li += createListItem(currentPage - 5);
        li += createListItem(currentPage - 4);
        li += createListItem(currentPage - 3);
        li += createListItem(currentPage - 2);
        li += createListItem(currentPage - 1);
        li += createListItem(currentPage, true);

        for (let i = 1; i < 2; i++) {
          li += createListItem(currentPage + i);
        }
      } else if (currentPage === totalPages) {
        li += createListItem(currentPage - 6);
        li += createListItem(currentPage - 5);
        li += createListItem(currentPage - 4);
        li += createListItem(currentPage - 3);
        li += createListItem(currentPage - 2);
        li += createListItem(currentPage - 1);
        li += createListItem(currentPage, true);
      }
    }
  }
  return li;
}
export { generatePages };
