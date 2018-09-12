import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF99',
    borderRadius: '6px'
  },
});


function SelectedGenresList(props) {

  const handleClickDelete = event => {
    if (event.target.className.baseVal.includes('genre-one')) {
      props.setGenreOne(undefined)
    }
    else if (event.target.className.baseVal.includes('genre-two')) {
      props.setGenreTwo(undefined)
    }
    else if (event.target.className.baseVal.includes('genre-three')) {
      props.setGenreThree(undefined)
    }
  }

  const renderSelectedGenresList = () => {


    if (props.genreOne !== undefined && props.genreTwo !== undefined && props.genreThree !== undefined ) {
      return (
          <List component="nav">
            <ListItem button>
              <ListItemText primary={props.genreOne} />
              <ListItemIcon>
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-one"} />
              </ListItemIcon>
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemText primary={props.genreTwo}/>
              <ListItemIcon>
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-two"} />
              </ListItemIcon>
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemText primary={props.genreThree} />
              <ListItemIcon>
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-three"} />
              </ListItemIcon>
            </ListItem>
          </List>
      );
    }
    else if (props.genreOne !== undefined &&  props.genreTwo !== undefined && props.genreThree === undefined) {
      return (
          <List component="nav">
            <ListItem button>
              <ListItemText primary={props.genreOne} />
              <ListItemIcon>
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-one"}
                />
              </ListItemIcon>
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemText primary={props.genreTwo}/>
              <ListItemIcon>
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-two"}
                />
              </ListItemIcon>
            </ListItem>
          </List>
      )
    }
    else if (props.genreOne !== undefined & props.genreTwo === undefined && props.genreThree === undefined) {
      return (
          <List component="nav">
            <ListItem  button>
              <ListItemText primary={props.genreOne} />
              <ListItemIcon   >
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-one"} />
              </ListItemIcon>
            </ListItem>
          </List>
      )}
    else if (props.genreOne === undefined && props.genreTwo !== undefined && props.genreThree === undefined) {
      return (
          <List component="nav">
            <ListItem  button>
              <ListItemText primary={props.genreTwo} />
              <ListItemIcon   >
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-two"} />
              </ListItemIcon>
            </ListItem>
          </List>
    )}

    else if (props.genreOne === undefined && props.genreTwo !== undefined && props.genreThree !== undefined) {
      return (
          <List component="nav">
            <ListItem  button>
              <ListItemText primary={props.genreTwo} />
              <ListItemIcon   >
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-two"} />
              </ListItemIcon>
            </ListItem>
          <Divider/>
          <ListItem button>
            <ListItemText primary={props.genreThree}/>
            <ListItemIcon>
              <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-three"}
              />
            </ListItemIcon>
          </ListItem>
        </List>
    )}

    else if (props.genreOne === undefined && props.genreTwo === undefined && props.genreThree !== undefined) {
      return (
          <List component="nav">
            <ListItem  button>
              <ListItemText primary={props.genreThree} />
              <ListItemIcon   >
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-three"} />
              </ListItemIcon>
            </ListItem>
        </List>
    )}

    else if (props.genreOne !== undefined && props.genreTwo === undefined && props.genreThree !== undefined) {
      return (
          <List component="nav">
            <ListItem  button>
              <ListItemText primary={props.genreOne} />
              <ListItemIcon   >
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-one"} />
              </ListItemIcon>
            </ListItem>
            <Divider/>
            <ListItem button>
              <ListItemText primary={props.genreThree}/>
              <ListItemIcon>
                <DeleteOutlinedIcon onClick={handleClickDelete} className={classes.icon + " genre-three"}
                />
              </ListItemIcon>
            </ListItem>
        </List>
    )}

  }

  const { classes } = props;
  return (
    <div className={classes.root + " m-ui-list"}>
      {renderSelectedGenresList()}
    </div>
  );
}

SelectedGenresList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    genreOne: state.currentGenres.genreOne,
    genreTwo: state.currentGenres.genreTwo,
    genreThree: state.currentGenres.genreThree
  }
}



export default compose(
  withStyles(styles),
  connect(mapStateToProps, actions),
)(SelectedGenresList);
