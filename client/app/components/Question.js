import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Card, RaisedButton } from 'material-ui';
import { requestQuestion, requestAnswer } from '../actions';

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.requestQuestion();
  }

  componentDidMount() {
    this.props.requestQuestion();
  }

  render() {
    const { question, answer } = this.props;
    return (
      <Card className="container">
        <h1 className="card-heading">{ question.title }</h1>
        <div className="card-answer-container">
          <div className="card-answer-yes">是</div>
          <div className="card-answer-no">否</div>
        </div>
        <div className="button-line">
          <RaisedButton type="button" label="下一題" primary
            onClick={ this.handleClick } />
        </div>
      </Card>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  answer: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);

function mapStateToProps(state) {
  return {
    question: state.question,
    answer: state.answer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestQuestion: () => dispatch(requestQuestion()),
    requestAnswer: (qId) => dispatch(requestAnswer(qId)),
  };
}
