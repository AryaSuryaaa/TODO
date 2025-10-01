import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  console.log(todos);

  const createTodo = useMutation(api.todos.createTodos);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        <Text>Todos Screen</Text>

        <Header />
        <TodoInput />
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>Change mode</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => createTodo({ text: "Hallo convex!" })}>
          <Text>Add todo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => clearAllTodos()}>
          <Text>Clear all todos</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.bg,
    },
  });
