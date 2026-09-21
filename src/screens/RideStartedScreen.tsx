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
  Share2,
  Star,
  UserRound,
  X,
  AlertTriangle,
} from 'lucide-react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

type RouteParams = {
  pickupAddress?: string;
  dropAddress?: string;
  vehicleType?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  fare?: number;
  distanceKm?: number;
  etaMinutes?: number;
  bookingId?: string;
};

type ModalType =
  | 'safety'
  | 'share'
  | 'call'
  | 'cancel'
  | 'complete'
  | null;

const RideStartedScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const params: RouteParams = route.params || {};

  /* =====================================================
     TESTING DATA
  ===================================================== */

  const pickupAddress =
    params.pickupAddress || 'Vijay Nagar, Indore';

  const dropAddress =
    params.dropAddress || 'Palasia Square, Indore';

  const vehicleType =
    params.vehicleType || 'Car';

  const driverName =
    params.driverName || 'Rahul Sharma';

  const driverPhone =
    params.driverPhone || '+91 91110 40320';

  const vehicleNumber =
    params.vehicleNumber || 'MP 09 AB 1234';

  const fare =
    Number(params.fare) || 220;

  const distanceKm =
    Number(params.distanceKm) || 8.6;

  const initialEta =
    Number(params.etaMinutes) || 24;

  const bookingId =
    params.bookingId || 'VHC-2026-0920-7842';

  /* =====================================================
     STATE
  ===================================================== */

  const [eta, setEta] = useState(initialEta);

  const [progress, setProgress] =
    useState(38);

  const [modalType, setModalType] =
    useState<ModalType>(null);

  const [rideStatus, setRideStatus] =
    useState('Ride in Progress');

  const [currentArea, setCurrentArea] =
    useState('Rau Road');

  const [currentDistance, setCurrentDistance] =
    useState(5.2);

  const [rideSeconds, setRideSeconds] =
    useState(0);

  /* =====================================================
     RIDE TIMER
  ===================================================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setRideSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =====================================================
     DEMO LIVE TRACKING
  ===================================================== */

  useEffect(() => {
    const trackingTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 92) {
          return 92;
        }

        return prev + 1;
      });

      setEta(prev => {
        if (prev <= 2) {
          return 2;
        }

        return prev - 1;
      });

      setCurrentDistance(prev => {
        if (prev <= 0.5) {
          return 0.5;
        }

        return Number((prev - 0.15).toFixed(1));
      });
    }, 5000);

    return () => clearInterval(trackingTimer);
  }, []);

  /* =====================================================
     TIMER FORMAT
  ===================================================== */

  const formattedRideTime = useMemo(() => {
    const minutes = Math.floor(rideSeconds / 60);

    const seconds = rideSeconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`;
  }, [rideSeconds]);

  /* =====================================================
     MODALS
  ===================================================== */

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  /* =====================================================
     COMPLETE RIDE
  ===================================================== */

  const completeRide = () => {
    closeModal();

    navigation.navigate(
      'DestinationReached',
      {
        pickupAddress,
        dropAddress,
        vehicleType,
        driverName,
        driverPhone,
        vehicleNumber,
        fare,
        distanceKm,
        bookingId,
      },
    );
  };

  /* =====================================================
     MODAL CONTENT
  ===================================================== */

  const renderModalContent = () => {
    if (modalType === 'safety') {
      return (
        <>
          <View style={styles.modalSuccessIcon}>
            <ShieldCheck
              size={35}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Safety Center
          </Text>

          <Text style={styles.modalDescription}>
            Your ride is currently being tracked.
            These safety features are available
            during your trip.
          </Text>

          <View style={styles.safetyBox}>
            {[
              'Live trip tracking enabled',
              'Driver identity verified',
              'Vehicle details verified',
              'Emergency support available',
              'Trip sharing available',
            ].map((item, index) => (
              <View
                key={index}
                style={styles.safetyRow}>
                <CheckCircle2
                  size={17}
                  color="#1E9E4A"
                />

                <Text style={styles.safetyText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.modalFullButton}
            onPress={closeModal}>
            <Text style={styles.modalFullButtonText}>
              Done
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    if (modalType === 'share') {
      return (
        <>
          <View style={styles.modalSuccessIcon}>
            <Share2
              size={32}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Share Live Trip
          </Text>

          <Text style={styles.modalDescription}>
            Demo mode: your live trip details are
            ready to share.
          </Text>

          <View style={styles.shareBox}>
            <Text style={styles.shareLabel}>
              BOOKING ID
            </Text>

            <Text style={styles.shareId}>
              {bookingId}
            </Text>

            <View style={styles.shareRoute}>
              <Text style={styles.shareRouteText}>
                {pickupAddress}
              </Text>

              <Text style={styles.shareArrow}>
                ↓
              </Text>

              <Text style={styles.shareRouteText}>
                {dropAddress}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.modalFullButton}
            onPress={closeModal}>
            <Copy
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.modalFullButtonText}>
              Copy Trip Details
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    if (modalType === 'call') {
      return (
        <>
          <View style={styles.modalSuccessIcon}>
            <Phone
              size={32}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Call Driver
          </Text>

          <Text style={styles.modalDescription}>
            Contact your driver if you need help
            during the trip.
          </Text>

          <View style={styles.driverCallBox}>
            <View style={styles.smallAvatar}>
              <UserRound
                size={23}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.callDriverName}>
                {driverName}
              </Text>

              <Text style={styles.callDriverPhone}>
                {driverPhone}
              </Text>
            </View>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.secondaryModalButton}
              onPress={closeModal}>
              <Text style={styles.secondaryModalText}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalFullButtonSmall}
              onPress={closeModal}>
              <Phone
                size={17}
                color="#FFFFFF"
              />

              <Text style={styles.modalFullButtonText}>
                Call
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    if (modalType === 'cancel') {
      return (
        <>
          <View style={styles.modalDangerIcon}>
            <AlertTriangle
              size={34}
              color="#D64545"
            />
          </View>

          <Text style={styles.modalTitle}>
            Cancel Ride?
          </Text>

          <Text style={styles.modalDescription}>
            Your ride has already started. Cancelling
            now may affect your final fare.
          </Text>

          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>
              Important
            </Text>

            <Text style={styles.warningText}>
              A cancellation fee may apply in a real
              booking.
            </Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.secondaryModalButton}
              onPress={closeModal}>
              <Text style={styles.secondaryModalText}>
                Continue Ride
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dangerModalButton}
              onPress={() => {
                closeModal();
                navigation.goBack();
              }}>
              <Text style={styles.dangerModalText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    if (modalType === 'complete') {
      return (
        <>
          <View style={styles.modalSuccessIcon}>
            <MapPin
              size={34}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Mark Destination Reached?
          </Text>

          <Text style={styles.modalDescription}>
            This is a testing action. It will open
            the destination reached screen.
          </Text>

          <View style={styles.destinationBox}>
            <Text style={styles.destinationLabel}>
              DESTINATION
            </Text>

            <Text style={styles.destinationText}>
              {dropAddress}
            </Text>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.secondaryModalButton}
              onPress={closeModal}>
              <Text style={styles.secondaryModalText}>
                Not Yet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalFullButtonSmall}
              onPress={completeRide}>
              <Check
                size={18}
                color="#FFFFFF"
              />

              <Text style={styles.modalFullButtonText}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    }

    return null;
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F4F6F7"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}

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
              Ride in Progress
            </Text>

            <View style={styles.liveRow}>
              <View style={styles.liveDot} />

              <Text style={styles.liveText}>
                LIVE
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

        {/* LIVE STATUS */}

        <View style={styles.liveStatusCard}>
          <View>
            <Text style={styles.statusSmall}>
              CURRENT STATUS
            </Text>

            <Text style={styles.statusTitle}>
              {rideStatus}
            </Text>

            <Text style={styles.statusLocation}>
              Near {currentArea}
            </Text>
          </View>

          <View style={styles.etaCircle}>
            <Text style={styles.etaNumber}>
              {eta}
            </Text>

            <Text style={styles.etaMinutes}>
              MIN
            </Text>
          </View>
        </View>

        {/* DEMO MAP */}

        <View style={styles.mapCard}>
          <View style={styles.mapBackground}>

            {/* roads */}

            <View style={styles.roadHorizontal} />

            <View style={styles.roadVertical} />

            <View style={styles.roadDiagonal} />

            {/* pickup */}

            <View style={styles.mapPickup}>
              <View style={styles.mapPickupDot} />
            </View>

            {/* car */}

            <View
              style={[
                styles.mapCar,
                {
                  left: `${progress}%`,
                },
              ]}>
              <Car
                size={19}
                color="#FFFFFF"
              />
            </View>

            {/* destination */}

            <View style={styles.mapDestination}>
              <MapPin
                size={25}
                color="#D64545"
              />
            </View>

            <View style={styles.mapOverlay}>
              <Navigation
                size={15}
                color="#1E9E4A"
              />

              <Text style={styles.mapOverlayText}>
                Live tracking
              </Text>
            </View>

          </View>

          {/* PROGRESS */}

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>
                Trip Progress
              </Text>

              <Text style={styles.progressValue}>
                {progress}%
              </Text>
            </View>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress}%`,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* ROUTE */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Your Route
            </Text>

            <View style={styles.routeLiveBadge}>
              <Navigation
                size={12}
                color="#1E9E4A"
              />

              <Text style={styles.routeLiveText}>
                LIVE
              </Text>
            </View>
          </View>

          <View style={styles.routeRow}>
            <View style={styles.pickupDotLarge}>
              <View style={styles.pickupDotInner} />
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

          <View style={styles.routeLine} />

          <View style={styles.routeRow}>
            <View style={styles.destinationDot}>
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

          <View style={styles.tripStats}>
            <View style={styles.tripStat}>
              <Navigation
                size={16}
                color="#1E9E4A"
              />

              <View>
                <Text style={styles.statLabel}>
                  REMAINING
                </Text>

                <Text style={styles.statValue}>
                  {currentDistance} km
                </Text>
              </View>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.tripStat}>
              <Clock3
                size={16}
                color="#1E9E4A"
              />

              <View>
                <Text style={styles.statLabel}>
                  ETA
                </Text>

                <Text style={styles.statValue}>
                  {eta} min
                </Text>
              </View>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.tripStat}>
              <Clock3
                size={16}
                color="#1E9E4A"
              />

              <View>
                <Text style={styles.statLabel}>
                  RIDE TIME
                </Text>

                <Text style={styles.statValue}>
                  {formattedRideTime}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* DRIVER */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Your Driver
            </Text>

            <View style={styles.verifiedBadge}>
              <Check
                size={11}
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
                  4.9
                </Text>

                <Text style={styles.tripsText}>
                  • 1,248 trips
                </Text>
              </View>

              <Text style={styles.vehicleText}>
                {vehicleType} • {vehicleNumber}
              </Text>
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

        {/* FARE */}

        <View style={styles.fareCard}>
          <View style={styles.fareIcon}>
            <IndianRupee
              size={22}
              color="#1E9E4A"
            />
          </View>

          <View style={styles.fareContent}>
            <Text style={styles.fareSmall}>
              CURRENT ESTIMATED FARE
            </Text>

            <Text style={styles.fareAmount}>
              ₹{fare}
            </Text>
          </View>

          <Text style={styles.fareNote}>
            May change
          </Text>
        </View>

        {/* QUICK ACTIONS */}

        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => openModal('share')}>
            <View style={styles.actionIcon}>
              <Share2
                size={18}
                color="#1E9E4A"
              />
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>
                Share Live Trip
              </Text>

              <Text style={styles.actionText}>
                Send your live ride details
              </Text>
            </View>

            <ChevronRight
              size={18}
              color="#999999"
            />
          </TouchableOpacity>

          <View style={styles.actionDivider} />

          <TouchableOpacity
            style={styles.actionItem}
            onPress={() => openModal('safety')}>
            <View style={styles.actionIcon}>
              <ShieldCheck
                size={18}
                color="#1E9E4A"
              />
            </View>

            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>
                Safety Center
              </Text>

              <Text style={styles.actionText}>
                Safety tools and emergency support
              </Text>
            </View>

            <ChevronRight
              size={18}
              color="#999999"
            />
          </TouchableOpacity>
        </View>

        {/* BOOKING */}

        <View style={styles.bookingInfo}>
          <Text style={styles.bookingLabel}>
            BOOKING ID
          </Text>

          <Text style={styles.bookingId}>
            {bookingId}
          </Text>

          <Text style={styles.testingText}>
            Demo Live Tracking Mode
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM */}

      <View style={styles.bottomContainer}>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => openModal('cancel')}>
          <Text style={styles.cancelText}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.destinationButton}
          onPress={() => openModal('complete')}>
          <MapPin
            size={19}
            color="#FFFFFF"
          />

          <Text style={styles.destinationButtonText}>
            Destination Reached
          </Text>
        </TouchableOpacity>

      </View>

      {/* SWEET ALERT STYLE MODAL */}

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

