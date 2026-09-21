import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Home,
  Search,
  ClipboardList,
  Bell,
  UserRound,
} from 'lucide-react-native';

import {useNavigation} from '@react-navigation/native';

interface FooterProps {
  activeTab?:
    | 'home'
    | 'search'
    | 'bookings'
    | 'notification'
    | 'profile';
}

const Footer = ({
  activeTab = 'home',
}: FooterProps) => {
  const navigation = useNavigation<any>();

  const tabs = [
    {
      name: 'home' as const,
      screen: 'Home',
      icon: Home,
    },
    {
      name: 'search' as const,
      screen: 'Search',
      icon: Search,
    },
    {
      name: 'bookings' as const,
      screen: 'MyBookings',
      icon: ClipboardList,
    },
    {
      name: 'notification' as const,
      screen: 'Notification',
      icon: Bell,
    },
    {
      name: 'profile' as const,
      screen: 'Profile',
      icon: UserRound,
    },
  ];

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.bottomNav}>
      {tabs.map(tab => {
        const isActive =
          activeTab === tab.name;

        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.75}
            style={[
              styles.bottomIcon,
              isActive &&
                styles.activeBottomIcon,
            ]}
            onPress={() =>
              handleNavigation(tab.screen)
            }>
            <Icon
              size={22}
              strokeWidth={2.2}
              color={
                isActive
                  ? '#FFFFFF'
                  : '#9A9FA0'
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 15,
    left: 18,
    right: 18,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222A2C',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    elevation: 10,

    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  bottomIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,

    alignItems: 'center',
    justifyContent: 'center',
  },

  activeBottomIcon: {
    backgroundColor: '#3A4547',
  },
});

export default Footer;