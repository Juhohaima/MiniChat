import { Stack, useRouter } from 'expo-router';
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
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.title}>MiniChat</Text>
      <TextInput
        style={styles.input}
        placeholder="Syötä mieluisa nimimerkki..."
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
    backgroundColor: '#3d625fa5',
  },
  // MiniChat otsikko
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#ffffffdd',
  },
  // nimikenttä
  input: {
    width: '100%',
    height: 45,
    borderRadius: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  // lähetä nappi
  button: {
    backgroundColor: '#201919dd',
    width: '100%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // lähetä napin teksti
  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
});