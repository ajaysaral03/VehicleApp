import React, {useMemo, useState} from 'react';
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
  CalendarDays,
  MapPin,
  CarFront,
  ChevronRight,
  CreditCard,
  CheckCircle2,
  Clock3,
  XCircle,
  UserRound,
} from 'lucide-react-native';

type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';

type Booking = {
  id: string;
  car: string;
  location: string;
  date: string;
  status: BookingStatus;
  price: number;
  driver: boolean;
  paymentMethod: string;
  paymentStatus: string;
  paymentId?: string;
  duration?: string;
};

type Props = {
  navigation: any;
  route?: any;
};

const MyBookingsScreen = ({navigation, route}: Props) => {
  const [activeTab, setActiveTab] = useState<
    'Upcoming' | 'Completed' | 'Cancelled'
  >('Upcoming');

  // PaymentMethodsScreen should send the successful booking here:
  // navigation.navigate('MyBookings', {
  //   newBooking: {
  //     id: 'CAR-...',
  //     car: 'Toyota Fortuner',
  //     location: 'Vijay Nagar, Indore',
  //     date: '20 Sep 2026',
  //     status: 'Confirmed',
  //     price: 3200,
  //     driver: true,
  //     paymentMethod: 'UPI',
  //     paymentStatus: 'Paid',
  //     paymentId: 'pay_...',
  //   },
  // });

  const newBooking = route?.params?.newBooking as Booking | undefined;

  const demoUpcoming: Booking[] = [
    {
      id: 'CAR-284631',
      car: 'Toyota Fortuner',
      location: 'Vijay Nagar, Indore',
      date: '20 Sep 2026',
      status: 'Confirmed',
      price: 3200,
      driver: true,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      paymentId: 'pay_demo_284631',
      duration: '1 Day',
    },
    {
      id: 'CAR-193720',
      car: 'Hyundai Creta',
      location: 'Scheme No 54, Indore',
      date: '28 Sep 2026',
      status: 'Confirmed',
      price: 2500,
      driver: false,
      paymentMethod: 'Card',
      paymentStatus: 'Paid',
      paymentId: 'pay_demo_193720',
      duration: '1 Day',
    },
  ];

  const completedBookings: Booking[] = [
    {
      id: 'CAR-112233',
      car: 'Mahindra XUV700',
      location: 'Palasia, Indore',
      date: '10 Aug 2026',
      status: 'Completed',
      price: 2800,
      driver: false,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      paymentId: 'pay_demo_112233',
      duration: '1 Day',
    },
  ];

  const cancelledBookings: Booking[] = [
    {
      id: 'CAR-445566',
      car: 'Kia Seltos',
      location: 'Bhawarkua, Indore',
      date: '05 Aug 2026',
      status: 'Cancelled',
      price: 2200,
      driver: false,
      paymentMethod: 'UPI',
      paymentStatus: 'Refunded',
      paymentId: 'pay_demo_445566',
      duration: '1 Day',
    },
  ];

  const upcomingBookings = useMemo(() => {
    if (!newBooking) {
      return demoUpcoming;
    }

    // Prevent duplicate insertion if the same booking is already present.
    const withoutDuplicate = demoUpcoming.filter(
      item => item.id !== newBooking.id,
    );

    return [newBooking, ...withoutDuplicate];
  }, [newBooking]);

  const currentBookings = useMemo(() => {
    if (activeTab === 'Upcoming') {
      return upcomingBookings;
    }

    if (activeTab === 'Completed') {
      return completedBookings;
    }

    return cancelledBookings;
  }, [activeTab, upcomingBookings]);

  const formatPrice = (price: number) => {
    return `₹${Number(price || 0).toLocaleString('en-IN')}`;
  };

  const getStatusIcon = (status: BookingStatus) => {
    if (status === 'Confirmed') {
      return <CheckCircle2 size={14} color="#137333" />;
    }

    if (status === 'Completed') {
      return <CheckCircle2 size={14} color="#315E3B" />;
    }

    return <XCircle size={14} color="#B3261E" />;
  };

  const getStatusStyle = (status: BookingStatus) => {
    if (status === 'Cancelled') {
      return {
        badge: styles.cancelledBadge,
        text: styles.cancelledText,
      };
    }

    if (status === 'Completed') {
      return {
        badge: styles.completedBadge,
        text: styles.completedText,
      };
    }

    return {
      badge: styles.confirmedBadge,
      text: styles.confirmedText,
    };
  };

  const handleBookingPress = (booking: Booking) => {
    navigation.navigate('BookingDetails', {
      booking,
    });
  };

  const handleBrowseCars = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F6F7F8"
      />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#172022" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>My Bookings</Text>
          <Text style={styles.headerSubtitle}>
            Manage your vehicle bookings
          </Text>
        </View>

        <View style={styles.headerSpace} />
      </View>

      {/* TABS */}
      <View style={styles.tabsContainer}>
        {(['Upcoming', 'Completed', 'Cancelled'] as const).map(tab => {
          const selected = activeTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.85}
              style={[styles.tab, selected && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  selected && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {currentBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <CarFront size={38} color="#6B7375" />
            </View>

            <Text style={styles.emptyTitle}>
              No {activeTab.toLowerCase()} bookings
            </Text>

            <Text style={styles.emptyText}>
              Your {activeTab.toLowerCase()} vehicle bookings will appear
              here.
            </Text>

            {activeTab === 'Upcoming' && (
              <TouchableOpacity
                style={styles.browseButton}
                activeOpacity={0.85}
                onPress={handleBrowseCars}>
                <Text style={styles.browseButtonText}>Browse Cars</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          currentBookings.map((booking, index) => {
            const statusStyle = getStatusStyle(booking.status);

            return (
              <TouchableOpacity
                key={`${booking.id}-${index}`}
                activeOpacity={0.88}
                style={styles.bookingCard}
                onPress={() => handleBookingPress(booking)}>

                {/* NEW PAYMENT SUCCESS LABEL */}
                {newBooking?.id === booking.id &&
                  booking.status === 'Confirmed' && (
                    <View style={styles.newBookingBanner}>
                      <CheckCircle2 size={15} color="#137333" />
                      <Text style={styles.newBookingText}>
                        Payment successful • Booking confirmed
                      </Text>
                    </View>
                  )}

                {/* CAR HEADER */}
                <View style={styles.carHeader}>
                  <View style={styles.carIcon}>
                    <CarFront size={26} color="#172022" />
                  </View>

                  <View style={styles.carInfo}>
                    <Text style={styles.carName} numberOfLines={1}>
                      {booking.car}
                    </Text>

                    <Text style={styles.bookingId}>
                      Booking ID: {booking.id}
                    </Text>
                  </View>

                  <ChevronRight size={21} color="#7B8385" />
                </View>

                {/* DATE */}
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <CalendarDays size={17} color="#4F585A" />
                  </View>

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Rental Date</Text>
                    <Text style={styles.infoValue}>
                      {booking.date}
                    </Text>
                  </View>
                </View>

                {/* LOCATION */}
                <View style={styles.infoRow}>
                  <View style={styles.infoIcon}>
                    <MapPin size={17} color="#4F585A" />
                  </View>

                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Pickup Location</Text>
                    <Text
                      style={styles.infoValue}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {booking.location}
                    </Text>
                  </View>
                </View>

                {/* DURATION + DRIVER */}
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Clock3 size={15} color="#6B7375" />
                    <View>
                      <Text style={styles.metaLabel}>Duration</Text>
                      <Text style={styles.metaValue}>
                        {booking.duration || '1 Day'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.metaItem}>
                    <UserRound size={15} color="#6B7375" />
                    <View>
                      <Text style={styles.metaLabel}>Drive Type</Text>
                      <Text style={styles.metaValue}>
                        {booking.driver ? 'With Driver' : 'Self Drive'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* PAYMENT */}
                <View style={styles.paymentRow}>
                  <View style={styles.paymentLeft}>
                    <CreditCard size={16} color="#6B7375" />
                    <View>
                      <Text style={styles.paymentLabel}>
                        Payment
                      </Text>
                      <Text style={styles.paymentValue}>
                        {booking.paymentMethod || 'Online Payment'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.paidBadge}>
                    <Text style={styles.paidText}>
                      {booking.paymentStatus || 'Paid'}
                    </Text>
                  </View>
                </View>

                {/* BOTTOM */}
                <View style={styles.cardBottom}>
                  <View
                    style={[
                      styles.statusBadge,
                      statusStyle.badge,
                    ]}>
                    {getStatusIcon(booking.status)}
                    <Text
                      style={[
                        styles.statusText,
                        statusStyle.text,
                      ]}>
                      {booking.status}
                    </Text>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Total Amount</Text>
                    <Text style={styles.price}>
                      {formatPrice(booking.price)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },

  header: {
    minHeight: 100,
    marginTop: 20,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 44,
    height: 44,
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
    paddingHorizontal: 12,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172022',
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '500',
    color: '#858D8F',
  },

  headerSpace: {
    width: 44,
    height: 44,
  },

  tabsContainer: {
    marginHorizontal: 18,
    padding: 4,
    borderRadius: 15,
    backgroundColor: '#E7E9EA',
    flexDirection: 'row',
  },

  tab: {
    flex: 1,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },

  activeTab: {
    backgroundColor: '#172022',
  },

  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#697174',
  },

  activeTabText: {
    color: '#FFFFFF',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 45,
  },

  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E7E9EA',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  newBookingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF8EF',
    borderRadius: 11,
    paddingHorizontal: 11,
    paddingVertical: 9,
    marginBottom: 13,
  },

  newBookingText: {
    marginLeft: 7,
    fontSize: 10,
    fontWeight: '800',
    color: '#137333',
  },

  carHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  carIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    backgroundColor: '#F0F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  carName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#172022',
  },

  bookingId: {
    marginTop: 5,
    fontSize: 9,
    fontWeight: '500',
    color: '#92999B',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#F4F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoContent: {
    flex: 1,
    marginLeft: 10,
  },

  infoLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: '#92999B',
  },

  infoValue: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '700',
    color: '#3C4547',
  },

  metaRow: {
    flexDirection: 'row',
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F0',
  },

  metaItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaLabel: {
    marginLeft: 7,
    fontSize: 8,
    color: '#92999B',
  },

  metaValue: {
    marginLeft: 7,
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    color: '#3C4547',
  },

  paymentRow: {
    marginTop: 14,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentLabel: {
    marginLeft: 8,
    fontSize: 8,
    color: '#92999B',
  },

  paymentValue: {
    marginLeft: 8,
    marginTop: 2,
    fontSize: 10,
    fontWeight: '700',
    color: '#3C4547',
  },

  paidBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#EDF8EF',
  },

  paidText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#137333',
  },

  cardBottom: {
    marginTop: 15,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#EEF0F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  statusBadge: {
    minHeight: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  confirmedBadge: {
    backgroundColor: '#EDF8EF',
  },

  completedBadge: {
    backgroundColor: '#EEF5F0',
  },

  cancelledBadge: {
    backgroundColor: '#FDEEEE',
  },

  statusText: {
    marginLeft: 5,
    fontSize: 9,
    fontWeight: '800',
  },

  confirmedText: {
    color: '#137333',
  },

  completedText: {
    color: '#315E3B',
  },

  cancelledText: {
    color: '#B3261E',
  },

  priceContainer: {
    alignItems: 'flex-end',
  },

  priceLabel: {
    fontSize: 8,
    color: '#92999B',
  },

  price: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '900',
    color: '#172022',
  },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 85,
    paddingHorizontal: 25,
  },

  emptyIcon: {
    width: 84,
    height: 84,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E3E4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    marginTop: 17,
    fontSize: 17,
    fontWeight: '800',
    color: '#172022',
  },

  emptyText: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 17,
    color: '#858D8F',
    textAlign: 'center',
  },

  browseButton: {
    marginTop: 19,
    paddingHorizontal: 27,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#172022',
    alignItems: 'center',
    justifyContent: 'center',
  },

  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default MyBookingsScreen;
