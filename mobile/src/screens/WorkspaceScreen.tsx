import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { AttachedDocumentCard, AttachedDocument } from '../components/AttachedDocumentCard'
import { DocumentNode } from '../components/DocumentNode'
import { DocumentUrlModal } from '../components/DocumentUrlModal'
import { MockPhase } from '../components/PhaseCard'
import { PhaseResultsModal } from '../components/PhaseResultsModal'

const phases: MockPhase[] = [
  {
    id: 'phase-1',
    title: 'Prepare the project workspace',
    tasks: ['Review the source document', 'Confirm the project direction'],
  },
  {
    id: 'phase-2',
    title: 'Build the first working flow',
    tasks: ['Parse the document into tasks', 'Create the first project view'],
  },
]

export function WorkspaceScreen() {
  const [attachedDocument, setAttachedDocument] = useState<AttachedDocument | null>(null)
  const [showUrlModal, setShowUrlModal] = useState(false)
  const [showPhaseResults, setShowPhaseResults] = useState(false)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.kicker}>Project web / 01</Text>
          <Text style={styles.title}>Spidify</Text>
          <Text style={styles.subtitle}>
            Start with one source node. Your project can grow outward from there.
          </Text>
        </View>

        <View style={styles.web}>
          <View style={styles.orbitTop}>
            <DocumentNode label="Tasks" detail="future node" color="#8d777d" />
          </View>
          <View style={styles.mainNode}>
            <DocumentNode
              label={attachedDocument ? 'URL connected' : 'Design document'}
              detail={attachedDocument ? 'tap to replace' : 'tap to add URL'}
              color="#eadede"
              size="large"
              onPress={() => setShowUrlModal(true)}
            />
          </View>
          <View style={styles.orbitLeft}>
            <DocumentNode label="AI" detail="future node" color="#766579" />
          </View>
          <View style={styles.orbitRight}>
            <DocumentNode label="Issues" detail="future node" color="#947b69" />
          </View>
          <View style={styles.connectorVertical} />
          <View style={styles.connectorHorizontal} />
        </View>

        <Text style={styles.helperText}>
          Add a public URL to replace this source node with its connected document.
        </Text>

        {attachedDocument && <AttachedDocumentCard document={attachedDocument} />}

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.eyebrow}>Next connection</Text>
              <Text style={styles.sectionTitle}>Parsed phases</Text>
            </View>
            <Text style={styles.phaseCount}>{phases.length} phases</Text>
          </View>
          <Text style={styles.sectionText}>
            The backend parser will eventually populate this view from the uploaded design document.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPhaseResults(true)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Open phase results</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PhaseResultsModal
        visible={showPhaseResults}
        phases={phases}
        onClose={() => setShowPhaseResults(false)}
      />
      <DocumentUrlModal
        visible={showUrlModal}
        initialUrl={attachedDocument?.url}
        onClose={() => setShowUrlModal(false)}
        onSave={(url) => {
          setAttachedDocument({ url })
          setShowUrlModal(false)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#08070a',
  },
  container: {
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 44,
  },
  header: {
    alignItems: 'center',
  },
  kicker: {
    color: '#c7a8ac',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fff9f4',
    fontSize: 38,
    fontWeight: '800',
    marginTop: 8,
  },
  subtitle: {
    maxWidth: 310,
    color: '#a99daa',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 8,
  },
  web: {
    height: 350,
    marginTop: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainNode: {
    zIndex: 2,
  },
  orbitTop: {
    position: 'absolute',
    top: 4,
    zIndex: 3,
  },
  orbitLeft: {
    position: 'absolute',
    left: 4,
    top: 132,
    zIndex: 3,
  },
  orbitRight: {
    position: 'absolute',
    right: 4,
    top: 132,
    zIndex: 3,
  },
  connectorVertical: {
    position: 'absolute',
    top: 44,
    bottom: 44,
    width: 1,
    backgroundColor: 'rgba(199,168,172,0.24)',
  },
  connectorHorizontal: {
    position: 'absolute',
    left: 42,
    right: 42,
    height: 1,
    backgroundColor: 'rgba(199,168,172,0.24)',
  },
  helperText: {
    color: '#918694',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: -2,
  },
  section: {
    marginTop: 28,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#100d13',
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: '#c7a8ac',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    color: '#fff9f4',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 5,
  },
  phaseCount: {
    color: '#a99daa',
    fontSize: 12,
    marginTop: 4,
  },
  sectionText: {
    color: '#a99daa',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#eadede',
    borderRadius: 12,
    marginTop: 18,
    paddingVertical: 13,
  },
  primaryButtonText: {
    color: '#211a20',
    fontSize: 14,
    fontWeight: '800',
  },
})
