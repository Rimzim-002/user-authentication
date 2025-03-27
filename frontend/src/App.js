import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "./Routes/routes"; // ✅ Import centralized routes
import ProtectedRoute from "./Routes/ProtectedRoutes"; // ✅ Import ProtectedRoute

import Login from "../src/Pages/auth/Login";
import Signup from "../src/Pages/auth/Signup";
import Admindashboard from "../src/Pages/dashboard/Adindashboard/Admindashboard";
import UserManagement from "../src/Pages/dashboard/Adindashboard/Usermanagement";
import MoviesManagement from "../src/Pages/dashboard/Adindashboard/Moviesmanagement";
import TotalRevenue from "../src/Pages/dashboard/Adindashboard/Totalrevenue";

import UserDashboard from "./Pages/dashboard/userdashboard/Userdashboard";
import MovieDetails from "./Pages/dashboard/userdashboard/Moviedetailpage";
import BookingPage from "./Pages/dashboard/userdashboard/Bookingpage";
import UserProfile from "./Pages/dashboard/userdashboard/UserProfile";
import Myorders from "./Pages/dashboard/userdashboard/Myorders";
import NoAccess from "../src/Routes/ProtectedRoutes"; // ✅ Page for unauthorized users

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={APP_ROUTES.HOME} element={<Signup />} />
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
          <Route path={APP_ROUTES.ADMIN_DASHBOARD} element={<Admindashboard />} />
          <Route path={APP_ROUTES.ADMIN_USERS} element={<UserManagement />} />
          <Route path={APP_ROUTES.ADMIN_MOVIES} element={<MoviesManagement />} />
          <Route path={APP_ROUTES.ADMIN_TOTAL_REVENUE} element={<TotalRevenue />} />
        </Route>

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path={APP_ROUTES.USER_DASHBOARD} element={<UserDashboard />} />
          <Route path={APP_ROUTES.MOVIE_DETAILS} element={<MovieDetails />} />
          <Route path={APP_ROUTES.BOOK_TICKET} element={<BookingPage />} />
          <Route path={APP_ROUTES.PROFILE} element={<UserProfile />} />
          <Route path={APP_ROUTES.ORDERS} element={<Myorders />} />
        </Route>

        {/* No Access Route */}
        <Route path="/no-access" element={<NoAccess />} />
      </Routes>
    </Router>
  );
}

export default App;
