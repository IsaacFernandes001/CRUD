import { useEffect, useState } from "react"
import { cadastrarUsuario, listarTodosUsuarios, deletarUsuario, editarUsuario } from "../services/usuarios.service";
import { Alert, Box, Button, Container, IconButton, Modal, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Usuarios(){
    const [usuarios, setUsuarios] = useState([]);

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');

      const [openAlert, setOpenAlert] = useState(false);
      const [openAlertDelete, setOpenAlert2] = useState(false);
      const [openAlertEdit, setOpenAlertEdit] = useState(false);

      const [openCreate, setOpenCreate] = useState(false);
      const [openEdit, setOpenEdit] = useState(false);
      const [usuarioEditando, setUsuarioEditando] = useState(null);



    useEffect(() => {
        async function carregarUsuarios() {
            const dataUsuarios = await listarTodosUsuarios()
            setUsuarios(dataUsuarios);
        }
        carregarUsuarios();
    }, []);

    async function Salvar() {
      try{
        const novoUsuario = await cadastrarUsuario({nome, email});
        setOpenAlert(true);
        setNome('');
        setEmail('');
        setUsuarios(prev => [...prev, novoUsuario]);

      } catch(error){
        console.log('Algo de errado não está certo', error)
      }
    }

    async function Deletar(id){
      try {
        const confirmacao = window.confirm('Deseja mesmo deletar usuário?');
        if (!confirmacao) return;

        await deletarUsuario(id);

        setUsuarios(prev =>
          prev.filter(usuario => usuario.id !== id)
        );

        setOpenAlert2(true);
      } catch (error) {
        console.log("Erro ao deletar usuário.", error);
      }
  }
  async function Editar() {
  try {
    await editarUsuario(usuarioEditando.id, {
      nome,
      email
    });

    const usuariosAtualizados = await listarTodosUsuarios();
    setUsuarios(usuariosAtualizados);

    setOpenAlertEdit(true);
    setOpenEdit(false);
    setOpenEdit(true);
    setNome('');
    setEmail('');
    setUsuarioEditando(null);

  } catch (error) {
    console.log("Erro ao editar usuário", error);
  }
}


    return(
        <Container>
          <Button onClick={() => setOpenCreate(true)} variant="contained" sx={{marginTop: 2, padding: 1.5, marginBlock: 4}}>
           Novo Usuário
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((item) => (
                  <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.nome}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">
                    <IconButton
                      color="warning"
                      aria-label="editar"
                      onClick={() => {
                        setUsuarioEditando(item);
                        setNome(item.nome);
                        setEmail(item.email);
                        setOpenEdit(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="deletar" color="error">
                          <DeleteIcon onClick={() => Deletar(item.id)}/>
                      </IconButton> 
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal open={openCreate} onClose={() => setOpenCreate(false)}>

            <Box sx={style}>
              <Typography id="modal-modal-title" component="h2">
                 Novo Usuário
              </Typography>
              <TextField 
              id="filled-basic" 
              label="Nome" 
              variant="filled" 
              sx={{width:"100%", marginTop:2}}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              />
              <TextField 
              id="filled-basic" 
              label="Email" 
              variant="filled" 
              sx={{width:"100%", marginTop:2}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
              variant="contained" 
              sx={{marginTop: 2}}
              onClick={() => Salvar()}>
                Criar Conta
              </Button>
            </Box>
      </Modal>
      <Snackbar 
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: "right"}}
      >
        <Alert
          onClose={( () => setOpenAlert(false))}
          severity="success"
          variant="filled"
          sx={{ width: '100%'}}
          >
          Usuário cadastrado com sucesso!
        </Alert>
      </Snackbar>

      
      <Snackbar 
        open={openAlertDelete}
        autoHideDuration={3000}
        onClose={() => setOpenAlert2(false)}
        anchorOrigin={{ vertical: 'top', horizontal: "right"}}
      >
        <Alert
          onClose={( () => setOpenAlert2(false))}
          severity="success"
          variant="filled"
          sx={{ width: '100%'}}
          >
          Usuário deletado com sucesso!
        </Alert>
        
      </Snackbar>

      {/*Modal Editar*/}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>

            <Box sx={style}>
              <Typography id="modal-modal-title" component="h2">
                 Editar Usuário
              </Typography>
              <TextField 
              id="filled-basic" 
              label="Nome" 
              variant="filled" 
              sx={{width:"100%", marginTop:2}}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              />
              <TextField 
              id="filled-basic" 
              label="Email" 
              variant="filled" 
              sx={{width:"100%", marginTop:2}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={Editar} variant="contained" 
                sx={{marginTop: 2}}>
                Salvar Alterações
              </Button>
            </Box>
      </Modal>
      <Snackbar 
        open={openAlertEdit}
        autoHideDuration={3000}
        onClose={() => setOpenEdit(false)}
        anchorOrigin={{ vertical: 'top', horizontal: "right"}}
      >
        <Alert
          onClose={( () => setOpenEdit(false))}
          severity="success"
          variant="filled"
          sx={{ width: '100%'}}
          >
          Usuário editado com sucesso!
        </Alert>
      </Snackbar>
        </Container>
    )

}