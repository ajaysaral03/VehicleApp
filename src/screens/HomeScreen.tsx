import React, {useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {
  Search,
  SlidersHorizontal,
  Bell,
  Heart,
  Star,
  MapPin,
  Users,
  Bike,
  Car,
  ChevronRight,
  Fuel,
  Gauge,
} from 'lucide-react-native';

import Footer from '../components/Footer';

/* =========================================================
   TYPES
========================================================= */

type VehicleType = 'All' | 'Cars' | 'Bikes' | 'Auto';

interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  name: string;
  rating: string;
  location: string;

  price: string;
  priceUnit: string;

  image: string;

  seats?: string;
  fuelType: string;
  mileage: string;
  year: string;
  transmission: string;

  description: string;

  features: string[];
}

/* =========================================================
   VEHICLES
   INDIA / INDORE
========================================================= */

const vehicles: Vehicle[] = [

  /* =======================================================
     CARS
  ======================================================= */

  {
    id: 'car-1',
    type: 'Cars',
    brand: 'Maruti',
    name: 'Maruti Swift',
    rating: '4.8',
    location: 'Vijay Nagar, Indore',

    price: '₹1,200',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=85',

    seats: '5 Seats',
    fuelType: 'Petrol',
    mileage: '24.8 km/l',
    year: '2026',
    transmission: 'Manual',

    description:
      'Comfortable Indian hatchback suitable for city rides, office travel and family trips.',

    features: [
      'Air Conditioning',
      'Bluetooth',
      'USB Charging',
      '5 Seats',
      'Petrol',
      'Manual',
    ],
  },

  {
    id: 'car-2',
    type: 'Cars',
    brand: 'Maruti',
    name: 'Maruti Dzire',
    rating: '4.9',
    location: 'Palasia, Indore',

    price: '₹1,500',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85',

    seats: '5 Seats',
    fuelType: 'CNG',
    mileage: '33.7 km/kg',
    year: '2026',
    transmission: 'Manual',

    description:
      'Practical sedan for city travel, family trips and comfortable long-distance journeys.',

    features: [
      'Air Conditioning',
      'Bluetooth',
      'CNG',
      '5 Seats',
      'USB Charging',
      'Manual',
    ],
  },

  {
    id: 'car-3',
    type: 'Cars',
    brand: 'Maruti',
    name: 'Maruti WagonR',
    rating: '4.7',
    location: 'Bhawarkua, Indore',

    price: '₹1,000',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1000&q=85',

    seats: '5 Seats',
    fuelType: 'CNG',
    mileage: '25.2 km/kg',
    year: '2025',
    transmission: 'Manual',

    description:
      'Spacious and economical hatchback suitable for everyday city driving.',

    features: [
      'Air Conditioning',
      'Bluetooth',
      'CNG',
      '5 Seats',
      'USB Charging',
      'Manual',
    ],
  },

  {
    id: 'car-4',
    type: 'Cars',
    brand: 'Tata',
    name: 'Tata Nexon',
    rating: '4.8',
    location: 'Rau, Indore',

    price: '₹1,700',
    priceUnit: '/Day',

    image:
      'https://images.hindustantimes.com/img/2022/11/07/960x540/_363fb0fc-49f4-11e8-8699-4e17514b3033_1667800519825_1667800519825.jpg',

    seats: '5 Seats',
    fuelType: 'Petrol',
    mileage: '17.4 km/l',
    year: '2025',
    transmission: 'Manual',

    description:
      'Compact SUV with comfortable interiors and good road presence.',

    features: [
      'Air Conditioning',
      'Bluetooth',
      'GPS',
      'USB Charging',
      '5 Seats',
      'Petrol',
    ],
  },

  {
    id: 'car-5',
    type: 'Cars',
    brand: 'Hyundai',
    name: 'Hyundai Creta',
    rating: '4.9',
    location: 'Geeta Bhawan, Indore',

    price: '₹2,200',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85',

    seats: '5 Seats',
    fuelType: 'Petrol',
    mileage: '17 km/l',
    year: '2025',
    transmission: 'Automatic',

    description:
      'Premium SUV suitable for family travel and comfortable highway journeys.',

    features: [
      'Air Conditioning',
      'Bluetooth',
      'GPS Navigation',
      'USB Charging',
      '5 Seats',
      'Automatic',
    ],
  },

  {
    id: 'car-6',
    type: 'Cars',
    brand: 'Maruti',
    name: 'Maruti Baleno',
    rating: '4.8',
    location: 'Scheme No. 54, Indore',

    price: '₹1,300',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85',

    seats: '5 Seats',
    fuelType: 'Petrol',
    mileage: '22.9 km/l',
    year: '2025',
    transmission: 'Manual',

    description:
      'Premium hatchback with comfortable seating and efficient city performance.',

    features: [
      'Air Conditioning',
      'Bluetooth',
      'USB Charging',
      '5 Seats',
      'Petrol',
      'Manual',
    ],
  },

  /* =======================================================
     BIKES
  ======================================================= */

  {
    id: 'bike-1',
    type: 'Bikes',
    brand: 'Honda',
    name: 'Honda Activa 6G',
    rating: '4.9',
    location: 'Vijay Nagar, Indore',

    price: '₹450',
    priceUnit: '/Day',

    image:
      'https://auto.hindustantimes.com/_next/image?q=75&url=https%3A%2F%2Fauto.hindustantimes.com%2Fcms-images%2Fhonda_activa6g%2Fimages%2Fexterior_honda-activa-6g_right-view_600x400.jpg&w=1200',

    fuelType: 'Petrol',
    mileage: '59.5 km/l',
    year: '2026',
    transmission: 'Automatic',

    description:
      'Popular Indian scooter ideal for city commuting, shopping and daily travel.',

    features: [
      'Self Start',
      'Helmet',
      'Petrol',
      'Automatic',
      'USB Charging',
      'City Ride',
    ],
  },

  {
    id: 'bike-2',
    type: 'Bikes',
    brand: 'Royal Enfield',
    name: 'Classic 350',
    rating: '4.9',
    location: 'Palasia, Indore',

    price: '₹900',
    priceUnit: '/Day',

    image:
      'https://www.royalenfield.com/content/dam/royal-enfield/india/motorcycles/classic-350/colours/studio-shots/medallion-bronze/classic-350-medallion-bronze-000.jpg',

    fuelType: 'Petrol',
    mileage: '41.55 km/l',
    year: '2026',
    transmission: 'Manual',

    description:
      'Classic motorcycle suitable for city rides, highway trips and weekend travel.',

    features: [
      'Disc Brake',
      'Helmet',
      'Petrol',
      'Manual',
      'Long Ride',
      'Self Start',
    ],
  },

  {
    id: 'bike-3',
    type: 'Bikes',
    brand: 'Hero',
    name: 'Hero Splendor Plus',
    rating: '4.7',
    location: 'Bhawarkua, Indore',

    price: '₹350',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85',

    fuelType: 'Petrol',
    mileage: '70 km/l',
    year: '2025',
    transmission: 'Manual',

    description:
      'Fuel-efficient motorcycle suitable for affordable everyday transportation.',

    features: [
      'Self Start',
      'Helmet',
      'Petrol',
      'Manual',
      '70 km/l',
      'Economical',
    ],
  },

  {
    id: 'bike-4',
    type: 'Bikes',
    brand: 'TVS',
    name: 'Apache RTR 160',
    rating: '4.8',
    location: 'Rau, Indore',

    price: '₹650',
    priceUnit: '/Day',

    image:
      'https://www.tvsmotor.com/api/v1/Content/GetImage?url=/content/dam/tvs/apache/apache-rtr-160-4v/gallery/Apache-RTR-160-4V-Blue.png',

    fuelType: 'Petrol',
    mileage: '45 km/l',
    year: '2026',
    transmission: 'Manual',

    description:
      'Sporty Indian motorcycle suitable for city rides and weekend trips.',

    features: [
      'Disc Brake',
      'Helmet',
      'Petrol',
      'Manual',
      '45 km/l',
      'Sports Mode',
    ],
  },

  {
    id: 'bike-5',
    type: 'Bikes',
    brand: 'Bajaj',
    name: 'Pulsar 150',
    rating: '4.8',
    location: 'MR 10, Indore',

    price: '₹550',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1558980664-10ea2e6d8b4e?auto=format&fit=crop&w=1000&q=85',

    fuelType: 'Petrol',
    mileage: '47 km/l',
    year: '2025',
    transmission: 'Manual',

    description:
      'Reliable motorcycle for daily city travel and medium-distance rides.',

    features: [
      'Disc Brake',
      'Helmet',
      'Petrol',
      'Manual',
      '47 km/l',
      'Self Start',
    ],
  },

  {
    id: 'bike-6',
    type: 'Bikes',
    brand: 'Honda',
    name: 'Honda Shine',
    rating: '4.7',
    location: 'Sapna Sangeeta, Indore',

    price: '₹400',
    priceUnit: '/Day',

    image:
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1000&q=85',

    fuelType: 'Petrol',
    mileage: '55 km/l',
    year: '2025',
    transmission: 'Manual',

    description:
      'Comfortable commuter motorcycle designed for everyday city travel.',

    features: [
      'Self Start',
      'Helmet',
      'Petrol',
      'Manual',
      '55 km/l',
      'Comfort Ride',
    ],
  },

  /* =======================================================
     AUTO
  ======================================================= */

  {
    id: 'auto-1',
    type: 'Auto',
    brand: 'Bajaj',
    name: 'Bajaj RE',
    rating: '4.6',
    location: 'Rajwada, Indore',

    price: '₹18',
    priceUnit: '/Km',

    image:
      'https://assets.telegraphindia.com/abp/2023/Oct/1696255645_auto.jpg',

    seats: '3 Passengers',
    fuelType: 'CNG',
    mileage: '35 km/kg',
    year: '2026',
    transmission: 'Manual',

    description:
      'Indian auto-rickshaw suitable for local city transportation.',

    features: [
      'CNG',
      '3 Passengers',
      'City Ride',
      'Manual',
      '35 km/kg',
      'Local Ride',
    ],
  },

  {
    id: 'auto-2',
    type: 'Auto',
    brand: 'Bajaj',
    name: 'Bajaj Maxima',
    rating: '4.5',
    location: 'Railway Station, Indore',

    price: '₹16',
    priceUnit: '/Km',

    image:
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=85',

    seats: '3 Passengers',
    fuelType: 'CNG',
    mileage: '32 km/kg',
    year: '2025',
    transmission: 'Manual',

    description:
      'Practical three-wheeler for local transportation and city rides.',

    features: [
      'CNG',
      '3 Passengers',
      'City Ride',
      'Manual',
      '32 km/kg',
      'Local Ride',
    ],
  },

  {
    id: 'auto-3',
    type: 'Auto',
    brand: 'Piaggio',
    name: 'Piaggio Ape',
    rating: '4.5',
    location: 'Bhawarkua, Indore',

    price: '₹17',
    priceUnit: '/Km',

    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=85',

    seats: '3 Passengers',
    fuelType: 'CNG',
    mileage: '36 km/kg',
    year: '2025',
    transmission: 'Manual',

    description:
      'Three-wheeler designed for practical local city transportation.',

    features: [
      'CNG',
      '3 Passengers',
      'City Ride',
      'Manual',
      '36 km/kg',
      'Local Ride',
    ],
  },

  {
    id: 'auto-4',
    type: 'Auto',
    brand: 'Bajaj',
    name: 'Bajaj Compact',
    rating: '4.6',
    location: 'Vijay Nagar, Indore',

    price: '₹18',
    priceUnit: '/Km',

    image:
      'https://images.unsplash.com/photo-1610631066894-2c8b2b5b6b0e?auto=format&fit=crop&w=1000&q=85',

    seats: '3 Passengers',
    fuelType: 'CNG',
    mileage: '34 km/kg',
    year: '2025',
    transmission: 'Manual',

    description:
      'Compact city auto suitable for short-distance passenger rides.',

    features: [
      'CNG',
      '3 Passengers',
      'City Ride',
      'Manual',
      '34 km/kg',
      'Local Ride',
    ],
  },
];

