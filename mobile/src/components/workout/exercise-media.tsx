import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Exercise } from '@/types/exercise';

type ExerciseMediaProps = {
  exercise: Exercise;
};

export function ExerciseMedia({ exercise }: ExerciseMediaProps) {
  const theme = useTheme();
  const player = useVideoPlayer(exercise.videoUrl, (instance) => {
    instance.loop = true;
  });

  const hasMedia = Boolean(exercise.gifUrl || exercise.videoUrl);

  return (
    <View style={styles.container}>
      {exercise.videoUrl && (
        <VideoView
          player={player}
          style={[styles.media, { backgroundColor: theme.backgroundElement }]}
          contentFit="cover"
          nativeControls
        />
      )}

      {exercise.gifUrl && (
        <Image
          source={{ uri: exercise.gifUrl }}
          style={[styles.media, { backgroundColor: theme.backgroundElement }]}
          contentFit="cover"
        />
      )}

      {!hasMedia && (
        <ThemedText type="small" themeColor="textSecondary">
          Vídeo/GIF de demonstração ainda não disponível para este exercício.
        </ThemedText>
      )}

      {exercise.instructions ? (
        <ThemedText type="small" style={styles.instructions}>
          {exercise.instructions}
        </ThemedText>
      ) : (
        <ThemedText type="small" themeColor="textSecondary">
          Instruções de execução ainda não cadastradas.
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  media: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Radius.medium,
  },
  instructions: {
    lineHeight: 20,
  },
});
