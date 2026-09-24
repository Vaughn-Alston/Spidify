import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

type DocumentUrlModalProps = {
  visible: boolean
  initialUrl?: string
  onClose: () => void
  onSave: (url: string) => void
}

export function DocumentUrlModal({
  visible,
  initialUrl = '',
  onClose,
  onSave,
}: DocumentUrlModalProps) {
  const [url, setUrl] = useState(initialUrl)
  const [error, setError] = useState('')

  const handleSave = () => {
    const trimmedUrl = url.trim()

    if (!/^https?:\/\/\S+$/i.test(trimmedUrl)) {
      setError('Enter a public URL beginning with http:// or https://')
      return
    }

    setError('')
    onSave(trimmedUrl)
  }

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <View style={styles.heading}>
              <Text style={styles.eyebrow}>Connect a source</Text>
              <Text style={styles.title}>Add design URL</Text>
              <Text style={styles.description}>
                Paste a publicly accessible document link. We will connect the parser later.
              </Text>
            </View>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              keyboardType="url"
              onChangeText={(value) => {
                setUrl(value)
                setError('')
              }}
              placeholder="https://example.com/design-doc.md"
              placeholderTextColor="#726775"
              style={styles.input}
              value={url}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <View style={styles.actions}>
              <Pressable onPress={onClose} style={styles.secondaryButton}>
                <Text style={styles.secondaryText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handleSave} style={styles.primaryButton}>
                <Text style={styles.primaryText}>Connect URL</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 22,
    backgroundColor: 'rgba(0,0,0,0.78)',
  },
  safeArea: {
    width: '100%',
  },
  card: {
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(236,224,224,0.2)',
    backgroundColor: '#120e15',
  },
  heading: {
    marginBottom: 18,
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
    marginTop: 6,
  },
  description: {
    color: '#a99daa',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(236,224,224,0.22)',
    backgroundColor: '#08070a',
    color: '#fff9f4',
    fontSize: 14,
  },
  error: {
    color: '#efaaa9',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  secondaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 11,
    backgroundColor: '#241b28',
  },
  secondaryText: {
    color: '#d7cbd7',
    fontSize: 13,
    fontWeight: '700',
  },
  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 11,
    backgroundColor: '#eadede',
  },
  primaryText: {
    color: '#211a20',
    fontSize: 13,
    fontWeight: '800',
  },
})
