import React from "react";
import PropTypes from 'prop-types';
import {DropTarget, } from 'react-dnd';

const Target = ({ connectDropTarget, highlighted, shape }) => (
    connectDropTarget(
        <div className={`drop_targets_target drop_targets_target--${shape}`}
        style={{ backgroundColor: highlighted ? 'black' : 'gray' }} />
    )
  );

Target.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    highlighted: PropTypes.bool.isRequired,
    shape: PropTypes.string.isRequired,
}

const target = {
  drop(props: any) {
    return props;
  }
}

const collect = (connect: any,  monitor: any) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop(),
});

export function wrap(itemType: string, wrappable: any) {
    DropTarget(itemType, target, collect)(wrappable);
}
