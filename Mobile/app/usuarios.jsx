import {
  Button,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert
} from "react-native";

import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://192.168.205.67:3000/usuarios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const buscarUsuarios = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsuarios(response.data);
    } catch (error) {
      alert("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  const abrirModalNovo = () => {
    setUsuarioEditando(null);
    setNome("");
    setEmail("");
    setModalVisible(true);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditando(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setModalVisible(true);
  };

  const salvarUsuario = async () => {
    if (!nome.trim() || !email.trim()) {
      alert("Preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      alert("Email inválido");
      return;
    }

    if (saving) return;

    setSaving(true);

    try {
      if (usuarioEditando) {
        await axios.put(`${API_URL}/${usuarioEditando.id}`, {
          nome,
          email
        });
      } else {
        await axios.post(API_URL, { nome, email });
      }

      setModalVisible(false);
      buscarUsuarios();
    } catch (error) {
      alert("Erro ao salvar usuário");
    } finally {
      setSaving(false);
    }
  };

  const excluirUsuario = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/${Number(id)}`);
              buscarUsuarios();
            } catch (error) {
              console.log(error.response?.data || error.message);
              alert("Erro ao excluir usuário");
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Novo Usuário"
          color="#22c55e"
          onPress={abrirModalNovo}
        />
      </View>

      {/* MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {usuarioEditando ? "Editar Usuário" : "Novo Usuário"}
            </Text>

            <TextInput
              placeholder="Nome"
              placeholderTextColor="#64748b"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              autoCapitalize="words"
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  saving && { opacity: 0.6 }
                ]}
                onPress={salvarUsuario}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? "Salvando..." : "Salvar"}
                </Text>
              </TouchableOpacity>

              <Button
                title="Cancelar"
                color="#ef4444"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* LISTA */}
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.textPrimary}>ID: {item.id}</Text>
              <Text style={styles.textPrimary}>Nome: {item.nome}</Text>
              <Text style={styles.textSecondary}>Email: {item.email}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => abrirModalEditar(item)}
                >
                  <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => excluirUsuario(item.id)}
                >
                  <Text style={styles.actionText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum usuário cadastrado
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a"
  },
  buttonContainer: {
    marginVertical: 10,
    width: 150,
    alignSelf: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#e5e7eb"
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#9ca3af"
  },
  card: {
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
    width: 320,
    alignSelf: "center"
  },
  textPrimary: {
    color: "#e5e7eb"
  },
  textSecondary: {
    color: "#9ca3af"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  editButton: {
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 8,
    width: 100
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 8,
    width: 100
  },
  actionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: 300,
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155"
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: "#e5e7eb",
    fontWeight: "600"
  },
  input: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#020617",
    color: "#e5e7eb"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  saveButton: {
    backgroundColor: "#22c55e",
    padding: 10,
    width: 120,
    borderRadius: 8
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600"
  }
});
