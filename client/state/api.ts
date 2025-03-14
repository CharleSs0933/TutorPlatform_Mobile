import {
  Children,
  Course,
  CourseSubcription,
  Parent,
  TeachingSession,
  Tutor,
  User,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, BaseQueryApi } from "@reduxjs/toolkit/query";
import { Toast } from "toastify-react-native";
import * as SecureStore from "expo-secure-store";

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.0.100:8000",
    prepareHeaders: async (headers) => {
      const token = SecureStore.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const errorData = result.error.data;
      const errorMessage =
        errorData?.message ||
        result.error.status.toString() ||
        "An error occurred";
      Toast.error(`Error: ${errorMessage}`);
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) Toast.success(successMessage);
    }

    if (result.data) {
      result.data = result.data.data;
    } else if (
      result.error?.status === 204 ||
      result.meta?.response?.status === 24
    ) {
      return { data: null };
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return { error: { status: "FETCH_ERROR", error: errorMessage } };
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses", "Tutors", "Parents", "Children", "TeachingSessions"],
  endpoints: (build) => ({
    getCourses: build.query<
      Course[],
      {
        page?: number;
        pageSize?: number;
        subject?: string;
        grade?: string;
        status?: string;
        title?: string;
        userId?: number;
      }
    >({
      query: ({ subject, grade, status, page, pageSize, title, userId }) => ({
        url: "courses",
        params: {
          page,
          pageSize,
          subject,
          grade,
          status,
          title,
          userId,
        },
      }),
      providesTags: ["Courses"],
    }),

    getCourse: build.query<Course, string>({
      query: (id) => `courses/${id}`,
      providesTags: (result, error, id) => [{ type: "Courses", id }],
    }),

    getTutor: build.query<Tutor, string>({
      query: (id) => `tutors/${id}`,
      providesTags: (result, error, id) => [{ type: "Tutors", id }],
    }),

    getTutors: build.query<
      Tutor[],
      {
        full_name?: string;
        phone?: string;
        qualifications?: string;
        teaching_style?: string;
      }
    >({
      query: ({ full_name, phone, qualifications, teaching_style }) => ({
        url: "/tutors",
        params: {
          full_name,
          phone,
          qualifications,
          teaching_style,
        },
      }),
      providesTags: ["Tutors"],
    }),

    getChildren: build.query<Children[], any>({
      query: () => ({
        url: `childrens`,
      }),
      providesTags: ["Children"],
    }),

    getChild: build.query<Children, any>({
      query: ({ id }) => `/childrens/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Children", id }],
    }),

    createChildren: build.mutation<
      Children,
      {
        username: string;
        full_name: string;
        password: string;
        date_of_birth: string;
        learning_goals: string;
      }
    >({
      query: (body) => ({
        url: `/childrens`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Children"],
    }),

    updateChildren: build.mutation<
      Children,
      {
        id: string;
        username: string;
        full_name: string;
        password: string;
        date_of_birth: string;
        learning_goals: string;
      }
    >({
      query: ({
        id,
        username,
        full_name,
        learning_goals,
        password,
        date_of_birth,
      }) => ({
        url: `/childrens/${id}`,
        method: "PUT",
        body: { username, full_name, learning_goals, password, date_of_birth },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Children", id }],
    }),

    deleteChildren: build.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/childrens/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Children"],
    }),

    /*
      ===============
      AVAILABILITIES
      ===============
      */
    getCourseAvailability: build.query<
      { date: string; slots: string[] }[],
      { courseId: string; type?: "Day" | "Week" }
    >({
      query: ({ courseId, type }) => ({
        url: `/availabilities/course/${courseId}`,
        params: {
          type,
        },
      }),
    }),

    /*
      ===============
      TEACHING SESSIONS
      ===============
      */
    getSession: build.query<TeachingSession[], { userId: number }>({
      query: ({ userId }) => ({
        url: `/teaching-sessions`,
        params: { userId },
      }),
      providesTags: ["TeachingSessions"],
    }),
    updateSession: build.mutation<
      TeachingSession,
      {
        startTime?: string;
        endTime?: string;
        comment?: string;
        rating?: number;
        teaching_quality?: string;
        status?: string;
        homework_assigned?: string;
        id: number;
      }
    >({
      query: ({
        startTime,
        endTime,
        comment,
        rating,
        teaching_quality,
        status,
        homework_assigned,
        id,
      }) => ({
        url: `/teaching-sessions/${id}`,
        method: "PUT",
        body: {
          startTime,
          endTime,
          comment,
          rating,
          teaching_quality,
          status,
          homework_assigned,
        },
      }),
      invalidatesTags: ["TeachingSessions"],
    }),

    /*
      ===============
    BOOKINGS
      ===============
      */

    createStripePaymentIntent: build.mutation<
      { clientSecret: string },
      { amount: number }
    >({
      query: ({ amount }) => ({
        url: `/bookings/stripe/payment-intent`,
        method: "POST",
        body: { amount },
      }),
    }),
    createTrialBooking: build.mutation<any, any>({
      query: (body) => ({
        url: `/bookings/create-trial-booking`,
        method: "POST",
        body,
      }),
    }),
    getParentBookings: build.query<CourseSubcription[], any>({
      query: () => ({
        url: `/bookings/parent`,
      }),
    }),

    getParentById: build.query<Parent, { userId: number }>({
      query: ({ userId }) => ({
        url: `/parent/${userId}`,
      }),
    }),

    updateParent: build.mutation<
      Parent,
      { parentId: number; formData: FormData }
    >({
      query: ({ parentId, formData }) => ({
        url: `parent/${parentId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Parents"],
    }),

    /*
      ===============
    AUTH
      ===============
      */
    login: build.mutation<
      { accessToken: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),
    register: build.mutation<
      User,
      { username: string; password: string; full_name: string; email: string }
    >({
      query: ({ username, password, full_name, email }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          username,
          password,
          full_name,
          email,
        },
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetTutorsQuery,
  useGetTutorQuery,
  useGetChildrenQuery,
  useGetChildQuery,
  useCreateChildrenMutation,
  useUpdateChildrenMutation,
  useDeleteChildrenMutation,
  useGetCourseAvailabilityQuery,
  useGetSessionQuery,
  useUpdateSessionMutation,
  useCreateStripePaymentIntentMutation,
  useCreateTrialBookingMutation,
  useGetParentBookingsQuery,
  useGetParentByIdQuery,
  useUpdateParentMutation,
  useLoginMutation,
  useRegisterMutation,
} = api;
