import React, {useState} from 'react';

import logo from './../assets/logo.svg';
import './../css/Login.css';
import api from './../services/api';

export default function Login({history}) {
    const [github_user, setGithubUser] = useState('');

    const submit = async (e) => {
        e.preventDefault(); // Impedir que o type=submit do button troque de página

        const response = await api.post('/dev', {
            github_user
        });

        if(response.status === 200){
            const {_id} = response.data.data;

            history.push(`/dev/${_id}`); // troca de tela
        }



    };

    return (
        <div className={'login-container'}>
            <form onSubmit={submit}>
                <img src={logo} alt={'Tindev'}/>
                <input placeholder={'Usuário no GitHub'} value={github_user} onChange={e => setGithubUser(e.target.value)}/>
                <button type={'submit'}>Entrar</button>
            </form>
        </div>
    );
};
