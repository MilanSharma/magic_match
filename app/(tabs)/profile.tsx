import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@/constants/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Wizard Profile Coming Soon!</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  }
});
