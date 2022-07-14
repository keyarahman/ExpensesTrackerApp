import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FAButton from "../components/FAButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigators/RootNavigator";
import { useAppSelector } from "../store";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ExpanseRow from "../components/ExpanseRow";
import ListHeaderCard from "../components/ListHeaderCard";
import { sortAndFilterExpansesList } from "../utils";

type CategoryScreenParams = NativeStackScreenProps<RootParamList, "DefaultScreen">;

const DefaultExpensesScreen = ({ navigation }: CategoryScreenParams) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { expanses } = useAppSelector(
    (state) => state.expanse
  );

  const categories = useAppSelector((state) => state.category.categories);
  const expensesList = useMemo(() => expanses.filter((item) => !item.category), [expanses]);



  const onAddExpansePress = useCallback(() => {
    navigation.push("AddExpanse", {
      screen: "Index",
    });
  }, [navigation]);




  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <FlatList
        data={expensesList}
        contentContainerStyle={{
          paddingBottom: safeAreaInsets.bottom + 64 + 32,
        }}

        renderItem={({ item }) => <ExpanseRow hideCategory expanse={item} />}
      />
      <FAButton onPress={onAddExpansePress} />
    </View>
  );
};

export default DefaultExpensesScreen;
