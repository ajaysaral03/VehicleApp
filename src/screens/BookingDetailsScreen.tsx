import React, {useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Modal,
} from 'react-native';

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  CarFront,
  UserRound,
  CreditCard,
  XCircle,
  Phone,
  Navigation,
  Clock3,
  CheckCircle2,
  Check,
  X,
  Bike,
  Fuel,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react-native';

import {Booking} from './bookingData';

const BookingDetailsScreen = ({
  navigation,
  route,
}: any) => {
  const booking: Booking = route?.params?.booking;

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  const [showCallModal, setShowCallModal] =
    useState(false);

  const [showSuccessModal, setShowSuccessModal] =
    useState(false);

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>

          <View style={styles.errorIcon}>
            <CarFront
              size={32}
              color="#222"
            />
          </View>

          <Text style={styles.errorTitle}>
            Booking Not Found
          </Text>

          <Text style={styles.errorText}>
            We could not find the booking details.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate('MyBookings')
            }>

            <Text style={styles.primaryButtonText}>
              Go to My Bookings
            </Text>

          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

  /* =====================================================
     HELPERS
  ===================================================== */

  const formatINR = (amount: any) => {
    const numericAmount =
      Number(amount) || 0;

    return `₹${numericAmount.toLocaleString(
      'en-IN',
    )}`;
  };

  const getVehicleType = () => {
    const type =
      (booking as any)?.vehicleType ||
      (booking as any)?.type ||
      '';

    const value = String(type).toLowerCase();

    if (
      value.includes('bike') ||
      value.includes('scooter')
    ) {
      return 'Bike';
    }

    if (
      value.includes('auto') ||
      value.includes('rickshaw')
    ) {
      return 'Auto';
    }

    return 'Car';
  };

  const vehicleType = getVehicleType();

  const getVehicleImage = () => {
    const customImage =
      (booking as any)?.image ||
      (booking as any)?.vehicleImage ||
      (booking as any)?.carImage;

    if (customImage) {
      return customImage;
    }

    if (vehicleType === 'Bike') {
      return 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80';
    }

    if (vehicleType === 'Auto') {
      return 'https://images.unsplash.com/photo-1620210796895-2a7b9e0e7f2d?auto=format&fit=crop&w=1000&q=80';
    }

    return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80';
  };

  const vehicleImage =
    getVehicleImage();

  const getVehicleIcon = () => {
    if (vehicleType === 'Bike') {
      return (
        <Bike
          size={28}
          color="#222"
        />
      );
    }

    if (vehicleType === 'Auto') {
      return (
        <Text style={styles.autoIcon}>
          🛺
        </Text>
      );
    }

    return (
      <CarFront
        size={28}
        color="#222"
      />
    );
  };

  const pricePerDay =
    Number(
      (booking as any)?.pricePerDay,
    ) || 0;

  const totalAmount =
    Number(
      (booking as any)?.totalAmount,
    ) ||
    pricePerDay *
      (Number(booking.duration) || 1);

  /* =====================================================
     ACTIONS
  ===================================================== */

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const confirmCancelBooking = () => {
    setShowCancelModal(false);

    setTimeout(() => {
      navigation.navigate('CancelBooking', {
        booking,
      });
    }, 200);
  };

  const handleDriverDetails = () => {
    navigation.navigate('DriverDetails', {
      booking,
    });
  };

  const handleTracking = () => {
    navigation.navigate('LiveTracking', {
      booking,
    });
  };

  const handleCallDriver = () => {
    setShowCallModal(true);
  };

  const confirmCallDriver = () => {
    setShowCallModal(false);

    /*
      Keep your existing call implementation here
      if you already have one.

      Currently this popup simply confirms
      the driver number.
    */
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F6F7F9"
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.goBack()
          }>

          <ArrowLeft
            size={21}
            color="#222"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Booking Details
        </Text>

        <View style={styles.headerSpace} />

      </View>

      {/* =================================================
          CONTENT
      ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }>

        {/* =================================================
            STATUS
        ================================================= */}

        <View style={styles.statusCard}>

          <View style={styles.statusIcon}>
            <CheckCircle2
              size={27}
              color="#FFF"
            />
          </View>

          <View style={styles.statusContent}>

            <Text style={styles.statusTitle}>
              {booking.status}
            </Text>

            <Text style={styles.bookingId}>
              Booking ID: {booking.id}
            </Text>

          </View>

          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>
              Active
            </Text>
          </View>

        </View>

        {/* =================================================
            VEHICLE CARD
        ================================================= */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Text style={styles.sectionTitle}>
              Vehicle Details
            </Text>

            <View style={styles.vehicleTypeBadge}>
              <Text
                style={
                  styles.vehicleTypeBadgeText
                }>
                {vehicleType}
              </Text>
            </View>

          </View>

          <View style={styles.vehicleImageWrapper}>

            <Image
              source={{
                uri: vehicleImage,
              }}
              style={styles.vehicleImage}
              resizeMode="cover"
            />

          </View>

          <View style={styles.carRow}>

            <View style={styles.carIcon}>
              {getVehicleIcon()}
            </View>

            <View style={styles.carInfo}>

              <Text
                style={styles.carName}
                numberOfLines={1}>

                {booking.car}

              </Text>

              <Text style={styles.carSubtitle}>
                {vehicleType === 'Bike'
                  ? 'Two Wheeler Rental'
                  : vehicleType === 'Auto'
                  ? 'Auto Rickshaw'
                  : 'Premium Rental Car'}
              </Text>

              <Text style={styles.carSpecs}>

                {booking.duration}{' '}

                {booking.duration === 1
                  ? 'Day'
                  : 'Days'}

                {' • '}

                {booking.driver
                  ? 'With Driver'
                  : 'Self Drive'}

              </Text>

            </View>

          </View>

        </View>

        {/* =================================================
            RENTAL DETAILS
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Rental Details
          </Text>

          <InfoRow
            icon={
              <CalendarDays
                size={19}
                color="#333"
              />
            }
            label="Pickup Date"
            value={booking.pickupDate}
          />

          <InfoRow
            icon={
              <Clock3
                size={19}
                color="#333"
              />
            }
            label="Pickup Time"
            value={booking.pickupTime}
          />

          <InfoRow
            icon={
              <CalendarDays
                size={19}
                color="#333"
              />
            }
            label="Return Date"
            value={booking.returnDate}
          />

          <InfoRow
            icon={
              <Clock3
                size={19}
                color="#333"
              />
            }
            label="Return Time"
            value={booking.returnTime}
          />

          <InfoRow
            icon={
              <MapPin
                size={19}
                color="#333"
              />
            }
            label="Pickup Location"
            value={booking.location}
            multiline
          />

          <InfoRow
            icon={
              <CarFront
                size={19}
                color="#333"
              />
            }
            label="Drive Type"
            value={
              booking.driver
                ? 'With Driver'
                : 'Self Drive'
            }
          />

        </View>

        {/* =================================================
            INDIA LOCATION CARD
        ================================================= */}

        <View style={styles.locationCard}>

          <View style={styles.locationIcon}>
            <MapPin
              size={22}
              color="#FFF"
            />
          </View>

          <View style={styles.locationContent}>

            <Text style={styles.locationTitle}>
              Pickup Location
            </Text>

            <Text
              style={styles.locationValue}
              numberOfLines={2}>

              {booking.location ||
                'Vijay Nagar, Indore'}

            </Text>

            <Text style={styles.locationSub}>
              India • Local Pickup Available
            </Text>

          </View>

          <ChevronRight
            size={19}
            color="#888"
          />

        </View>

        {/* =================================================
            DRIVER
        ================================================= */}

        {booking.driver && (
          <View style={styles.card}>

            <View style={styles.driverHeader}>

              <Text style={styles.sectionTitle}>
                Driver Details
              </Text>

              <View style={styles.driverBadge}>

                <Check
                  size={11}
                  color="#222"
                />

                <Text
                  style={
                    styles.driverBadgeText
                  }>
                  Assigned
                </Text>

              </View>

            </View>

            <View style={styles.driverRow}>

              <View style={styles.driverAvatar}>

                <UserRound
                  size={25}
                  color="#222"
                />

              </View>

              <View style={styles.driverInfo}>

                <Text
                  style={styles.driverName}>
                  {booking.driverName ||
                    'Driver Assigned'}
                </Text>

                <Text
                  style={styles.driverRating}>
                  ★{' '}
                  {booking.driverRating ||
                    4.8}{' '}
                  Rating
                </Text>

              </View>

            </View>

            <View style={styles.driverButtons}>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.smallButton}
                onPress={handleCallDriver}>

                <Phone
                  size={17}
                  color="#FFF"
                />

                <Text
                  style={
                    styles.smallButtonText
                  }>
                  Call Driver
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.trackButton}
                onPress={handleTracking}>

                <Navigation
                  size={17}
                  color="#222"
                />

                <Text style={styles.trackText}>
                  Track Driver
                </Text>

              </TouchableOpacity>

            </View>

          </View>
        )}

        {/* =================================================
            PAYMENT
        ================================================= */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Payment Details
          </Text>

          <View style={styles.paymentRow}>

            <View style={styles.paymentIcon}>
              <CreditCard
                size={19}
                color="#222"
              />
            </View>

            <View style={styles.paymentInfo}>

              <Text style={styles.detailLabel}>
                Payment Method
              </Text>

              <Text style={styles.detailValue}>
                {booking.paymentMethod ||
                  'Cash / UPI'}
              </Text>

            </View>

            <View style={styles.paidBadge}>

              <Check
                size={11}
                color="#222"
              />

              <Text style={styles.paidText}>
                Paid
              </Text>

            </View>

          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>

            <View>

              <Text style={styles.detailLabel}>
                Price / Day
              </Text>

              <Text style={styles.detailValue}>
                {formatINR(pricePerDay)}
              </Text>

            </View>

            <View>

              <Text style={styles.detailLabel}>
                Duration
              </Text>

              <Text style={styles.detailValue}>
                {booking.duration}{' '}
                {booking.duration === 1
                  ? 'Day'
                  : 'Days'}
              </Text>

            </View>

          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>

            <View>
              <Text style={styles.totalLabel}>
                Total Amount
              </Text>

              <Text style={styles.totalSub}>
                Inclusive of rental charges
              </Text>
            </View>

            <Text style={styles.totalAmount}>
              {formatINR(totalAmount)}
            </Text>

          </View>

        </View>

        {/* =================================================
            PAYMENT NOTE
        ================================================= */}

        <View style={styles.noteCard}>

          <ShieldCheck
            size={20}
            color="#222"
          />

          <View style={styles.noteContent}>

            <Text style={styles.noteTitle}>
              Safe & Transparent
            </Text>

            <Text style={styles.noteText}>
              No hidden charges. Payment amount
              is shown in Indian Rupees.
            </Text>

          </View>

        </View>

        {/* =================================================
            DRIVER DETAILS
        ================================================= */}

        {booking.driver && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.driverDetailsButton}
            onPress={handleDriverDetails}>

            <UserRound
              size={19}
              color="#FFF"
            />

            <Text
              style={
                styles.primaryButtonText
              }>
              View Driver Details
            </Text>

            <ChevronRight
              size={18}
              color="#FFF"
            />

          </TouchableOpacity>
        )}

        {/* =================================================
            CANCEL
        ================================================= */}

        {booking.status !== 'Cancelled' && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.cancelButton}
            onPress={handleCancelBooking}>

            <XCircle
              size={19}
              color="#B3261E"
            />

            <Text
              style={
                styles.cancelButtonText
              }>
              Cancel Booking
            </Text>

          </TouchableOpacity>
        )}

        <Text style={styles.footerText}>
          Booking ID: {booking.id}
        </Text>

      </ScrollView>

      {/* ===================================================
          CANCEL SWEET ALERT
      =================================================== */}

      <Modal
        visible={showCancelModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowCancelModal(false)
        }>

        <View style={styles.modalOverlay}>

          <View style={styles.alertCard}>

            <TouchableOpacity
              style={styles.alertClose}
              onPress={() =>
                setShowCancelModal(false)
              }>

              <X
                size={17}
                color="#777"
              />

            </TouchableOpacity>

            <View style={styles.warningCircle}>
              <XCircle
                size={32}
                color="#B3261E"
              />
            </View>

            <Text style={styles.alertTitle}>
              Cancel Booking?
            </Text>

            <Text style={styles.alertSubtitle}>
              Are you sure you want to cancel
              this booking?
            </Text>

            <View style={styles.alertInfoBox}>

              <Text
                style={styles.alertVehicle}
                numberOfLines={1}>

                {booking.car}

              </Text>

              <Text style={styles.alertInfoText}>
                Booking ID: {booking.id}
              </Text>

              <Text style={styles.alertInfoAmount}>
                {formatINR(totalAmount)}
              </Text>

            </View>

            <View style={styles.alertButtons}>

              <TouchableOpacity
                style={styles.alertNoButton}
                onPress={() =>
                  setShowCancelModal(false)
                }>

                <Text
                  style={styles.alertNoText}>
                  No, Keep It
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.alertYesButton}
                onPress={
                  confirmCancelBooking
                }>

                <XCircle
                  size={16}
                  color="#FFF"
                />

                <Text
                  style={styles.alertYesText}>
                  Yes, Cancel
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

      {/* ===================================================
          CALL DRIVER ALERT
      =================================================== */}

      <Modal
        visible={showCallModal}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowCallModal(false)
        }>

        <View style={styles.modalOverlay}>

          <View style={styles.alertCard}>

            <View style={styles.callCircle}>
              <Phone
                size={30}
                color="#FFF"
              />
            </View>

            <Text style={styles.alertTitle}>
              Call Driver
            </Text>

            <Text style={styles.alertSubtitle}>
              Contact your assigned driver
            </Text>

            <View style={styles.phoneBox}>

              <Phone
                size={18}
                color="#333"
              />

              <Text style={styles.phoneNumber}>
                {booking.driverPhone ||
                  'Phone number not available'}
              </Text>

            </View>

            <View style={styles.alertButtons}>

              <TouchableOpacity
                style={styles.alertNoButton}
                onPress={() =>
                  setShowCallModal(false)
                }>

                <Text
                  style={styles.alertNoText}>
                  Close
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={styles.alertYesButton}
                onPress={
                  confirmCallDriver
                }>

                <Phone
                  size={16}
                  color="#FFF"
                />

                <Text
                  style={styles.alertYesText}>
                  Call
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
};

