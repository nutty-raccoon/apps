import React from 'react';
import { View, StyleSheet } from 'react-native';

interface QRCodeIconProps {
  size?: number;
  color?: string;
}

export default function QRCodeIcon({ size = 24, color = '#000' }: QRCodeIconProps) {
  const cellSize = size / 4;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Top left position marker */}
      <View style={[styles.positionMarker, { 
        width: cellSize * 1.5, 
        height: cellSize * 1.5, 
        borderColor: color,
        top: 0,
        left: 0
      }]}>
        <View style={[styles.innerMarker, { 
          width: cellSize * 0.75, 
          height: cellSize * 0.75, 
          backgroundColor: color 
        }]} />
      </View>
      
      {/* Top right position marker */}
      <View style={[styles.positionMarker, { 
        width: cellSize * 1.5, 
        height: cellSize * 1.5, 
        borderColor: color,
        top: 0,
        right: 0
      }]}>
        <View style={[styles.innerMarker, { 
          width: cellSize * 0.75, 
          height: cellSize * 0.75, 
          backgroundColor: color 
        }]} />
      </View>
      
      {/* Bottom left position marker */}
      <View style={[styles.positionMarker, { 
        width: cellSize * 1.5, 
        height: cellSize * 1.5, 
        borderColor: color,
        bottom: 0,
        left: 0
      }]}>
        <View style={[styles.innerMarker, { 
          width: cellSize * 0.75, 
          height: cellSize * 0.75, 
          backgroundColor: color 
        }]} />
      </View>
      
      {/* Center data dots */}
      <View style={[styles.centerDot, { 
        width: cellSize * 0.5, 
        height: cellSize * 0.5, 
        backgroundColor: color,
        top: size / 2 - (cellSize * 0.25),
        left: size / 2 - (cellSize * 0.25)
      }]} />
      <View style={[styles.centerDot, { 
        width: cellSize * 0.5, 
        height: cellSize * 0.5, 
        backgroundColor: color, 
        top: size * 0.4 - (cellSize * 0.25),
        left: size * 0.6 - (cellSize * 0.25)
      }]} />
      <View style={[styles.centerDot, { 
        width: cellSize * 0.5, 
        height: cellSize * 0.5, 
        backgroundColor: color, 
        top: size * 0.6 - (cellSize * 0.25),
        left: size * 0.4 - (cellSize * 0.25)
      }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  positionMarker: {
    position: 'absolute',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerMarker: {
    position: 'absolute',
  },
  centerDot: {
    position: 'absolute',
  },
});
