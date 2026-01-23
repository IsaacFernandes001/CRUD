import { Feather } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const dados = [
  { id: '1', titulo: 'Websites', subtitulo: 'Criação de sites modernos e responsivos', letra: 'W' },
  { id: '2', titulo: 'Design Web', subtitulo: 'Layouts intuitivos focados na experiência do usuário', letra: 'D' },
  { id: '3', titulo: 'Backend', subtitulo: 'APIs, bancos de dados e regras de negócio', letra: 'B' },
  { id: '4', titulo: 'Frontend', subtitulo: 'Interfaces interativas com foco em performance', letra: 'F' },
  { id: '5', titulo: 'Mobile', subtitulo: 'Aplicações móveis multiplataforma', letra: 'M' },
  { id: '6', titulo: 'AWS Services', subtitulo: 'Infraestrutura em nuvem escalável e segura', letra: 'A' },
  { id: '7', titulo: 'CI/CD', subtitulo: 'Automação de deploy e integração contínua', letra: 'C' },
];

export default function Servicos() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>SERVIÇOS E PRODUTOS</Text>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.letra}</Text>
            </View>

            <View style={styles.textos}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.subtitulo}>{item.subtitulo}</Text>
            </View>

            <View style={styles.acoes}>
              <Feather name="settings" size={18} color="#e5e7eb" />
              <Feather name="square" size={18} color="#e5e7eb" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
  },

  sectionTitle: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#818cf8',
  },

  lista: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  card: {
    width: 370,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    marginVertical: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  textos: {
    flex: 1,
    marginLeft: 12,
  },

  titulo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e5e7eb',
  },

  subtitulo: {
    fontSize: 12,
    color: '#9ca3af',
  },

  acoes: {
    flexDirection: 'row',
    gap: 10,
  },
});
