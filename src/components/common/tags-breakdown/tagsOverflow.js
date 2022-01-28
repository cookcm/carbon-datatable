/* ******************************************************** {COPYRIGHT-TOP} ****
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2021 All Rights Reserved
 * 5725-Q09
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 ********************************************************* {COPYRIGHT-END} ** */
import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Tooltip } from 'carbon-components-react';

require('./tags-breakdown.scss');

const TagsOverflow = props => {
  const { overflowTags, direction } = props;
  if (
    !overflowTags ||
    !Array.isArray(overflowTags) ||
    overflowTags.length === 0
  ) {
    return null;
  }
  // eslint-disable-next-line react/display-name
  const overflowTag = React.forwardRef(() => (
    <Tag className="tag-breakdown-tooltip-tag">{`+${overflowTags.length}`}</Tag>
  ));
  return (
    <Tooltip
      className="tag-breakdown-tooltip"
      direction={direction}
      renderIcon={overflowTag}
    >
      {overflowTags.map(tag => (
        <div className="tag-breakdown-tooltip-item" key={tag}>
          {tag}
        </div>
      ))}
    </Tooltip>
  );
};

TagsOverflow.propTypes = {
  direction: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  overflowTags: PropTypes.array,
};

export default TagsOverflow;
