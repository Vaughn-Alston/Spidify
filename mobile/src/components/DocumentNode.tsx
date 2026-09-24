import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type DocumentNodeProps = {
  label: string
  detail: string
  color: string
  size?: 'large' | 'small'
  onPress?: () => void
}

export function DocumentNode({
  label,
  detail,
  color,
  size = 'small',
  onPress,
}: DocumentNodeProps) {
  const node = (
    <View
      style={[
        styles.outerRing,
        size === 'large' ? styles.largeRing : styles.smallRing,
        { borderColor: color, shadowColor: color },
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          size === 'large' ? styles.largeInnerCircle : styles.smallInnerCircle,
        ]}
      >
        {size === 'large' && <Text style={styles.plus}>+</Text>}
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </View>
  )

  return onPress ? (
    <TouchableOpacity activeOpacity={0.82} onPress={onPress}>
      {node}
    </TouchableOpacity>
  ) : (
    node
  )
}

const styles = StyleSheet.create({
  outerRing: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: 'rgba(255,255,255,0.025)',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  largeRing: {
    width: 228,
    height: 228,
    borderRadius: 114,
  },
  smallRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09070b',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  largeInnerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  smallInnerCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  plus: {
    color: '#f9f5ef',
    fontSize: 36,
    fontWeight: '300',
    lineHeight: 40,
  },
  label: {
    color: '#f9f5ef',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  detail: {
    color: '#a7a0ae',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
})
