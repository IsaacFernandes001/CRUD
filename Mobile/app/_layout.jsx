import { Drawer } from 'expo-router/drawer';    

export default function Layout() {
    return(
       <Drawer>
            <Drawer.Scream 
            name='index'
            options={{
                drawerLabel: 'Home',
                title: 'Home'
            }}
            />
            
            <Drawer.Scream 
            name='usuarios'
            options={{
                drawerLabel: 'Usuários',
                title: 'Usuários'
            }}
            />
       </Drawer>
    )
}