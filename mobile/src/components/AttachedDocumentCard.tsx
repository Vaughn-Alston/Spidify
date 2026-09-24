import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type AttachedDocument = {
  url: string
}

type AttachedDocumentCardProps = {
  document: AttachedDocument
}

export function AttachedDocumentCard({ document }: AttachedDocumentCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Source node connected</Text>
      <Text style={styles.fileName} numberOfLines={1}>
        Public design document
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {document.url}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(236, 224, 224, 0.2)',
    backgroundColor: '#17121a',
  },
  eyebrow: {
    color: '#c7a8ac',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  fileName: {
    color: '#fff9f4',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: '#9f929f',
    fontSize: 12,
    marginTop: 6,
  },
})
