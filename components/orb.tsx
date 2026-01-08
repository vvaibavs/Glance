// components/Orb.tsx
import React from 'react';
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';


export default function Orb({ size = 150, imageSource }) {
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, [scale]);

  return (
    <Animated.View
      style={[
        styles.orbContainer,
        {
          width: size,
          height: size,
          transform: [{ scale }],
        },
      ]}
    >
      {/* Optional: subtle glow behind the orb */}
    <View
  style={{
    width: size,
    height: size,
    borderRadius: size*0.6 / 2,
    shadowColor: '#C4B5FC', // glow color
    shadowOpacity: 1,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  }}>
    <Image source={imageSource} style={{ width: size, height: size }} />
</View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  orbContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