/* =========================================================
   VEHICLE TYPES
========================================================= */

const vehicleTypes = [
  {
    name: 'All',
    icon: Car,
  },
  {
    name: 'Cars',
    icon: Car,
  },
  {
    name: 'Bikes',
    icon: Bike,
  },
  {
    name: 'Auto',
    icon: Car,
  },
];

/* =========================================================
   BRANDS
========================================================= */

const brands = [
  'Maruti',
  'Hyundai',
  'Tata',
  'Honda',
  'Hero',
  'TVS',
  'Bajaj',
  'Royal Enfield',
];

/* =========================================================
   HOME SCREEN
========================================================= */

const HomeScreen = ({navigation}: any) => {

  const [selectedType, setSelectedType] =
    useState<VehicleType>('All');

  const [searchText, setSearchText] =
    useState('');

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredVehicles = useMemo(() => {

    let data = vehicles;

    if (selectedType !== 'All') {
      data = data.filter(
        vehicle => vehicle.type === selectedType,
      );
    }

    if (searchText.trim()) {

      const search =
        searchText.toLowerCase().trim();

      data = data.filter(vehicle =>
        vehicle.name
          .toLowerCase()
          .includes(search) ||

        vehicle.brand
          .toLowerCase()
          .includes(search) ||

        vehicle.location
          .toLowerCase()
          .includes(search) ||

        vehicle.type
          .toLowerCase()
          .includes(search),
      );
    }

    return data;

  }, [selectedType, searchText]);

  /* =======================================================
     DETAILS
  ======================================================= */

  const openVehicleDetails = (
    vehicle: Vehicle,
  ) => {

    navigation.navigate('CarDetails', {
      car: vehicle,
    });

  };

  /* =======================================================
     SCREEN
  ======================================================= */

  return (
    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F6F6F6"
      />

      <View style={styles.container}>

        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <View style={styles.logoRow}>

            <View style={styles.logoCircle}>

              <Text style={styles.logoCar}>
                🚗
              </Text>

            </View>

            <View>

              <Text style={styles.logoText}>
                Qent
              </Text>

              <View style={styles.locationSmall}>

                <MapPin
                  size={10}
                  color="#777"
                />

                <Text
                  style={styles.locationSmallText}>

                  Indore, Madhya Pradesh

                </Text>

              </View>

            </View>

          </View>

          <View style={styles.headerRight}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.notificationButton}
              onPress={() =>
                navigation.navigate(
                  'Notification',
                )
              }>

              <Bell
                size={23}
                color="#555"
                strokeWidth={1.6}
              />

              <View
                style={styles.notificationBadge}>

                <Text
                  style={styles.badgeText}>

                  2

                </Text>

              </View>

            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  'Profile',
                )
              }>

              <Image
                source={{
                  uri:
                    'https://randomuser.me/api/portraits/men/32.jpg',
                }}
                style={styles.profileImage}
              />

            </TouchableOpacity>

          </View>

        </View>

        {/* =================================================
            SCROLL
        ================================================= */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>

          {/* =================================================
              TITLE
          ================================================= */}

          <View
            style={styles.greetingSection}>

            <Text style={styles.greeting}>
              Find your ride
            </Text>

            <Text
              style={styles.greetingSub}>

              Cars, bikes & autos near you

            </Text>

          </View>

          {/* =================================================
              SEARCH
          ================================================= */}

          <View style={styles.searchRow}>

            <View style={styles.searchBox}>

              <Search
                size={22}
                color="#777"
                strokeWidth={1.6}
              />

              <TextInput
                placeholder="Search car, bike, auto..."
                placeholderTextColor="#999"
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
              />

              {searchText.length > 0 && (

                <TouchableOpacity
                  onPress={() =>
                    setSearchText('')
                  }>

                  <Text
                    style={styles.clearText}>

                    ×

                  </Text>

                </TouchableOpacity>

              )}

            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.filterButton}>

              <SlidersHorizontal
                size={22}
                color="#555"
                strokeWidth={1.5}
              />

            </TouchableOpacity>

          </View>

          {/* =================================================
              VEHICLE TYPE
          ================================================= */}

          <View
            style={styles.sectionHeader}>

            <Text
              style={styles.sectionTitle}>

              Vehicle Type

            </Text>

          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.typeScroll
            }>

            {vehicleTypes.map(item => {

              const Icon = item.icon;

              const active =
                selectedType === item.name;

              return (

                <TouchableOpacity
                  key={item.name}
                  activeOpacity={0.85}
                  style={[
                    styles.typeItem,
                    active &&
                      styles.typeItemActive,
                  ]}
                  onPress={() =>
                    setSelectedType(
                      item.name as VehicleType,
                    )
                  }>

                  <View
                    style={[
                      styles.typeIcon,
                      active &&
                        styles.typeIconActive,
                    ]}>

                    <Icon
                      size={21}
                      color={
                        active
                          ? '#FFFFFF'
                          : '#555555'
                      }
                    />

                  </View>

                  <Text
                    style={[
                      styles.typeText,
                      active &&
                        styles.typeTextActive,
                    ]}>

                    {item.name}

                  </Text>

                </TouchableOpacity>

              );

            })}

          </ScrollView>

          {/* =================================================
              BRANDS
          ================================================= */}

          <View
            style={styles.sectionHeader}>

            <Text
              style={styles.sectionTitle}>

              Popular Brands

            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'Search',
                )
              }>

              <Text
                style={styles.viewAll}>

                View All

              </Text>

            </TouchableOpacity>

          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.brandScroll
            }>

            {brands.map(brand => (

              <TouchableOpacity
                key={brand}
                activeOpacity={0.8}
                style={styles.brandItem}
                onPress={() =>
                  navigation.navigate(
                    'Search',
                    {
                      brand,
                    },
                  )
                }>

                <View
                  style={styles.brandCircle}>

                  <Text
                    style={styles.brandLogo}>

                    {brand.substring(0, 1)}

                  </Text>

                </View>

                <Text
                  style={styles.brandName}
                  numberOfLines={1}>

                  {brand}

                </Text>

              </TouchableOpacity>

            ))}

          </ScrollView>

          {/* =================================================
              WHITE SECTION
          ================================================= */}

          <View
            style={styles.whiteSection}>

            <View
              style={styles.sectionHeader}>

              <View>

                <Text
                  style={styles.sectionTitle}>

                  {selectedType === 'All'
                    ? 'Popular Vehicles'
                    : `Popular ${selectedType}`}

                </Text>

                <Text
                  style={styles.availableText}>

                  {filteredVehicles.length}{' '}
                  vehicles available

                </Text>

              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    'Search',
                  )
                }>

                <Text
                  style={styles.viewAll}>

                  View All

                </Text>

              </TouchableOpacity>

            </View>

            {/* =================================================
                GRID
            ================================================= */}

            {filteredVehicles.length > 0 ? (

              <View
                style={styles.vehiclesGrid}>

                {filteredVehicles.map(
                  vehicle => (

                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onPress={() =>
                        openVehicleDetails(
                          vehicle,
                        )
                      }
                    />

                  ),
                )}

              </View>

            ) : (

              <View
                style={styles.noResult}>

                <Text
                  style={styles.noResultIcon}>

                  🔍

                </Text>

                <Text
                  style={styles.noResultTitle}>

                  No vehicles found

                </Text>

                <Text
                  style={styles.noResultText}>

                  Try another vehicle name

                </Text>

              </View>

            )}

            {/* =================================================
                NEARBY
            ================================================= */}

            <View
              style={styles.nearbyHeader}>

              <View>

                <Text
                  style={styles.nearbyTitle}>

                  Nearby Vehicles

                </Text>

                <Text
                  style={styles.nearbySub}>

                  Available around Indore

                </Text>

              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    'Search',
                  )
                }>

                <Text
                  style={styles.viewAll}>

                  View All

                </Text>

              </TouchableOpacity>

            </View>

            <View
              style={styles.nearbyList}>

              {filteredVehicles
                .slice(0, 4)
                .map(vehicle => (

                  <NearbyCard
                    key={`nearby-${vehicle.id}`}
                    vehicle={vehicle}
                    onPress={() =>
                      openVehicleDetails(
                        vehicle,
                      )
                    }
                  />

                ))}

            </View>

          </View>

          <View
            style={styles.bottomSpace}
          />

        </ScrollView>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View
          style={styles.footerWrapper}>

          <Footer activeTab="home" />

        </View>

      </View>

    </SafeAreaView>
  );
};

