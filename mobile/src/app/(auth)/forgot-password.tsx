import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AuthCard } from '@/components/auth-card';
import { AuthScreen } from '@/components/auth-screen';
import { PrimaryButton } from '@/components/primary-button';
import { TextField } from '@/components/text-field';
import { ThemedText } from '@/components/themed-text';
import { useAuth } from '@/contexts/auth-context';

export default function ForgotPasswordScreen() {
  const { requestPasswordReset } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setError(null);

    if (!email) {
      setError('Informe seu e-mail para continuar.');
      return;
    }

    const trimmedEmail = email.trim();

    setIsSubmitting(true);
    try {
      await requestPasswordReset({ email: trimmedEmail });
      router.push({ pathname: '/reset-password', params: { email: trimmedEmail } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível enviar o código.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthScreen>
      <AuthCard
        title="Esqueceu a senha?"
        subtitle="Informe seu e-mail para receber um código de redefinição"
        footer={
          <Pressable hitSlop={8} onPress={() => router.push('/')}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.footerText}>
              Lembrou a senha?{' '}
              <ThemedText type="link" themeColor="accent">
                Entrar
              </ThemedText>
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

        {error && (
          <ThemedText type="small" themeColor="danger">
            {error}
          </ThemedText>
        )}

        <PrimaryButton label="Enviar código" isLoading={isSubmitting} onPress={handleSubmit} />
      </AuthCard>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  footerText: {
    textAlign: 'center',
  },
});
