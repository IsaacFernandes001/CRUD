import { Text, View } from "react-native";

import axios from 'axios'
import { useEffect } from "react";
import { FlatList } from "react-native";

export default function Usuarios (){
    const[usuarios, SetUsuarios] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.205.67:3000/usuarios')
        .then(reposta => console.log(reposta.data))
            SetUsuarios(resposta.data)
   
        .catch(error=> {
            console.log(error)
        })
     }, [])
    return (
        <View>
            <Text>Página de usuário funcionando</Text>
            <FlatList 
            data={usuarios}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                <View>
                   <Text>{item.nome}</Text> 
                   <Text>{item.email}</Text> 
                </View>
            }}
            />
        </View>
    )
}