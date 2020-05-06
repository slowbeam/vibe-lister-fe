import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import StyledButton from "./shared/buttons/styledButton";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Genres from "../Genres";
import { connect } from "react-redux";
import { compose } from "redux";
import * as actions from "../actions";
import uuid from "uuid";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#FFFFFF99",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    backgroundColor: "#FFFFFF99",
  },
});

class DialogSelect extends React.Component {
  state = {
    open: false,
  };

  handleChange = (name) => (event) => {
    switch (name) {
      case "genreOne":
        this.props.setGenreOne(event.target.value);
        break;
      case "genreTwo":
        this.props.setGenreTwo(event.target.value);
        break;
      case "genreThree":
        this.props.setGenreThree(event.target.value);
        break;
      default:
        return null;
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearGenres();
  };

  handleSubmit = () => {
    this.setState({ open: false });
  };

  renderGenreOptions = () => {
    return Genres.map((genre) => (
      <option key={uuid()} value={genre}>
        {genre}
      </option>
    ));
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <StyledButton
          onClick={this.handleClickOpen}
          text="Choose Genres (optional)"
        />
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Choose 3 Genres</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Genre 1</InputLabel>
                <Select
                  native
                  value={this.props.genreOne}
                  onChange={this.handleChange("genreOne")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  {this.renderGenreOptions()}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Genre 2</InputLabel>
                <Select
                  native
                  value={this.props.genreTwo}
                  onChange={this.handleChange("genreTwo")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  {this.renderGenreOptions()}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Genre 3</InputLabel>
                <Select
                  native
                  value={this.props.genreThree}
                  onChange={this.handleChange("genreThree")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  {this.renderGenreOptions()}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="inherit">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    genreOne: state.currentGenres.genreOne,
    genreTwo: state.currentGenres.genreTwo,
    genreThree: state.currentGenres.genreThree,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, actions)
)(DialogSelect);
