import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import Ratings from "@/utils/ratings";
import { scale, verticalScale } from "react-native-size-matters";
import { fontSizes } from "@/theme/app.constant";
import moment from "moment";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CourseReview } from "@/types";

export default function ReviewCard({ review }: { review: CourseReview }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: scale(40),
            height: scale(40),
            borderRadius: scale(100),
          }}
          source={{
            uri: "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
          }}
        />
        <View style={{ marginHorizontal: verticalScale(7), flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: scale(16),
                    color: "#000",
                  }}
                >
                  {review?.parent?.profile.full_name}
                </Text>
                <View style={{ marginTop: verticalScale(3) }}>
                  <Ratings rating={review?.rating} />
                </View>
                <Text
                  style={{
                    fontSize: fontSizes.FONT16,
                    paddingVertical: verticalScale(4),
                    paddingHorizontal: scale(3),
                    color: "#000",
                  }}
                >
                  {review.review_content}
                </Text>
                <Text
                  style={{
                    fontSize: fontSizes.FONT16,
                    paddingVertical: verticalScale(3),
                    paddingHorizontal: scale(3),
                    color: "#000",
                    opacity: 0.8,
                  }}
                >
                  {moment(review.createAt).fromNow()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* replies
      {review?.replies?.length !== 0 && (
        <View
          style={{
            flexDirection: "row",
            marginTop: verticalScale(10),
            marginLeft: verticalScale(20),
          }}
        >
          <Image
            style={{
              width: scale(40),
              height: scale(40),
              borderRadius: scale(100),
            }}
            source={{
              uri:
                review.replies[0]?.user?.avatar ||
                "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
            }}
          />
          <View style={{ marginHorizontal: verticalScale(6), flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "space-around" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignreviews: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: scale(16),
                      color: theme.dark ? "#fff" : "#000",
                      alignreviews: "center",
                    }}
                  >
                    {review.replies[0]?.user?.name}{" "}
                    <MaterialIcons
                      name="verified"
                      size={scale(16)}
                      color="#0095F6"
                    />
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT16,
                      paddingVertical: verticalScale(3),
                      paddingHorizontal: scale(3),
                      color: theme.dark ? "#fff" : "#000",
                    }}
                  >
                    {review?.replies[0]?.reply}
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizes.FONT16,
                      paddingVertical: verticalScale(3),
                      paddingHorizontal: scale(3),
                      color: theme.dark ? "#fff" : "#000",
                      opacity: 0.8,
                    }}
                  >
                    {moment(review?.replies[0]?.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )} */}
    </View>
  );
}
