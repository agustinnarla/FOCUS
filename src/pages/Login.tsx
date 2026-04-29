import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAuth } from "@/hooks/auth/useAuth";
import { colors } from "@/themes/colors";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
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
  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={[1, 0]}
          end={[0, 1]}
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons
            name="meditation"
            size={50}
            color={"black"}
            style={styles.icon}
          />
        </LinearGradient>
        <Text style={styles.title}>FOCUS</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>USUARIO</Text>
        <TextInput
          style={styles.input}
          placeholder="usuario"
          placeholderTextColor={colors.primary}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="contraseña"
          secureTextEntry
          placeholderTextColor={colors.primary}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.buttonTamaño}
          activeOpacity={0.7}
          onPress={() => login(email, password)}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.button}
          >
            <Text style={styles.textButton}>
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginTop: 50,
    borderRadius: 40,
    backgroundColor: "black",
    width: 100,
    height: 100,
    alignContent: "center",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "400",
    letterSpacing: 1.5,
    marginTop: 10,
  },
  formContainer: {
    marginVertical: 50,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 10,
    borderWidth: 0.4,
    borderColor: colors.background,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: "white",
  },
  label: {
    color: colors.textLabel,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 0.8,
    borderColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    elevation: 1,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "80%",
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    elevation: 2,
  },
  buttonTamaño: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "500",
  },
  circle: {
    backgroundColor: colors.backgroundHeader,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Login;