/* =========================================================
   VEHICLE CARD
========================================================= */

const VehicleCard = ({
  vehicle,
  onPress,
}: {
  vehicle: Vehicle;
  onPress: () => void;
}) => {

  const isBike =
    vehicle.type === 'Bikes';

  const isAuto =
    vehicle.type === 'Auto';

  return (

    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.vehicleCard}
      onPress={onPress}>

      <View
        style={styles.vehicleImageContainer}>

        <Image
          source={{
            uri: vehicle.image,
          }}
          style={styles.vehicleImage}
          resizeMode="cover"
        />

        {/* TYPE */}

        <View
          style={styles.vehicleTypeBadge}>

          {isBike ? (

            <Bike
              size={12}
              color="#FFFFFF"
            />

          ) : (

            <Car
              size={12}
              color="#FFFFFF"
            />

          )}

          <Text
            style={
              styles.vehicleTypeBadgeText
            }>

            {isAuto
              ? 'AUTO'
              : isBike
              ? 'BIKE'
              : 'CAR'}

          </Text>

        </View>

        {/* HEART */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.favoriteButton}>

          <Heart
            size={17}
            color="#555"
            strokeWidth={1.5}
          />

        </TouchableOpacity>

      </View>

      {/* DETAILS */}

      <View
        style={styles.vehicleDetails}>

        <Text
          style={styles.vehicleName}
          numberOfLines={1}>

          {vehicle.name}

        </Text>

        {/* RATING */}

        <View
          style={styles.ratingRow}>

          <Star
            size={13}
            color="#F59E0B"
            fill="#F59E0B"
          />

          <Text
            style={styles.rating}>

            {vehicle.rating}

          </Text>

        </View>

        {/* LOCATION */}

        <View
          style={styles.infoRow}>

          <MapPin
            size={13}
            color="#777"
          />

          <Text
            style={styles.infoText}
            numberOfLines={1}>

            {vehicle.location}

          </Text>

        </View>

        {/* FUEL */}

        <View
          style={styles.infoRow}>

          <Fuel
            size={13}
            color="#777"
          />

          <Text
            style={styles.infoText}>

            {vehicle.fuelType}

          </Text>

          <Text
            style={styles.dot}>

            •

          </Text>

          <Gauge
            size={12}
            color="#777"
          />

          <Text
            style={styles.infoText}>

            {vehicle.mileage}

          </Text>

        </View>

        {/* PRICE */}

        <View
          style={styles.bottomInfo}>

          <Text
            style={styles.price}>

            {vehicle.price}

            <Text
              style={styles.priceUnit}>

              {vehicle.priceUnit}

            </Text>

          </Text>

          <ChevronRight
            size={17}
            color="#777"
          />

        </View>

      </View>

    </TouchableOpacity>
  );
};

