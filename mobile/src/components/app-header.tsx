import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppHeaderProps = {
  name: string;
  onLogout: () => void;
};

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase());

  return initials.join('') || '?';
}

export function AppHeader({ name, onLogout }: AppHeaderProps) {
  const theme = useTheme();
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <ThemedView type="accent" style={styles.avatar}>
          <ThemedText type="smallBold" themeColor="accentText">
            {getInitials(name)}
          </ThemedText>
        </ThemedView>
        <View>
          <ThemedText type="small" themeColor="textSecondary">
            Bem-vindo(a) de volta
          </ThemedText>
          <ThemedText type="smallBold">{firstName}</ThemedText>
        </View>
      </View>

      <Pressable
        onPress={onLogout}
        hitSlop={8}
        style={({ pressed }) => [styles.logoutButton, { borderColor: theme.border }, pressed && styles.pressed]}>
        <ThemedText type="small" themeColor="textSecondary">
          Sair
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
