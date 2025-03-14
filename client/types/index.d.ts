export interface Course {
  id: number;
  tutor_id: number;
  title: string;
  description?: string;
  total_lessons: number;
  image?: string;
  price: number;
  status: "Draft" | "Published";
  subject: string;
  grade: number;

  tutor?: Tutor;
  // availabilitys?: Availability[];
  lessons?: Lesson[];
  // courseSubscriptions?: CourseSubscription[];
  courseReviews?: CourseReview[];
}

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  learning_objectives?: string;
  materials_needed?: string;
}

export interface User {
  id?: number;
  email?: string;
  username?: string;
  full_name?: string;
  phone?: string;
  role?: "Tutor" | "Parent" | "Kid";
  google_id?: string;
  timezone?: string;
}
export interface Tutor {
  id: number;
  bio: string;
  qualifications: string;
  teaching_style: string;
  is_available: boolean;
  demo_video_url?: string;
  image?: string;

  profile?: {
    username: string;
    email: string;
    full_name: string;
    phone: string;
    google_id: string;
    timezone: string;
  };

  tutorReviews: TutorReviews[];
}

export interface Children {
  id: number;
  date_of_birth: string;
  learning_goals: string;
  parent_id: number;
  profile?: {
    full_name: string;
    username?: string;
  };
}
export interface SearchCourseCardProps {
  course: Course;
  isSelected?: boolean;
  onClick?: () => void;
}

export interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number; // Percentage of element visibility to trigger animation
  animationDuration?: number; // Duration of animation
  initialStyle?: Record<string, any>; // Initial style of the animation
  animateStyle?: Record<string, any>; // Style to animate to
}

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
  rightElement?: ReactNode;
}

export interface TeacherCourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  isOwner: boolean;
}

export interface ToolbarProps {
  onSearch: (search: string) => void;
  onSubjectChange: (subject: string) => void;
  onGradeChange: (grade: string) => void;
}

export interface CourseFormData {
  courseTitle: string;
  courseDescription: string;
  courseSubject: string;
  courseGrade: string;
  coursePrice: string;
  courseStatus: boolean;
  courseImage: string;
}

export interface CustomFixedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface Children {
  id: number;
  date_of_birth: string;
  learning_goals: string;
  parent_id: number;
  profile?: {
    full_name: string;
  };
}

export interface ChildrenDropTable {
  child: Children;
  onEdit: (child: Children) => void;
  onDelete: (child: Children) => void;
}

export interface DayAvailability {
  isAvailable: boolean;
  startTime: string | null; // Format: "HH:mm"
  endTime: string | null; // Format: "HH:mm"
}

export interface Availability {
  timeGap: number;
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export interface TutorReview {
  id: number;
  rating: number;
  review_content: string;
  // createAt: dateTime

  tutor_id: number;
  tutor: Tutor;
  parent_id: number;
  parent: Parent;
}

export interface CourseReview {
  id: number;
  rating: number;
  review_content: string;
  createAt: string;

  course_id: number;
  parent_id: number;

  course?: Course;
  parent?: Parent;
}

export interface Parent {
  id: number;
  preferred_language: string;
  notifications_enable: boolean;

  profile: {
    email: string;
    full_name: string;
    phone: string;
    username: string;
  };
  childrens?: Children[];
  tutorReviews?: TutorReview[];
  courseReviews?: CourseReview[];
}

export interface TutorReviews {
  tutor_id: number;
  tutor_name: string;
  average_rating: number;
  reviews: any;
}

export interface TeachingSession {
  id: number;
  google_meet_id?: string;
  startTime: string;
  endTime: string;
  status: string;
  topics_covered: string;
  homework_assigned: string;
  rating?: number;
  comment?: string;
  teaching_quality?: string;
  subscription_id: number;
  subscription?: {
    course?: Course;
  };
}

export interface Parent {
  id: number;
  preferred_language: string;
  notifications_enabled: boolean;
  childrens: Array[];
  profile: {
    email: string;
    full_name: string;
    phone: string;
  };
}

export interface Users {
  CreatedAt?: Date;
  DeletedAt?: Date;
  ID?: number;
  UpdatedAt?: Date;
  account_locked?: boolean;
  email?: string;
  full_name?: string;
  google_token?: string;
  is_verified?: boolean;
  password_changed_at?: string;
  phone?: string;
  picture?: string;
  role?: string;
  status?: string;
  username: string;
}

export interface Package {
  CreatedAt: Date;
  DeletedAt: Date;
  ID: number;
  UpdatedAt: Date;
  commission_rate: number;
  description: string;
  features: [];
  is_active: boolean;
  max_courses: number;
  name: string;
  price_annually: number;
  price_monthly: number;
}

export interface Subscription {
  billing_cycle: string;
  cancel_at_period_end: string;
  commission_rate: number;
  current_period_end: Date;
  current_period_start: Date;
  features: [];
  id: number;
  max_courses: number;
  plan_name: string;
  price: number;
  status: string;
  tutor_id: number;
}

export interface CourseSubcription {
  id: number;
  status: string;
  sessions_remaining: number;
  course_id: number;
  chidlren_id: number;

  course?: Course;
  children?: Children;
}
