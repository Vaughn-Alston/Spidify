import React from 'react'
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MockPhase, PhaseCard } from './PhaseCard'

type PhaseResultsModalProps = {
  visible: boolean
  phases: MockPhase[]
  onClose: () => void
}

export function PhaseResultsModal({
  visible,
  phases,
  onClose,
}: PhaseResultsModalProps) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <SafeAreaView style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>Parsed structure</Text>
              <Text style={styles.title}>Project phases</Text>
            </View>
            <Pressable accessibilityRole="button" onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.description}>
              These mock results show where the parser output will appear after the backend reads your document.
            </Text>
            {phases.map((phase, index) => (
              <PhaseCard key={phase.id} phase={phase} index={index} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.72)',
  },
  sheet: {
    maxHeight: '88%',
    minHeight: '62%',
    backgroundColor: '#0f0b12',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(236,224,224,0.18)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  eyebrow: {
    color: '#c7a8ac',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fff9f4',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 5,
  },
  closeButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#241b28',
  },
  closeText: {
    color: '#fff9f4',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    padding: 22,
    paddingBottom: 36,
  },
  description: {
    color: '#a99daa',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
})
