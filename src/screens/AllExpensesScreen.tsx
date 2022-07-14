import { View, TouchableOpacity, FlatList, Text } from "react-native";
import React, { useCallback, useLayoutEffect, useMemo } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import FAButton from "../components/FAButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../navigators/RootNavigator";
import { useAppSelector } from "../store";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ExpanseRow from "../components/ExpanseRow";
import ListHeaderCard from "../components/ListHeaderCard";
import { sortAndFilterExpansesList } from "../utils";

type AllExpansesScreenProps = NativeStackScreenProps<
  RootParamList,
  "AllExpenses"
>;

const AllExpansesScreen = ({ navigation,
}: AllExpansesScreenProps) => {
  const safeAreaInsets = useSafeAreaInsets();
  const { expanses, filterBy, sortBy, orderBy } = useAppSelector(
    (state) => state.expanse
  );

  const categories = useAppSelector((state) => state.category.categories);

  const filteredExpanses = useMemo(
    () =>
      sortAndFilterExpansesList({
        expanses,
        filterBy,
        sortBy,
        orderBy,
        categories,
      }),
    [expanses, filterBy, sortBy, orderBy, categories]
  );

  const onAddExpansePress = useCallback(() => {
    navigation.push("AddExpanse", {
      screen: "Index",
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.push("FilterExpanses", {
              screen: "Index",
            })
          }
        >
          <MaterialIcons name="filter-list" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const listHeaderComponent = useMemo(() => {
    let totalExpanses = 0;
    filteredExpanses.forEach((expanse) => {
      totalExpanses = totalExpanses + expanse.amount;
    });
    return (
      <ListHeaderCard
        title={`Total Expenses`}
        value={`৳${totalExpanses.toLocaleString()}`}
      />
    );
  }, [filteredExpanses]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center', height: "7%", padding: 10, backgroundColor: "white", borderWidth: .3 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <MaterialIcons name="arrow-back" size={24} />
        </TouchableOpacity>

        <Text style={{ fontSize: 14, fontWeight: "700", }}> ALl Expenses</Text>
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
        data={filteredExpanses}
        contentContainerStyle={{
          paddingBottom: safeAreaInsets.bottom + 64 + 32,
        }}
        ListHeaderComponent={listHeaderComponent}
        renderItem={({ item }) => <ExpanseRow expanse={item} />}
      />
      <FAButton onPress={onAddExpansePress} />
    </SafeAreaView>
  );
};

export default AllExpansesScreen;
