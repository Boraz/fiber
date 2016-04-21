import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

// React component for visualizing fiber locations on a map
export default class FiberCostTable extends Component {

  render(){
    const { fibers } = this.props

    const rowHeaders = <div>
      <div className="col m2 grey accent-1">ID</div>
      <div className="col m5 green">Cost in $</div>
      <div className="col m5 grey lighten-1">Distance in m</div>
    </div>

    const rowElements = _.map(fibers, (fiber, i) => {

      // TODO: add logic here to highlight the selected fibers (rows)
      // hint: check the flag: fiber.isSelected
      // hint: (1) add "backgroundColor" in style={}, or
      // (2) add a color word, like className="row yellow"

      const className = !fiber.isSelected ? 'row' : 'row yellow'

      return <div key={i} className={className} style={{marginBottom:0}}>
        <div className="col s2"> {i} </div>
        <div className="col s5"> {fiber.cost.toFixed(0)} </div>
        <div className="col s5"> {fiber.distance} </div>
      </div>

    })

    return <div>
      { rowHeaders }
      { rowElements }
    </div>

  }

}
