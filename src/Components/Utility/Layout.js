import React, { Component } from "react"
import { connect } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default connect(null, null)(withRouter(Layout));