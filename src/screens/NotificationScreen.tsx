import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import {
  Bell,
  ArrowLeft,
  CarFront,
  CheckCircle2,
  CalendarDays,
  Tag,
  XCircle,
} from 'lucide-react-native';

const NotificationScreen = ({navigation}: any) => {
  const notifications = [
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message:
        'Your Toyota Fortuner booking has been confirmed.',
      time: '10 min ago',
      icon: CheckCircle2,
    },
    {
      id: '2',
      type: 'driver',
      title: 'Driver Assigned',
      message:
        'Rahul Sharma has been assigned to your booking.',
      time: '25 min ago',
      icon: CarFront,
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Booking Reminder',
      message:
        'Your car booking is scheduled for tomorrow.',
      time: '2 hours ago',
      icon: CalendarDays,
    },
    {
      id: '4',
      type: 'offer',
      title: 'Special Offer',
      message:
        'Get up to 20% off on your next car booking.',
      time: 'Yesterday',
      icon: Tag,
    },
    {
      id: '5',
      type: 'cancel',
      title: 'Booking Update',
      message:
        'Your cancellation request has been processed.',
      time: '2 days ago',
      icon: XCircle,
    },
  ];

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

        <View style={styles.titleBox}>
          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <Text style={styles.headerSub}>
            Stay updated with your bookings
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Bell
            size={21}
            color="#222A2C"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* NOTIFICATION LIST */}
        {notifications.map(item => {
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={styles.notificationCard}>

              <View style={styles.iconCircle}>
                <Icon
                  size={21}
                  color="#222A2C"
                />
              </View>

              <View style={styles.notificationContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.notificationTitle}>
                    {item.title}
                  </Text>

                  {item.id === '1' && (
                    <View style={styles.newDot} />
                  )}
                </View>

                <Text
                  style={styles.notificationMessage}
                  numberOfLines={2}>
                  {item.message}
                </Text>

                <Text style={styles.notificationTime}>
                  {item.time}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* EMPTY BOTTOM */}
        <View style={styles.bottomMessage}>
          <Bell
            size={18}
            color="#999999"
          />

          <Text style={styles.bottomText}>
            You're all caught up
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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

  titleBox: {
    flex: 1,
    marginLeft: 13,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },

  headerSub: {
    marginTop: 3,
    fontSize: 9,
    color: '#999999',
  },

  headerIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  notificationCard: {
    marginBottom: 11,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 47,
    height: 47,
    borderRadius: 24,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    color: '#222222',
  },

  newDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#222A2C',
  },

  notificationMessage: {
    marginTop: 5,
    fontSize: 10,
    lineHeight: 15,
    color: '#777777',
  },

  notificationTime: {
    marginTop: 7,
    fontSize: 8,
    color: '#AAAAAA',
  },

  bottomMessage: {
    marginTop: 8,
    alignItems: 'center',
  },

  bottomText: {
    marginTop: 6,
    fontSize: 9,
    color: '#999999',
  },
});

export default NotificationScreen;