/* =========================================================
   INFO ROW
========================================================= */

const InfoRow = ({
  icon,
  label,
  value,
  multiline,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
  multiline?: boolean;
}) => {
  return (
    <View style={styles.detailRow}>

      <View style={styles.detailIcon}>
        {icon}
      </View>

      <View style={styles.detailContent}>

        <Text style={styles.detailLabel}>
          {label}
        </Text>

        <Text
          style={styles.detailValue}
          numberOfLines={
            multiline ? 3 : 1
          }>

          {value || 'Not available'}

        </Text>

      </View>

    </View>
  );
};

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F6F7F9',
  },

  /* HEADER */

  header: {
    height: 100,
    marginTop:20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F7F9',
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerSpace: {
    width: 43,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },

  /* STATUS */

  statusCard: {
    padding: 15,
    borderRadius: 17,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusContent: {
    flex: 1,
    marginLeft: 12,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222',
  },

  bookingId: {
    marginTop: 4,
    fontSize: 9,
    color: '#888',
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F0F1F1',
  },

  statusBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#333',
  },

  /* CARD */

  card: {
    marginTop: 12,
    padding: 15,
    borderRadius: 17,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    marginBottom: 13,
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
  },

  vehicleTypeBadge: {
    marginBottom: 13,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#F0F1F1',
  },

  vehicleTypeBadgeText: {
    fontSize: 8,
    color: '#333',
    fontWeight: '800',
  },

  /* IMAGE */

  vehicleImageWrapper: {
    width: '100%',
    height: 165,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#EEE',
    marginBottom: 14,
  },

  vehicleImage: {
    width: '100%',
    height: '100%',
  },

  /* VEHICLE */

  carRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  carIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  autoIcon: {
    fontSize: 27,
  },

  carInfo: {
    flex: 1,
    marginLeft: 12,
  },

  carName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222',
  },

  carSubtitle: {
    marginTop: 4,
    fontSize: 10,
    color: '#999',
  },

  carSpecs: {
    marginTop: 4,
    fontSize: 10,
    color: '#777',
  },

  /* DETAILS */

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  detailContent: {
    flex: 1,
    marginLeft: 10,
  },

  detailLabel: {
    fontSize: 8,
    color: '#999',
  },

  detailValue: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },

  /* LOCATION */

  locationCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 17,
    backgroundColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationContent: {
    flex: 1,
    marginLeft: 11,
  },

  locationTitle: {
    fontSize: 9,
    color: '#AAA',
    fontWeight: '700',
  },

  locationValue: {
    marginTop: 4,
    fontSize: 11,
    color: '#FFF',
    fontWeight: '700',
  },

  locationSub: {
    marginTop: 4,
    fontSize: 8,
    color: '#AAA',
  },

  /* DRIVER */

  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  driverBadge: {
    marginBottom: 13,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#F0F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  driverBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#333',
  },

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  driverAvatar: {
    width: 53,
    height: 53,
    borderRadius: 27,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },

  driverName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#222',
  },

  driverRating: {
    marginTop: 4,
    fontSize: 10,
    color: '#777',
  },

  driverButtons: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 9,
  },

  smallButton: {
    flex: 1,
    height: 44,
    borderRadius: 23,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  smallButtonText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },

  trackButton: {
    flex: 1,
    height: 44,
    borderRadius: 23,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  trackText: {
    color: '#222A2C',
    fontSize: 10,
    fontWeight: '800',
  },

  /* PAYMENT */

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentInfo: {
    flex: 1,
    marginLeft: 11,
  },

  paidBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: '#F0F1F1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  paidText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#333',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 14,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#333',
  },

  totalSub: {
    marginTop: 3,
    fontSize: 8,
    color: '#999',
  },

  totalAmount: {
    fontSize: 21,
    fontWeight: '900',
    color: '#222A2C',
  },

  /* NOTE */

  noteCard: {
    marginTop: 12,
    padding: 13,
    borderRadius: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
  },

  noteContent: {
    flex: 1,
    marginLeft: 10,
  },

  noteTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#222',
  },

  noteText: {
    marginTop: 3,
    fontSize: 8,
    color: '#999',
  },

  /* BUTTONS */

  driverDetailsButton: {
    height: 52,
    borderRadius: 27,
    backgroundColor: '#222A2C',
    marginTop: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  primaryButton: {
    height: 50,
    marginTop: 20,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },

  cancelButton: {
    height: 51,
    borderRadius: 27,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E1B7B4',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  cancelButtonText: {
    color: '#B3261E',
    fontSize: 12,
    fontWeight: '800',
  },

  footerText: {
    marginTop: 13,
    textAlign: 'center',
    fontSize: 8,
    color: '#999',
  },

  /* ERROR */

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  errorIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: '800',
    color: '#222',
  },

  errorText: {
    marginTop: 6,
    fontSize: 11,
    color: '#999',
  },

  /* =====================================================
     MODAL
  ===================================================== */

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.58)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  alertCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },

  alertClose: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  warningCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FDEDEC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  callCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertTitle: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },

  alertSubtitle: {
    marginTop: 6,
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },

  alertInfoBox: {
    width: '100%',
    marginTop: 17,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },

  alertVehicle: {
    maxWidth: '90%',
    fontSize: 13,
    fontWeight: '800',
    color: '#222',
  },

  alertInfoText: {
    marginTop: 4,
    fontSize: 8,
    color: '#999',
  },

  alertInfoAmount: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '900',
    color: '#222A2C',
  },

  alertButtons: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    gap: 9,
  },

  alertNoButton: {
    flex: 1,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertNoText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#555',
  },

  alertYesButton: {
    flex: 1.2,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#B3261E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  alertYesText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFF',
  },

  phoneBox: {
    width: '100%',
    marginTop: 18,
    padding: 15,
    borderRadius: 13,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  phoneNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: '#222',
  },

});

export default BookingDetailsScreen;