/* =========================================================
   NEARBY CARD
========================================================= */

const NearbyCard = ({
  vehicle,
  onPress,
}: {
  vehicle: Vehicle;
  onPress: () => void;
}) => {

  const type =
    vehicle.type === 'Cars'
      ? 'CAR'
      : vehicle.type === 'Bikes'
      ? 'BIKE'
      : 'AUTO';

  return (

    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.nearbyCard}
      onPress={onPress}>

      <Image
        source={{
          uri: vehicle.image,
        }}
        style={styles.nearbyImage}
        resizeMode="cover"
      />

      <View
        style={styles.nearbyOverlay}>

        <View
          style={styles.nearbyLeft}>

          <View
            style={styles.nearbyTypeBadge}>

            <Text
              style={styles.nearbyTypeText}>

              {type}

            </Text>

          </View>

          <Text
            style={styles.nearbyCarName}
            numberOfLines={1}>

            {vehicle.name}

          </Text>

          <View
            style={styles.nearbyLocation}>

            <MapPin
              size={13}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.nearbyLocationText
              }
              numberOfLines={1}>

              {vehicle.location}

            </Text>

          </View>

        </View>

        <View
          style={styles.nearbyRight}>

          <Text
            style={styles.nearbyPrice}>

            {vehicle.price}

          </Text>

          <Text
            style={styles.nearbyPriceUnit}>

            {vehicle.priceUnit}

          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
};

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },

  /* HEADER */

  header: {
    height: 100,
    marginTop:20,
    paddingHorizontal: 18,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoCircle: {
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoCar: {
    fontSize: 20,
  },

  logoText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#111111',
    marginLeft: 9,
  },

  locationSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 9,
    marginTop: 1,
    gap: 2,
  },

  locationSmallText: {
    fontSize: 9,
    color: '#777777',
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  /* SCROLL */

  scrollContent: {
    paddingTop: 17,
  },

  /* GREETING */

  greetingSection: {
    paddingHorizontal: 18,
    marginBottom: 15,
  },

  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111111',
  },

  greetingSub: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  /* SEARCH */

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 10,
  },

  searchBox: {
    flex: 1,
    height: 51,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },

  searchInput: {
    flex: 1,
    height: 49,
    marginLeft: 8,
    fontSize: 12,
    color: '#333333',
    paddingVertical: 0,
  },

  clearText: {
    fontSize: 23,
    color: '#777777',
    lineHeight: 25,
  },

  filterButton: {
    width: 51,
    height: 51,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* SECTION */

  sectionHeader: {
    paddingHorizontal: 18,
    marginTop: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    color: '#111111',
    fontWeight: '800',
  },

  viewAll: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '600',
  },

  availableText: {
    marginTop: 4,
    fontSize: 10,
    color: '#999999',
  },

  /* VEHICLE TYPE */

  typeScroll: {
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 3,
    gap: 10,
  },

  typeItem: {
    width: 82,
    height: 82,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeItemActive: {
    backgroundColor: '#111111',
    borderColor: '#111111',
  },

  typeIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeIconActive: {
    backgroundColor: '#333333',
  },

  typeText: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '600',
    color: '#555555',
  },

  typeTextActive: {
    color: '#FFFFFF',
  },

  /* BRANDS */

  brandScroll: {
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 4,
    gap: 15,
  },

  brandItem: {
    alignItems: 'center',
    width: 67,
  },

  brandCircle: {
    width: 49,
    height: 49,
    borderRadius: 25,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandLogo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  brandName: {
    marginTop: 7,
    fontSize: 9,
    color: '#777777',
    textAlign: 'center',
  },

  /* WHITE SECTION */

  whiteSection: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 3,
    paddingBottom: 25,
    minHeight: 500,
  },

  /* GRID */

  vehiclesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 13,
    rowGap: 15,
  },

  vehicleCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  vehicleImageContainer: {
    height: 135,
    backgroundColor: '#F1F1F1',
    position: 'relative',
  },

  vehicleImage: {
    width: '100%',
    height: '100%',
  },

  vehicleTypeBadge: {
    position: 'absolute',
    left: 8,
    top: 8,
    paddingHorizontal: 7,
    height: 25,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.72)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  vehicleTypeBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },

  favoriteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleDetails: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  vehicleName: {
    fontSize: 12,
    color: '#222222',
    fontWeight: '800',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 4,
  },

  rating: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '600',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
    flexShrink: 1,
  },

  infoText: {
    fontSize: 8.5,
    color: '#777777',
    flexShrink: 1,
  },

  dot: {
    fontSize: 8,
    color: '#AAAAAA',
  },

  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  price: {
    fontSize: 14,
    color: '#111111',
    fontWeight: '800',
  },

  priceUnit: {
    fontSize: 9,
    color: '#888888',
    fontWeight: '500',
  },

  /* NO RESULT */

  noResult: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  noResultIcon: {
    fontSize: 35,
  },

  noResultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
    marginTop: 10,
  },

  noResultText: {
    fontSize: 11,
    color: '#888888',
    marginTop: 5,
  },

  /* NEARBY */

  nearbyHeader: {
    marginTop: 28,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nearbyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },

  nearbySub: {
    fontSize: 10,
    color: '#999999',
    marginTop: 3,
  },

  nearbyList: {
    marginTop: 13,
    paddingHorizontal: 18,
    gap: 14,
  },

  nearbyCard: {
    height: 180,
    borderRadius: 17,
    overflow: 'hidden',
    backgroundColor: '#EEEEEE',
  },

  nearbyImage: {
    width: '100%',
    height: '100%',
  },

  nearbyOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: 'rgba(0,0,0,0.48)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  nearbyLeft: {
    flex: 1,
    paddingRight: 10,
  },

  nearbyRight: {
    alignItems: 'flex-end',
  },

  nearbyTypeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: 5,
  },

  nearbyTypeText: {
    color: '#222222',
    fontSize: 7,
    fontWeight: '900',
  },

  nearbyCarName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  nearbyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },

  nearbyLocationText: {
    color: '#FFFFFF',
    fontSize: 9,
    flexShrink: 1,
  },

  nearbyPrice: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  nearbyPriceUnit: {
    color: '#DDDDDD',
    fontSize: 9,
    marginTop: 2,
  },

  bottomSpace: {
    height: 115,
  },

  footerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;