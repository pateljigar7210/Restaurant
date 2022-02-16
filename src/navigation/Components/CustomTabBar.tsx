import {StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Box, View, IconButton, IIconButtonProps, useTheme} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

const ICONS: any = {
  Home: <AntDesign name="home" size={20} />,
  Events: <SimpleLineIcons name="calendar" size={20} />,
  Groups: <SimpleLineIcons name="people" size={20} />,
  BusinessPages: <Ionicons name="md-business-outline" size={20} />,
};

function TabIcon(props: IIconButtonProps) {
  const theme = useTheme();

  return (
    <IconButton
      {...props}
      _pressed={{
        bg: 'danger.500',
        _icon: {
          color: theme.colors.white,
        },
      }}
    />
  );
}

function CustomTabBar(props: BottomTabBarProps) {
  const {state, descriptors, navigation} = props;

  const theme = useTheme();

  const tabItems = state.routes.map((route, index) => {
    const {options} = descriptors[route.key];

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.navigate({
          name: route.name,
          merge: true,
          params: route.params,
        });
      }
    };

    const onLongPress = () => {
      navigation.emit({type: 'tabLongPress', target: route.key});
    };

    return (
      <View key={route.key} style={styles.iconContainer}>
        {isFocused ? <View background="danger.500" style={styles.indicator} /> : null}
        <TabIcon
          p={3}
          key={route.key}
          icon={ICONS[route.name]}
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          borderRadius="full"
          onLongPress={onLongPress}
        />
      </View>
    );
  });

  const addPostTab = (
    <View py={1} key="NewPost" style={styles.iconContainer}>
      <TabIcon
        p={2}
        shadow={5}
        variant="solid"
        colorScheme="danger"
        _icon={{color: theme.colors.white}}
        icon={<MaterialCommunityIcons name="pencil" size={24} />}
        accessibilityRole="button"
        onPress={() => navigation.navigate('NewPost',{from:'home'})}
        borderRadius="full"
      />
    </View>
  );

  tabItems.splice(2, 0, addPostTab);

  return (
    <Box bg="#f6f4f3" safeAreaBottom shadow={5} px={5}>
      <View style={styles.container}>{tabItems}</View>
    </Box>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: -3,
    right: 0,
    left: 0,
    height: 3,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default CustomTabBar;
