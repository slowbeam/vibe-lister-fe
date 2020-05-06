import Button from "@material-ui/core/Button";
import classNames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ConditionalWrapper from "../conditionalWrapper";

const styles = {
  root: {
    backgroundColor: "#FFFFFF99",
    borderRadius: "6px",
    border: 0,
    color: "#273845",
    height: 48,
    padding: "0 30px",
    font: {
      family: "Comfortaa",
    },
    textDecoration: "none",
  },
};

const StyledButton = ({
  classes,
  children,
  className,
  link,
  text,
  ...other
}) => {
  return (
    <ConditionalWrapper
      condition={link}
      wrapper={(children) => (
        <Link to={link} className="text-link">
          {children}
        </Link>
      )}
    >
      <Button className={classNames(classes.root, className)} {...other}>
        {text}
      </Button>
    </ConditionalWrapper>
  );
};

StyledButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  link: PropTypes.string,
};

export default withStyles(styles)(StyledButton);
