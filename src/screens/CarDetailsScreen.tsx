import React, {useMemo, useRef, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Users,
  Fuel,
  Gauge,
  Settings2,
  CalendarDays,
  ChevronRight,
  Zap,
  ShieldCheck,
  Snowflake,
  Bluetooth,
} from 'lucide-react-native';

const {width} = Dimensions.get('window');

const IMAGE_WIDTH = width - 32;

/* =========================================================
   CAR TYPE
   ========================================================= */

type Car = {
  id: string;
  brand: string;
  name: string;
  rating: string;
  location: string;
  price: string;
  image: string;

  seats?: string;
  transmission?: string;
  fuelType?: string;
  mileage?: string;
  year?: string;
  description?: string;
  features?: string[];
  images?: string[];
};

/* =========================================================
   DEFAULT CAR
   ========================================================= */

const DEFAULT_CAR: Car = {
  id: '1',
  brand: 'Tesla',
  name: 'Tesla Model S',
  rating: '5.0',
  location: 'Chicago, USA',
  price: '₹100/Day',

  seats: '5 Seats',
  transmission: 'Automatic',
  fuelType: 'Electric',
  mileage: '405 mi',
  year: '2024',

  description:
    'Experience a premium electric driving experience with the Tesla Model S. Designed with modern technology, excellent performance, comfortable interiors and a smooth driving experience.',

  features: [
    'Air Conditioning',
    'Bluetooth',
    'GPS Navigation',
    'USB Charging',
    'Premium Audio',
    'Automatic Parking',
  ],

  image:
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200',

  images: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200',

    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200',

    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200',

    'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=1200',
  ],
};

/* =========================================================
   CAR GALLERY
   ========================================================= */

const CAR_GALLERIES: Record<string, string[]> = {
  Tesla: [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200',
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200',
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200',
    'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=1200',
  ],

  Ferrari: [
    'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200',
    'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=1200',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200',
  ],

  Lamborghini: [
    'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200',
  ],

  BMW: [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200',
    'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200',
    'https://images.unsplash.com/photo-1523983300303-7f0b0b8e4c5c?w=1200',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200',
  ],
};

/* =========================================================
   GET CAR DETAILS
   ========================================================= */

const getCarDetails = (car: Car): Car => {
  const brand = car.brand;

  const gallery =
    car.images && car.images.length > 0
      ? car.images
      : CAR_GALLERIES[brand] || [
          car.image,
          car.image,
          car.image,
          car.image,
        ];

  /* TESLA */

  if (brand === 'Tesla') {
    return {
      ...car,

      seats: '5 Seats',
      transmission: 'Automatic',
      fuelType: 'Electric',
      mileage: '405 mi',
      year: '2024',

      description:
        'Experience a premium electric driving experience with the Tesla Model S. Enjoy impressive performance, modern technology, spacious interiors and a smooth, quiet ride.',

      features: [
        'Air Conditioning',
        'Bluetooth',
        'GPS Navigation',
        'USB Charging',
        'Premium Audio',
        'Automatic Parking',
      ],

      images: gallery,
    };
  }

  /* FERRARI */

  if (brand === 'Ferrari') {
    return {
      ...car,

      seats: '2 Seats',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '12 km/l',
      year: '2023',

      description:
        'Enjoy an exciting luxury driving experience with Ferrari. This performance-focused sports car combines premium styling, powerful performance and a comfortable interior.',

      features: [
        'Air Conditioning',
        'Bluetooth',
        'GPS Navigation',
        'Premium Audio',
        'Leather Interior',
        'Sports Mode',
      ],

      images: gallery,
    };
  }

  /* LAMBORGHINI */

  if (brand === 'Lamborghini') {
    return {
      ...car,

      seats: '2 Seats',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      mileage: '10 km/l',
      year: '2023',

      description:
        'Drive in style with the Lamborghini. Built for performance and luxury, this sports car offers a powerful engine, premium interiors and an unforgettable driving experience.',

      features: [
        'Air Conditioning',
        'Bluetooth',
        'GPS Navigation',
        'Premium Audio',
        'Leather Seats',
        'Sports Mode',
      ],

      images: gallery,
    };
  }

  /* BMW */

  return {
    ...car,

    seats: '5 Seats',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    mileage: '15 km/l',
    year: '2024',

    description:
      'Enjoy a comfortable and premium driving experience with BMW. The vehicle combines elegant design, advanced technology, smooth performance and practical comfort.',

    features: [
      'Air Conditioning',
      'Bluetooth',
      'GPS Navigation',
      'USB Charging',
      'Premium Audio',
      'Cruise Control',
    ],

    images: gallery,
  };
};

/* =========================================================
   SCREEN
   ========================================================= */

