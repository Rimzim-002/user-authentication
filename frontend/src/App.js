import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Pages/dashboard/Homepage";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Admindashboard from "./Pages/dashboard/Adindashboard/Admindashboard";
import UserManagement from "./Pages/dashboard/Adindashboard/Usermanagement";
import Home from "./Pages/dashboard/userdashboard/Homepage";
import MoviesManagement from "./Pages/dashboard/Adindashboard/Moviesmanagement";
import UserDashboard from "./Pages/dashboard/userdashboard/Userdashboard";
import MovieDetails from "./Pages/dashboard/userdashboard/Moviedetailpage";
import BookingPage from "./Pages/dashboard/userdashboard/Bookingpage";
import UserProfile from "./Pages/dashboard/userdashboard/UserProfile";
import Myorders from "./Pages/dashboard/userdashboard/Myorders";
import TotalRevenue from "./Pages/dashboard/Adindashboard/Totalrevenue";



function App() {
  return (

    <Router>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/admindashboard/allusers" element={<UserManagement />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admindashboard/allmovies" element={<MoviesManagement />} />
        <Route path="/admindashboard/totalRevenue" element={<TotalRevenue />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/dashboard/getmovie/:movieId" element={<MovieDetails />} />
        <Route path="/user/dashboard/bookticket/:movieId" element={<BookingPage />} />
        <Route path="/user/dashboard/profile" element={<UserProfile />} />
        <Route path="/user/dashboard/myorders" element={<Myorders />} />










        <Route />


      </Routes>
    </Router>


  );
}

export default App;
