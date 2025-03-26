export const APP_ROUTES = Object.freeze({
    // Public Routes
    HOME: "/",
    LOGIN: "/login",

    // Admin Routes
    ADMIN_DASHBOARD: "/admindashboard",
    ADMIN_USERS: "/admindashboard/allusers",
    ADMIN_MOVIES: "/admindashboard/allmovies",
    ADMIN_TOTAL_REVENUE: "/admindashboard/totalrevenue",

    // User Routes
    USER_DASHBOARD: "/user/dashboard",
    BOOK_TICKET: "/user/dashboard/bookticket/:movieId",  // ✅ Movie ID included
    PROFILE: "/user/dashboard/profile",
    ORDERS: "/user/dashboard/myorders",
    MOVIE_DETAILS: "/user/dashboard/getmovie/:movieId",  // ✅ Fixed path to include `:movieId`
});
