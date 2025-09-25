export const roleBasedAccessContolMiddleware = (role)=>{

    return (req,res,next)=>{
        if(role.includes(req.user.role)){
            next()
        }else{
            res.status(401).json({message:"Unathorised"})
        }
    }

}