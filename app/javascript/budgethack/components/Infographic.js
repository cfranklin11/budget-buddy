import React from 'react';
import {Link} from 'react-router';
import * as d3 from 'd3';


const Infographic = React.createClass({
  render() {

    const { infographic, i } = this.props;
      return (
        <figure className="grid-figure">
          <div className = "chart"></div>
          <div className="grid-photo-wrap">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
            <Link to={`/view/${infographic.code}`}>
              <img src="http://placehold.it/250x350" className="grid-photo"/>
            </Link>
            <p>placeholder PP</p>
          </div>
          <figcaption>
            <p>placeholder caption</p>
            <div className="control-buttons">
              <button className="likes">
                ✰ Share ✰
              </button>
            </div>
          </figcaption>

        </figure>
      )
  }
});
export default Infographic;
