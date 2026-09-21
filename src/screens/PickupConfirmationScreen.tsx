import React, {useState} from 'react';

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
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Copy,
  IndianRupee,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
  X,
} from 'lucide-react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

/* =========================================================
   TYPES
========================================================= */

type RouteParams = {
  pickupAddress?: string;
  dropAddress?: string;
  vehicleType?: 'Bike' | 'Auto' | 'Car';
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  fare?: number;

  // Optional testing data
  distanceKm?: number;
  etaMinutes?: number;
  bookingId?: string;
};

type ModalType =
  | 'start'
  | 'call'
  | 'cancel'
  | 'safety'
  | 'vehicle'
  | 'share'
  | null;

/* =========================================================
   DEMO DATA
========================================================= */

const DEMO_DATA = {
  driverName: 'Rahul Sharma',
  driverPhone: '+91 91110 40320',
  vehicleNumber: 'MP 09 AB 1234',
  vehicleModel: 'Maruti Suzuki Dzire',
  vehicleColor: 'White',
  vehicleType: 'Car' as const,

  driverRating: 4.9,
  totalTrips: 1248,

  pickupAddress: 'Vijay Nagar, Indore',
  dropAddress: 'Palasia Square, Indore',

  distanceKm: 8.6,
  etaMinutes: 24,

  baseFare: 60,
  distanceFare: 155,
  serviceFee: 15,
  taxes: 10,
  discount: 20,

  fare: 220,

  bookingId: 'VHC-2026-0920-7842',
  otp: '4826',
};

/* =========================================================
   SCREEN
========================================================= */

const PickupConfirmationScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const params: RouteParams = route.params || {};

  /* =======================================================
     DATA
  ======================================================= */

  const pickupAddress =
    params.pickupAddress ||
    DEMO_DATA.pickupAddress;

  const dropAddress =
    params.dropAddress ||
    DEMO_DATA.dropAddress;

  const vehicleType =
    params.vehicleType ||
    DEMO_DATA.vehicleType;

  const driverName =
    params.driverName ||
    DEMO_DATA.driverName;

  const driverPhone =
    params.driverPhone ||
    DEMO_DATA.driverPhone;

  const vehicleNumber =
    params.vehicleNumber ||
    DEMO_DATA.vehicleNumber;

  const fare =
    Number(params.fare) ||
    DEMO_DATA.fare;

  const distanceKm =
    params.distanceKm ||
    DEMO_DATA.distanceKm;

  const etaMinutes =
    params.etaMinutes ||
    DEMO_DATA.etaMinutes;

  const bookingId =
    params.bookingId ||
    DEMO_DATA.bookingId;

  /* =======================================================
     STATE
  ======================================================= */

  const [modalType, setModalType] =
    useState<ModalType>(null);

  const [rideStarting, setRideStarting] =
    useState(false);

  const [vehicleVerified, setVehicleVerified] =
    useState(false);

  const [otpVerified, setOtpVerified] =
    useState(false);

  /* =======================================================
     MODAL
  ======================================================= */

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  /* =======================================================
     START RIDE
  ======================================================= */

  const confirmStartRide = () => {
    setRideStarting(true);

    closeModal();

    setTimeout(() => {
      navigation.navigate(
        'RideStarted',
        {
          pickupAddress,
          dropAddress,
          vehicleType,
          driverName,
          driverPhone,
          vehicleNumber,
          fare,
          distanceKm,
          etaMinutes,
          bookingId,
          otp: DEMO_DATA.otp,
        },
      );

      setRideStarting(false);
    }, 700);
  };

  /* =======================================================
     VERIFY VEHICLE
  ======================================================= */

  const verifyVehicle = () => {
    setVehicleVerified(true);
    closeModal();

    setTimeout(() => {
      openModal('vehicle');
    }, 250);
  };

  /* =======================================================
     VERIFY OTP
  ======================================================= */

  const verifyOtp = () => {
    setOtpVerified(true);
  };

  /* =======================================================
     RENDER MODAL CONTENT
  ======================================================= */

  const renderModalContent = () => {
    if (modalType === 'start') {
      return (
        <>
          <View style={styles.modalIconSuccess}>
            <CheckCircle2
              size={34}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Start Ride?
          </Text>

          <Text style={styles.modalDescription}>
            Please confirm that you are inside the
            correct vehicle and the driver details
            match your booking.
          </Text>

          <View style={styles.modalSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Driver
              </Text>

              <Text style={styles.summaryValue}>
                {driverName}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Vehicle
              </Text>

              <Text style={styles.summaryValue}>
                {vehicleNumber}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Fare
              </Text>

              <Text style={styles.summaryValue}>
                ₹{fare}
              </Text>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={closeModal}>
              <Text style={styles.modalCancelText}>
                Not Yet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalPrimaryButton}
              onPress={confirmStartRide}>
              <Check
                size={18}
                color="#FFFFFF"
              />

              <Text style={styles.modalPrimaryText}>
                Start Ride
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    if (modalType === 'call') {
      return (
        <>
          <View style={styles.modalIconSuccess}>
            <Phone
              size={32}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Call Driver
          </Text>

          <Text style={styles.modalDescription}>
            You are about to contact your driver.
          </Text>

          <View style={styles.phoneBox}>
            <Text style={styles.phoneName}>
              {driverName}
            </Text>

            <Text style={styles.phoneNumber}>
              {driverPhone}
            </Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={closeModal}>
              <Text style={styles.modalCancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalPrimaryButton}
              onPress={closeModal}>
              <Phone
                size={18}
                color="#FFFFFF"
              />

              <Text style={styles.modalPrimaryText}>
                Call Driver
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    if (modalType === 'cancel') {
      return (
        <>
          <View style={styles.modalIconDanger}>
            <X
              size={34}
              color="#D64545"
            />
          </View>

          <Text style={styles.modalTitle}>
            Cancel Ride?
          </Text>

          <Text style={styles.modalDescription}>
            Your driver has already arrived at the
            pickup location. Cancellation may result
            in a cancellation fee.
          </Text>

          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              Possible cancellation fee: ₹40
            </Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={closeModal}>
              <Text style={styles.modalCancelText}>
                Keep Ride
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dangerButton}
              onPress={() => {
                closeModal();

                setTimeout(() => {
                  navigation.goBack();
                }, 300);
              }}>
              <Text style={styles.dangerButtonText}>
                Cancel Ride
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    if (modalType === 'safety') {
      return (
        <>
          <View style={styles.modalIconSuccess}>
            <ShieldCheck
              size={34}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Safety Center
          </Text>

          <Text style={styles.modalDescription}>
            Your trip is protected with safety
            features.
          </Text>

          <View style={styles.safetyList}>
            <View style={styles.safetyItem}>
              <Check
                size={17}
                color="#1E9E4A"
              />

              <Text style={styles.safetyItemText}>
                Driver verified
              </Text>
            </View>

            <View style={styles.safetyItem}>
              <Check
                size={17}
                color="#1E9E4A"
              />

              <Text style={styles.safetyItemText}>
                Vehicle details available
              </Text>
            </View>

            <View style={styles.safetyItem}>
              <Check
                size={17}
                color="#1E9E4A"
              />

              <Text style={styles.safetyItemText}>
                Trip tracking enabled
              </Text>
            </View>

            <View style={styles.safetyItem}>
              <Check
                size={17}
                color="#1E9E4A"
              />

              <Text style={styles.safetyItemText}>
                Emergency support available
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.fullModalButton}
            onPress={closeModal}>
            <Text style={styles.modalPrimaryText}>
              Done
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    if (modalType === 'vehicle') {
      return (
        <>
          <View style={styles.modalIconSuccess}>
            <Car
              size={34}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Vehicle Details
          </Text>

          <View style={styles.vehicleModalCard}>
            <View style={styles.vehicleModalIcon}>
              <Car
                size={30}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.vehicleModalType}>
                {vehicleType}
              </Text>

              <Text style={styles.vehicleModalNumber}>
                {vehicleNumber}
              </Text>

              <Text style={styles.vehicleModalModel}>
                {DEMO_DATA.vehicleModel}
              </Text>
            </View>
          </View>

          <View style={styles.verifyStatus}>
            <CheckCircle2
              size={19}
              color="#1E9E4A"
            />

            <Text style={styles.verifyStatusText}>
              {vehicleVerified
                ? 'Vehicle verified successfully'
                : 'Vehicle verification pending'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.fullModalButton}
            onPress={closeModal}>
            <Text style={styles.modalPrimaryText}>
              Done
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    if (modalType === 'share') {
      return (
        <>
          <View style={styles.modalIconSuccess}>
            <Navigation
              size={32}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Share Trip
          </Text>

          <Text style={styles.modalDescription}>
            Demo mode: trip sharing details are ready.
          </Text>

          <View style={styles.shareCard}>
            <Text style={styles.shareLabel}>
              BOOKING ID
            </Text>

            <Text style={styles.shareBookingId}>
              {bookingId}
            </Text>

            <Text style={styles.shareRoute}>
              {pickupAddress}
            </Text>

            <Text style={styles.shareArrow}>
              ↓
            </Text>

            <Text style={styles.shareRoute}>
              {dropAddress}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.fullModalButton}
            onPress={closeModal}>
            <Copy
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.modalPrimaryText}>
              Copy Trip Details
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    return null;
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F6F7"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}>
            <ArrowLeft
              size={21}
              color="#222A2C"
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>
              Pickup Confirmed
            </Text>

            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />

              <Text style={styles.onlineText}>
                Driver has arrived
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => openModal('safety')}>
            <ShieldCheck
              size={20}
              color="#1E9E4A"
            />
          </TouchableOpacity>
        </View>

        {/* =================================================
            SUCCESS BANNER
        ================================================= */}

        <View style={styles.successBanner}>
          <View style={styles.successBannerIcon}>
            <CheckCircle2
              size={30}
              color="#1E9E4A"
            />
          </View>

          <View style={styles.successBannerContent}>
            <Text style={styles.successBannerTitle}>
              Your driver is here
            </Text>

            <Text style={styles.successBannerText}>
              Verify the vehicle before starting
              your ride.
            </Text>
          </View>
        </View>

        {/* =================================================
            DRIVER CARD
        ================================================= */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Driver Details
            </Text>

            <View style={styles.verifiedBadge}>
              <Check
                size={12}
                color="#1E9E4A"
              />

              <Text style={styles.verifiedText}>
                VERIFIED
              </Text>
            </View>
          </View>

          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <UserRound
                size={28}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>
                {driverName}
              </Text>

              <View style={styles.ratingRow}>
                <Star
                  size={14}
                  color="#F5A623"
                  fill="#F5A623"
                />

                <Text style={styles.ratingText}>
                  {DEMO_DATA.driverRating}
                </Text>

                <Text style={styles.tripText}>
                  • {DEMO_DATA.totalTrips} trips
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.callButton}
              onPress={() => openModal('call')}>
              <Phone
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* =================================================
            VEHICLE CARD
        ================================================= */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Vehicle Details
            </Text>

            <TouchableOpacity
              onPress={() => openModal('vehicle')}>
              <Text style={styles.viewText}>
                View
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <Car
                size={28}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleType}>
                {vehicleType}
              </Text>

              <Text style={styles.vehicleModel}>
                {DEMO_DATA.vehicleModel}
              </Text>

              <Text style={styles.vehicleColor}>
                {DEMO_DATA.vehicleColor} • AC
              </Text>
            </View>

            <View style={styles.numberPlate}>
              <Text style={styles.numberPlateLabel}>
                VEHICLE
              </Text>

              <Text style={styles.numberPlateText}>
                {vehicleNumber}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.verifyVehicleButton,
              vehicleVerified &&
                styles.verifyVehicleSuccess,
            ]}
            onPress={verifyVehicle}>
            {vehicleVerified ? (
              <CheckCircle2
                size={18}
                color="#1E9E4A"
              />
            ) : (
              <ShieldCheck
                size={18}
                color="#222A2C"
              />
            )}

            <Text
              style={[
                styles.verifyVehicleText,
                vehicleVerified &&
                  styles.verifyVehicleSuccessText,
              ]}>
              {vehicleVerified
                ? 'Vehicle Verified'
                : 'Verify Vehicle'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* =================================================
            TRIP ROUTE
        ================================================= */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Trip Details
            </Text>

            <View style={styles.etaBadge}>
              <Clock3
                size={13}
                color="#1E9E4A"
              />

              <Text style={styles.etaText}>
                {etaMinutes} min
              </Text>
            </View>
          </View>

          <View style={styles.routeContainer}>
            {/* PICKUP */}

            <View style={styles.routeRow}>
              <View style={styles.pickupCircle}>
                <View style={styles.pickupInner} />
              </View>

              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>
                  PICKUP
                </Text>

                <Text
                  style={styles.routeAddress}
                  numberOfLines={2}>
                  {pickupAddress}
                </Text>
              </View>
            </View>

            {/* LINE */}

            <View style={styles.routeLineContainer}>
              <View style={styles.routeLine} />
            </View>

            {/* DROP */}

            <View style={styles.routeRow}>
              <View style={styles.dropCircle}>
                <MapPin
                  size={16}
                  color="#FFFFFF"
                />
              </View>

              <View style={styles.routeContent}>
                <Text style={styles.routeLabel}>
                  DROP
                </Text>

                <Text
                  style={styles.routeAddress}
                  numberOfLines={2}>
                  {dropAddress}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.routeStats}>
            <View style={styles.routeStat}>
              <Navigation
                size={16}
                color="#1E9E4A"
              />

              <View>
                <Text style={styles.statLabel}>
                  DISTANCE
                </Text>

                <Text style={styles.statValue}>
                  {distanceKm} km
                </Text>
              </View>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.routeStat}>
              <Clock3
                size={16}
                color="#1E9E4A"
              />

              <View>
                <Text style={styles.statLabel}>
                  EST. TIME
                </Text>

                <Text style={styles.statValue}>
                  {etaMinutes} min
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* =================================================
            OTP CARD
        ================================================= */}

        <View style={styles.otpCard}>
          <View style={styles.otpIcon}>
            <ShieldCheck
              size={22}
              color="#1E9E4A"
            />
          </View>

          <View style={styles.otpContent}>
            <Text style={styles.otpTitle}>
              Ride OTP
            </Text>

            <Text style={styles.otpText}>
              Share this OTP with your driver
              before starting the ride.
            </Text>
          </View>

          <View style={styles.otpNumberBox}>
            <Text style={styles.otpNumber}>
              {DEMO_DATA.otp}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.otpVerifyButton}
          onPress={verifyOtp}>
          {otpVerified ? (
            <CheckCircle2
              size={17}
              color="#1E9E4A"
            />
          ) : (
            <ShieldCheck
              size={17}
              color="#222A2C"
            />
          )}

          <Text style={styles.otpVerifyText}>
            {otpVerified
              ? 'OTP Verified'
              : 'Demo: Verify OTP'}
          </Text>
        </TouchableOpacity>

        {/* =================================================
            FARE CARD
        ================================================= */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Fare Estimate
            </Text>

            <Text style={styles.estimatedText}>
              ESTIMATED
            </Text>
          </View>

          <View style={styles.fareRows}>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>
                Base fare
              </Text>

              <Text style={styles.fareAmount}>
                ₹{DEMO_DATA.baseFare}
              </Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>
                Distance fare
              </Text>

              <Text style={styles.fareAmount}>
                ₹{DEMO_DATA.distanceFare}
              </Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>
                Service fee
              </Text>

              <Text style={styles.fareAmount}>
                ₹{DEMO_DATA.serviceFee}
              </Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>
                Taxes
              </Text>

              <Text style={styles.fareAmount}>
                ₹{DEMO_DATA.taxes}
              </Text>
            </View>

            <View style={styles.fareRow}>
              <Text style={styles.discountLabel}>
                Demo discount
              </Text>

              <Text style={styles.discountAmount}>
                -₹{DEMO_DATA.discount}
              </Text>
            </View>
          </View>

          <View style={styles.fareDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total Estimated Fare
            </Text>

            <Text style={styles.totalAmount}>
              ₹{fare}
            </Text>
          </View>
        </View>

        {/* =================================================
            SAFETY ACTIONS
        ================================================= */}

        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => openModal('safety')}>
            <View style={styles.actionIcon}>
              <ShieldCheck
                size={19}
                color="#1E9E4A"
              />
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>
                Safety Center
              </Text>

              <Text style={styles.actionText}>
                Emergency & safety information
              </Text>
            </View>

            <ChevronRight
              size={19}
              color="#999999"
            />
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => openModal('share')}>
            <View style={styles.actionIcon}>
              <Navigation
                size={19}
                color="#1E9E4A"
              />
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>
                Share Trip
              </Text>

              <Text style={styles.actionText}>
                Share your trip details
              </Text>
            </View>

            <ChevronRight
              size={19}
              color="#999999"
            />
          </TouchableOpacity>
        </View>

        {/* =================================================
            BOOKING ID
        ================================================= */}

        <View style={styles.bookingInfo}>
          <Text style={styles.bookingLabel}>
            BOOKING ID
          </Text>

          <Text style={styles.bookingId}>
            {bookingId}
          </Text>

          <Text style={styles.demoText}>
            Demo / Testing Mode
          </Text>
        </View>
      </ScrollView>

      {/* =================================================
          BOTTOM ACTIONS
      ================================================= */}

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => openModal('cancel')}>
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={rideStarting}
          style={[
            styles.startButton,
            rideStarting &&
              styles.disabledButton,
          ]}
          onPress={() => openModal('start')}>
          <CheckCircle2
            size={21}
            color="#FFFFFF"
          />

          <Text style={styles.startButtonText}>
            {rideStarting
              ? 'Starting Ride...'
              : 'Start Ride'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* =================================================
          SWEET ALERT STYLE MODAL
      ================================================= */}

      <Modal
        visible={modalType !== null}
        transparent
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>

            <TouchableOpacity
              style={styles.modalClose}
              onPress={closeModal}>
              <X
                size={18}
                color="#777777"
              />
            </TouchableOpacity>

            {renderModalContent()}

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PickupConfirmationScreen;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },

  scrollContent: {
    paddingBottom: 130,
  },

  /* HEADER */

  header: {
    height: 82,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#222A2C',
  },

  onlineRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#1E9E4A',
    marginRight: 5,
  },

  onlineText: {
    fontSize: 10,
    color: '#1E9E4A',
    fontWeight: '800',
  },

  /* SUCCESS */

  successBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  successBannerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  successBannerContent: {
    flex: 1,
    marginLeft: 12,
  },

  successBannerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#222A2C',
  },

  successBannerText: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 15,
    color: '#607064',
    fontWeight: '600',
  },

  /* CARD */

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#222A2C',
  },

  viewText: {
    fontSize: 11,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  verifiedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  verifiedText: {
    marginLeft: 3,
    fontSize: 8,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  /* DRIVER */

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  driverAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },

  driverName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#222A2C',
  },

  ratingRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 11,
    color: '#333333',
    fontWeight: '800',
  },

  tripText: {
    marginLeft: 5,
    fontSize: 10,
    color: '#888888',
    fontWeight: '600',
  },

  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1E9E4A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* VEHICLE */

  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },

  vehicleType: {
    fontSize: 15,
    color: '#222A2C',
    fontWeight: '900',
  },

  vehicleModel: {
    marginTop: 3,
    fontSize: 10,
    color: '#555555',
    fontWeight: '700',
  },

  vehicleColor: {
    marginTop: 3,
    fontSize: 9,
    color: '#999999',
    fontWeight: '600',
  },

  numberPlate: {
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },

  numberPlateLabel: {
    fontSize: 7,
    color: '#999999',
    fontWeight: '900',
  },

  numberPlateText: {
    marginTop: 2,
    fontSize: 10,
    color: '#222A2C',
    fontWeight: '900',
  },

  verifyVehicleButton: {
    height: 44,
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  verifyVehicleSuccess: {
    backgroundColor: '#EAF8EF',
  },

  verifyVehicleText: {
    marginLeft: 7,
    fontSize: 11,
    color: '#222A2C',
    fontWeight: '900',
  },

  verifyVehicleSuccessText: {
    color: '#1E9E4A',
  },

  /* ROUTE */

  etaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  etaText: {
    marginLeft: 4,
    fontSize: 9,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  routeContainer: {
    paddingVertical: 3,
  },

  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pickupCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pickupInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E9E4A',
  },

  dropCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  routeContent: {
    flex: 1,
    marginLeft: 12,
  },

  routeLabel: {
    fontSize: 8,
    color: '#999999',
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  routeAddress: {
    marginTop: 4,
    fontSize: 12,
    color: '#333333',
    fontWeight: '800',
    lineHeight: 17,
  },

  routeLineContainer: {
    height: 27,
    marginLeft: 14,
  },

  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#D9D9D9',
  },

  routeStats: {
    marginTop: 16,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 10,
  },

  statLabel: {
    marginLeft: 7,
    fontSize: 7,
    color: '#999999',
    fontWeight: '900',
  },

  statValue: {
    marginLeft: 7,
    marginTop: 2,
    fontSize: 12,
    color: '#222A2C',
    fontWeight: '900',
  },

  /* OTP */

  otpCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 17,
    backgroundColor: '#FFF9E8',
    flexDirection: 'row',
    alignItems: 'center',
  },

  otpIcon: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpContent: {
    flex: 1,
    marginLeft: 10,
  },

  otpTitle: {
    fontSize: 12,
    color: '#5B4B1C',
    fontWeight: '900',
  },

  otpText: {
    marginTop: 3,
    fontSize: 9,
    lineHeight: 13,
    color: '#806F37',
    fontWeight: '600',
  },

  otpNumberBox: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  otpNumber: {
    fontSize: 17,
    color: '#222A2C',
    fontWeight: '900',
    letterSpacing: 2,
  },

  otpVerifyButton: {
    marginHorizontal: 16,
    marginBottom: 12,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otpVerifyText: {
    marginLeft: 6,
    fontSize: 10,
    color: '#222A2C',
    fontWeight: '900',
  },

  /* FARE */

  estimatedText: {
    fontSize: 8,
    color: '#999999',
    fontWeight: '900',
  },

  fareRows: {
    gap: 9,
  },

  fareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  fareLabel: {
    fontSize: 10,
    color: '#777777',
    fontWeight: '600',
  },

  fareAmount: {
    fontSize: 10,
    color: '#333333',
    fontWeight: '800',
  },

  discountLabel: {
    fontSize: 10,
    color: '#1E9E4A',
    fontWeight: '700',
  },

  discountAmount: {
    fontSize: 10,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  fareDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 13,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 12,
    color: '#222A2C',
    fontWeight: '900',
  },

  totalAmount: {
    fontSize: 21,
    color: '#222A2C',
    fontWeight: '900',
  },

  /* ACTIONS */

  actionsCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  actionItem: {
    minHeight: 67,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionContent: {
    flex: 1,
    marginLeft: 11,
  },

  actionTitle: {
    fontSize: 12,
    color: '#222A2C',
    fontWeight: '900',
  },

  actionText: {
    marginTop: 3,
    fontSize: 9,
    color: '#999999',
    fontWeight: '600',
  },

  actionDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  /* BOOKING */

  bookingInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },

  bookingLabel: {
    fontSize: 8,
    color: '#AAAAAA',
    fontWeight: '900',
    letterSpacing: 1,
  },

  bookingId: {
    marginTop: 5,
    fontSize: 11,
    color: '#555555',
    fontWeight: '800',
  },

  demoText: {
    marginTop: 5,
    fontSize: 8,
    color: '#1E9E4A',
    fontWeight: '800',
  },

  /* BOTTOM */

  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    gap: 10,
  },

  cancelButton: {
    width: 90,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    fontSize: 12,
    color: '#D64545',
    fontWeight: '900',
  },

  startButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.65,
  },

  startButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modalCard: {
    width: '100%',
    maxWidth: 410,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 22,
    position: 'relative',
  },

  modalClose: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },

  modalIconSuccess: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 13,
  },

  modalIconDanger: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FDECEC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 13,
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#222A2C',
    fontWeight: '900',
  },

  modalDescription: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 17,
    color: '#777777',
    fontWeight: '600',
  },

  modalSummary: {
    marginTop: 17,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  summaryLabel: {
    fontSize: 10,
    color: '#888888',
    fontWeight: '600',
  },

  summaryValue: {
    fontSize: 10,
    color: '#222A2C',
    fontWeight: '900',
  },

  modalButtons: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },

  modalCancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#F2F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalCancelText: {
    fontSize: 11,
    color: '#555555',
    fontWeight: '900',
  },

  modalPrimaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalPrimaryText: {
    marginLeft: 6,
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  dangerButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#D64545',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dangerButtonText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  phoneBox: {
    marginTop: 17,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    alignItems: 'center',
  },

  phoneName: {
    fontSize: 14,
    color: '#222A2C',
    fontWeight: '900',
  },

  phoneNumber: {
    marginTop: 5,
    fontSize: 13,
    color: '#1E9E4A',
    fontWeight: '800',
  },

  warningBox: {
    marginTop: 16,
    padding: 13,
    borderRadius: 12,
    backgroundColor: '#FFF1F1',
  },

  warningText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#D64545',
    fontWeight: '800',
  },

  safetyList: {
    marginTop: 16,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
  },

  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
  },

  safetyItemText: {
    marginLeft: 8,
    fontSize: 10,
    color: '#444444',
    fontWeight: '700',
  },

  fullModalButton: {
    marginTop: 18,
    height: 49,
    borderRadius: 14,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleModalCard: {
    marginTop: 17,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleModalIcon: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  vehicleModalType: {
    fontSize: 15,
    color: '#222A2C',
    fontWeight: '900',
  },

  vehicleModalNumber: {
    marginTop: 3,
    fontSize: 12,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  vehicleModalModel: {
    marginTop: 3,
    fontSize: 9,
    color: '#888888',
    fontWeight: '600',
  },

  verifyStatus: {
    marginTop: 13,
    padding: 11,
    borderRadius: 11,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  verifyStatusText: {
    marginLeft: 7,
    fontSize: 10,
    color: '#1E9E4A',
    fontWeight: '800',
  },

  shareCard: {
    marginTop: 16,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    alignItems: 'center',
  },

  shareLabel: {
    fontSize: 8,
    color: '#999999',
    fontWeight: '900',
  },

  shareBookingId: {
    marginTop: 5,
    fontSize: 13,
    color: '#222A2C',
    fontWeight: '900',
  },

  shareRoute: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 10,
    color: '#444444',
    fontWeight: '700',
  },

  shareArrow: {
    marginTop: 4,
    fontSize: 16,
    color: '#1E9E4A',
    fontWeight: '900',
  },
});