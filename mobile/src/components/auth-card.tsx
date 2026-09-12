import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  const theme = useTheme();

  return (
    <ThemedView type="card" style={[styles.card, { borderColor: theme.border }]}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          {subtitle}
        </ThemedText>
      </View>

      <View style={styles.form}>{children}</View>

      {footer && (
        <View style={styles.footer}>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          {footer}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    borderRadius: Radius.large,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.half,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    gap: Spacing.three,
  },
  footer: {
    gap: Spacing.three,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
  },
});
