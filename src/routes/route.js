import React from "react"
import PropTypes from 'prop-types'
import { Route, Navigate } from "react-router-dom"
// import Layout from "../Components/Utility/Layout"

const AppRoute = ({
  component: Component,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    element={props => {
      console.log(props)
      if (isAuthProtected && !localStorage.getItem("user")) {
        return (
          <Navigate
            to={"/login"}
          // to={{ pathname: "/login" }}
          />
        )
      }

      return (
        // <Layout>
        //   <Component {...props} />
        // </Layout>
        <Component {...props} />
      )
    }}
  />
)

AppRoute.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
}

export default AppRoute
