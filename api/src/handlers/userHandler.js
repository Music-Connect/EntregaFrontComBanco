export default function dataReturnCon(request,response,next){
    try {
        const {email,password,confirmarSenha,usuario,telefone,local,organizacao} = request.body;

        RegisterDataValidator({email,password,confirmarSenha,usuario,telefone,local,organizacao});

        next();

    }catch(error){
        return response.status(400).json({error: error.message});
    }
}
export default function dataReturnArt(request,response,next){
    try {
        const {email,password,confirmarSenha,usuario,telefone,local} = request.body;

        RegisterDataValidator({email,password,confirmarSenha,usuario,telefone,local});

        next();

    }catch(error){
        return response.status(400).json({error: error.message});
    }
}