const CarDetailsScreen = ({
  navigation,
  route,
}: any) => {
  const passedCar =
    route?.params?.car ?? DEFAULT_CAR;

  const car = useMemo(
    () => getCarDetails(passedCar),
    [passedCar],
  );

  const [favorite, setFavorite] =
    useState(false);

  const [activeImage, setActiveImage] =
    useState(0);

  const imageSliderRef =
    useRef<FlatList<string>>(null);

  /* =======================================================
     IMAGE CHANGE
     ======================================================= */

  const handleImageScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const index = Math.round(
      offsetX / IMAGE_WIDTH,
    );

    setActiveImage(index);
  };

  /* =======================================================
     RENDER IMAGE
     ======================================================= */

  const renderImage = ({
    item,
  }: {
    item: string;
  }) => {
    return (
      <View style={styles.sliderImageWrapper}>
        <Image
          source={{uri: item}}
          style={styles.sliderImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  /* =======================================================
     MAIN UI
     ======================================================= */

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F4F4"
      />

      {/* =================================================
          HEADER
          ================================================= */}

      <View style={styles.header}>

        {/* BACK */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.headerButton}
          onPress={() =>
            navigation.goBack()
          }>

          <ArrowLeft
            size={21}
            color="#222"
            strokeWidth={2}
          />

        </TouchableOpacity>

        {/* TITLE */}

        <Text style={styles.headerTitle}>
          Car Details
        </Text>

        {/* FAVORITE */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.headerButton}
          onPress={() =>
            setFavorite(!favorite)
          }>

          <Heart
            size={20}
            color={
              favorite
                ? '#E53935'
                : '#555'
            }
            fill={
              favorite
                ? '#E53935'
                : 'transparent'
            }
          />

        </TouchableOpacity>

      </View>

      {/* =================================================
          MAIN SCROLL
          ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>

        {/* =================================================
            IMAGE SLIDER
            ================================================= */}

        <View style={styles.sliderContainer}>

          <FlatList
            ref={imageSliderRef}
            data={car.images}
            horizontal
            pagingEnabled
            snapToInterval={IMAGE_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) =>
              `car-image-${index}`
            }
            renderItem={renderImage}
            onMomentumScrollEnd={
              handleImageScroll
            }
          />

          {/* BRAND */}

          <View style={styles.brandBadge}>

            <Text
              style={styles.brandBadgeText}>
              {car.brand}
            </Text>

          </View>

          {/* FAVORITE */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.imageHeart}
            onPress={() =>
              setFavorite(!favorite)
            }>

            <Heart
              size={21}
              color={
                favorite
                  ? '#E53935'
                  : '#444'
              }
              fill={
                favorite
                  ? '#E53935'
                  : 'transparent'
              }
            />

          </TouchableOpacity>

          {/* IMAGE COUNTER */}

          <View style={styles.imageCounter}>

            <Text
              style={styles.imageCounterText}>
              {activeImage + 1} /{' '}
              {car.images?.length || 1}
            </Text>

          </View>

          {/* DOTS */}

          <View style={styles.dotsContainer}>

            {car.images?.map(
              (_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === activeImage &&
                      styles.activeDot,
                  ]}
                />
              ),
            )}

          </View>

        </View>

        {/* =================================================
            BASIC INFORMATION
            ================================================= */}

        <View style={styles.content}>

          <View style={styles.titleRow}>

            <View
              style={styles.titleLeft}>

              <Text
                style={styles.carName}
                numberOfLines={2}>
                {car.name}
              </Text>

              {/* RATING */}

              <View
                style={styles.ratingRow}>

                <Star
                  size={16}
                  color="#F5A623"
                  fill="#F5A623"
                />

                <Text
                  style={styles.rating}>
                  {car.rating}
                </Text>

                <Text
                  style={styles.reviewText}>
                  120 Reviews
                </Text>

              </View>

            </View>

            {/* PRICE */}

            <View
              style={styles.priceContainer}>

              <Text style={styles.price}>
                {car.price}
              </Text>

              <Text
                style={styles.pricePerDay}>
                per day
              </Text>

            </View>

          </View>

          {/* =================================================
              LOCATION
              ================================================= */}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.locationBox}>

            <View
              style={styles.locationIcon}>

              <MapPin
                size={20}
                color="#222A2C"
              />

            </View>

            <View
              style={styles.locationContent}>

              <Text style={styles.label}>
                Location
              </Text>

              <Text
                style={styles.locationText}>
                {car.location}
              </Text>

            </View>

            <ChevronRight
              size={19}
              color="#999"
            />

          </TouchableOpacity>

          {/* =================================================
              CAR INFORMATION
              ================================================= */}

          <Text style={styles.sectionTitle}>
            Car Information
          </Text>

          <View style={styles.specGrid}>

            {/* SEATS */}

            <View style={styles.specCard}>

              <View
                style={styles.specIcon}>

                <Users
                  size={20}
                  color="#222A2C"
                />

              </View>

              <Text
                style={styles.specLabel}>
                Seats
              </Text>

              <Text
                style={styles.specValue}>
                {car.seats}
              </Text>

            </View>

            {/* TRANSMISSION */}

            <View style={styles.specCard}>

              <View
                style={styles.specIcon}>

                <Settings2
                  size={20}
                  color="#222A2C"
                />

              </View>

              <Text
                style={styles.specLabel}>
                Transmission
              </Text>

              <Text
                style={styles.specValue}>
                {car.transmission}
              </Text>

            </View>

            {/* FUEL */}

            <View style={styles.specCard}>

              <View
                style={styles.specIcon}>

                {car.fuelType ===
                'Electric' ? (
                  <Zap
                    size={20}
                    color="#222A2C"
                  />
                ) : (
                  <Fuel
                    size={20}
                    color="#222A2C"
                  />
                )}

              </View>

              <Text
                style={styles.specLabel}>
                Fuel Type
              </Text>

              <Text
                style={styles.specValue}>
                {car.fuelType}
              </Text>

            </View>

            {/* MILEAGE */}

            <View style={styles.specCard}>

              <View
                style={styles.specIcon}>

                <Gauge
                  size={20}
                  color="#222A2C"
                />

              </View>

              <Text
                style={styles.specLabel}>
                Range / Mileage
              </Text>

              <Text
                style={styles.specValue}>
                {car.mileage}
              </Text>

            </View>

          </View>

          {/* =================================================
              YEAR
              ================================================= */}

          <View style={styles.yearBox}>

            <View
              style={styles.yearIcon}>

              <ShieldCheck
                size={20}
                color="#222A2C"
              />

            </View>

            <View
              style={styles.yearContent}>

              <Text style={styles.label}>
                Model Year
              </Text>

              <Text style={styles.yearText}>
                {car.year}
              </Text>

            </View>

          </View>

          {/* =================================================
              ABOUT
              ================================================= */}

          <View
            style={styles.sectionHeader}>

            <Text
              style={styles.sectionTitle}>
              About This Car
            </Text>

            <Text
              style={styles.aboutBrand}>
              {car.brand}
            </Text>

          </View>

          <Text
            style={styles.description}>
            {car.description}
          </Text>

          {/* =================================================
              FEATURES
              ================================================= */}

          <Text style={styles.sectionTitle}>
            Features
          </Text>

          <View
            style={styles.featuresContainer}>

            {car.features?.map(
              (feature, index) => {

                let FeatureIcon =
                  ShieldCheck;

                if (
                  feature ===
                  'Air Conditioning'
                ) {
                  FeatureIcon = Snowflake;
                }

                if (
                  feature ===
                  'Bluetooth'
                ) {
                  FeatureIcon = Bluetooth;
                }

                return (
                  <View
                    key={index}
                    style={styles.featureItem}>

                    <View
                      style={
                        styles.featureIcon
                      }>

                      <FeatureIcon
                        size={14}
                        color="#FFFFFF"
                      />

                    </View>

                    <Text
                      style={
                        styles.featureText
                      }>
                      {feature}
                    </Text>

                  </View>
                );
              },
            )}

          </View>

          {/* =================================================
              RENTAL DATE
              ================================================= */}

          <Text style={styles.sectionTitle}>
            Rental Details
          </Text>

          {/* PICKUP */}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.dateBox}>

            <View
              style={styles.dateIcon}>

              <CalendarDays
                size={21}
                color="#222A2C"
              />

            </View>

            <View
              style={styles.dateContent}>

              <Text style={styles.label}>
                Pick-up Date
              </Text>

              <Text style={styles.dateText}>
                Select your rental date
              </Text>

            </View>

            <ChevronRight
              size={18}
              color="#999"
            />

          </TouchableOpacity>

          {/* DROP LOCATION */}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.dateBox}>

            <View
              style={styles.dateIcon}>

              <MapPin
                size={21}
                color="#222A2C"
              />

            </View>

            <View
              style={styles.dateContent}>

              <Text style={styles.label}>
                Drop-off Location
              </Text>

              <Text style={styles.dateText}>
                Select location
              </Text>

            </View>

            <ChevronRight
              size={18}
              color="#999"
            />

          </TouchableOpacity>

          {/* EXTRA SPACE */}

          <View
            style={styles.bottomContentSpace}
          />

        </View>

      </ScrollView>

      {/* =================================================
          FIXED BOOKING BAR
          ================================================= */}

      <View style={styles.bottomBar}>

        <View>

          <Text style={styles.bottomLabel}>
            Total Price
          </Text>

          <View
            style={styles.bottomPriceRow}>

            <Text style={styles.bottomPrice}>
              {car.price}
            </Text>

          </View>

        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.bookButton}
          onPress={() => {

            Next:
            navigation.navigate('Booking', {
              car: car,
            });

          }}>

          <Text
            style={styles.bookButtonText}>
            Book Now
          </Text>

          <ChevronRight
            size={18}
            color="#FFFFFF"
          />

        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({

  /* =======================================================
     MAIN
     ======================================================= */

  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  /* =======================================================
     HEADER
     ======================================================= */

  header: {
    height: 100,
    paddingHorizontal: 16,
    backgroundColor: '#F5F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
      marginTop: 20,
  },

  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },

  /* =======================================================
     SLIDER
     ======================================================= */

  sliderContainer: {
    width: IMAGE_WIDTH,
    height: 285,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#E1E1E1',
    position: 'relative',
  },

  sliderImageWrapper: {
    width: IMAGE_WIDTH,
    height: 285,
  },

  sliderImage: {
    width: '100%',
    height: '100%',
  },

  /* =======================================================
     BRAND BADGE
     ======================================================= */

  brandBadge: {
    position: 'absolute',
    left: 14,
    top: 14,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  /* =======================================================
     IMAGE HEART
     ======================================================= */

  imageHeart: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* =======================================================
     IMAGE COUNTER
     ======================================================= */

  imageCounter: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.58)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageCounterText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },

  /* =======================================================
     DOTS
     ======================================================= */

  dotsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: 'rgba(255,255,255,0.65)',
  },

  activeDot: {
    width: 18,
    backgroundColor: '#FFFFFF',
  },

  /* =======================================================
     CONTENT
     ======================================================= */

  content: {
    paddingHorizontal: 16,
  },

  /* =======================================================
     TITLE
     ======================================================= */

  titleRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  titleLeft: {
    flex: 1,
    paddingRight: 10,
  },

  carName: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    color: '#111111',
  },

  /* =======================================================
     RATING
     ======================================================= */

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

  reviewText: {
    marginLeft: 7,
    fontSize: 10,
    color: '#999999',
  },

  /* =======================================================
     PRICE
     ======================================================= */

  priceContainer: {
    alignItems: 'flex-end',
    paddingTop: 3,
  },

  price: {
    fontSize: 17,
    fontWeight: '800',
    color: '#222A2C',
  },

  pricePerDay: {
    marginTop: 3,
    fontSize: 9,
    color: '#999999',
  },

  /* =======================================================
     LOCATION
     ======================================================= */

  locationBox: {
    minHeight: 70,
    marginTop: 18,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationContent: {
    flex: 1,
    marginLeft: 11,
  },

  label: {
    fontSize: 9,
    color: '#999999',
  },

  locationText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#222222',
  },

  /* =======================================================
     SECTION
     ======================================================= */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    marginTop: 23,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },

  aboutBrand: {
    marginTop: 23,
    fontSize: 10,
    color: '#999999',
  },

  /* =======================================================
     SPEC GRID
     ======================================================= */

  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  specCard: {
    width: '48.2%',
    minHeight: 112,
    marginBottom: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  specIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  specLabel: {
    marginTop: 9,
    fontSize: 9,
    color: '#999999',
  },

  specValue: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '700',
    color: '#222222',
  },

  /* =======================================================
     YEAR
     ======================================================= */

  yearBox: {
    minHeight: 68,
    marginTop: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
  },

  yearIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  yearContent: {
    flex: 1,
    marginLeft: 11,
  },

  yearText: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
  },

  /* =======================================================
     DESCRIPTION
     ======================================================= */

  description: {
    fontSize: 12,
    lineHeight: 20,
    color: '#777777',
  },

  /* =======================================================
     FEATURES
     ======================================================= */

  featuresContainer: {
    padding: 13,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  featureItem: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },

  featureIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  featureText: {
    marginLeft: 10,
    fontSize: 11,
    color: '#444444',
    fontWeight: '500',
  },

  /* =======================================================
     DATE
     ======================================================= */

  dateBox: {
    minHeight: 70,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
  },

  dateIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dateContent: {
    flex: 1,
    marginLeft: 11,
  },

  dateText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#222222',
  },

  /* =======================================================
     BOTTOM CONTENT SPACE
     ======================================================= */

  bottomContentSpace: {
    height: 95,
  },

  /* =======================================================
     FIXED BOTTOM BAR
     ======================================================= */

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 84,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomLabel: {
    fontSize: 9,
    color: '#999999',
  },

  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomPrice: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '800',
    color: '#222A2C',
  },

  /* =======================================================
     BOOK BUTTON
     ======================================================= */

  bookButton: {
    width: 150,
    height: 49,
    borderRadius: 25,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 5,
  },
});

export default CarDetailsScreen;