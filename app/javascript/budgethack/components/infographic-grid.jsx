import React from 'react';
import Infographic from './infographic';


const InfographicGrid = React.createClass({
  render(){
    console.log(this.props);
    return(
      <div className="photo-grid" style={{border:'2px solid red'}}>
        { this.props.infographics.map((item, i) => <Infographic {...this.props} key={i} i={i} infographic={item} />) }
      </div>
    )
  }
});

export default InfographicGrid;
