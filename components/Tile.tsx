import React, { useRef } from 'react';
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native';
import { Flame, Droplets, Leaf, Wind, Sparkles, Sun } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Tile as TileType } from '@/types';

const TILE_SIZE = (Dimensions.get('window').width - 40) / 8;
const ICON_SIZE = TILE_SIZE * 0.6;

const ICONS = {
  fire: Flame,
  water: Droplets,
  earth: Leaf,
  air: Wind,
  magic: Sparkles,
  light: Sun
};

const COLORS = {
  fire: '#FF7675',
  water: '#74B9FF',
  earth: '#55EFC4',
  air: '#A29BFE',
  magic: '#FD79A8',
  light: '#FDCB6E'
};

interface TileProps {
  tile: TileType;
  onSwipe: (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
}

export const Tile = React.memo(({ tile, onSwipe }: TileProps) => {
  const Icon = ICONS[tile.type];
  const color = COLORS[tile.type];
  
  // Pan Responder for swipe detection
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        const { dx, dy } = gestureState;
        if (Math.abs(dx) > Math.abs(dy)) {
          if (Math.abs(dx) > 20) {
            onSwipe(dx > 0 ? 'RIGHT' : 'LEFT');
          }
        } else {
           if (Math.abs(dy) > 20) {
            onSwipe(dy > 0 ? 'DOWN' : 'UP');
          }
        }
      }
    })
  ).current;

  return (
    <View
      style={[
        styles.container,
        {
          left: tile.x * TILE_SIZE,
          top: tile.y * TILE_SIZE,
          backgroundColor: Colors.surface
        }
      ]}
      {...panResponder.panHandlers}
    >
      <View style={[styles.inner, { backgroundColor: color + '20', borderColor: color }]}>
        <Icon color={color} size={ICON_SIZE} strokeWidth={2.5} />
      </View>
    </View>
  );
});

Tile.displayName = 'Tile';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  inner: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
