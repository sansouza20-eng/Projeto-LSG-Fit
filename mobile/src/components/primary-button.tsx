import { ActivityIndicator, Pressable, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from './themed-text';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PrimaryButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  isLoading,
  variant = 'primary',
  style,
  disabled,
  ...rest
}: PrimaryButtonProps) {
  const theme = useTheme();
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isPrimary ? theme.accent : theme.backgroundElement,
          opacity: pressed || isDisabled ? 0.7 : 1,
        },
        style,
      ]}
      disabled={isDisabled}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? theme.accentText : theme.text} />
      ) : (
        <ThemedText type="smallBold" themeColor={isPrimary ? 'accentText' : 'text'} style={styles.label}>
          {label}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Radius.medium,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
