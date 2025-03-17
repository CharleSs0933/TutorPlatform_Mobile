import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import chat from "@/assets/icons/chat.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";
import google from "@/assets/icons/google.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";

import onboarding1 from "@/assets/images/onboarding/1.png";
import onboarding2 from "@/assets/images/onboarding/2.png";
import onboarding3 from "@/assets/images/onboarding/3.png";
import hero1 from "@/assets/images/home/hero1.jpg";
import hero2 from "@/assets/images/home/hero2.jpg";
import hero3 from "@/assets/images/home/hero3.jpg";
import SignUp from "@/assets/images/sign-up.jpg";
import placeholder from "@/assets/images/placeholder.png";
import check from "@/assets/images/check.png";
import noResult from "@/assets/images/no-result.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  hero1,
  hero2,
  hero3,
  SignUp,
  placeholder,
  check,
  noResult,
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};

export const onboarding = [
  {
    id: 1,
    title: "Explore",
    secondTitle: "Our Community",
    description:
      "Find the perfect course to enhance your career prospects and skill set",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Set Your",
    secondTitle: "Own Goal",
    description:
      "Personalize your study plan with flexible timelines that suit you best",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Complete full",
    secondTitle: "Course",
    description:
      "Achieve certification by completing courses with dedicated effort",
    image: images.onboarding3,
  },
];

export const bannerData = [
  { image: images.hero1 },
  { image: images.hero2 },
  { image: images.hero3 },
];

export const courseSubjects = [
  { value: "all", label: "All" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "English", label: "English" },
  { value: "Science", label: "Science" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Art", label: "Art" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Music", label: "Music" },
];

export const FAQData = [
  {
    id: 1,
    question: "What age group is this platform suitable for?",
    answer:
      "Our platform is designed for children aged 5 to 15, with tailored courses for different age groups to ensure effective learning.",
  },
  {
    id: 2,
    question: "Are the lessons live or pre-recorded?",
    answer:
      "We offer both live interactive classes with tutors and pre-recorded lessons that kids can watch at their own pace.",
  },
  {
    id: 3,
    question: "How can parents track their child's progress?",
    answer:
      "Parents can monitor their child's progress through our dashboard, which provides detailed reports on lessons completed, quiz scores, and learning milestones.",
  },
  {
    id: 4,
    question: "What subjects are available on the platform?",
    answer:
      "We cover a wide range of subjects including Math, Science, English, Coding, Art, and more, all designed to be engaging and fun for kids.",
  },
  {
    id: 5,
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a free trial period so you can explore our platform and courses before making a commitment.",
  },
  {
    id: 6,
    question: "Do you provide certificates after course completion?",
    answer:
      "Yes! Kids receive certificates upon completing a course, which parents can download and share as a part of their child's achievements.",
  },
  {
    id: 7,
    question: "What if my child needs help during a lesson?",
    answer:
      "Our platform offers live tutor support, discussion forums, and a Q&A section where kids can ask questions and get quick assistance.",
  },
  {
    id: 8,
    question: "Can multiple children use the same account?",
    answer:
      "Each child should have their own account to track their individual progress, but parents can manage multiple accounts under one family dashboard.",
  },
  {
    id: 9,
    question: "What devices can be used to access the platform?",
    answer:
      "Our platform works on desktops, laptops, tablets, and mobile devices, making it easy for kids to learn from anywhere.",
  },
  {
    id: 10,
    question: "Is the content safe and kid-friendly?",
    answer:
      "Absolutely! All our courses are designed with child safety in mind, and we ensure that the learning environment is engaging, fun, and completely safe.",
  },
];
