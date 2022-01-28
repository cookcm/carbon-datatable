/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Pagination} from '@waiops/common-ui-components'
import msgs from '../../../../nls/platform.properties'

const PaginationWidget = (props) => {
  const pageSizes=[3, 5, 10, 15];
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(rows.length);

  const handlePageChange = useCallback(
    ({ page: nextPageNumber, pageSize: nextPageSize }) => {
      if (pageSize !== nextPageSize) {
        setPageSize(nextPageSize);
        setPage(1);
      }
      if (page !== nextPageNumber) {
        setPage(nextPageNumber);
      }
    },
    [page, pageSize]
  );

  const getPageRangeText = (total) => {
    return total > 1
      ? `of ${total} pages`
      : `of 1 page`
  }

  const getItemsRangeText = (min, max, total) => {
    return (`${min}-${max} of ${total} items`)
  }
  
  const paginationProps = {
      pageSizes: pageSizes,
      page: this.props.currentPage || currentPage,
      totalItems: totalItems || 0,
      onChange: onPageChanged,
      itemRangeText: getItemsRangeText,
      itemsPerPageText: "Items per page:",
      pageRangeText: this.getPageRangeText,
      backwardText: "Previous page",
      forwardText: "Next page"
    }
  return <Pagination {...paginationProps} />
  }

PaginationWidget.propTypes = {
  currentPage: PropTypes.number,
  onPageChanged: PropTypes.func,
  totalItems: PropTypes.number
}

export default PaginationWidget
