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
  Phone,
  MessageCircle,
  MapPin,
  CarFront,
  Star,
  Navigation,
} from 'lucide-react-native';

const DriverDetailsScreen = ({navigation, route}: any) => {
  const booking = route?.params?.booking || {};

  const driver = {
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    rating: '4.8',
    trips: '245 Trips',
    vehicle: booking.car || 'Toyota Fortuner',
    vehicleNumber: 'MP 09 AB 1234',
  };

  const handleCall = () => {
    Alert.alert(
      'Call Driver',
      `Call ${driver.name}\n${driver.phone}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Call',
          onPress: () => {},
        },
      ],
    );
  };

  const handleMessage = () => {
    Alert.alert(
      'Message Driver',
      `You can message ${driver.name} here.`,
    );
  };

  const handleTracking = () => {
    navigation.navigate('LiveTracking', {
      booking: booking,
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
          <ArrowLeft
            size={22}
            color="#222A2C"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Driver Details
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* DRIVER PROFILE */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <UserRound
              size={42}
              color="#222A2C"
            />
          </View>

          <Text style={styles.driverName}>
            {driver.name}
          </Text>

          <View style={styles.ratingRow}>
            <Star
              size={15}
              color="#222A2C"
              fill="#222A2C"
            />

            <Text style={styles.rating}>
              {driver.rating}
            </Text>

            <Text style={styles.trips}>
              • {driver.trips}
            </Text>
          </View>

          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>
              ✓ Verified Driver
            </Text>
          </View>
        </View>

        {/* CONTACT BUTTONS */}
        <View style={styles.contactRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.contactButton}
            onPress={handleCall}>
            <Phone
              size={19}
              color="#FFFFFF"
            />

            <Text style={styles.contactButtonText}>
              Call
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.messageButton}
            onPress={handleMessage}>
            <MessageCircle
              size={19}
              color="#222A2C"
            />

            <Text style={styles.messageButtonText}>
              Message
            </Text>
          </TouchableOpacity>
        </View>

        {/* VEHICLE */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Vehicle Details
          </Text>

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <CarFront
                size={28}
                color="#222A2C"
              />
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>
                {driver.vehicle}
              </Text>

              <Text style={styles.vehicleNumber}>
                {driver.vehicleNumber}
              </Text>
            </View>
          </View>

          <View style={styles.vehicleSpecs}>
            <View style={styles.spec}>
              <Text style={styles.specLabel}>
                Seats
              </Text>
              <Text style={styles.specValue}>
                5
              </Text>
            </View>

            <View style={styles.spec}>
              <Text style={styles.specLabel}>
                Transmission
              </Text>
              <Text style={styles.specValue}>
                Automatic
              </Text>
            </View>

            <View style={styles.spec}>
              <Text style={styles.specLabel}>
                Fuel
              </Text>
              <Text style={styles.specValue}>
                Petrol
              </Text>
            </View>
          </View>
        </View>

        {/* PICKUP LOCATION */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Pickup Information
          </Text>

          <View style={styles.locationRow}>
            <View style={styles.locationIcon}>
              <MapPin
                size={20}
                color="#222A2C"
              />
            </View>

            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>
                Pickup Location
              </Text>

              <Text
                style={styles.locationValue}
                numberOfLines={2}>
                {booking.location ||
                  'Vijay Nagar, Indore'}
              </Text>
            </View>
          </View>

          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>
              Driver Arrival
            </Text>

            <Text style={styles.timeValue}>
              Approximately 12 minutes
            </Text>
          </View>
        </View>

        {/* BOOKING INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Booking Information
          </Text>

          <InfoRow
            label="Booking ID"
            value={booking.id || 'CAR-284631'}
          />

          <InfoRow
            label="Rental Date"
            value={booking.date || '20 Sep 2026'}
          />

          <InfoRow
            label="Drive Type"
            value="With Driver"
          />
        </View>

        {/* TRACK DRIVER */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.trackButton}
          onPress={handleTracking}>
          <Navigation
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.trackButtonText}>
            Track Driver Live
          </Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Driver contact details are available only
          for your active booking.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
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

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    paddingVertical: 24,
  },

  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  driverName: {
    marginTop: 13,
    fontSize: 20,
    fontWeight: '800',
    color: '#222222',
  },

  ratingRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },

  trips: {
    marginLeft: 5,
    fontSize: 11,
    color: '#888888',
  },

  verifiedBadge: {
    marginTop: 10,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#EEF1F0',
  },

  verifiedText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#222A2C',
  },

  contactRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 13,
  },

  contactButton: {
    flex: 1,
    height: 51,
    borderRadius: 26,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  messageButton: {
    flex: 1,
    height: 51,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  messageButtonText: {
    color: '#222A2C',
    fontSize: 13,
    fontWeight: '700',
  },

  card: {
    marginTop: 13,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 14,
  },

  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },

  vehicleName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#222222',
  },

  vehicleNumber: {
    marginTop: 4,
    fontSize: 11,
    color: '#777777',
  },

  vehicleSpecs: {
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  spec: {
    flex: 1,
  },

  specLabel: {
    fontSize: 9,
    color: '#999999',
  },

  specValue: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#333333',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationInfo: {
    flex: 1,
    marginLeft: 11,
  },

  locationLabel: {
    fontSize: 9,
    color: '#999999',
  },

  locationValue: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },

  timeBox: {
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },

  timeLabel: {
    fontSize: 9,
    color: '#999999',
  },

  timeValue: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
    color: '#333333',
  },

  infoRow: {
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoLabel: {
    fontSize: 10,
    color: '#888888',
  },

  infoValue: {
    maxWidth: '55%',
    fontSize: 11,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'right',
  },

  trackButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#222A2C',
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  bottomText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 9,
    lineHeight: 14,
    color: '#999999',
  },
});

export default DriverDetailsScreen;

