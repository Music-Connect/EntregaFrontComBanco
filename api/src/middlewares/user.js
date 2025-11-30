
function RegisterDataValidator(data){
    

}

export default function dataReturn(request,response,next){
    try {
        const data = request.body;

        RegisterDataValidator(data);

        next();

    }catch(error){
        return response.status(400).json({error: error.message});
    }
}