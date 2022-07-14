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

  const expensesList = useMemo(() => expanses.filter((item) => item.category === categoryId), [expanses]);
  const safeAreaInsets = useSafeAreaInsets();
  const listHeaderComponent = useMemo(() => {
    let totalExpanses = 0;
    expensesList.forEach((expanse) => {
      totalExpanses = totalExpanses + expanse.amount;
    });
    return (
      <ListHeaderCard
        title={`Total ${category?.name} Expenses`}
        value={`৳${totalExpanses.toLocaleString()}`}
      />
    );
  }, [expensesList]);
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
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', height: "10%", padding: 10, backgroundColor: "white" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={{ fontSize: 14, fontWeight: "500", color: "black" }}>{`${category?.name} category`}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.push("FilterExpanses", {
              screen: "Index",
            })
          }
        >
          <MaterialIcons name="filter-list" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={expensesList}
        contentContainerStyle={{
          paddingBottom: safeAreaInsets.bottom + 64 + 32,
        }}
        ListHeaderComponent={listHeaderComponent}
        renderItem={({ item }) => <ExpanseRow hideCategory expanse={item} />}
      />
      <FAButton onPress={onAddExpansePress} />
    </View>
  );
};

export default CategoryScreen;
