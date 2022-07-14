import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DialogInput from 'react-native-dialog-input';
import {
  addCategoryAsync,
  restoreCategoriesAsync,
} from "../store/reducers/category";
import { useAppDispatch, useAppSelector } from "../store";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../navigators/RootNavigator';
import { restoreExpansesAsync } from "../store/reducers/expanse/expanseActions";
import FAButton from '../components/FAButton';
type DrawerScreenProps = NativeStackScreenProps<RootParamList, "List">;
const DrawerScreen = ({ navigation }: DrawerScreenProps) => {
  const categories = useAppSelector((state) => state.category.categories);
  const expenses = useAppSelector((state) => state.expanse.expanses);
  const dispatch = useAppDispatch();
  const [categoriName, setCategoriName] = useState("")
  const [isDialogVisible, setIsVisible] = useState(false)

  const mainMenuItems = useMemo((): ListProps["items"] => {
    return [
      {
        label: "All",
        onPress: () => {
          navigation.navigate("AllExpenses")
        },
        icon: <MaterialIcons name="all-inclusive" size={24} />,
        badge: expenses.length,
      },
      {
        label: "Default",
        onPress: () => {
          navigation.navigate("DefaultScreen");
        },
        icon: <MaterialIcons name="list" size={24} />,
        badge: expenses.filter((item) => !item.category).length,
      },
    ];
  }, [navigation, categories]);
  const categoryItems = useMemo(
    (): ListProps["items"] =>
      categories.map((category) => ({
        icon: <MaterialIcons name="list" size={24} />,
        label: category.name,
        onPress: () =>
          navigation.navigate("Category", {
            id: category.id,
          }),

        badge: expenses.filter((item) => item.category === category.id).length,

      })),
    [navigation, categories]
  );

  const onAddCategoryPress = useCallback(() => {
    setIsVisible(true)

  }, [categories]);
  useEffect(() => {
    dispatch(restoreCategoriesAsync());
    dispatch(restoreExpansesAsync());

  }, []);
  const onAddExpansePress = useCallback(() => {
    navigation.push("AddExpanse", {
      screen: "Index",
    });
  }, [navigation]);
  return (
    <>
      <DialogInput isDialogVisible={isDialogVisible}
        title={"New Category"}
        hintInput={"My Category"}
        submitInput={(inputText: string) => {
          dispatch(addCategoryAsync(inputText))
          setIsVisible(false)
          setCategoriName("")
        }}
        closeDialog={() => { setIsVisible(false) }}>
      </DialogInput>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView edges={["bottom"]}>
          <List items={mainMenuItems} />
          <List
            items={categoryItems}
            title="Categories"
            actionIcon={<MaterialIcons name="add" size={24} />}
            onActionPress={onAddCategoryPress}
          />

        </SafeAreaView>
      </ScrollView>
      <FAButton onPress={onAddExpansePress} />

    </>
  )
}

export default DrawerScreen;

export type ListProps = {
  title?: string;
  actionIcon?: ReactNode;
  onActionPress?: () => void;
  items: {
    label: string;
    badge?: number;
    onPress?: () => void;
    icon: ReactNode;
  }[];
};

const List = ({ title, items, actionIcon, onActionPress }: ListProps) => {
  return (
    <View style={{ marginVertical: 16 }}>
      {title && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#f1f1f1",
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              paddingVertical: 8,
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          {actionIcon && (
            <TouchableOpacity
              onPress={onActionPress}
              style={{ paddingVertical: 8 }}
            >
              {actionIcon}
            </TouchableOpacity>
          )}
        </View>
      )}
      {items.map((item, index) => (
        <ListItem
          key={index}
          onPress={item.onPress}
          label={item.label}
          icon={item.icon}

        />
      ))}
    </View>
  );
};

export type ListItemProps = {
  label: string;
  onPress?: () => void;
  icon: ReactNode;
  badge?: number;
};

const ListItem = ({ label, onPress, icon, badge }: ListItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        marginBottom: 1,
      }}
    >
      <View style={{ marginRight: 16, opacity: 0.5 }}>{icon}</View>
      <Text style={{ fontSize: 16, flex: 1 }} numberOfLines={1}>
        {label}
      </Text>
      {!!badge && (
        <Text style={{ fontSize: 14, paddingHorizontal: 8, opacity: 0.5 }}>
          {badge}
        </Text>
      )}
      <MaterialIcons name="chevron-right" size={24} style={{ opacity: 0.5 }} />
    </TouchableOpacity>
  );
};
