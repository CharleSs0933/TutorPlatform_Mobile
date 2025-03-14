import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import useUser from "@/hooks/useUser";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { login } = useUser();

  const onSignInPress = async () => {
    try {
      await login({ username: form.username, password: form.password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.SignUp} className="z-0 w-full h-[250px]" />
          <Text className=" absolute bottom-5  left-5 text-2xl text-black font-PoppinsSemiBold bg-white rounded-xl px-0.5 ">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5 ">
          <InputField
            label="Username"
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
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <Link
            href="/(auth)/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
