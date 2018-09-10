import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    backgroundColor: '#FFFFFF99',
    borderRadius: '6px',
    border: 0,
    color: '#273845',
    height: 48,
    padding: '0 30px',
    font: {
      family: 'Comfortaa'
    }
  },
};

function StyledButton(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={classNames(classes.root, className)} {...other}>
      {children || 'class names'}
    </Button>
  );
}

StyledButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(StyledButton);
