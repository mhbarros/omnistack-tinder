import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import logo from './../assets/logo.svg';
import like from './../assets/like.svg';
import dislike from './../assets/dislike.svg';

import api from './../services/api';

import './../css/Home.css';

export default function Home(props) {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {

        const getUsuarios = async () => {
            console.log('usuario', props.match.params.id);
            const response = await api.get('/dev', {
                headers: {
                    userId: props.match.params.id,

                }
            });

            setUsuarios(response.data.data);

        };

        getUsuarios();

    }, [props.match.params.id]);

    const doLike = async (_id) => {
        const response = await api.post(`/dev/${_id}/like`, null, {
            headers: {
                user_id: props.match.params.id
            }
        });

        if (response.status === 200) {
            setUsuarios(usuarios.filter(user => user._id !== _id));
        }

    };

    const doDislike = async (_id) => {
        const response = await api.post(`/dev/${_id}/dislike`, null, {
            headers: {
                user_id: props.match.params.id
            }
        });

        if (response.status === 200) {
            setUsuarios(usuarios.filter(user => user._id !== _id));
        }
    };

    return (
        <div className="home-container">
            <Link to={'/'}>
                <img src={logo} alt={'Tindev'}/>
            </Link>

            {
                (typeof usuarios !== 'undefined' && usuarios.length !== 0 ? (
                    <ul>
                        {usuarios.map(usuario => (
                            <li key={usuario._id}>
                                <a href={`https://github.com/${usuario.github_user}`} target={'_blank'} ><img src={usuario.github_avatar} alt={'Perfil'}/></a>
                                <footer>
                                    <strong>{usuario.nome}</strong>
                                    <p>{usuario.github_bio}</p>
                                </footer>
                                <div className="actions">
                                    <button type={'button'} onClick={() => doLike(usuario._id)}><img src={like}
                                                                                                     alt={'Curtir'}/>
                                    </button>
                                    <button type={'button'} onClick={() => doDislike(usuario._id)}><img src={dislike}
                                                                                                        alt={'Descurtir'}/>
                                    </button>
                                </div>
                            </li>
                        ))};
                    </ul>
                ) : <div className={'empty'}>Sem usuários disponíveis =(</div>)
            }

        </div>
    );
};
