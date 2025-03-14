import CourseDetailsTabs from "@/components/course/CourseDetailsTabs";
import CourseLesson from "@/components/course/CourseLesson";
import { images } from "@/constants";
import { useGetCourseQuery } from "@/state/api";
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from "@/theme/app.constant";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [activeButton, setActiveButton] = useState<
    "About" | "Reviews" | "Lessons"
  >("About");
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: course, isLoading, isError } = useGetCourseQuery(id);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!course || isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ padding: windowWidth(15) }}>
          <Image
            source={course.image ? { uri: course.image } : images.placeholder}
            resizeMode="contain"
            style={{
              width: SCREEN_WIDTH - 40,
              height: (SCREEN_WIDTH - 28) * 0.5625,
              alignSelf: "center",
              borderRadius: windowWidth(10),
            }}
          />
          <Text
            style={{
              fontSize: fontSizes.FONT22,
              fontFamily: "Poppins_600SemiBold",
              paddingTop: verticalScale(10),
              color: "#3E3B54",
              lineHeight: windowHeight(20),
            }}
          >
            {course.title}
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT18,
              fontFamily: "Poppins_400Regular",
              color: "#000",
            }}
          >
            {course.tutor?.profile?.full_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT22,
                fontFamily: "Poppins_400Regular",
                paddingTop: windowHeight(8),
                color: "#000",
                lineHeight: windowHeight(20),
              }}
            >
              ${course?.price}
            </Text>
          </View>
          <Text
            style={{
              fontSize: fontSizes.FONT18,
              fontFamily: "Poppins_400Regular",
              color: "#000",
            }}
          >
            100 Students Enrolled
          </Text>
        </View>

        <View
          style={{
            paddingTop: windowHeight(8),
            paddingHorizontal: windowWidth(15),
          }}
        >
          <Text
            style={{
              fontSize: fontSizes.FONT24,
              fontFamily: "Poppins_600SemiBold",
              paddingTop: windowHeight(8),
              color: "#3E3B54",
              lineHeight: windowHeight(20),
            }}
          >
            Tutor Information
          </Text>

          <TutorInfor text={course?.tutor?.bio || ""} />
          <TutorInfor text={course?.tutor?.qualifications || ""} />
          <TutorInfor text={course?.tutor?.teaching_style || ""} />
        </View>

        {/* Tutor Specialties */}
        <View
          style={{
            paddingTop: windowHeight(12),
            paddingHorizontal: windowWidth(15),
          }}
        >
          <Text
            style={{
              fontSize: fontSizes.FONT24,
              fontFamily: "Poppins_600SemiBold",
              paddingTop: windowHeight(8),
              color: "#3E3B54",
              lineHeight: windowHeight(20),
            }}
          >
            Tutor Specialties
          </Text>
          {course.tutor?.tutorSpecialty?.map((specialty, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                paddingVertical: windowHeight(5),
                borderBottomColor: "#E2E8F0",
                // alignItems: "center",
              }}
            >
              <Ionicons
                name="checkmark-done-outline"
                size={scale(17)}
                color={"#000"}
              />
              <View style={{ flex: 1, marginLeft: windowWidth(5) }}>
                <Text
                  style={{
                    fontSize: fontSizes.FONT18,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#3E3B54",
                  }}
                >
                  {specialty.subject} ({specialty.level})
                </Text>
                <Text
                  style={{
                    fontSize: fontSizes.FONT16,
                    fontFamily: "Poppins_400Regular",
                    color: "#000",
                    marginTop: windowHeight(2),
                  }}
                >
                  Certification: {specialty.certification}
                </Text>
                <Text
                  style={{
                    fontSize: fontSizes.FONT16,
                    fontFamily: "Poppins_400Regular",
                    color: "#000",
                  }}
                >
                  Experience: {specialty.years_experience} years
                </Text>
              </View>
            </View>
          ))}
        </View>

        <CourseDetailsTabs
          activeButton={activeButton}
          setActiveButton={setActiveButton}
        />

        {activeButton === "About" && (
          <View
            style={{
              marginHorizontal: scale(12),
              marginVertical: verticalScale(10),
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT25,
                fontFamily: "Poppins_500Medium",
                color: "#000",
              }}
            >
              About course
            </Text>
            <Text
              style={{
                color: "#525258",
                fontSize: fontSizes.FONT20,
                marginTop: 10,
                textAlign: "justify",
              }}
            >
              {isExpanded
                ? course.description
                : course.description.slice(0, 302)}
            </Text>
            {course.description.length > 302 && (
              <TouchableOpacity
                style={{ marginTop: verticalScale(2) }}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <Text
                  style={{
                    color: "#2467EC",
                    fontSize: fontSizes.FONT16,
                  }}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                  {isExpanded ? "-" : "+"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {activeButton === "Lessons" && (
          <View
            style={{
              marginHorizontal: verticalScale(16),
              marginVertical: scale(15),
            }}
          >
            <CourseLesson lessons={course.lessons || []} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const TutorInfor = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: windowHeight(5),
      }}
    >
      <Ionicons name="checkmark-done-outline" size={scale(17)} color={"#000"} />
      <Text
        style={{
          marginLeft: windowWidth(5),
          fontSize: fontSizes.FONT18,
          color: "#000",
        }}
      >
        {text}
      </Text>
    </View>
  );
};
