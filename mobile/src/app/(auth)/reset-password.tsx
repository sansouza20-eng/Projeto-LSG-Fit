import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AuthCard } from '@/components/auth-card';
import { AuthScreen } from '@/components/auth-screen';
import { PrimaryButton } from '@/components/primary-button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

export default function ResetPasswordScreen() {
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const router = useRouter();
  const { resetPassword, requestPasswordReset } = useAuth();

  const [email, setEmail] = useState(emailParam ?? '');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function handleSubmit() {
    setError(null);
    setInfo(null);

    if (!email || !code || !password || !confirmPassword) {
      setError('Preencha todos os campos para continuar.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({ email: email.trim(), code: code.trim(), password, confirmPassword });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível redefinir sua senha.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setError(null);
    setInfo(null);

    if (!email) {
      setError('Informe o e-mail para reenviar o código.');
      return;
    }

    setIsResending(true);
    try {
      await requestPasswordReset({ email: email.trim() });
      setInfo('Código reenviado para o seu e-mail.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível reenviar o código.');
    } finally {
      setIsResending(false);
    }
  }

  return (
    <AuthScreen>
      <AuthCard
        title="Nova senha"
        subtitle="Digite o código recebido e sua nova senha"
        footer={
          <View style={styles.footer}>
            <Pressable hitSlop={8} onPress={handleResend} disabled={isResending}>
              <ThemedText type="link" themeColor="accent">
                {isResending ? 'Reenviando...' : 'Reenviar código'}
              </ThemedText>
            </Pressable>

            <Pressable hitSlop={8} onPress={() => router.push('/')}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.footerText}>
                Lembrou a senha?{' '}
                <ThemedText type="link" themeColor="accent">
                  Entrar
                </ThemedText>
              </ThemedText>
            </Pressable>
          </View>
        }>
        <TextField
          label="E-mail"
          placeholder="seu@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextField
          label="Código"
          placeholder="000000"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
        />
        <TextField label="Nova senha" placeholder="••••••••" isPassword value={password} onChangeText={setPassword} />
        <TextField
          label="Confirmar nova senha"
          placeholder="••••••••"
          isPassword
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {info && (
          <ThemedText type="small" themeColor="accent">
            {info}
          </ThemedText>
        )}

        {error && (
          <ThemedText type="small" themeColor="danger">
            {error}
          </ThemedText>
        )}

        <PrimaryButton label="Redefinir senha" isLoading={isSubmitting} onPress={handleSubmit} />
      </AuthCard>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: Spacing.three,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
  },
});
