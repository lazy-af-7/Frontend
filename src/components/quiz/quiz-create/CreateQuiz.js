import React, { Fragment, useEffect, useState } from 'react';
import { Grid, TextField, Divider, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QAList from '../QAList';
import AddQuestion from './AddQuestion';
import MySnackbar from '../../layout/MySnackbar';

// REDUX
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMyAlert } from '../../../actions/myAlert';

const useStyles = makeStyles((theme) => ({
  sectionDetail: {
    padding: '20px',
    paddingBottom: 0,
    maxWidth: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  divider: {
    margin: '20px',
  },
  section1: {
    display: 'flex',
  },
  alert: {
    margin: '20px',
  },
}));

const CreateQuiz = ({ setMyAlert, ...props }) => {
  const classes = useStyles();
  const [selectedDateTime, handleDateTimeChange] = useState(new Date());
  const [selectedDuration, handleDurationChange] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ status: false, msg: '' });

  const [newQuiz, updateQuiz] = useState({
    quizName: undefined,
    teacherName: undefined,
    quizDuration: new Date().getTime(),
    quizDateTime: new Date(),
    questions: [],
  });

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setAlert({ ...alert, status: false });
  };

  const onChange = (e) =>
    updateQuiz({ ...newQuiz, [e.target.name]: e.target.value });

  const deleteQuestion = (id) => {
    const newQuestionsArray = [...newQuiz.questions];

    newQuestionsArray.splice(
      newQuestionsArray.findIndex((a) => a.id === id),
      1
    );
    updateQuiz({
      ...newQuiz,
      questions: newQuestionsArray,
    });
    setAlert({
      ...alert,
      status: true,
      msg: 'Question deleted successfully!',
    });
  };

  const addQuestion = (question) => {
    const presentQuestions = newQuiz.questions;
    updateQuiz({
      ...newQuiz,
      [newQuiz.questions]: presentQuestions.push(question),
    });
  };

  const onSubmit = () => {
    const { quizName, teacherName, questions } = newQuiz;
    if (!(quizName && teacherName)) {
      setAlert({
        ...alert,
        status: true,
        msg: 'Please fill the required fields',
      });
      return;
    }
    if (!questions.length > 0) {
      setAlert({ ...alert, status: true, msg: 'Please add Questions' });
      return;
    }
    questions.forEach((e) => {
      delete e.id;
    });

    // history.push('/');
    console.log('Successfully Created Quiz', newQuiz);
  };
  const { questions, quizName, teacherName } = newQuiz;

  useEffect(() => {
    document.title = 'Quizeal | Create Quiz';
  }, []);

  return (
    <Fragment>
      <Grid
        container
        spacing={5}
        className={classes.sectionDetail}
        justifyContent='center'
      >
        <Grid item>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='quizName'
            label='Quiz Name'
            name='quizName'
            autoFocus
            value={quizName}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='teacherName'
            label='Teacher Name'
            name='teacherName'
            autoComplete='teacherName'
            value={teacherName}
            onChange={(e) => onChange(e)}
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
              autoOk
              ampm={false}
              label='Quiz Duration'
              inputVariant='outlined'
              value={selectedDateTime.toString()}
              onChange={handleDateTimeChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label='Quiz Date and Time'
              inputVariant='outlined'
              value={selectedDuration.toString()}
              onChange={handleDurationChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Divider variant='middle' className={classes.divider} />
      <Grid container justifyContent='space-around' style={{ gap: '10px' }}>
        <ButtonGroup
          color='primary'
          variant='contained'
          aria-label='outlined secondary button group'
        >
          <Button onClick={handleClickOpenDialog}>Show Questions Added</Button>
          <Button>Questions Added - {questions.length}</Button>
        </ButtonGroup>
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={onSubmit}
        >
          Create Quiz
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {questions.length ? 'Questions Added' : 'No Question Added'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {questions.map((qa, index) => {
              return (
                <QAList
                  key={index}
                  number={index}
                  deleteQuestion={deleteQuestion}
                  edit={true}
                  qaSet={qa}
                  type='list'
                />
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Divider variant='middle' className={classes.divider} />
      <Grid container justifyContent='center'>
        <AddQuestion addQuestion={addQuestion} />
      </Grid>
      <MySnackbar alert={alert} close={handleClose} />
    </Fragment>
  );
};

CreateQuiz.propTypes = {
  setMyAlert: PropTypes.func.isRequired,
};

export default connect(null, { setMyAlert })(CreateQuiz);
