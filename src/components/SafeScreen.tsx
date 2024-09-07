import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import type {PropsWithChildren} from 'react';

type SafeScreenProps = PropsWithChildren<{
  variant?: 'dark' | 'light';
  bg?: string;
  statusBarColor?: string;
}>;

function SafeScreen({children, variant, bg, statusBarColor}: SafeScreenProps) {
  return (
    <View style={[styles.container, {backgroundColor: bg}]}>
      <StatusBar
        barStyle={variant === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={statusBarColor}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeScreen;
