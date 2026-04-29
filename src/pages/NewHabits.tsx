import { CustomHeader } from "@/components/ui/CustomHeader";
import { useNewHabits } from "@/hooks/newHabits/useNewHabits";
import { colors } from "@/themes/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const availableIcons = [
  {
    id: 1,
    name: "water-sharp",
  },
  {
    id: 2,
    name: "walk",
  },
  {
    id: 3,
    name: "book",
  },
  {
    id: 4,
    name: "code",
  },
];

const avaibleDays = [
  {
    id_dia: 1,
    nombre: "L",
  },
  {
    id_dia: 2,
    nombre: "M",
  },
  {
    id_dia: 3,
    nombre: "X",
  },
  {
    id_dia: 4,
    nombre: "J",
  },
  {
    id_dia: 5,
    nombre: "V",
  },
  {
    id_dia: 6,
    nombre: "S",
  },
  {
    id_dia: 0,
    nombre: "D",
  },
];

const NewHabits = () => {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const { onRegisterHabit, loading } = useNewHabits();

  const handlePress = async () => {
    try {
      await onRegisterHabit(name, selectedIcon, selectedDays);
      Alert.alert("Exito", "Se registro el nuevo habito exitosamente");
      setName("");
      setSelectedIcon("");
      setSelectedDays([]);
    } catch (error) {
      Alert.alert("Error", "Error al registrar el nuevo habito");
    }
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <CustomHeader title="Nuevo Habito" />
      <View style={{ padding: 20 }}>
        <View style={styles.containerHeader}>
          <Text style={styles.label}>NOMBRE</Text>
          <TextInput
            style={styles.input}
            placeholder="Tomar Agua"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.containerIcon}>
          <Text style={styles.label}>ICONO</Text>
          <View style={styles.containerEmoji}>
            {availableIcons.map((icon) => {
              return (
                <TouchableOpacity
                  key={icon.id}
                  style={[
                    styles.emoji,
                    selectedIcon === icon.name && {
                      borderWidth: 2,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedIcon(icon.name)}
                >
                  <Ionicons name={icon.name as any} size={26} color="black" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.containerIcon}>
          <Text style={styles.label}>DÍAS</Text>
          <View style={styles.containerDays}>
            {avaibleDays.map((day) => {
              const isSelected = selectedDays.includes(day.id_dia);
              return (
                <TouchableOpacity
                  key={day.id_dia}
                  style={[
                    styles.day,
                    ,
                    isSelected && {
                      borderWidth: 2,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => {
                    if (isSelected) {
                      setSelectedDays(
                        selectedDays.filter((id) => id !== day.id_dia),
                      );
                    } else {
                      if (!selectedDays.includes(day.id_dia)) {
                        setSelectedDays([...selectedDays, day.id_dia]);
                      }
                    }
                  }}
                >
                  <Text>{day.nombre}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonTamaño}
          activeOpacity={0.7}
          onPress={handlePress}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.button}
          >
            <Text style={styles.textButton}>
              {loading ? "Registrando..." : "Registrar nuevo habito"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    width: "100%",
    height: "auto",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  label: {
    color: colors.textLabel,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  input: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: colors.backgroundHeader,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 1,
  },
  containerIcon: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    width: "100%",
    height: "auto",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  containerEmoji: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  emoji: {
    backgroundColor: colors.backgroundHeader,
    padding: 10,
    borderRadius: 10,
  },
  color: {
    padding: 20,
    borderRadius: 10,
  },
  day: {
    width: "14%",
    aspectRatio: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.backgroundHeader,
    justifyContent: "center",
    alignItems: "center",
  },
  containerDays: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "80%",
    marginVertical: 20,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    elevation: 10,
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
});
export default NewHabits;
