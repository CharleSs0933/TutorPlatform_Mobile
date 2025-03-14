import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";
import { Entypo, Feather } from "@expo/vector-icons";
import { Lesson } from "@/types";

export default function CourseLesson({ lessons }: { lessons: Lesson[] }) {
  const [visibleLessons, setVisibleLessons] = useState<Set<number>>(
    new Set<number>()
  );

  const toggleLesson = (lessonId: number) => {
    const newVisibleLessons = new Set(visibleLessons);
    if (newVisibleLessons.has(lessonId)) {
      newVisibleLessons.delete(lessonId);
    } else {
      newVisibleLessons.add(lessonId);
    }
    setVisibleLessons(newVisibleLessons);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: verticalScale(5),
          borderRadius: 8,
        }}
      >
        {lessons.map((lesson) => {
          const isVisible = visibleLessons.has(lesson.id);

          return (
            <>
              <View
                style={{
                  marginBottom: !isVisible ? verticalScale(5) : null,
                  borderBottomColor: "#DCDCDC",
                  paddingVertical: verticalScale(5),
                  borderBottomWidth: !isVisible ? 1 : 0,
                }}
                key={lesson.id}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: fontSizes.FONT21,
                      width: scale(265),
                      fontFamily: "Poppins_500Medium",
                      color: "#000",
                    }}
                  >
                    {lesson.title}
                  </Text>
                  <TouchableOpacity onPress={() => toggleLesson(lesson.id)}>
                    <Entypo
                      name={isVisible ? "chevron-up" : "chevron-down"}
                      size={Math.round(scale(20))}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
                {/* Lesson Description (Visible when toggled) */}
                {isVisible && lesson.description && (
                  <View
                    style={{
                      marginTop: verticalScale(5),
                      paddingHorizontal: scale(10),
                      paddingVertical: verticalScale(5),
                      borderWidth: 1,
                      borderColor: "#E1E2E5",
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Feather
                        name="info"
                        size={scale(16)}
                        color="#8a8a8a"
                        style={{ marginRight: scale(8) }}
                      />
                      <Text
                        style={{
                          fontFamily: "Poppins_400Regular",
                          color: "#525258",
                          fontSize: fontSizes.FONT17,
                          flex: 1,
                        }}
                      >
                        {lesson.description}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    paddingVertical: 12,
  },
  itemContainerWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitleWrapper: {
    flexDirection: "row",
  },
  itemTitleText: { marginLeft: 8, color: "#525258", fontSize: 16 },
  itemDataContainer: { flexDirection: "row", alignItems: "center" },
});
