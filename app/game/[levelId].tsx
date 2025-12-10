import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, RefreshCw, Settings } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useGame } from '@/context/GameContext';
import { Tile } from '@/components/Tile';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
const BOARD_SIZE = width - 40;

export default function GameScreen() {
  const { levelId } = useLocalSearchParams();
  const router = useRouter();
  const { grid, score, moves, status, startGame, swapTiles } = useGame();

  useEffect(() => {
    startGame(Number(levelId));
  }, [levelId, startGame]);

  // Trigger LayoutAnimation when grid changes
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [grid]);

  const handleSwipe = (x: number, y: number, direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    let targetX = x;
    let targetY = y;

    if (direction === 'UP') targetY -= 1;
    if (direction === 'DOWN') targetY += 1;
    if (direction === 'LEFT') targetX -= 1;
    if (direction === 'RIGHT') targetX += 1;

    swapTiles(x, y, targetX, targetY);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradients.dark} style={styles.background} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <ArrowLeft color={Colors.text} size={24} />
          </TouchableOpacity>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>LEVEL {levelId}</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Settings color={Colors.text} size={24} />
          </TouchableOpacity>
        </View>

        {/* Moves & Goal */}
        <View style={styles.statsBar}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>MOVES</Text>
            <Text style={styles.statValue}>{moves}</Text>
          </View>
          <View style={styles.progressContainer}>
             <View style={[styles.progressBar, { width: `${Math.min((score / 1000) * 100, 100)}%` }]} />
          </View>
        </View>

        {/* Game Board */}
        <View style={styles.boardContainer}>
          <View style={styles.boardBackground} />
          <View style={styles.grid}>
            {grid.map((row, y) =>
              row.map((tile, x) => (
                tile ? (
                  <Tile
                    key={tile.id}
                    tile={tile}
                    onSwipe={(dir) => handleSwipe(x, y, dir)}
                  />
                ) : null
              ))
            )}
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footer}>
           {status === 'won' && (
             <View style={styles.resultOverlay}>
               <Text style={styles.resultText}>LEVEL COMPLETE!</Text>
               <TouchableOpacity style={styles.playButton} onPress={() => router.back()}>
                 <Text style={styles.playButtonText}>CONTINUE</Text>
               </TouchableOpacity>
             </View>
           )}
           {status === 'lost' && (
              <View style={styles.resultOverlay}>
               <Text style={[styles.resultText, { color: Colors.danger }]}>OUT OF MOVES!</Text>
               <TouchableOpacity style={styles.playButton} onPress={() => startGame(Number(levelId))}>
                 <Text style={styles.playButtonText}>TRY AGAIN</Text>
                 <RefreshCw color="#fff" size={20} style={{marginLeft: 8}}/>
               </TouchableOpacity>
             </View>
           )}
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  scoreValue: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '800',
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  statsBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    gap: 15,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    minWidth: 80,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  progressContainer: {
    flex: 1,
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.secondary,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardBackground: {
    position: 'absolute',
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: Colors.surface,
  },
  grid: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    position: 'relative',
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultOverlay: {
    alignItems: 'center',
    gap: 10,
  },
  resultText: {
    color: Colors.gold,
    fontSize: 24,
    fontWeight: '900',
    textShadowColor: 'black',
    textShadowRadius: 4,
  },
  playButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
