import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import useUser from "@/hooks/useUser";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
  });
  const { register } = useUser();

  const onSignUpPress = async () => {
    try {
      await register({
        username: form.username,
        password: form.password,
        full_name: form.full_name,
        email: form.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.SignUp} className="z-0 w-full h-[250px] " />
          <Text className=" absolute bottom-5 left-5 text-2xl text-black font-PoppinsSemiBold bg-white rounded-xl px-0.5">
            Create your account
          </Text>
        </View>

        <View className="p-5 ">
          <InputField
            label="Full Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.full_name}
            onChangeText={(value) => setForm({ ...form, full_name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="User Name"
            placeholder="Enter your username"
            icon={icons.person}
            value={form.username}
            onChangeText={(value) => setForm({ ...form, username: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
