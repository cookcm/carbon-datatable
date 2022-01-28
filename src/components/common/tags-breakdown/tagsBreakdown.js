/* ******************************************************** {COPYRIGHT-TOP} ****
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2021 All Rights Reserved
 * 5725-Q09
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 ********************************************************* {COPYRIGHT-END} ** */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useResizeDetector } from 'react-resize-detector';
import { Tag } from 'carbon-components-react';
import TagsOverflow from './tagsOverflow';

require('./tags-breakdown.scss');

const TagsBreakdown = props => {
  const { tags, maxVisible, direction } = props;
  const tagsContainer = useRef(null);
  const { width, ref } = useResizeDetector();
  const [visibleNumTags, setVisibleNumTags] = useState(maxVisible || null);

  useEffect(() => {
    if (tagsContainer.current && width) {
      const tooltipWidth = 45;
      let tagsWidth = tooltipWidth;
      let clippedWidth = 0;
      let i = 0;
      const tagMargin = 4;
      for (
        ;
        i < tagsContainer.current.children.length &&
        tagsWidth <= width &&
        (!maxVisible || i < maxVisible);
        i++
      ) {
        clippedWidth = tagsWidth;
        tagsWidth +=
          tagsContainer.current.children[i].getBoundingClientRect().width +
          tagMargin;
      }
      const newVisibleNumber = i;
      const visibleWidth =
        newVisibleNumber === tags.length ? tagsWidth : clippedWidth;
      tagsContainer.current.style.maxWidth = `${visibleWidth -
        tooltipWidth +
        tagMargin}px`;
      setVisibleNumTags(newVisibleNumber);
    }
  }, [tagsContainer, tags, maxVisible, width]);

  if (!tags || !Array.isArray(tags)) {
    return null;
  }

  const visibleTags = tags;
  let overflowTags = [];
  let splitIndex = tags.length;
  if (visibleNumTags !== null && visibleNumTags < tags.length) {
    splitIndex = visibleNumTags - 1;
    overflowTags = tags.slice(splitIndex < 0 ? 0 : splitIndex);
  }

  return (
    <div ref={ref} className="tag-breakdown">
      <div ref={tagsContainer} className="tag-breakdown-container">
        {visibleTags.map((tag, i) => (
          <Tag
            key={`${tag}${i}`}
            className="tag-breakdown-item"
            style={{ visibility: i <= splitIndex ? 'visible' : 'hidden' }}
          >
            {tag}
          </Tag>
        ))}
      </div>
      <TagsOverflow overflowTags={overflowTags} direction={direction} />
    </div>
  );
};

TagsBreakdown.defaultProps = {
  direction: 'top',
};

TagsBreakdown.propTypes = {
  direction: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  maxVisible: PropTypes.number,
  tags: PropTypes.array,
};

export default TagsBreakdown;
