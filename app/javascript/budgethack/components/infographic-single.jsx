import React from 'react';
import Infographic from './infographic';
import TextCollapsible from './text-collapsible';

const InfographicSingle = React.createClass({
  render(){
    const { infographicId } = this.props.params;

     // index of the infographic
    const i = this.props.infographics.findIndex(
      (infographic) => infographic.code === infographicId);

    // get us the infographic
    const infographic = this.props.infographics[i];

    return(
        <div className="single-photo">
          <div>
            [AN INFOGRPHIC HERE]
          </div>
        {/* <Infographic i={i} infographic={infographic} {...this.props} /> */}
        <TextCollapsible />
        </div>
    )
  }
});

export default InfographicSingle;
