import React, {useEffect, useMemo, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Copy,
  MapPin,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const DEMO_BOOKING = {
  bookingId: 'CAR-45872136',
  name: 'Ajay Saral',
  mobile: '',
  email: '',
  location: 'Vijay Nagar, Indore, Madhya Pradesh',
  pickupDate: '2026-09-20T10:00:00',
  returnDate: '2026-09-22T10:00:00',
  totalPrice: 3200,
  driver: false,
  paymentMethod: 'UPI',
  paymentStatus: 'Paid',
  paymentId: 'pay_demo_45872136',
  status: 'Confirmed',
  car: {
    brand: 'Toyota',
    name: 'Toyota Fortuner',
    seats: '7 Seats',
    transmission: 'Automatic',
    fuelType: 'Diesel',
  },
};

const BookingConfirmationScreen = ({navigation, route}: any) => {
  const params = route?.params || {};

  // Real booking data has priority. Demo data is only used if this screen
  // is opened without booking parameters.
  const booking = useMemo(
    () => ({
      ...DEMO_BOOKING,
      ...params,
      car: {
        ...DEMO_BOOKING.car,
        ...(params.car || {}),
      },
    }),
    [params],
  );

  const [showSuccessAlert, setShowSuccessAlert] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShowSuccessAlert(true);
  }, [booking.bookingId]);

  const formatDate = (value?: string) => {
    if (!value) return '—';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (value?: string) => {
    if (!value) return '—';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (value: any) => {
    const amount = Number(value || 0);
    return `₹${Number.isFinite(amount) ? amount.toLocaleString('en-IN') : '0'}`;
  };

  const bookingId =
    booking.bookingId || `CAR-${Date.now().toString().slice(-8)}`;

  const paymentStatus =
    booking.paymentStatus || 'Payment Pending';

  const isPaid =
    String(paymentStatus).toLowerCase() === 'paid';

  const copyBookingId = () => {
    Clipboard.setString(bookingId);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  const copyPaymentId = () => {
    if (!booking.paymentId) return;

    Clipboard.setString(String(booking.paymentId));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F6" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={21} color="#172022" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Booking Confirmation</Text>
          <Text style={styles.headerSubtitle}>
            Your reservation details
          </Text>
        </View>

        <View style={styles.headerButton}>
          <ShieldCheck size={19} color="#172022" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* PROGRESS */}
        <View style={styles.progress}>
          <View style={styles.progressItem}>
            <View style={styles.progressDone}>
              <Check size={11} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={styles.progressText}>Booking</Text>
          </View>

          <View style={styles.progressLine} />

          <View style={styles.progressItem}>
            <View style={styles.progressDone}>
              <Check size={11} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={styles.progressText}>Payment</Text>
          </View>

          <View style={styles.progressLine} />

          <View style={styles.progressItem}>
            <View style={styles.progressCurrent}>
              <View style={styles.progressDot} />
            </View>
            <Text style={styles.progressCurrentText}>Confirmed</Text>
          </View>
        </View>

        {/* SUCCESS CARD */}
        <View style={styles.successCard}>
          <View style={styles.successCircle}>
            <CheckCircle2 size={39} color="#FFFFFF" strokeWidth={2.3} />
          </View>

          <View style={styles.successBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.successBadgeText}>
              {isPaid ? 'PAYMENT SUCCESSFUL' : paymentStatus.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.successTitle}>
            Booking Confirmed
          </Text>

          <Text style={styles.successDescription}>
            Your vehicle booking has been saved successfully.
            Keep your booking ID for future reference.
          </Text>

          <TouchableOpacity
            style={styles.bookingIdBox}
            activeOpacity={0.85}
            onPress={copyBookingId}>
            <View>
              <Text style={styles.bookingIdLabel}>
                BOOKING ID
              </Text>
              <Text style={styles.bookingId}>
                {bookingId}
              </Text>
            </View>

            <Copy size={17} color="#596164" />
          </TouchableOpacity>

          {copied && (
            <Text style={styles.copiedText}>
              Copied to clipboard
            </Text>
          )}
        </View>

        {/* VEHICLE */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardEyebrow}>YOUR VEHICLE</Text>
              <Text style={styles.cardTitle}>
                Vehicle Details
              </Text>
            </View>

            <View style={styles.vehicleTag}>
              <CarFront size={14} color="#222A2C" />
              <Text style={styles.vehicleTagText}>
                Reserved
              </Text>
            </View>
          </View>

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <CarFront size={29} color="#222A2C" />
            </View>

            <View style={styles.vehicleContent}>
              <Text style={styles.vehicleBrand}>
                {booking.car?.brand || 'Vehicle'}
              </Text>

              <Text style={styles.vehicleName}>
                {booking.car?.name || 'Vehicle'}
              </Text>

              <Text style={styles.vehicleSpecs}>
                {booking.car?.seats || '5 Seats'} •{' '}
                {booking.car?.transmission || 'Automatic'} •{' '}
                {booking.car?.fuelType || 'Petrol'}
              </Text>
            </View>
          </View>
        </View>

        {/* BOOKING DETAILS */}
        <View style={styles.card}>
          <Text style={styles.cardEyebrow}>RESERVATION</Text>
          <Text style={styles.cardTitle}>
            Booking Details
          </Text>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <UserRound size={17} color="#525B5E" />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.label}>Customer</Text>
              <Text style={styles.value}>
                {booking.name || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <MapPin size={17} color="#525B5E" />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.label}>Pickup Location</Text>
              <Text style={styles.value}>
                {booking.location || '—'}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <CalendarDays size={17} color="#525B5E" />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.label}>Rental Period</Text>
              <Text style={styles.value}>
                {formatDate(booking.pickupDate)} →{' '}
                {formatDate(booking.returnDate)}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <CarFront size={17} color="#525B5E" />
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.label}>Drive Type</Text>
              <Text style={styles.value}>
                {booking.driver ? 'With Driver' : 'Self Drive'}
              </Text>
            </View>
          </View>
        </View>

        {/* PAYMENT */}
        <View style={styles.paymentCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardEyebrow}>TRANSACTION</Text>
              <Text style={styles.cardTitle}>
                Payment Details
              </Text>
            </View>

            <View
              style={[
                styles.paidBadge,
                !isPaid && styles.pendingBadge,
              ]}>
              <CheckCircle2
                size={14}
                color={isPaid ? '#137333' : '#8A6500'}
              />
              <Text
                style={[
                  styles.paidText,
                  !isPaid && styles.pendingText,
                ]}>
                {paymentStatus}
              </Text>
            </View>
          </View>

          <View style={styles.paymentMethodRow}>
            <View style={styles.paymentIcon}>
              <CreditCard size={20} color="#222A2C" />
            </View>

            <View style={styles.paymentMethodContent}>
              <Text style={styles.label}>
                Payment Method
              </Text>
              <Text style={styles.value}>
                {booking.paymentMethod || '—'}
              </Text>
            </View>
          </View>

          {booking.paymentId ? (
            <TouchableOpacity
              style={styles.paymentIdBox}
              activeOpacity={0.8}
              onPress={copyPaymentId}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>
                  Razorpay Payment ID
                </Text>
                <Text style={styles.paymentId}>
                  {booking.paymentId}
                </Text>
              </View>

              <Copy size={16} color="#646C6E" />
            </TouchableOpacity>
          ) : null}

          <View style={styles.transactionTime}>
            <Text style={styles.label}>
              Booking Created
            </Text>
            <Text style={styles.timeText}>
              {formatDateTime(booking.createdAt)}
            </Text>
          </View>
        </View>

        {/* TOTAL */}
        <View style={styles.totalCard}>
          <View>
            <Text style={styles.totalSmall}>
              TOTAL PAID
            </Text>
            <Text style={styles.totalText}>
              {formatPrice(booking.totalPrice)}
            </Text>
          </View>

          <View style={styles.totalCheck}>
            <Check size={19} color="#FFFFFF" strokeWidth={3} />
          </View>
        </View>

        {/* ACTION */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.primaryButton}
          onPress={() => navigation.navigate('MyBookings')}>
          <Text style={styles.primaryButtonText}>
            View My Bookings
          </Text>
          <ChevronRight size={19} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeButtonText}>
            Back to Home
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Please keep your booking ID and payment ID for future reference.
        </Text>
      </ScrollView>

      {/* SWEET ALERT STYLE SUCCESS MODAL */}
      <Modal
        visible={showSuccessAlert}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessAlert(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.alertCard}>
            <TouchableOpacity
              style={styles.alertClose}
              onPress={() => setShowSuccessAlert(false)}>
              <X size={17} color="#596164" />
            </TouchableOpacity>

            <View style={styles.alertSuccessIcon}>
              <Check size={35} color="#FFFFFF" strokeWidth={3} />
            </View>

            <Text style={styles.alertTitle}>
              Payment Successful!
            </Text>

            <Text style={styles.alertMessage}>
              Your booking has been confirmed and saved successfully.
            </Text>

            <View style={styles.alertAmountBox}>
              <Text style={styles.alertAmountLabel}>
                AMOUNT PAID
              </Text>
              <Text style={styles.alertAmount}>
                {formatPrice(booking.totalPrice)}
              </Text>
            </View>

            <View style={styles.alertBookingRow}>
              <Text style={styles.alertBookingLabel}>
                Booking ID
              </Text>
              <Text style={styles.alertBookingValue}>
                {bookingId}
              </Text>
            </View>

            {booking.paymentId ? (
              <View style={styles.alertBookingRow}>
                <Text style={styles.alertBookingLabel}>
                  Payment ID
                </Text>
                <Text
                  style={styles.alertBookingValue}
                  numberOfLines={1}>
                  {booking.paymentId}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.alertButton}
              activeOpacity={0.9}
              onPress={() => setShowSuccessAlert(false)}>
              <Text style={styles.alertButtonText}>
                Continue
              </Text>
              <ChevronRight size={17} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F6',
  },

  header: {
    minHeight: 100,
    marginTop:20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5E6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#172022',
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 9,
    color: '#8A9294',
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 45,
  },

  progress: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  progressItem: {
    width: 70,
    alignItems: 'center',
  },

  progressDone: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressCurrent: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },

  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#222A2C',
    marginTop: 8,
  },

  progressText: {
    marginTop: 7,
    fontSize: 8,
    fontWeight: '700',
    color: '#7B8385',
    textAlign: 'center',
  },

  progressCurrentText: {
    marginTop: 7,
    fontSize: 8,
    fontWeight: '900',
    color: '#172022',
    textAlign: 'center',
  },

  successCard: {
    marginTop: 4,
    padding: 21,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5E6',
    alignItems: 'center',
    elevation: 2,
  },

  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successBadge: {
    marginTop: 13,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#EAF7ED',
    flexDirection: 'row',
    alignItems: 'center',
  },

  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#137333',
    marginRight: 5,
  },

  successBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#137333',
    letterSpacing: 0.4,
  },

  successTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '900',
    color: '#172022',
  },

  successDescription: {
    marginTop: 7,
    fontSize: 10,
    lineHeight: 16,
    color: '#7E8789',
    textAlign: 'center',
  },

  bookingIdBox: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: '#F1F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bookingIdLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#92999B',
  },

  bookingId: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: '900',
    color: '#222A2C',
  },

  copiedText: {
    marginTop: 6,
    fontSize: 9,
    color: '#137333',
    fontWeight: '700',
  },

  card: {
    marginTop: 13,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5E6',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardEyebrow: {
    fontSize: 8,
    fontWeight: '900',
    color: '#969D9F',
    letterSpacing: 0.8,
  },

  cardTitle: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: '900',
    color: '#172022',
  },

  vehicleTag: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#F0F2F2',
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleTagText: {
    marginLeft: 4,
    fontSize: 8,
    fontWeight: '800',
    color: '#3F484A',
  },

  vehicleRow: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F0F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleContent: {
    flex: 1,
    marginLeft: 12,
  },

  vehicleBrand: {
    fontSize: 9,
    color: '#92999B',
  },

  vehicleName: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: '900',
    color: '#172022',
  },

  vehicleSpecs: {
    marginTop: 4,
    fontSize: 9,
    color: '#70797B',
  },

  detailRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F1F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailContent: {
    flex: 1,
    marginLeft: 10,
  },

  label: {
    fontSize: 8,
    color: '#92999B',
  },

  value: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '700',
    color: '#343D3F',
  },

  paymentCard: {
    marginTop: 13,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E5E6',
  },

  paidBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: '#EAF7ED',
    flexDirection: 'row',
    alignItems: 'center',
  },

  pendingBadge: {
    backgroundColor: '#FFF4D7',
  },

  paidText: {
    marginLeft: 4,
    fontSize: 8,
    fontWeight: '900',
    color: '#137333',
  },

  pendingText: {
    color: '#8A6500',
  },

  paymentMethodRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#F0F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentMethodContent: {
    marginLeft: 10,
  },

  paymentIdBox: {
    marginTop: 13,
    padding: 11,
    borderRadius: 12,
    backgroundColor: '#F4F6F6',
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentId: {
    marginTop: 3,
    fontSize: 9,
    fontWeight: '700',
    color: '#3F484A',
  },

  transactionTime: {
    marginTop: 12,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F0',
  },

  timeText: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '700',
    color: '#4B5557',
  },

  totalCard: {
    marginTop: 13,
    padding: 17,
    borderRadius: 19,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalSmall: {
    fontSize: 8,
    fontWeight: '800',
    color: '#AEB5B6',
    letterSpacing: 0.7,
  },

  totalText: {
    marginTop: 4,
    fontSize: 25,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  totalCheck: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#3A4244',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButton: {
    height: 55,
    marginTop: 17,
    borderRadius: 17,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    marginRight: 5,
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  homeButton: {
    height: 50,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE1E2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#30393B',
  },

  footerNote: {
    marginTop: 11,
    fontSize: 9,
    lineHeight: 14,
    color: '#90989A',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 16, 17, 0.62)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  alertCard: {
    width: '100%',
    padding: 23,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 10,
  },

  alertClose: {
    position: 'absolute',
    right: 13,
    top: 13,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#F1F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertSuccessIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertTitle: {
    marginTop: 15,
    fontSize: 21,
    fontWeight: '900',
    color: '#172022',
  },

  alertMessage: {
    marginTop: 7,
    paddingHorizontal: 10,
    fontSize: 10,
    lineHeight: 16,
    color: '#7E8789',
    textAlign: 'center',
  },

  alertAmountBox: {
    width: '100%',
    marginTop: 16,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#F2F4F4',
    alignItems: 'center',
  },

  alertAmountLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#92999B',
  },

  alertAmount: {
    marginTop: 3,
    fontSize: 25,
    fontWeight: '900',
    color: '#222A2C',
  },

  alertBookingRow: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  alertBookingLabel: {
    fontSize: 9,
    color: '#92999B',
  },

  alertBookingValue: {
    maxWidth: '65%',
    fontSize: 9,
    fontWeight: '800',
    color: '#343D3F',
    textAlign: 'right',
  },

  alertButton: {
    width: '100%',
    height: 50,
    marginTop: 18,
    borderRadius: 15,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertButtonText: {
    marginRight: 5,
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});

export default BookingConfirmationScreen;
