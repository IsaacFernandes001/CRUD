import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');

  async function tentarlogin() {
    try {
      const res = await axios.post('http://192.168.205.67:3000/login', { email, senha });

      if (res.data.statusCode) {
        router.replace('/servico');
      } else {
        setMsg(res.data.msg ?? 'Email ou senha inválidos');
      }
    } catch (error) {
      console.log(error);
      setMsg('Erro ao conectar no servidor');
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 26, marginLeft: 6 }}>🔥🤘</Text>
            <Feather name="hand" size={40} color="#818cf8" />
          </View>

          <Text style={styles.title}>Login</Text>

          <Text style={styles.subtitle}>Coloca o teu email pra ver se é tu</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o seu email"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Digite a sua senha"
            placeholderTextColor="#64748b"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            autoCapitalize="none"
          />

          {msg.length > 0 && (
            <Text style={styles.errorText}>
              {msg}
            </Text>
          )}

          <Pressable style={styles.button} onPress={tentarlogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <Pressable onPress={() => router.push('/cadastro')}>
            <Text style={styles.createAccount}>
              Ainda não possui uma conta?{' '}
              <Text style={styles.link}>Criar conta</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 5
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 4,
    color: '#e5e7eb'
  },
  subtitle: {
    textAlign: 'center',
    color: '#9ca3af',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#020617',
    color: '#e5e7eb'
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  createAccount: {
    textAlign: 'center',
    color: '#9ca3af'
  },
  link: {
    color: '#818cf8',
    fontWeight: 'bold'
  },
  errorText: {
    color: '#fb7185',
    textAlign: 'center',
    marginBottom: 12
  }
});
