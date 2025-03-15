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
