import React, { PropTypes, Component } from 'react';

export default class Program extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render () {
    return (
      <div className="chart-header">


           <span className="program-chart-header__title">
                { this.props.name } <span className="program-percentage-change"> {`+${45}%`} </span>
            </span>


      </div>
    );
  }
}
