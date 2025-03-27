

const API_ROUTES = {
    API_VERSION:"/api/v1",
    AUTH: {
        BASE: "/auth",
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
    },

    ADMIN: {
        BASE: "/admin",
        FETCH_ALL_USERS: "/admin/users",
        FETCH_ALL_MOVIES: "/admin/allmMovies",
        DELETE_USER: (userId) => `/admin/deleteUser/${userId}`,
        UPDATE_USER: (userId) => `/admin/editUser/${userId}`,
        ADD_MOVIE: "/admin/addmovie",
        UPDATE_MOVIE: (movieId) => `/admin/updateMovie/${movieId}`,
        DETLETE_MOVIE: (movieId) => `/admin/deleteMovie/${movieId}`

    },

    USER: {
        BASE: "/user",
        FETCH_ALL_MOVIES: "user/allmMovies",
        FETCH_MOVIE_BY_ID: (movieId) => `/user/getmovie/${movieId}`,
        BOOK_MOVIE: (movieId) => `/user/booking/${movieId}`,
        PAYMENT: "/user/payment",
        GET_ORDERS: "user/orders"

    }

}


export default API_ROUTES;
