const Dev = require('./../model/dev');

module.exports = {
    async cadastraLike(req, res){
        const {dev_id:user_like} = req.params;
        const {user_id:user} = req.headers;

        const devLiked = await Dev.findById(user_like);
        const devLogged = await Dev.findById(user);

        if(!devLiked){
            return res.json({ok:false, msg:"Desenvolvedor não encontrado."});
        }

        if(!devLogged){
            return res.json({ok:false, msg:"Faça login para continuar."});
        }

        // Verifica se já deu o like
        if(devLogged.likes.includes(devLiked._id)){
            return res.json({ok:false, msg:"Você já curtiu esse usuário!"});
        }

        // Adiciona o like
        devLogged.likes.push(devLiked._id);


        // Verificação de match
        if(devLiked.likes.includes(devLogged._id)){
            console.log("MATCH !");
        }

        // Salva as modificações
        devLogged.save();
        return res.json({ok:true, data: devLogged});
    }
};
