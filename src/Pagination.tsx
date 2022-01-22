import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.css';

type RPBPagerState = Omit<RPBPaginationProps, 'itemsPerPage'> & {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  pages: number[];
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
  onPageСhange: (pageNumber: number) => void;
  initialPage?: number;
  totalItems: number;
  itemsPerPage: number;
  startLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  endLabel?: string;
  pageNeighbours?: number;
  withProgressBar?: boolean;
  onlyPageNumbers?: boolean;
  onlyPaginationButtons?: boolean;
  withGoToInput?: boolean;
  customClassNames?: RPBClassNamesCustomization;
  withDebug?: boolean;
};

export const Pagination: React.FC<RPBPaginationProps> = ({
  onPageСhange,
  initialPage = 1,
  totalItems,
  itemsPerPage = 10,
  startLabel = 'Start',
  prevLabel = 'Prev',
  nextLabel = 'Next',
  endLabel = 'End',
  pageNeighbours = 4,
  withProgressBar = false,
  onlyPageNumbers = false,
  withGoToInput = false,
  onlyPaginationButtons = false,
  withDebug = false,
  customClassNames = {},
}) => {
  const [pager, setPager] = useState<RPBPagerState>();
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
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
    if (withDebug) {
      console.log('Current pager state: ', pager);
    }
  }, [currentPage]);

  const setPage = (page: number): void => {
    if (
      page < 1 ||
      (pager && page > pager.totalPages) ||
      typeof page !== 'number' ||
      isNaN(page)
    ) {
      return;
    }

    // Set new current page
    setCurrentPage(page);

    // Update pager
    getPager();

    // Send new page outside component
    onPageСhange(page);
  };

  const getPager = useCallback((): void => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

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

    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    setPager({
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: itemsPerPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
      endLabel,
      startLabel,
      prevLabel,
      nextLabel,
      onPageСhange,
      pageNeighbours,
      withProgressBar,
      onlyPageNumbers,
      withGoToInput,
      onlyPaginationButtons,
      withDebug,
      initialPage,
    });
  }, [currentPage, itemsPerPage, totalItems]);

  const onGoToPageSubmitHandle = (): void => {
    const value = Number(goToInputValue);

    if (pager) {
      if (value <= 0) {
        setPage(1);
      } else if (value > pager.totalPages) {
        setPage(pager.totalPages);
      } else {
        setPage(value);
      }
    }
  };

  if (pager && totalItems > itemsPerPage) {
    return (
      <nav className={styleClassName.rpbRootClassName}>
        <ul
          id="rpb-pagination"
          aria-label={`Pagination Navigation, Current Page ${pager.currentPage}`}>
          {!onlyPageNumbers && (
            <>
              <li>
                <button
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pager.currentPage === 1,
                  })}
                  aria-label={'Start'}
                  onClick={() => setPage(1)}>
                  {startLabel}
                </button>
              </li>
              <li>
                <button
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pager.currentPage === 1,
                  })}
                  aria-label={'Prev'}
                  onClick={() => setPage(pager.currentPage - 1)}>
                  {prevLabel}
                </button>
              </li>
            </>
          )}

          {!onlyPaginationButtons &&
            pager.pages &&
            pager.pages.map((page, index) => (
              <li
                key={index}
                data-page={page}
                data-current={pager.currentPage === page}>
                <button
                  aria-label={`Go to Page ${page}`}
                  aria-current={pager.currentPage === page}
                  onClick={() => setPage(page)}
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameActive]:
                      pager.currentPage === page,
                  })}>
                  {page}
                </button>
              </li>
            ))}
          {!onlyPageNumbers && (
            <>
              <li>
                <button
                  onClick={() => setPage(pager.currentPage + 1)}
                  aria-label="Next"
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pager.currentPage === pager.totalPages,
                  })}>
                  {nextLabel}
                </button>
              </li>
              <li>
                <button
                  className={classNames({
                    [styleClassName.rpbItemClassName]: true,
                    [styleClassName.rpbItemClassNameDisable]:
                      pager.currentPage === pager.totalPages,
                  })}
                  aria-label={'End'}
                  onClick={() => setPage(pager.totalPages)}>
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
              pager.currentPage !== 1
                ? Math.round((pager.currentPage / pager.totalPages) * 100)
                : 0
            }
            aria-valuemin={0}
            aria-valuemax={100}
            aria-labelledby="rpb-pagination"
            className={styleClassName.rpbProgressClassName}
            style={{
              width:
                pager.currentPage !== 1
                  ? Math.round((pager.currentPage / pager.totalPages) * 100) +
                    '%'
                  : 0 + '%',
            }}></div>
        )}
      </nav>
    );
  } else {
    return null;
  }
};
