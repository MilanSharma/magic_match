import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

export default function ModalScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <X color={Colors.text} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Sound Effects</Text>
          <Switch 
            value={true} 
            trackColor={{ false: '#767577', true: Colors.success }}
            thumbColor={'#f4f3f4'}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.label}>Music</Text>
          <Switch 
            value={true} 
            trackColor={{ false: '#767577', true: Colors.success }}
            thumbColor={'#f4f3f4'}
          />
        </View>
         <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.label}>Haptics</Text>
          <Switch 
            value={true} 
            trackColor={{ false: '#767577', true: Colors.success }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Restart Level</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: Colors.danger, marginTop: 10 }]}>
        <Text style={styles.buttonText}>Quit Level</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
