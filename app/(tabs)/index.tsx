import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, Star } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';

const { width } = Dimensions.get('window');

const LEVEL_NODES = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  x: Math.sin(i * 0.8) * 100 + (width / 2) - 40, // S-curve path
  isLocked: i > 0, // Unlock logic to be added
  stars: 0
}));

export default function WorldMap() {
  const router = useRouter();
  const { startGame } = useGame();

  const handleLevelPress = (levelId: number) => {
    startGame(levelId);
    router.push(`/game/${levelId}`);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradients.primary}
        style={styles.background}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Magic Realm</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBadge}>
              <Star size={16} color={Colors.gold} fill={Colors.gold} />
              <Text style={styles.statText}>0</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.mapContent}
          showsVerticalScrollIndicator={false}
        >
          {LEVEL_NODES.map((level, index) => (
            <View key={level.id} style={[styles.nodeContainer, { left: level.x }]}>
               {index < LEVEL_NODES.length - 1 && (
                 <View style={styles.pathLine} /> 
                 // Note: Simple visual path, needs SVG for real curve
               )}
              
              <TouchableOpacity
                style={[
                  styles.levelNode,
                  level.isLocked && styles.lockedNode
                ]}
                onPress={() => handleLevelPress(level.id)}
                activeOpacity={0.8}
                disabled={level.isLocked}
              >
                {level.isLocked ? (
                  <Lock size={20} color="rgba(255,255,255,0.5)" />
                ) : (
                  <Text style={styles.levelText}>{level.id}</Text>
                )}
                
                {!level.isLocked && (
                  <View style={styles.starsRow}>
                    {[1,2,3].map(s => (
                      <Star 
                        key={s} 
                        size={10} 
                        color={Colors.gold} 
                        fill={s <= level.stars ? Colors.gold : 'transparent'} 
                      />
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  mapContent: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  nodeContainer: {
    marginBottom: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80, 
    height: 80,
  },
  levelNode: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  lockedNode: {
    backgroundColor: Colors.surface,
    borderColor: '#555',
    shadowOpacity: 0,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  starsRow: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    gap: 2,
  },
  pathLine: {
    position: 'absolute',
    bottom: -60,
    width: 4,
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: -1,
  }
});
