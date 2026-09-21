import React, {useState} from 'react';
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
  CheckCircle2,
  Circle,
  CalendarDays,
  CarFront,
} from 'lucide-react-native';

const CancelBookingScreen = ({navigation, route}: any) => {
  const booking = route?.params?.booking || {};

  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    'Change of plans',
    'Found another car',
    'Price issue',
    'Wrong booking',
    'Travel plan cancelled',
    'Other',
  ];

  const handleCancel = () => {
    if (!selectedReason) {
      Alert.alert(
        'Select Reason',
        'Please select a cancellation reason.',
      );
      return;
    }

    navigation.navigate('CancellationConfirmation', {
      booking: booking,
      reason: selectedReason,
    });
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
          <ArrowLeft size={22} color="#222A2C" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Cancel Booking
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* BOOKING SUMMARY */}
        <View style={styles.bookingCard}>
          <View style={styles.carIcon}>
            <CarFront
              size={28}
              color="#222A2C"
            />
          </View>

          <View style={styles.bookingInfo}>
            <Text style={styles.carName}>
              {booking.car || 'Toyota Fortuner'}
            </Text>

            <Text style={styles.bookingId}>
              Booking ID: {booking.id || 'CAR-284631'}
            </Text>

            <View style={styles.dateRow}>
              <CalendarDays
                size={14}
                color="#777777"
              />

              <Text style={styles.dateText}>
                {booking.date || '20 Sep 2026'}
              </Text>
            </View>
          </View>
        </View>

        {/* REASON */}
        <View style={styles.card}>
          <Text style={styles.title}>
            Why are you cancelling?
          </Text>

          <Text style={styles.subtitle}>
            Please select a reason for cancellation.
          </Text>

          {reasons.map(reason => {
            const selected =
              selectedReason === reason;

            return (
              <TouchableOpacity
                key={reason}
                activeOpacity={0.8}
                style={styles.reasonRow}
                onPress={() =>
                  setSelectedReason(reason)
                }>

                {selected ? (
                  <CheckCircle2
                    size={21}
                    color="#222A2C"
                  />
                ) : (
                  <Circle
                    size={21}
                    color="#AAAAAA"
                  />
                )}

                <Text
                  style={[
                    styles.reasonText,
                    selected &&
                      styles.selectedReasonText,
                  ]}>
                  {reason}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* REFUND */}
        <View style={styles.refundCard}>
          <Text style={styles.refundTitle}>
            Refund Information
          </Text>

          <Text style={styles.refundText}>
            Your refund amount depends on the
            cancellation policy of your booking.
            Eligible refunds will be processed to
            your original payment method.
          </Text>
        </View>

        {/* CANCEL BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.cancelButton}
          onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>
            Confirm Cancellation
          </Text>
        </TouchableOpacity>

        {/* KEEP BOOKING */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.keepButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.keepButtonText}>
            Keep My Booking
          </Text>
        </TouchableOpacity>
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

  headerSpace: {
    width: 43,
    height: 43,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  carIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookingInfo: {
    flex: 1,
    marginLeft: 12,
  },

  carName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222222',
  },

  bookingId: {
    marginTop: 4,
    fontSize: 9,
    color: '#999999',
  },

  dateRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateText: {
    marginLeft: 6,
    fontSize: 10,
    color: '#666666',
  },

  card: {
    marginTop: 13,
    padding: 17,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 10,
    fontSize: 10,
    color: '#888888',
  },

  reasonRow: {
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },

  reasonText: {
    marginLeft: 11,
    fontSize: 12,
    color: '#444444',
  },

  selectedReasonText: {
    fontWeight: '700',
    color: '#222A2C',
  },

  refundCard: {
    marginTop: 13,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  refundTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#222222',
  },

  refundText: {
    marginTop: 7,
    fontSize: 10,
    lineHeight: 16,
    color: '#777777',
  },

  cancelButton: {
    height: 54,
    marginTop: 20,
    borderRadius: 27,
    backgroundColor: '#B3261E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  keepButton: {
    height: 52,
    marginTop: 10,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  keepButtonText: {
    color: '#222A2C',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default CancelBookingScreen;
