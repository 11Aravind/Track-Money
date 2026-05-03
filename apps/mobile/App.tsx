import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@trackify/ui';
import { formatCurrency } from '@trackify/utils';

export default function App() {
  const balance = 5000;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trackify Mobile</Text>
      <Text style={styles.balance}>Current Balance: {formatCurrency(balance)}</Text>
      <Button 
        title="Sync Data" 
        onPress={() => console.log('Syncing...')} 
        style={styles.button}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balance: {
    color: '#cbd5e1',
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    backgroundColor: '#3b82f6',
  }
});
