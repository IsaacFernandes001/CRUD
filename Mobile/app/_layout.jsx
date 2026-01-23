import { Drawer } from "expo-router/drawer";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  const logoutButton = {
    headerRight: () => (
      <Pressable onPress={() => router.replace("/")} style={{ marginRight: 15 }}>
        <Feather name="log-out" size={22} color="#e5e7eb" />
      </Pressable>
    ),
  };

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#020617" },
        headerTintColor: "#e5e7eb",

        drawerStyle: { backgroundColor: "#020617" },
        drawerActiveTintColor: "#818cf8",
        drawerInactiveTintColor: "#e5e7eb",
      }}
    >
      {/* Esconde o index do Drawer */}
      <Drawer.Screen
        name="index"
        options={{
          href: null,
          drawerItemStyle: { display: "none" },
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="usuarios"
        options={{
          drawerLabel: "Usuários",
          title: "Usuários",
          ...logoutButton,
        }}
      />

      <Drawer.Screen
        name="servico"
        options={{
          drawerLabel: "Serviços",
          title: "Serviços e Produtos",
          ...logoutButton,
        }}
      />
    </Drawer>
  );
}
