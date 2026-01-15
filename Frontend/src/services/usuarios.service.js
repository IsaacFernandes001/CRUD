import api from './api';

export async function listarTodosUsuarios(){
    const resposta = await api.get('/usuarios');
    return resposta.data;
}

export async function cadastrarUsuario(dados){
    const resposta = await api.post('/usuarios', dados);
    return resposta.data;
}

export async function deletarUsuario(id){
    const resposta = await api.delete(`/usuarios/${id}`);
    return resposta.data;
}

export async function editarUsuario(id, dados){
    const resposta = await api.put(`/usuarios/${id}`, dados);
    return resposta.data;
}
