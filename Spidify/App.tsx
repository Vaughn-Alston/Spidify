import React, { useMemo, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'

type AttachedFile = {
  name: string
  uri: string
  size?: number
  mimeType?: string
}

type Task = {
  id: string
  title: string
  phase: string
  completed: boolean
}

const RING_HEX = '#ebe0e0'
// Later you can swap this dynamically from settings or backend

export default function App() {
  const [ringColor, setRingColor] = useState(RING_HEX)
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null)

  // mock task data just to show future direction
  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Scrape design doc', phase: 'Phase 1', completed: false },
    { id: '2', title: 'Parse phases', phase: 'Phase 1', completed: false },
    { id: '3', title: 'Create GitHub issues', phase: 'Phase 2', completed: false },
  ])

  const groupedTasks = useMemo(() => {
    const map = new Map<string, Task[]>()

    for (const task of tasks) {
      if (!map.has(task.phase)) {
        map.set(task.phase, [])
      }
      map.get(task.phase)!.push(task)
    }

    return Array.from(map.entries())
  }, [tasks])

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      })

      if (result.canceled) return

      const file = result.assets[0]

      setAttachedFile({
        name: file.name,
        uri: file.uri,
        size: file.size,
        mimeType: file.mimeType,
      })
    } catch (error) {
      console.log('File pick error:', error)
    }
  }

  // Below this line will begin the code for the actually UI of the APP / Uploading the file

  return (


    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* This is the Title */}
        <Text style={styles.title}>Spidify</Text>
        
        {/* Here is the Bio of the Title */}
        <Text style={styles.subtitle}>
          Upload a source node to begin building your project web
        </Text>


        <View style={styles.nodeSection}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePickFile}
            style={[
              styles.outerRing,
              {
                borderColor: ringColor,
                shadowColor: ringColor,
              },
            ]}
          >
            <View style={styles.innerCircle}>
              <Text style={styles.plus}>:)</Text>
              <Text style={styles.nodeLabel}>Design Document</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            Tap the node to upload a design document or project source
          </Text>

          {attachedFile && (
            <View style={styles.fileCard}>
              <Text style={styles.fileCardTitle}>Attached File</Text>
              <Text style={styles.fileName}>{attachedFile.name}</Text>
              <Text style={styles.fileMeta}>{attachedFile.uri}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Future parser flow</Text>
          <Text style={styles.sectionText}>
            This node will later connect to your design-document agent,
            which reads the uploaded file and extracts phases and tasks.
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Mock parsed tasks</Text>

          {groupedTasks.map(([phase, phaseTasks]) => (
            <View key={phase} style={styles.phaseCard}>
              <Text style={styles.phaseTitle}>{phase}</Text>

              {phaseTasks.map((task) => (
                <View key={task.id} style={styles.taskRow}>
                  <View style={styles.taskDot} />
                  <Text style={styles.taskText}>{task.title}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Ring color</Text>
          <Text style={styles.sectionText}>
            Current hex: {ringColor}
          </Text>
          <Text style={styles.smallNote}>
            You can later set this from user settings, project theme data,
            or a datab`ase field.
          </Text>
        </View>





      </ScrollView>
    </SafeAreaView>
  )
}
// This ends the physical code of the APP



// This starts the styling for the App
const styles = StyleSheet.create({

  // Represents the top part of the app
  safeArea: {
    flex: 1,
    backgroundColor: '#080707',
  }
  
  
  ,
  // This represents the main body of the app
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    alignItems: 'center',
    backgroundColor: '#0d0316',
  }
  ,
  title: {
    color: '#fcf1f1',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 15,
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 40,
    lineHeight: 22,
  },
  nodeSection: {
    alignItems: 'center',
    marginBottom: 36,
    width: '100%',
  },
  outerRing: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.95,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 0 },
    elevation: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  innerCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#050505',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '300',
    marginBottom: 4,
  },
  nodeLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  helperText: {
    marginTop: 18,
    color: '#A1A1AA',
    fontSize: 13,
    textAlign: 'center',
  },
  fileCard: {
    width: '100%',
    marginTop: 24,
    backgroundColor: '#0D0D0D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
  },
  fileCardTitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  fileName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  fileMeta: {
    color: '#6B7280',
    fontSize: 12,
  },
  infoSection: {
    width: '100%',
    backgroundColor: '#0A0A0A',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 18,
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionText: {
    color: '#A1A1AA',
    fontSize: 14,
    lineHeight: 22,
  },
  smallNote: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 8,
  },
  phaseCard: {
    marginTop: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#111111',
  },
  phaseTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  taskText: {
    color: '#D4D4D8',
    fontSize: 14,
  },
})