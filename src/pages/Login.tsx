import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAuth } from "@/hooks/auth/useAuth";
import { colors } from "@/themes/colors";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const Login = () => {
  const { loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={[1, 0]}
            end={[0, 1]}
            style={styles.iconGradient}
          >
            <MaterialCommunityIcons
              name="meditation"
              size={48}
              color="#ffffff"
              style={styles.icon}
            />
          </LinearGradient>
          <Text style={styles.title}>FOCUS</Text>
          <Text style={styles.subtitle}>Iniciá sesión para seguir tu rutina</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={[
              styles.input,
              emailFocused && styles.inputFocused,
            ]}
            placeholder="Correo o usuario"
            placeholderTextColor={colors.primaryOpacity}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />

          <Text style={[styles.label, styles.labelSpaced]}>Contraseña</Text>
          <TextInput
            style={[
              styles.input,
              passwordFocused && styles.inputFocused,
            ]}
            placeholder="Tu contraseña"
            placeholderTextColor={colors.primaryOpacity}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />

          <TouchableOpacity
            style={styles.buttonWrap}
            activeOpacity={0.85}
            onPress={() => login(email, password)}
            disabled={loading}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.button}
            >
              <Text style={styles.textButton}>
                {loading ? "Entrando…" : "Entrar"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  iconGradient: {
    width: 104,
    height: 104,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  icon: {
    opacity: 0.98,
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 4,
    color: colors.textLabel,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textLabel,
    opacity: 0.72,
    textAlign: "center",
    maxWidth: 280,
  },
  formCard: {
    marginTop: 36,
    marginHorizontal: 20,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 26,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(142, 225, 33, 0.22)",
    ...Platform.select({
      ios: {
        shadowColor: "#3d5c1a",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: colors.textLabel,
    opacity: 0.85,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  labelSpaced: {
    marginTop: 6,
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(90, 105, 82, 0.2)",
    backgroundColor: colors.backgroundHeader,
    fontSize: 16,
    color: colors.textLabel,
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonWrap: {
    marginTop: 28,
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  button: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
});

export default Login;
