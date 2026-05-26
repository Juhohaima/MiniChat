import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const Login = () => {
    if (nickname.trim()) {
      router.push({
        pathname: '/chat',
        params: { user: nickname }
      });
    }
  };

  // etusivu
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MiniChat</Text>
      <TextInput
        style={styles.input}
        placeholder="Syötä nimimerkki..."
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.button} onPress={Login}>
        <Text style={styles.buttonText}>Aloita keskustelu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  // MiniChat otsikko
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#000000dd',
  },
  // nimikenttä
  input: {
    width: '100%',
    height: 45,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  // lähetä nappi
  button: {
    backgroundColor: '#000000dd',
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // lähetä napin teksti
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});