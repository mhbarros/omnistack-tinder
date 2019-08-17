import React, {useState} from 'react';

import logo from './../assets/logo.svg';
import './../css/Login.css';
import api from './../services/api';

export default function Login({history}) {
    const [github_user, setGithubUser] = useState('');
    const [password, setPassword]      = useState('');
    const [loginError, setLoginError]  = useState('');

    const submit = async (e) => {
        e.preventDefault(); // Impedir que o type=submit do button troque de página

        const response = await api.post('/dev', {
            github_user,
            password
        });

        if(response.status === 200 && response.data.ok){
            const {_id} = response.data.data;

            history.push(`/dev/${_id}`); // troca de tela
        }else{
            setLoginError(response.data.msg);
            setTimeout(() => {setLoginError('')}, 3000);
        }

    };

    return (
        <div className={'login-container'}>
            <form onSubmit={submit}>
                <img src={logo} alt={'Tindev'}/>
                <input type={'text'} placeholder={'Usuário no GitHub'} value={github_user} onChange={e => setGithubUser(e.target.value)}/>
                <input type={'password'} placeholder={'Sua senha'} value={password} onChange={e => setPassword(e.target.value)}/>
                <button type={'submit'}>Entrar</button>
                <span className={'forgot-pass'}>Esqueceu sua senha?</span>
                {
                    (loginError) ? (<span className={'login-error'}>{loginError}</span>):''
                }
            </form>
        </div>
    );
};
