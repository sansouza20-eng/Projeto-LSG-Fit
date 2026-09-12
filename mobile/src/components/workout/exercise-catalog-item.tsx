import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Exercise } from '@/types/exercise';

type ExerciseCatalogItemProps = {
  exercise: Exercise;
  onPress: () => void;
};

export function ExerciseCatalogItem({ exercise, onPress }: ExerciseCatalogItemProps) {
  const theme = useTheme();

  return (
    <ThemedView type="backgroundElement" style={styles.row}>
      <View style={styles.info}>
        <ThemedText type="smallBold">{exercise.name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {exercise.muscleGroup} · {exercise.equipment}
        </ThemedText>
      </View>

      <Pressable
        onPress={onPress}
        hitSlop={8}
        style={({ pressed }) => [styles.addButton, { backgroundColor: theme.accent }, pressed && styles.pressed]}>
        <ThemedText type="smallBold" themeColor="accentText">
          +
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  info: {
    flex: 1,
    gap: Spacing.half,
    paddingRight: Spacing.two,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
