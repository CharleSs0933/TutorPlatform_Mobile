// import { useGetCoursesQuery, useLazyGetCoursesQuery } from "@/state/api";
// import { Course } from "@/types";
// import { useLocalSearchParams } from "expo-router";
// import React, { useState, useEffect, useCallback } from "react";

// type InitialDataType = {
//   data: Course[];
//   totalResult: number;
//   status: boolean;
//   pageNo: number;
//   totalPages: number;
// };

// const initialData: InitialDataType = {
//   data: [],
//   totalResult: 0,
//   status: true,
//   pageNo: 1,
//   totalPages: 1,
// };

// const usePagination = () => {
//   const [initialLoader, setInitialLoader] = useState(true);
//   const [data, setData] = useState<Course[]>(initialData.data);
//   const [totalResult, setTotalResult] = useState(initialData.totalResult);
//   const [pageNo, setPageNo] = useState(initialData.pageNo);
//   const [totalPages, setTotalPages] = useState(initialData.totalPages);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const params = useLocalSearchParams<{ query?: string; filter?: string }>();

//   const [getCourses] = useLazyGetCoursesQuery();

//   // Fetch data for a given page
//   const fetchData = async (
//     page: number,
//     perPage = 5,
//     title = "",
//     subject = ""
//   ) => {
//     try {
//       const response = await getCourses({
//         page,
//         pageSize: perPage,
//         title,
//         subject,
//       }).unwrap();

//       const result = {
//         data: response?.courses as Course[],
//         totalResult: response?.pagination.total || 0,
//         status: true,
//         pageNo: page,
//         totalPages: response?.pagination.totalPages || 10,
//       };

//       if (result.status) {
//         setData(page === 1 ? result.data : [...data, ...result.data]);
//         setTotalResult(result.totalResult);
//         setPageNo(result.pageNo);
//         setTotalPages(result.totalPages);
//       } else {
//         console.error("Failed to fetch data");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setRefreshing(false);
//       setLoadingMore(false);
//       setInitialLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(pageNo);
//   }, []);

//   // Pull-to-refresh
//   const handleRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchData(1); // Refresh from the first page
//   }, []);

//   // Load more data
//   const loadMore = () => {
//     if (!loadingMore && pageNo < totalPages) {
//       setLoadingMore(true);
//       fetchData(pageNo + 1);
//     }
//   };

//   return {
//     data,
//     totalResult,
//     refreshing,
//     loadingMore,
//     handleRefresh,
//     loadMore,
//     initialLoader,
//   };
// };

// export default usePagination;

import { useGetCoursesQuery, useLazyGetCoursesQuery } from "@/state/api";
import { Course } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";

type InitialDataType = {
  data: Course[];
  totalResult: number;
  status: boolean;
  pageNo: number;
  totalPages: number;
};

const initialData: InitialDataType = {
  data: [],
  totalResult: 0,
  status: true,
  pageNo: 1,
  totalPages: 1,
};

const usePagination = () => {
  const [initialLoader, setInitialLoader] = useState(true);
  const [data, setData] = useState<Course[]>(initialData.data);
  const [totalResult, setTotalResult] = useState(initialData.totalResult);
  const [pageNo, setPageNo] = useState(initialData.pageNo);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();
  const [getCourses] = useLazyGetCoursesQuery();

  // Fetch data for a given page with filters
  const fetchData = async (
    page: number,
    perPage = 5,
    title = params.query || "",
    subject = params.filter || ""
  ) => {
    try {
      const response = await getCourses({
        page,
        pageSize: perPage,
        title,
        subject,
      }).unwrap();

      const result = {
        data: response?.courses as Course[],
        totalResult: response?.pagination.total || 0,
        status: true,
        pageNo: page,
        totalPages: response?.pagination.totalPages || 10,
      };

      if (result.status) {
        setData(page === 1 ? result.data : [...data, ...result.data]);
        setTotalResult(result.totalResult);
        setPageNo(result.pageNo);
        setTotalPages(result.totalPages);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
      setInitialLoader(false);
    }
  };

  // Initial fetch and when params change
  useEffect(() => {
    setInitialLoader(true);
    setPageNo(1); // Reset to first page when filters change
    fetchData(1, 5, params.query || "", params.filter || "");
  }, [params.query, params.filter]);

  // Pull-to-refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1, 5, params.query || "", params.filter || "");
  }, [params.query, params.filter]);

  // Load more data
  const loadMore = useCallback(() => {
    if (!loadingMore && pageNo < totalPages) {
      setLoadingMore(true);
      fetchData(pageNo + 1, 5, params.query || "", params.filter || "");
    }
  }, [loadingMore, pageNo, totalPages, params.query, params.filter]);

  return {
    data,
    totalResult,
    refreshing,
    loadingMore,
    handleRefresh,
    loadMore,
    initialLoader,
  };
};

export default usePagination;
