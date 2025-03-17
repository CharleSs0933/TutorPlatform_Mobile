import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import {
  useCreateTrialBookingMutation,
  useGetChildrenQuery,
  useGetCourseAvailabilityQuery,
  useGetCourseQuery,
} from "@/state/api";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { fontSizes, windowHeight, windowWidth } from "@/theme/app.constant";
import { Children } from "@/types";
import ChildrenCard from "@/components/cards/ChildrenCard";
import { addHours, parse, format } from "date-fns";
import { Image } from "react-native";
import { images } from "@/constants";
import Modal from "react-native-modal";
import useUser from "@/hooks/useUser";

const WEEKDAYS = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 },
];

const CheckoutScreen = () => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedChildren, setSelectedChildren] = useState<Children | null>(
    null
  );
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const {
    data: course,
    isLoading: isCourseLoading,
    isError,
  } = useGetCourseQuery(courseId, {
    skip: !courseId,
  });
  const { data: availabilites, isLoading: isAvailabilityLoading } =
    useGetCourseAvailabilityQuery({ courseId }, { skip: !courseId });
  const { data: children, isLoading: isChildrenLoading } = useGetChildrenQuery(
    {}
  );

  const { user } = useUser();

  const [createTrialBooking] = useCreateTrialBookingMutation();

  const formattedBookings = useMemo(() => {
    const today = new Date();
    const bookings = [];

    for (let i = 0; i < selectedWeekdays.length; i++) {
      const weekday = selectedWeekdays[i];
      const timeSlot = selectedTimes[i];

      if (!timeSlot) continue;

      const nextDate = new Date(today);
      while (nextDate.getDay() !== weekday) {
        nextDate.setDate(nextDate.getDate() + 1);
      }

      const startTime = addHours(
        parse(
          `${format(nextDate, "yyyy-MM-dd")}T${timeSlot}`,
          "yyyy-MM-dd'T'HH:mm",
          new Date()
        ),
        7
      );
      const endTime = new Date(startTime.getTime() + 50 * 60000);

      bookings.push({
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
    }

    return bookings;
  }, [selectedWeekdays, selectedTimes]);

  const availabilitiesByWeekday = WEEKDAYS.map((weekday) => {
    const slots = availabilites
      ? availabilites
          .filter((availability) => {
            const date = new Date(availability.date);
            return date.getDay() === weekday.value;
          })
          .flatMap((availability) => availability.slots)
      : [];

    // Get unique slots
    const uniqueSlots = Array.from(new Set(slots));

    return {
      weekday: weekday.value,
      name: weekday.name,
      slots: uniqueSlots,
    };
  }).filter((day) => day.slots.length > 0);

  const handleWeekdayToggle = (weekdayValue: number) => {
    if (selectedWeekdays.includes(weekdayValue)) {
      setSelectedWeekdays(
        selectedWeekdays.filter((day) => day !== weekdayValue)
      );
      setSelectedTimes(
        selectedTimes.filter((_, index) => {
          return selectedWeekdays[index] !== weekdayValue;
        })
      );
    } else {
      setSelectedWeekdays([...selectedWeekdays, weekdayValue]);
    }
  };

  const isDayDisabled = (weekday: number) => {
    return (
      !course?.lessons ||
      (!selectedWeekdays.includes(weekday) &&
        selectedWeekdays.length >= course.lessons.length)
    );
  };

  const handleConfirmBooking = async () => {
    try {
      if (selectedWeekdays.length === 0 || selectedTimes.length === 0) {
        alert("Please select at least one day and time slot.");
        return;
      }

      if (!selectedChildren) {
        alert("Please select a child.");
        return;
      }

      const bookingData = {
        children_id: selectedChildren.id,
        courseId,
        dates: formattedBookings,
        parent_id: user?.id,
      };

      await createTrialBooking(bookingData).unwrap();
      setBookingSuccess(true);
    } catch (error) {
      console.log(error);
      alert("Failed to create booking. Please try again.");
    }
  };

  if (isCourseLoading || isAvailabilityLoading || isChildrenLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (isError)
    return (
      <View>
        <Text>Failed to load course </Text>
      </View>
    );
  if (!course)
    return (
      <View>
        <Text>Course not found</Text>
      </View>
    );
  if (!children) return <Redirect href={"/(routes)/children-management"} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flex: 1,
          padding: moderateScale(10),
          backgroundColor: "#F5F5F5",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ gap: moderateScale(8) }}>
            <Text
              style={{
                fontSize: fontSizes.FONT24,
                fontFamily: "Poppins_600SemiBold",
                marginBottom: moderateScale(4),
                color: "#000",
              }}
            >
              Select Days of the Week
            </Text>
            <ScrollView
              style={{
                gap: moderateScale(5),
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
            >
              {availabilitiesByWeekday.map((day) => (
                <Pressable
                  key={day.weekday}
                  onPress={() => handleWeekdayToggle(day.weekday)}
                  style={{
                    paddingVertical: verticalScale(5),
                    paddingHorizontal: scale(10),
                    borderRadius: moderateScale(30),
                    marginHorizontal: windowWidth(3),
                    borderWidth: 1,
                    borderColor: "#D3D3D3",
                    backgroundColor: selectedWeekdays.includes(day.weekday)
                      ? "#2563EB"
                      : "#fff",
                    opacity: isDayDisabled(day.weekday) ? 0.5 : 1,
                  }}
                  disabled={isDayDisabled(day.weekday)}
                >
                  <Text
                    style={{
                      fontSize: fontSizes.FONT16,
                      color: selectedWeekdays.includes(day.weekday)
                        ? "#fff"
                        : "#000",
                      textAlign: "center",
                    }}
                  >
                    {day.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            {selectedWeekdays.length > 0 && (
              <View
                style={{
                  gap: moderateScale(5),
                }}
              >
                <Text
                  style={{
                    fontSize: fontSizes.FONT24,
                    fontFamily: "Poppins_600SemiBold",
                    color: "#000",
                  }}
                >
                  Available Time Slots
                </Text>
                {selectedWeekdays.map((weekday, index) => {
                  const dayInfo = availabilitiesByWeekday.find(
                    (day) => day.weekday === weekday
                  );

                  if (!dayInfo) return null;

                  return (
                    <View
                      key={weekday}
                      style={{
                        gap: moderateScale(5),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: fontSizes.FONT18,
                          fontFamily: "Poppins_500Medium",
                          color: "#000",
                        }}
                      >
                        {dayInfo.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: moderateScale(4),
                        }}
                      >
                        {dayInfo.slots.map((slot) => (
                          <Pressable
                            key={slot}
                            onPress={() => {
                              const newTimes = [...selectedTimes];
                              newTimes[index] = slot;
                              setSelectedTimes(newTimes);
                            }}
                            style={{
                              paddingVertical: verticalScale(5),
                              paddingHorizontal: scale(10),
                              borderRadius: moderateScale(8),
                              backgroundColor:
                                selectedTimes[index] === slot
                                  ? "#2563EB"
                                  : "#E5E7EB",
                              borderWidth: 1,

                              borderColor:
                                selectedTimes[index] === slot
                                  ? "#2563EB"
                                  : "#D3D3D3",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: fontSizes.FONT16,
                                color:
                                  selectedTimes[index] === slot
                                    ? "#fff"
                                    : "#000",
                                textAlign: "center",
                              }}
                            >
                              {slot}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
        {selectedTimes.length > 0 && (
          <View
            style={{
              padding: moderateScale(10),
              backgroundColor: "#F5F5F5",
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT24,
                fontFamily: "Poppins_600SemiBold",
                color: "#000",
                marginBottom: verticalScale(4),
              }}
            >
              Select a Child for Booking
            </Text>
            <Text
              style={{
                fontSize: fontSizes.FONT16,
                fontFamily: "Poppins_400Regular",
                color: "#000",
                marginBottom: verticalScale(4),
              }}
            >
              Available Children
            </Text>
            <FlatList
              data={children}
              renderItem={({ item }) => (
                <ChildrenCard
                  child={item}
                  selectedChild={selectedChildren}
                  setSelectedChild={setSelectedChildren}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                gap: moderateScale(8),
              }}
              ListEmptyComponent={<Text>No children available</Text>}
            />

            {selectedChildren && (
              <Pressable
                style={{
                  backgroundColor: "#2467EC",
                  paddingVertical: windowHeight(10),
                  borderRadius: windowWidth(8),
                  marginTop: windowHeight(8),
                }}
                onPress={() => handleConfirmBooking()}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FFFF",
                    fontSize: fontSizes.FONT24,
                    fontFamily: "Poppins_600SemiBold",
                  }}
                >
                  Confirm Booking
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </View>

      {/* Success Modal */}
      <Modal
        isVisible={bookingSuccess}
        onBackdropPress={() => setBookingSuccess(false)}
      >
        <View
          style={{
            backgroundColor: "#fff",
            padding: moderateScale(20),
            borderRadius: moderateScale(16),
            alignItems: "center",
          }}
        >
          <Image
            source={images.check} // Assuming you have a checkmark image in constants
            style={{
              width: scale(80),
              height: scale(80),
              marginTop: verticalScale(10),
            }}
          />
          <Text
            style={{
              fontSize: fontSizes.FONT24,
              fontFamily: "Poppins_600SemiBold",
              color: "#000",
              textAlign: "center",
              marginTop: verticalScale(20),
            }}
          >
            Booking Successful!
          </Text>
          <Text
            style={{
              fontSize: fontSizes.FONT16,
              fontFamily: "Poppins_400Regular",
              color: "#666",
              textAlign: "center",
              marginTop: verticalScale(10),
              marginBottom: verticalScale(20),
            }}
          >
            Thank you for your booking. Your Teaching Sessions has been
            successfully created. Enjoy your Teaching Sessions .
          </Text>
          <Pressable
            style={{
              backgroundColor: "#2467EC",
              paddingVertical: verticalScale(10),
              paddingHorizontal: scale(20),
              borderRadius: moderateScale(8),
            }}
            onPress={() => {
              setBookingSuccess(false);
              router.push("/(tabs)");
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT18,
                fontFamily: "Poppins_600SemiBold",
                color: "#fff",
              }}
            >
              Go to Home
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
