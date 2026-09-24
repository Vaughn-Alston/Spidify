import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type MockPhase = {
  id: string
  title: string
  tasks: string[]
}

type PhaseCardProps = {
  phase: MockPhase
  index: number
}

export function PhaseCard({ phase, index }: PhaseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headingRow}>
        <Text style={styles.phaseNumber}>0{index + 1}</Text>
        <Text style={styles.title}>{phase.title}</Text>
      </View>
      {phase.tasks.map((task) => (
        <View key={task} style={styles.taskRow}>
          <View style={styles.taskDot} />
          <Text style={styles.task}>{task}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#17121a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 10,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  phaseNumber: {
    color: '#d7a9ad',
    fontSize: 12,
    fontWeight: '800',
    marginRight: 10,
  },
  title: {
    flex: 1,
    color: '#fff9f4',
    fontSize: 15,
    fontWeight: '700',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#c7a8ac',
    marginRight: 10,
  },
  task: {
    flex: 1,
    color: '#c8bdc8',
    fontSize: 13,
    lineHeight: 19,
  },
})
