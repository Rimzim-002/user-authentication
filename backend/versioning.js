const  express =require("express")
const authRoutes=  require("./Routes/authroutes")
const adminRoutes=require("./Routes/adminroutes")
const userRoutes= require("./Routes/userroutes")
const {ROUTES}= require("./Routes/routesEnums")
const  router=express.Router()
const API_VERSION="/api/v1";
router.use(`${API_VERSION}${ROUTES.AUTH}`,authRoutes)
router.use(`${API_VERSION}${ROUTES.ADMIN}`,adminRoutes)
router.use(`${API_VERSION}${ROUTES.USER}`,userRoutes)
module.exports=router