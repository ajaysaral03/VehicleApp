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
  CheckCircle2,
  CarFront,
  CalendarDays,
  MapPin,
  Home,
  ClipboardList,
} from 'lucide-react-native';

const CancellationConfirmationScreen = ({
  navigation,
  route,
}: any) => {
  const booking = route?.params?.booking || {};
  const reason =
    route?.params?.reason || 'Change of plans';

  const bookingId =
    booking.id || 'CAR-284631';

  const carName =
    booking.car || 'Toyota Fortuner';

  const bookingDate =
    booking.date || '20 Sep 2026';

  const location =
    booking.location || 'Vijay Nagar, Indore';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F4F4"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* SUCCESS ICON */}
        <View style={styles.successCircle}>
          <CheckCircle2
            size={65}
            color="#222A2C"
          />
        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          Booking Cancelled
        </Text>

        <Text style={styles.subtitle}>
          Your booking has been successfully cancelled.
        </Text>

        {/* BOOKING ID */}
        <View style={styles.idCard}>
          <Text style={styles.idLabel}>
            Booking ID
          </Text>

          <Text style={styles.idValue}>
            {bookingId}
          </Text>
        </View>

        {/* BOOKING DETAILS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Cancelled Booking
          </Text>

          {/* CAR */}
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <CarFront
                size={21}
                color="#222A2C"
              />
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.label}>
                Car
              </Text>

              <Text style={styles.value}>
                {carName}
              </Text>
            </View>
          </View>

          {/* DATE */}
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <CalendarDays
                size={20}
                color="#222A2C"
              />
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.label}>
                Rental Date
              </Text>

              <Text style={styles.value}>
                {bookingDate}
              </Text>
            </View>
          </View>

          {/* LOCATION */}
          <View style={styles.detailRow}>
            <View style={styles.iconBox}>
              <MapPin
                size={20}
                color="#222A2C"
              />
            </View>

            <View style={styles.detailInfo}>
              <Text style={styles.label}>
                Pickup Location
              </Text>

              <Text
                style={styles.value}
                numberOfLines={2}>
                {location}
              </Text>
            </View>
          </View>

          {/* REASON */}
          <View style={styles.reasonBox}>
            <Text style={styles.reasonLabel}>
              Cancellation Reason
            </Text>

            <Text style={styles.reasonValue}>
              {reason}
            </Text>
          </View>
        </View>

        {/* REFUND CARD */}
        <View style={styles.refundCard}>
          <Text style={styles.refundTitle}>
            Refund Information
          </Text>

          <Text style={styles.refundAmount}>
            Refund will be processed
          </Text>

          <Text style={styles.refundText}>
            If your booking is eligible for a refund,
            the amount will be returned to your
            original payment method according to
            the cancellation policy.
          </Text>

          <View style={styles.refundStatus}>
            <CheckCircle2
              size={17}
              color="#222A2C"
            />

            <Text style={styles.refundStatusText}>
              Cancellation request completed
            </Text>
          </View>
        </View>

        {/* MY BOOKINGS */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.primaryButton}
          onPress={() =>
            navigation.navigate('MyBookings')
          }>
          <ClipboardList
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.primaryButtonText}>
            Go to My Bookings
          </Text>
        </TouchableOpacity>

        {/* HOME */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.secondaryButton}
          onPress={() =>
            navigation.navigate('Home')
          }>
          <Home
            size={19}
            color="#222A2C"
          />

          <Text style={styles.secondaryButtonText}>
            Back to Home
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Booking ID: {bookingId}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 45,
    alignItems: 'stretch',
  },

  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E9ECEB',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  title: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
  },

  subtitle: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 17,
    color: '#888888',
  },

  idCard: {
    marginTop: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },

  idLabel: {
    fontSize: 9,
    color: '#999999',
  },

  idValue: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '800',
    color: '#222A2C',
    letterSpacing: 0.5,
  },

  card: {
    marginTop: 13,
    padding: 17,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  sectionTitle: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
  },

  detailRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailInfo: {
    flex: 1,
    marginLeft: 11,
  },

  label: {
    fontSize: 9,
    color: '#999999',
  },

  value: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },

  reasonBox: {
    marginTop: 15,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  reasonLabel: {
    fontSize: 9,
    color: '#999999',
  },

  reasonValue: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },

  refundCard: {
    marginTop: 13,
    padding: 17,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  refundTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#222222',
  },

  refundAmount: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    color: '#222A2C',
  },

  refundText: {
    marginTop: 6,
    fontSize: 10,
    lineHeight: 16,
    color: '#777777',
  },

  refundStatus: {
    marginTop: 13,
    padding: 11,
    borderRadius: 10,
    backgroundColor: '#F0F1F1',
    flexDirection: 'row',
    alignItems: 'center',
  },

  refundStatusText: {
    marginLeft: 7,
    fontSize: 10,
    fontWeight: '600',
    color: '#333333',
  },

  primaryButton: {
    height: 54,
    marginTop: 20,
    borderRadius: 27,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  primaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  secondaryButton: {
    height: 52,
    marginTop: 10,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  secondaryButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222A2C',
  },

  footerText: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 9,
    color: '#AAAAAA',
  },
});

export default CancellationConfirmationScreen;
