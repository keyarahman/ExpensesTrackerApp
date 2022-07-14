import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigators/RootNavigator"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FAButton from "../components/FAButton";
import { useAppSelector } from "../store";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ListHeaderCard from "../components/ListHeaderCard";
import ExpanseRow from "../components/ExpanseRow";


type CategoryScreenParams = NativeStackScreenProps<RootParamList, "Category">;

const CategoryScreen = ({
  navigation,
  route: {
    params: { id: categoryId },
  },
}: CategoryScreenParams) => {
  const category = useAppSelector((state) =>
    state.category.categories.find((cat) => cat.id === categoryId)
  );
  const { expanses } = useAppSelector(
    (state) => state.expanse
  );
  const categories = useAppSelector((state) => state.category.categories);


  const safeAreaInsets = useSafeAreaInsets();

  const onAddExpansePress = useCallback(() => {
    navigation.push("AddExpanse", {
      screen: "Index",
      params: {
        id: categoryId,
      },
    });
  }, [navigation, category]);





  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <FlatList
        data={expanses}
        contentContainerStyle={{
          paddingBottom: safeAreaInsets.bottom + 64 + 32,
        }}

        renderItem={({ item }) => <ExpanseRow hideCategory expanse={item} />}
      />
      <FAButton onPress={onAddExpansePress} />
    </View>
  );
};

export default CategoryScreen;
