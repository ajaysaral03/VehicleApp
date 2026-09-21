import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import {
  ArrowLeft,
  UserRound,
  ChevronRight,
  ClipboardList,
  Bell,
  HelpCircle,
  FileText,
  ShieldCheck,
  LogOut,
  Settings,
  Pencil,
} from 'lucide-react-native';

const ProfileScreen = ({navigation}: any) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F4F4"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <ArrowLeft
            size={22}
            color="#222A2C"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Profile
        </Text>

        <TouchableOpacity
          style={styles.settingsButton}
          activeOpacity={0.8}>
          <Settings
            size={20}
            color="#222A2C"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <UserRound
              size={42}
              color="#222A2C"
            />

            <TouchableOpacity
              style={styles.editIcon}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('EditProfile')
              }>
              <Pencil
                size={13}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>
              Ajay Saral
            </Text>

            <Text style={styles.userEmail}>
              ajay@example.com
            </Text>

            <Text style={styles.userPhone}>
              +91 98765 43210
            </Text>
          </View>
        </View>

        {/* EDIT PROFILE */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.editProfileButton}
          onPress={() =>
            navigation.navigate('EditProfile')
          }>
          <Pencil
            size={17}
            color="#FFFFFF"
          />

          <Text style={styles.editProfileText}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        {/* ACCOUNT */}
        <Text style={styles.groupTitle}>
          My Account
        </Text>

        <View style={styles.menuCard}>
          <MenuItem
            icon={ClipboardList}
            title="My Bookings"
            subtitle="View your booking history"
            onPress={() =>
              navigation.navigate('MyBookings')
            }
          />

          <MenuItem
            icon={Bell}
            title="Notifications"
            subtitle="Manage your notifications"
            onPress={() =>
              navigation.navigate('Notification')
            }
          />
        </View>

        {/* SUPPORT */}
        <Text style={styles.groupTitle}>
          Support
        </Text>

        <View style={styles.menuCard}>
          <MenuItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help with your booking"
            onPress={() =>
              navigation.navigate('HelpSupport')
            }
          />

          <MenuItem
            icon={FileText}
            title="Terms & Conditions"
            subtitle="Read our terms and conditions"
            onPress={() =>
              navigation.navigate('Terms')
            }
          />

          <MenuItem
            icon={ShieldCheck}
            title="Privacy Policy"
            subtitle="Learn how we protect your data"
            onPress={() =>
              navigation.navigate('PrivacyPolicy')
            }
          />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutButton}
          onPress={handleLogout}>
          <LogOut
            size={19}
            color="#B3261E"
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>

        <Text style={styles.version}>
          VehicleApp v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({
  icon: Icon,
  title,
  subtitle,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.menuItem}
      onPress={onPress}>

      <View style={styles.menuIcon}>
        <Icon
          size={20}
          color="#222A2C"
        />
      </View>

      <View style={styles.menuInfo}>
        <Text style={styles.menuTitle}>
          {title}
        </Text>

        <Text style={styles.menuSubtitle}>
          {subtitle}
        </Text>
      </View>

      <ChevronRight
        size={19}
        color="#999999"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
  },

  header: {
    height: 100,
    marginTop:20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingsButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  profileCard: {
    padding: 18,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  editIcon: {
    position: 'absolute',
    right: -2,
    bottom: 0,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },

  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222222',
  },

  userEmail: {
    marginTop: 5,
    fontSize: 10,
    color: '#777777',
  },

  userPhone: {
    marginTop: 4,
    fontSize: 10,
    color: '#999999',
  },

  editProfileButton: {
    height: 50,
    marginTop: 12,
    borderRadius: 25,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  editProfileText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  groupTitle: {
    marginTop: 22,
    marginBottom: 9,
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '800',
    color: '#555555',
  },

  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },

  menuItem: {
    minHeight: 70,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuInfo: {
    flex: 1,
    marginLeft: 11,
  },

  menuTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#222222',
  },

  menuSubtitle: {
    marginTop: 4,
    fontSize: 9,
    color: '#999999',
  },

  logoutButton: {
    height: 52,
    marginTop: 22,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0B8B5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B3261E',
  },

  version: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 9,
    color: '#AAAAAA',
  },
});

export default ProfileScreen;