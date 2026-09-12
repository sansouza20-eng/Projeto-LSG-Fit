import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StyleSheet } from 'react-native';

import { AppHeader } from '@/components/app-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <AppHeader name={user?.name ?? ''} onLogout={signOut} />

        <ThemedView type="backgroundElement" style={styles.heroCard}>
          <ThemedText type="subtitle">Pronto para treinar?</ThemedText>
          <ThemedText themeColor="textSecondary">
            Acompanhe seus treinos e evolua a cada dia com a LSG FIT.
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.select({ web: Spacing.six, default: Spacing.three }),
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.four,
  },
  heroCard: {
    borderRadius: Radius.large,
    padding: Spacing.four,
    gap: Spacing.two,
  },
});
