const axios = require('axios');
const devModel = require('../model/dev');

module.exports = {
    async getDev(req, res) {
        const {user_id} = req.headers;

        const dev = await devModel.findById(user_id);

        if (!dev) {
            return res.json({ok: false, msg: 'Faça login para continuar'});
        }

        const users = await devModel.find({
            $and: [
                {_id: {$ne: user_id}}, // not equals
                {_id: {$nin: dev.likes}}, // not in
                {_id: {$nin: dev.dislikes}}
            ]
        });

        return res.json({ok:true, data: users});
    },
    async cadastraDev(req, res) {
        const {github_user} = req.body;

        if (typeof github_user === 'undefined' || github_user === '' || github_user == null) {
            return res.json({ok: false, msg: "O campo 'github_usuario' é obrigatório."});
        }

        // Verifica se usuário já existe
        const user = await devModel.findOne({github_user: github_user});
        if (user) {
            return res.json({ok: true, data: user});
        }

        try{
            const github_response = await axios.get(`https://api.github.com/users/${github_user}`);

            const {avatar_url: github_avatar, bio: github_bio, name: nome} = github_response.data;

            if (typeof github_avatar === 'undefined' || github_avatar === '' || github_avatar == null) {
                return res.json({ok: false, msg: "É necessário que o usuário possua uma foto de perfil."})
            }

            if(github_response.status === 404){
                return res.json({ok: false, msg: "Usuário não encontrado."});
            }

            if (typeof nome === 'undefined' || nome === '' || nome == null) {
                return res.json({ok: false, msg: "Usuário não possui um nome no Github."});
            }

            const dev = await devModel.create({
                github_user,
                nome,
                github_bio,
                github_avatar
            });

            return res.json({ok: true, data: dev});

        }catch (e) {

            res.status(e.response.status).send({ok: false, msg: "Ocorreu um erro de conexão. Por favor, tente novamente."});

        }

    }
};