export default RideStartedScreen;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F7',
  },

  scrollContent: {
    paddingBottom: 125,
  },

  /* HEADER */

  header: {
    height: 78,
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
    borderColor: '#E7E7E7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 17,
    color: '#222A2C',
    fontWeight: '900',
  },

  liveRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D64545',
    marginRight: 5,
  },

  liveText: {
    fontSize: 9,
    color: '#D64545',
    fontWeight: '900',
    letterSpacing: 1,
  },

  /* LIVE STATUS */

  liveStatusCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 17,
    borderRadius: 20,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  statusSmall: {
    fontSize: 8,
    color: '#AEB5B7',
    fontWeight: '900',
    letterSpacing: 1,
  },

  statusTitle: {
    marginTop: 5,
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  statusLocation: {
    marginTop: 4,
    fontSize: 10,
    color: '#BFC5C6',
    fontWeight: '600',
  },

  etaCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#1E9E4A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  etaNumber: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  etaMinutes: {
    marginTop: -2,
    fontSize: 7,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  /* MAP */

  mapCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  mapBackground: {
    height: 260,
    backgroundColor: '#E8EEE9',
    position: 'relative',
    overflow: 'hidden',
  },

  roadHorizontal: {
    position: 'absolute',
    top: 105,
    left: -30,
    right: -30,
    height: 38,
    backgroundColor: '#FFFFFF',
    transform: [
      {
        rotate: '-8deg',
      },
    ],
  },

  roadVertical: {
    position: 'absolute',
    top: -30,
    bottom: -30,
    left: 155,
    width: 32,
    backgroundColor: '#FFFFFF',
    transform: [
      {
        rotate: '12deg',
      },
    ],
  },

  roadDiagonal: {
    position: 'absolute',
    width: 390,
    height: 24,
    top: 145,
    left: -40,
    backgroundColor: '#FFFFFF',
    transform: [
      {
        rotate: '28deg',
      },
    ],
  },

  mapPickup: {
    position: 'absolute',
    left: 32,
    top: 180,
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapPickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E9E4A',
  },

  mapCar: {
    position: 'absolute',
    top: 115,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -20,
    elevation: 5,
  },

  mapDestination: {
    position: 'absolute',
    right: 31,
    top: 43,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  mapOverlay: {
    position: 'absolute',
    top: 13,
    left: 13,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  mapOverlayText: {
    marginLeft: 5,
    fontSize: 8,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  progressSection: {
    padding: 13,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabel: {
    fontSize: 9,
    color: '#777777',
    fontWeight: '800',
  },

  progressValue: {
    fontSize: 9,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  progressTrack: {
    height: 6,
    marginTop: 8,
    borderRadius: 3,
    backgroundColor: '#E9E9E9',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#1E9E4A',
  },

  /* CARD */

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  cardHeader: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontSize: 14,
    color: '#222A2C',
    fontWeight: '900',
  },

  routeLiveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  routeLiveText: {
    marginLeft: 4,
    fontSize: 8,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  /* ROUTE */

  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pickupDotLarge: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pickupDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1E9E4A',
  },

  destinationDot: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  routeContent: {
    flex: 1,
    marginLeft: 11,
  },

  routeLabel: {
    fontSize: 8,
    color: '#999999',
    fontWeight: '900',
  },

  routeAddress: {
    marginTop: 4,
    fontSize: 11,
    color: '#333333',
    fontWeight: '800',
    lineHeight: 16,
  },

  routeLine: {
    width: 2,
    height: 24,
    marginLeft: 14,
    backgroundColor: '#DCDCDC',
  },

  tripStats: {
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },

  tripStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 5,
  },

  statLabel: {
    marginLeft: 6,
    fontSize: 7,
    color: '#999999',
    fontWeight: '900',
  },

  statValue: {
    marginLeft: 6,
    marginTop: 2,
    fontSize: 11,
    color: '#222A2C',
    fontWeight: '900',
  },

  /* DRIVER */

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

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  driverAvatar: {
    width: 57,
    height: 57,
    borderRadius: 29,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  driverInfo: {
    flex: 1,
    marginLeft: 11,
  },

  driverName: {
    fontSize: 16,
    color: '#222A2C',
    fontWeight: '900',
  },

  ratingRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 10,
    color: '#444444',
    fontWeight: '800',
  },

  tripsText: {
    marginLeft: 5,
    fontSize: 9,
    color: '#999999',
    fontWeight: '600',
  },

  vehicleText: {
    marginTop: 5,
    fontSize: 9,
    color: '#777777',
    fontWeight: '700',
  },

  callButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#1E9E4A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* FARE */

  fareCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 15,
    borderRadius: 18,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  fareIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fareContent: {
    flex: 1,
    marginLeft: 11,
  },

  fareSmall: {
    fontSize: 7,
    color: '#66806E',
    fontWeight: '900',
    letterSpacing: 0.6,
  },

  fareAmount: {
    marginTop: 3,
    fontSize: 21,
    color: '#222A2C',
    fontWeight: '900',
  },

  fareNote: {
    fontSize: 8,
    color: '#77877D',
    fontWeight: '700',
  },

  /* ACTIONS */

  actionsCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  actionItem: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 41,
    height: 41,
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
    fontSize: 11,
    color: '#222A2C',
    fontWeight: '900',
  },

  actionText: {
    marginTop: 3,
    fontSize: 8,
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
    marginBottom: 18,
  },

  bookingLabel: {
    fontSize: 7,
    color: '#AAAAAA',
    fontWeight: '900',
    letterSpacing: 1,
  },

  bookingId: {
    marginTop: 5,
    fontSize: 10,
    color: '#555555',
    fontWeight: '800',
  },

  testingText: {
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
    paddingTop: 9,
    paddingBottom: 13,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    flexDirection: 'row',
    gap: 9,
  },

  cancelButton: {
    width: 84,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: 11,
    color: '#D64545',
    fontWeight: '900',
  },

  destinationButton: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  destinationButtonText: {
    marginLeft: 7,
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modalCard: {
    width: '100%',
    maxWidth: 420,
    padding: 22,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  modalClose: {
    position: 'absolute',
    top: 13,
    right: 13,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },

  modalSuccessIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 13,
  },

  modalDangerIcon: {
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
    fontSize: 19,
    color: '#222A2C',
    fontWeight: '900',
  },

  modalDescription: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 16,
    color: '#777777',
    fontWeight: '600',
  },

  safetyBox: {
    marginTop: 17,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
  },

  safetyRow: {
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  safetyText: {
    marginLeft: 8,
    fontSize: 10,
    color: '#444444',
    fontWeight: '700',
  },

  modalFullButton: {
    marginTop: 18,
    height: 49,
    borderRadius: 14,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalFullButtonSmall: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalFullButtonText: {
    marginLeft: 6,
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  shareBox: {
    marginTop: 17,
    padding: 15,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    alignItems: 'center',
  },

  shareLabel: {
    fontSize: 7,
    color: '#999999',
    fontWeight: '900',
    letterSpacing: 1,
  },

  shareId: {
    marginTop: 5,
    fontSize: 13,
    color: '#222A2C',
    fontWeight: '900',
  },

  shareRoute: {
    width: '100%',
    marginTop: 12,
    alignItems: 'center',
  },

  shareRouteText: {
    textAlign: 'center',
    fontSize: 9,
    color: '#555555',
    fontWeight: '700',
  },

  shareArrow: {
    marginVertical: 4,
    fontSize: 15,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  driverCallBox: {
    marginTop: 17,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  callDriverName: {
    marginLeft: 10,
    fontSize: 13,
    color: '#222A2C',
    fontWeight: '900',
  },

  callDriverPhone: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 10,
    color: '#1E9E4A',
    fontWeight: '800',
  },

  modalButtons: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 9,
  },

  secondaryModalButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#F2F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryModalText: {
    fontSize: 10,
    color: '#555555',
    fontWeight: '900',
  },

  dangerModalButton: {
    flex: 1,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#D64545',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dangerModalText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  warningBox: {
    marginTop: 16,
    padding: 13,
    borderRadius: 13,
    backgroundColor: '#FFF2F2',
  },

  warningTitle: {
    fontSize: 10,
    color: '#D64545',
    fontWeight: '900',
  },

  warningText: {
    marginTop: 4,
    fontSize: 9,
    color: '#8A5555',
    lineHeight: 14,
    fontWeight: '600',
  },

  destinationBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 13,
    backgroundColor: '#EAF8EF',
  },

  destinationLabel: {
    fontSize: 7,
    color: '#66806E',
    fontWeight: '900',
  },

  destinationText: {
    marginTop: 5,
    fontSize: 11,
    color: '#222A2C',
    fontWeight: '900',
  },
});