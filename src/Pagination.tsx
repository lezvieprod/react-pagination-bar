import React, { useEffect, useMemo, useState } from 'react';

type RPBPagerState = {
  totalItems: number;
  currentPage: number;
  pagesLength: number;
  pages: number[];
  totalPages: number;
};

type RPBClassNamesCustomization = {
  rpbRootClassName?: string;
  rpbItemClassName?: string;
  rpbItemClassNameActive?: string;
  rpbItemClassNameDisable?: string;
  rpbProgressClassName?: string;
  rpbGoItemClassName?: string;
};

type RPBPaginationProps = {
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  startLabel?: string | React.ReactNode;
  prevLabel?: string | React.ReactNode;
  nextLabel?: string | React.ReactNode;
  endLabel?: string | React.ReactNode;
  pageNeighbours?: number;
  withProgressBar?: boolean;
  onlyPageNumbers?: boolean;
  onlyPaginationButtons?: boolean;
  withGoToInput?: boolean;
  customClassNames?: RPBClassNamesCustomization;
};

export const Pagination: React.FC<RPBPaginationProps> = ({
  onPageChange,
  currentPage = 1,
  totalItems,
  itemsPerPage = 10,
  startLabel = '<<',
  prevLabel = '<',
  nextLabel = '>',
  endLabel = '>>',
  pageNeighbours = 4,
  withProgressBar = false,
  onlyPageNumbers = false,
  withGoToInput = false,
  onlyPaginationButtons = false,
  customClassNames = {},
}) => {
  const classNames = (classes: Record<string, boolean>): string => {
    return Object.entries(classes)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(' ');
  };

  const [pagiState, setPagiState] = useState<RPBPagerState>();
  const [goToInputValue, setGoToInputValue] = useState<string>('');

  const styleClassName = {
    rpbRootClassName: customClassNames.rpbRootClassName || 'rpb-root',
    rpbItemClassName: customClassNames.rpbItemClassName || 'rpb-item',
    rpbItemClassNameActive:
      customClassNames.rpbItemClassNameActive || 'rpb-item--active',
    rpbItemClassNameDisable:
      customClassNames.rpbItemClassNameDisable || 'rpb-item--disabled',
    rpbProgressClassName:
      customClassNames.rpbProgressClassName || 'rpb-progress',
    rpbGoItemClassName: customClassNames.rpbGoItemClassName || 'rpb-go-item',
  } as Required<RPBClassNamesCustomization>;

  /**
   * Set new page when currentPage updates
   */
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const setPage = (page: number): void => {
    // Disable clicking on a non-existent page
    if (
      page < 1 ||
      (pagiState && page > pagiState.totalPages) ||
      typeof page !== 'number' ||
      isNaN(page)
    ) {
      return;
    }

    // Remove the first rendering, and also cancel the click on the active page
    if (page === currentPage) {
      return;
    }
    // Send current page outside component
    onPageChange(page);
  };

  const pagesList = useMemo((): number[] => {
    const totalPages: number = Math.ceil(totalItems / itemsPerPage);

    let startPage: number;
    let endPage: number;

    if (totalPages <= pageNeighbours * 2 + 1) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= pageNeighbours) {
        startPage = 1;
        endPage = pageNeighbours * 2 + 1;
      } else if (currentPage + pageNeighbours >= totalPages) {
        startPage = totalPages - pageNeighbours * 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - pageNeighbours;
        endPage = currentPage + pageNeighbours;
      }
    }

    return [...Array(endPage + 1 - startPage).keys()].map((i) => startPage + i);
  }, [totalItems, itemsPerPage, currentPage]);

  useEffect(() => {
    setPagiState({
      pages: pagesList,
      totalItems: totalItems,
      currentPage: currentPage,
      pagesLength: pagesList.length, // current rendered pages list length
      totalPages: Math.ceil(totalItems / itemsPerPage), // all pages list length
    });
  }, [pagesList]);

  const onGoToPageSubmitHandle = (): void => {
    const value = Number(goToInputValue);

    if (pagiState) {
      if (value <= 0) {
        setPage(1);
      } else if (value > pagiState.totalPages) {
        setPage(pagiState.totalPages);
      } else {
        setPage(value);
      }
    }
  };

  if (pagiState && totalItems > itemsPerPage) {
    return (
      <nav className={styleClassName.rpbRootClassName}>
        <ul
          id="rpb-pagination"
          aria-label={`Pagination Navigation, Current Page ${pagiState.currentPage}`}>
          {!onlyPageNumbers && (
            <>
              <li>
                <button
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pagiState.currentPage === 1,
                  })}
                  aria-label={'Go to first page'}
                  onClick={() => setPage(1)}>
                  {startLabel}
                </button>
              </li>
              <li>
                <button
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pagiState.currentPage === 1,
                  })}
                  aria-label={'Go to previous page'}
                  onClick={() => setPage(pagiState.currentPage - 1)}>
                  {prevLabel}
                </button>
              </li>
            </>
          )}

          {!onlyPaginationButtons &&
            pagiState.pages &&
            pagiState.pages.map((mappedPage, index) => (
              <li key={index}>
                <button
                  aria-label={`Go to Page ${mappedPage}`}
                  aria-current={pagiState.currentPage === mappedPage}
                  onClick={() => setPage(mappedPage)}
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameActive]:
                      pagiState.currentPage === mappedPage,
                  })}>
                  {mappedPage}
                </button>
              </li>
            ))}
          {!onlyPageNumbers && (
            <>
              <li>
                <button
                  onClick={() => setPage(pagiState.currentPage + 1)}
                  aria-label="Go to next page"
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pagiState.currentPage === pagiState.totalPages,
                  })}>
                  {nextLabel}
                </button>
              </li>
              <li>
                <button
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pagiState.currentPage === pagiState.totalPages,
                  })}
                  aria-label={'Go to last page'}
                  onClick={() => setPage(pagiState.totalPages)}>
                  {endLabel}
                </button>
              </li>
            </>
          )}
          {withGoToInput && (
            <>
              <li>
                <div className={styleClassName.rpbGoItemClassName}>
                  <input
                    type="number"
                    onChange={(e) => setGoToInputValue(e.target.value)}
                  />
                </div>
              </li>
              <li>
                <button
                  className={styleClassName.rpbItemClassName}
                  onClick={onGoToPageSubmitHandle}>
                  Go
                </button>
              </li>
            </>
          )}
        </ul>
        {withProgressBar && (
          <div
            role="progressbar"
            aria-valuenow={
              pagiState.currentPage !== 1
                ? Math.round(
                    (pagiState.currentPage / pagiState.totalPages) * 100
                  )
                : 0
            }
            aria-valuemin={0}
            aria-valuemax={100}
            aria-labelledby="rpb-pagination"
            className={styleClassName.rpbProgressClassName}
            style={{
              width:
                pagiState.currentPage !== 1
                  ? Math.round(
                      (pagiState.currentPage / pagiState.totalPages) * 100
                    ) + '%'
                  : 0 + '%',
            }}></div>
        )}
      </nav>
    );
  } else {
    return null;
  }
};
