import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);

  const todosCompletedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const todosTotalCount = todos ? todos.length : 0;
  const todosProgressCount =
    todosTotalCount > 0 ? (todosCompletedCount / todosTotalCount) * 100 : 0;

  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color={"#fff"} />
        </LinearGradient>

        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Taks 👀</Text>
          <Text style={homeStyles.subtitle}>
            {todosCompletedCount} of {todosTotalCount} completed
          </Text>
        </View>
      </View>

      <View style={homeStyles.progressContainer}>
        <View style={homeStyles.progressBarContainer}>
          <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[
                homeStyles.progressFill,
                { width: `${todosProgressCount}%` },
              ]}
            ></LinearGradient>
          </View>
          <Text style={homeStyles.progressText}>
            {Math.round(todosProgressCount)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
