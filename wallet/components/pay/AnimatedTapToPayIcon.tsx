import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

// Define possible animation states as a type
type AnimationStatus = 'idle' | 'processing' | 'error';

interface AnimatedTapToPayIconProps {
  status: AnimationStatus;
}

const AnimatedTapToPayIcon = ({ status = 'idle' }: AnimatedTapToPayIconProps) => {
  // Animation values defined here instead of parent component
  const outerCircleAnim = useRef(new Animated.Value(0)).current;
  const middleCircleAnim = useRef(new Animated.Value(0)).current;
  const innerCircleAnim = useRef(new Animated.Value(0)).current;

  // Animation loop reference - needed to stop animation
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Handle animations based on status prop
  useEffect(() => {
    // First stop any running animations
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }

    // Reset animation values when status changes
    resetAnimations();

    // Then start appropriate animation based on status
    if (status === 'processing') {
      startProcessingAnimation();
    } else if (status === 'error') {
      showErrorAnimation();
    }

    // Cleanup animations when component unmounts
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [status]);

  // Start the animation for payment processing
  const startProcessingAnimation = () => {
    // Create a pulsing/rotating animation for each circle
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(outerCircleAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true, // Enable native driver for better performance
          }),
          Animated.timing(middleCircleAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true, // Enable native driver for better performance
          }),
          Animated.timing(innerCircleAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true, // Enable native driver for better performance
          }),
        ]),
        Animated.parallel([
          Animated.timing(outerCircleAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true, // Enable native driver for better performance
          }),
          Animated.timing(middleCircleAnim, {
            toValue: 0,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true, // Enable native driver for better performance
          }),
          Animated.timing(innerCircleAnim, {
            toValue: 0,
            duration: 600,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true, // Enable native driver for better performance
          }),
        ]),
      ])
    );
    
    // Store reference to animation so we can stop it later
    animationRef.current = pulseAnimation;
    pulseAnimation.start();
  };

  // Animation for payment error (red flash)
  const showErrorAnimation = () => {
    // Set the color to red by animating to a special error value
    const errorAnimation = Animated.parallel([
      Animated.timing(outerCircleAnim, {
        toValue: 2, // Using value 2 to indicate error state
        duration: 300,
        useNativeDriver: true, // Enable native driver
      }),
      Animated.timing(middleCircleAnim, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true, // Enable native driver
      }),
      Animated.timing(innerCircleAnim, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true, // Enable native driver
      }),
    ]);
    
    // Store reference to animation
    animationRef.current = errorAnimation;
    errorAnimation.start();
  };

  // Reset animations to initial state
  const resetAnimations = () => {
    outerCircleAnim.setValue(0);
    middleCircleAnim.setValue(0);
    innerCircleAnim.setValue(0);
  };

  // Calculate animated styles for the circles
  const outerCircleStyle = {
    transform: [
      {
        scale: outerCircleAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [1, 1.15, 1.1] // Normal, Active, Error
        })
      }
    ]
  };

  const middleCircleStyle = {
    transform: [
      {
        scale: middleCircleAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [1, 1.2, 1.15] // Normal, Active, Error
        })
      }
    ]
  };

  const innerCircleStyle = {
    transform: [
      {
        scale: innerCircleAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [1, 1.25, 1.2] // Normal, Active, Error
        })
      }
    ]
  };

  // Determine colors based on status
  const getOuterColor = () => {
    switch (status) {
      case 'processing':
        return '#d9e9ff';
      case 'error':
        return '#ffcccc';
      default:
        return '#f0f0f0';
    }
  };

  const getMiddleColor = () => {
    switch (status) {
      case 'processing':
        return '#a9c9ff';
      case 'error':
        return '#ff9999';
      default:
        return '#e0e0e0';
    }
  };

  const getInnerColor = () => {
    switch (status) {
      case 'processing':
        return '#0056b3';
      case 'error':
        return '#ff0000';
      default:
        return '#007BFF';
    }
  };

  return (
    <View style={styles.logoContainer}>
      <Animated.View 
        style={[
          styles.tapLogo,
          outerCircleStyle,
          { backgroundColor: getOuterColor() }
        ]}
      >
        <Animated.View 
          style={[
            styles.tapLogoInner,
            middleCircleStyle,
            { backgroundColor: getMiddleColor() }
          ]}
        >
          <Animated.View 
            style={[
              styles.tapLogoCore,
              innerCircleStyle,
              { backgroundColor: getInnerColor() }
            ]}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default AnimatedTapToPayIcon;

const styles = StyleSheet.create({
  logoContainer: {
    marginBottom: 40,
  },
  tapLogo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapLogoInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapLogoCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007BFF',
  },
});
