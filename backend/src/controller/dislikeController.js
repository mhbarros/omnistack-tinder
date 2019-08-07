const Dev = require('./../model/dev');

module.exports = {
    async cadastraDislike(req, res){
        const {dev_id:user_like} = req.params;
        const {user_id:user} = req.headers;

        const devDisliked = await Dev.findById(user_like);
        const devLogged = await Dev.findById(user);

        if(!devDisliked){
            return res.json({ok:false, msg:"Desenvolvedor não encontrado."});
        }

        if(!devLogged){
            return res.json({ok:false, msg:"Faça login para continuar."});
        }

        // Verifica se já deu o dislike
        if(devLogged.dislikes.includes(devDisliked._id)){
            return res.json({ok:false, msg:"Você já recusou esse usuário!"});
        }

        // Adiciona o dislike
        devLogged.dislikes.push(devDisliked._id);

        // Salva as modificações
        devLogged.save();
        return res.json({ok:true, data: devLogged});
    }

};
