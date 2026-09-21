import React, {useMemo, useState} from 'react';
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
  CreditCard,
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

type RouteParams = {
  pickupAddress?: string;
  dropAddress?: string;
  vehicleType?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  fare?: number;
  distanceKm?: number;
  bookingId?: string;
  rideSeconds?: number;
};

type ModalType =
  | 'success'
  | 'payment'
  | 'rating'
  | null;

const DestinationReachedScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const params: RouteParams = route.params || {};

  /* =========================
     TESTING DATA
  ========================= */

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

  const bookingId =
    params.bookingId || 'VHC-2026-0920-7842';

  const rideSeconds =
    Number(params.rideSeconds) || 1420;

  /* =========================
     STATE
  ========================= */

  const [modalType, setModalType] =
    useState<ModalType>(null);

  const [selectedPayment, setSelectedPayment] =
    useState('UPI');

  const [rating, setRating] =
    useState(5);

  const [tip, setTip] =
    useState(0);

  /* =========================
     RIDE TIME
  ========================= */

  const rideTime = useMemo(() => {
    const minutes = Math.floor(rideSeconds / 60);
    const seconds = rideSeconds % 60;

    return `${minutes} min ${String(seconds).padStart(
      2,
      '0',
    )} sec`;
  }, [rideSeconds]);

  /* =========================
     TOTAL
  ========================= */

  const totalAmount = fare + tip;

  /* =========================
     MODAL
  ========================= */

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  /* =========================
     COMPLETE RIDE
  ========================= */

  const completeRide = () => {
    closeModal();

    navigation.navigate(
      'RideCompletedScreen',
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
        paymentMethod: selectedPayment,
        tip,
        totalAmount,
        rating,
      },
    );
  };

  /* =========================
     MODAL CONTENT
  ========================= */

  const renderModal = () => {
    if (modalType === 'success') {
      return (
        <>
          <View style={styles.successCircle}>
            <CheckCircle2
              size={38}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Destination Reached
          </Text>

          <Text style={styles.modalDescription}>
            Your ride has successfully reached the
            destination.
          </Text>

          <View style={styles.modalSummary}>
            <View style={styles.modalSummaryRow}>
              <Text style={styles.modalSummaryLabel}>
                Distance
              </Text>

              <Text style={styles.modalSummaryValue}>
                {distanceKm} km
              </Text>
            </View>

            <View style={styles.modalSummaryRow}>
              <Text style={styles.modalSummaryLabel}>
                Ride Time
              </Text>

              <Text style={styles.modalSummaryValue}>
                {rideTime}
              </Text>
            </View>

            <View style={styles.modalSummaryRow}>
              <Text style={styles.modalSummaryLabel}>
                Final Fare
              </Text>

              <Text style={styles.modalAmount}>
                ₹{fare}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryModalButton}
            onPress={() => {
              closeModal();
              openModal('payment');
            }}>
            <Text style={styles.primaryModalText}>
              Continue to Payment
            </Text>

            <ChevronRight
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </>
      );
    }

    if (modalType === 'payment') {
      return (
        <>
          <View style={styles.paymentCircle}>
            <IndianRupee
              size={34}
              color="#1E9E4A"
            />
          </View>

          <Text style={styles.modalTitle}>
            Complete Payment
          </Text>

          <Text style={styles.modalDescription}>
            Select your preferred payment method.
          </Text>

          <View style={styles.paymentOptions}>
            {['UPI', 'Card', 'Cash'].map(method => {
              const selected =
                selectedPayment === method;

              return (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentOption,
                    selected &&
                      styles.paymentOptionSelected,
                  ]}
                  onPress={() =>
                    setSelectedPayment(method)
                  }>

                  {method === 'UPI' && (
                    <IndianRupee
                      size={19}
                      color={
                        selected
                          ? '#1E9E4A'
                          : '#777777'
                      }
                    />
                  )}

                  {method === 'Card' && (
                    <CreditCard
                      size={19}
                      color={
                        selected
                          ? '#1E9E4A'
                          : '#777777'
                      }
                    />
                  )}

                  {method === 'Cash' && (
                    <IndianRupee
                      size={19}
                      color={
                        selected
                          ? '#1E9E4A'
                          : '#777777'
                      }
                    />
                  )}

                  <Text
                    style={[
                      styles.paymentOptionText,
                      selected &&
                        styles.paymentOptionTextSelected,
                    ]}>
                    {method}
                  </Text>

                  {selected && (
                    <Check
                      size={17}
                      color="#1E9E4A"
                      style={styles.paymentCheck}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.paymentTotal}>
            <Text style={styles.paymentTotalLabel}>
              Total Payable
            </Text>

            <Text style={styles.paymentTotalAmount}>
              ₹{totalAmount}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryModalButton}
            onPress={completeRide}>
            <Check
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.primaryModalText}>
              Pay ₹{totalAmount} & Complete
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    if (modalType === 'rating') {
      return (
        <>
          <View style={styles.ratingCircle}>
            <Star
              size={34}
              color="#F5A623"
              fill="#F5A623"
            />
          </View>

          <Text style={styles.modalTitle}>
            Rate Your Ride
          </Text>

          <Text style={styles.modalDescription}>
            How was your experience with {driverName}?
          </Text>

          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map(value => (
              <TouchableOpacity
                key={value}
                onPress={() => setRating(value)}>
                <Star
                  size={34}
                  color="#F5A623"
                  fill={
                    value <= rating
                      ? '#F5A623'
                      : 'transparent'
                  }
                  style={styles.ratingStar}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.ratingValue}>
            {rating}/5
          </Text>

          <TouchableOpacity
            style={styles.primaryModalButton}
            onPress={completeRide}>
            <Text style={styles.primaryModalText}>
              Submit Rating
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    return null;
  };

  /* =========================
     UI
  ========================= */

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
              Destination Reached
            </Text>

            <View style={styles.completedRow}>
              <CheckCircle2
                size={13}
                color="#1E9E4A"
              />

              <Text style={styles.completedText}>
                RIDE COMPLETED
              </Text>
            </View>
          </View>

          <View style={styles.headerButton}>
            <Check
              size={20}
              color="#1E9E4A"
            />
          </View>
        </View>

        {/* SUCCESS BANNER */}

        <View style={styles.successBanner}>
          <View style={styles.bannerIcon}>
            <CheckCircle2
              size={30}
              color="#1E9E4A"
            />
          </View>

          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              You have arrived!
            </Text>

            <Text style={styles.bannerText}>
              Your driver has reached the destination
              successfully.
            </Text>
          </View>
        </View>

        {/* DESTINATION */}

        <View style={styles.destinationCard}>
          <View style={styles.destinationHeader}>
            <Text style={styles.sectionTitle}>
              Destination
            </Text>

            <View style={styles.completedBadge}>
              <Check
                size={11}
                color="#1E9E4A"
              />

              <Text style={styles.completedBadgeText}>
                REACHED
              </Text>
            </View>
          </View>

          <View style={styles.destinationRow}>
            <View style={styles.destinationIcon}>
              <MapPin
                size={21}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.destinationContent}>
              <Text style={styles.destinationLabel}>
                DROP LOCATION
              </Text>

              <Text style={styles.destinationAddress}>
                {dropAddress}
              </Text>
            </View>
          </View>
        </View>

        {/* TRIP SUMMARY */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Trip Summary
          </Text>

          <View style={styles.summaryGrid}>

            <View style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                <Navigation
                  size={18}
                  color="#1E9E4A"
                />
              </View>

              <Text style={styles.summaryLabel}>
                DISTANCE
              </Text>

              <Text style={styles.summaryValue}>
                {distanceKm} km
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                <Clock3
                  size={18}
                  color="#1E9E4A"
                />
              </View>

              <Text style={styles.summaryLabel}>
                RIDE TIME
              </Text>

              <Text style={styles.summaryValue}>
                {rideTime}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                <Car
                  size={18}
                  color="#1E9E4A"
                />
              </View>

              <Text style={styles.summaryLabel}>
                VEHICLE
              </Text>

              <Text style={styles.summaryValue}>
                {vehicleType}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <View style={styles.summaryIcon}>
                <IndianRupee
                  size={18}
                  color="#1E9E4A"
                />
              </View>

              <Text style={styles.summaryLabel}>
                FARE
              </Text>

              <Text style={styles.summaryValue}>
                ₹{fare}
              </Text>
            </View>

          </View>
        </View>

        {/* DRIVER */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>
              Driver Details
            </Text>

            <View style={styles.verifiedBadge}>
              <ShieldCheck
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
                size={27}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>
                {driverName}
              </Text>

              <View style={styles.driverRating}>
                <Star
                  size={13}
                  color="#F5A623"
                  fill="#F5A623"
                />

                <Text style={styles.ratingText}>
                  4.9
                </Text>

                <Text style={styles.tripText}>
                  • 1,248 trips
                </Text>
              </View>

              <Text style={styles.vehicleText}>
                {vehicleType} • {vehicleNumber}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.callButton}
              onPress={() => {}}>
              <Phone
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* FARE */}

        <View style={styles.fareCard}>
          <View style={styles.fareHeader}>
            <Text style={styles.sectionTitle}>
              Fare Breakdown
            </Text>

            <IndianRupee
              size={19}
              color="#1E9E4A"
            />
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>
              Base Fare
            </Text>

            <Text style={styles.fareValue}>
              ₹{fare}
            </Text>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>
              Service Charge
            </Text>

            <Text style={styles.fareValue}>
              Included
            </Text>
          </View>

          <View style={styles.fareDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total Fare
            </Text>

            <Text style={styles.totalAmount}>
              ₹{fare}
            </Text>
          </View>
        </View>

        {/* TIP */}

        <View style={styles.card}>
          <View style={styles.tipHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Add a Tip
              </Text>

              <Text style={styles.tipSubtext}>
                Optional • Thank your driver
              </Text>
            </View>

            <Text style={styles.tipAmount}>
              ₹{tip}
            </Text>
          </View>

          <View style={styles.tipOptions}>
            {[0, 20, 30, 50].map(value => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.tipButton,
                  tip === value &&
                    styles.tipButtonSelected,
                ]}
                onPress={() => setTip(value)}>

                <Text
                  style={[
                    styles.tipButtonText,
                    tip === value &&
                      styles.tipButtonTextSelected,
                  ]}>
                  {value === 0
                    ? 'No Tip'
                    : `₹${value}`}
                </Text>

              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* PAYMENT */}

        <TouchableOpacity
          style={styles.paymentCard}
          onPress={() => openModal('payment')}>

          <View style={styles.paymentLeft}>
            <View style={styles.paymentIcon}>
              <CreditCard
                size={20}
                color="#1E9E4A"
              />
            </View>

            <View>
              <Text style={styles.paymentTitle}>
                Payment Method
              </Text>

              <Text style={styles.paymentSubtitle}>
                {selectedPayment} • ₹{totalAmount}
              </Text>
            </View>
          </View>

          <ChevronRight
            size={20}
            color="#999999"
          />
        </TouchableOpacity>

        {/* BOOKING */}

        <View style={styles.bookingBox}>
          <Text style={styles.bookingLabel}>
            BOOKING ID
          </Text>

          <Text style={styles.bookingId}>
            {bookingId}
          </Text>

          <Text style={styles.demoText}>
            Demo Testing Data
          </Text>
        </View>

      </ScrollView>

      {/* BOTTOM */}

      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomSmall}>
            TOTAL
          </Text>

          <Text style={styles.bottomAmount}>
            ₹{totalAmount}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => openModal('success')}>

          <Check
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.completeButtonText}>
            Complete Ride
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
              style={styles.closeButton}
              onPress={closeModal}>
              <X
                size={18}
                color="#777777"
              />
            </TouchableOpacity>

            {renderModal()}

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DestinationReachedScreen;

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F7',
  },

  scrollContent: {
    paddingBottom: 120,
  },

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
    borderColor: '#E8E8E8',
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

  completedRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  completedText: {
    marginLeft: 4,
    fontSize: 8,
    color: '#1E9E4A',
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  successBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  bannerIcon: {
    width: 53,
    height: 53,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bannerContent: {
    flex: 1,
    marginLeft: 12,
  },

  bannerTitle: {
    fontSize: 16,
    color: '#222A2C',
    fontWeight: '900',
  },

  bannerText: {
    marginTop: 4,
    fontSize: 9,
    color: '#66756B',
    lineHeight: 14,
    fontWeight: '600',
  },

  destinationCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  destinationHeader: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 14,
    color: '#222A2C',
    fontWeight: '900',
  },

  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  completedBadgeText: {
    marginLeft: 3,
    fontSize: 7,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  destinationIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  destinationContent: {
    flex: 1,
    marginLeft: 11,
  },

  destinationLabel: {
    fontSize: 7,
    color: '#999999',
    fontWeight: '900',
  },

  destinationAddress: {
    marginTop: 4,
    fontSize: 12,
    color: '#333333',
    fontWeight: '800',
    lineHeight: 17,
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  summaryGrid: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  summaryItem: {
    width: '50%',
    paddingVertical: 10,
  },

  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryLabel: {
    marginTop: 7,
    fontSize: 7,
    color: '#999999',
    fontWeight: '900',
  },

  summaryValue: {
    marginTop: 3,
    fontSize: 12,
    color: '#222A2C',
    fontWeight: '900',
  },

  cardHeader: {
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginLeft: 4,
    fontSize: 7,
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
    fontSize: 15,
    color: '#222A2C',
    fontWeight: '900',
  },

  driverRating: {
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

  tripText: {
    marginLeft: 5,
    fontSize: 9,
    color: '#999999',
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

  fareCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },

  fareHeader: {
    marginBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  fareRow: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  fareLabel: {
    fontSize: 10,
    color: '#777777',
    fontWeight: '600',
  },

  fareValue: {
    fontSize: 10,
    color: '#444444',
    fontWeight: '800',
  },

  fareDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 5,
  },

  totalRow: {
    paddingTop: 7,
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
    fontSize: 20,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  tipSubtext: {
    marginTop: 4,
    fontSize: 8,
    color: '#999999',
    fontWeight: '600',
  },

  tipAmount: {
    fontSize: 17,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  tipOptions: {
    marginTop: 13,
    flexDirection: 'row',
    gap: 7,
  },

  tipButton: {
    flex: 1,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#F4F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipButtonSelected: {
    backgroundColor: '#EAF8EF',
    borderWidth: 1,
    borderColor: '#1E9E4A',
  },

  tipButtonText: {
    fontSize: 9,
    color: '#777777',
    fontWeight: '800',
  },

  tipButtonTextSelected: {
    color: '#1E9E4A',
  },

  paymentCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 15,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentTitle: {
    marginLeft: 10,
    fontSize: 11,
    color: '#222A2C',
    fontWeight: '900',
  },

  paymentSubtitle: {
    marginLeft: 10,
    marginTop: 4,
    fontSize: 9,
    color: '#1E9E4A',
    fontWeight: '800',
  },

  bookingBox: {
    alignItems: 'center',
    marginVertical: 8,
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

  demoText: {
    marginTop: 5,
    fontSize: 8,
    color: '#1E9E4A',
    fontWeight: '800',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 9,
    paddingBottom: 13,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  bottomPrice: {
    width: 80,
  },

  bottomSmall: {
    fontSize: 7,
    color: '#999999',
    fontWeight: '900',
  },

  bottomAmount: {
    marginTop: 2,
    fontSize: 20,
    color: '#222A2C',
    fontWeight: '900',
  },

  completeButton: {
    flex: 1,
    height: 53,
    borderRadius: 15,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  completeButtonText: {
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

  closeButton: {
    position: 'absolute',
    right: 13,
    top: 13,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },

  successCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 13,
  },

  paymentCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 13,
  },

  ratingCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF5DF',
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

  modalSummary: {
    marginTop: 17,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
  },

  modalSummaryRow: {
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  modalSummaryLabel: {
    fontSize: 10,
    color: '#777777',
    fontWeight: '700',
  },

  modalSummaryValue: {
    fontSize: 10,
    color: '#222A2C',
    fontWeight: '900',
  },

  modalAmount: {
    fontSize: 14,
    color: '#1E9E4A',
    fontWeight: '900',
  },

  primaryModalButton: {
    marginTop: 18,
    height: 49,
    borderRadius: 14,
    backgroundColor: '#1E9E4A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryModalText: {
    marginRight: 5,
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  paymentOptions: {
    marginTop: 16,
    gap: 8,
  },

  paymentOption: {
    height: 48,
    paddingHorizontal: 13,
    borderRadius: 13,
    backgroundColor: '#F5F6F6',
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentOptionSelected: {
    backgroundColor: '#EAF8EF',
    borderWidth: 1,
    borderColor: '#1E9E4A',
  },

  paymentOptionText: {
    marginLeft: 9,
    fontSize: 10,
    color: '#777777',
    fontWeight: '800',
  },

  paymentOptionTextSelected: {
    color: '#1E9E4A',
  },

  paymentCheck: {
    marginLeft: 'auto',
  },

  paymentTotal: {
    marginTop: 15,
    padding: 13,
    borderRadius: 13,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paymentTotalLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  paymentTotalAmount: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '900',
  },

  ratingStars: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  ratingStar: {
    marginHorizontal: 3,
  },

  ratingValue: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    color: '#F5A623',
    fontWeight: '900',
  },
});