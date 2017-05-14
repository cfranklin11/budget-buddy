import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import List from './list';
const departmentsArray = [
  {
    'id':'1',
    'name': 'department of education'
  },
  {
    'id':'2',
    'name': 'department of aaa'
  },
  {
    'id':'3',
    'name': 'department of bbb'
  },
  {
    'id':'4',
    'name': 'department of cccc'
  },
  {
    'id':'5',
    'name': 'department of dddd'
  },
  {
    'id':'6',
    'name': 'department of eeee'
  },
  {
    'id':'7',
    'name': 'department of ffff'
  },
  {
    'id':'8',
    'name': 'department of gggg'
  },
  {
    'id':'9',
    'name': 'department of iiiii'
  },
  {
    'id':'10',
    'name': 'department of jjjjjj'
  }
];

export default class Departments extends Component {


  componentDidMount () {
    this.props.fetchDataIfNeeded('departments');
  }

  render () {

    return (
      <div>
        <h1 className="list__title">
          <Link to="/">Departments</Link>
        </h1>
        <div className="photo-grid">
          {/* <List items={this.props.departments} /> */}
          <List items={departmentsArray} />
        </div>
      </div>
    );
  }
}

Departments.propTypes = {
  departments: PropTypes.arrayOf(React.PropTypes.string),
  fetchDataIfNeeded: PropTypes.func,
};

Departments.defaultProps = {
  departments: [],
};
