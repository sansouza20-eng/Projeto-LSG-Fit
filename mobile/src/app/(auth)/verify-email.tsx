import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';

import { AuthCard } from '@/components/auth-card';
import { AuthScreen } from '@/components/auth-screen';
import { PrimaryButton } from '@/components/primary-button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/contexts/auth-context';

export default function VerifyEmailScreen() {
  const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
  const { verifyEmail, resendVerificationCode } = useAuth();

  const [email, setEmail] = useState(emailParam ?? '');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function handleSubmit() {
    setError(null);
    setInfo(null);

    if (!email || !code) {
      setError('Informe o e-mail e o código recebido.');
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyEmail({ email: email.trim(), code: code.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível confirmar o código.');
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
      await resendVerificationCode({ email: email.trim() });
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
        title="Confirme seu e-mail"
        subtitle="Digite o código de 6 dígitos que enviamos para o seu e-mail"
        footer={
          <Pressable hitSlop={8} onPress={handleResend} disabled={isResending}>
            <ThemedText type="link" themeColor="accent">
              {isResending ? 'Reenviando...' : 'Reenviar código'}
            </ThemedText>
          </Pressable>
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

        <PrimaryButton label="Confirmar" isLoading={isSubmitting} onPress={handleSubmit} />
      </AuthCard>
    </AuthScreen>
  );
}
