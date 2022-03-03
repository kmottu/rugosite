import React from "react"
import './App.css';
import { useSelector } from "react-redux";
import routes from './routes';
import { useRoutes } from 'react-router-dom';

// function App() {
//   const history = useNavigate();
//   const user = useSelector((state) => state.auth)
//   console.log(user);

//   useEffect(() => {
//     console.log('App - UseEffect')
//     if (!user.isLoggedIn && !user.user) {
//       console.log('App - Login')
//       history("/login")
//     }
//     else {
//       console.log("App - Register")
//       history("/home")
//     }
//   }, [])

//   return (
//     <React.Fragment>
//       <Routes>
//         <Route exact path="/login" element={<Login />} />
//         <Route exact path="/register" element={<Register />} />
//         <Route exact path="/home" element={<Dashboard />} />
//       </Routes>
//     </React.Fragment>
//   );
// }

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//   }

//   render() {

//     return (
//       <React.Fragment>
//         <Routes>
//           {publicRoutes.map((route, idx) => (
//             <AppRoute
//               path={route.path}
//               component={route.component}
//               key={idx}
//               isAuthProtected={false}
//             />
//           ))}

//           {authProtectedRoutes.map((route, idx) => (
//             <AppRoute
//               path={route.path}
//               component={route.component}
//               key={idx}
//               isAuthProtected={true}
//               exact
//             />
//           ))}
//         </Routes>
//       </React.Fragment>
//     )
//   }
// };


function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log(isLoggedIn)

  const routing = useRoutes(routes(isLoggedIn));

  return (
    <React.Fragment>
      {routing}
    </React.Fragment>
  );
}

export default App;
