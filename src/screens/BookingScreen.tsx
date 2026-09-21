import React, {useEffect, useMemo, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import {WebView} from 'react-native-webview';
import {  GooglePlacesAutocomplete,}  from 'react-native-google-places-autocomplete';
import {
  ArrowLeft,
  MoreHorizontal,
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Navigation,
  CarFront,
} from 'lucide-react-native';



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
   SCREEN
========================================================= */

const BookingScreen = ({navigation, route}: any) => {

  /* =======================================================
     CAR DATA FROM CAR DETAILS SCREEN
  ======================================================= */

  const car: Car | null = useMemo(() => {
    return route?.params?.car ?? null;
  }, [route?.params?.car]);


  /* =======================================================
     FORM STATES
  ======================================================= */

  const [driver, setDriver] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const [gender, setGender] = useState('Male');

  const [rentalType, setRentalType] = useState('Day');


  /* =======================================================
     DATE STATES
  ======================================================= */

  const [pickupDate, setPickupDate] = useState(
    new Date(),
  );

  const [returnDate, setReturnDate] = useState(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  );

  const [datePickerMode, setDatePickerMode] =
    useState<'pickup' | 'return' | null>(null);


  /* =======================================================
     LOCATION
  ======================================================= */



  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [location, setLocation] = useState('');
const [selectedLatitude, setSelectedLatitude] = useState<number | null>(null);
const [selectedLongitude, setSelectedLongitude] = useState<number | null>(null);


  /* =======================================================
     LOCAL LOCATION SEARCH - NO GOOGLE API KEY
  ======================================================= */

  useEffect(() => {
    const searchText = location.trim();

    if (searchText.length < 2 || searchText === car?.location) {
      setLocationResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLocationLoading(true);
        const url =
          'https://nominatim.openstreetmap.org/search' +
          `?q=${encodeURIComponent(searchText + ', Indore, Madhya Pradesh, India')}` +
          '&format=json&addressdetails=1&limit=8&countrycodes=in' +
          '&bounded=1&viewbox=75.65,22.85,76.10,22.55';

        const response = await fetch(url, {
          headers: {Accept: 'application/json'},
        });

        if (!response.ok) {
          throw new Error(`Location API error: ${response.status}`);
        }

        const data = await response.json();
        setLocationResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log('Location search error:', error);
        setLocationResults([]);
      } finally {
        setLocationLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location, car?.location]);

  /* =======================================================
     DATE FORMAT
  ======================================================= */

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };


  /* =======================================================
     PRICE
  ======================================================= */

  const numericPrice = useMemo(() => {

    if (!car?.price) {
      return 0;
    }

    const match = car.price.match(/[\d,.]+/);

    if (!match) {
      return 0;
    }

    return Number(
      match[0].replace(/,/g, ''),
    );

  }, [car]);


  /* =======================================================
     RENTAL DAYS
  ======================================================= */

  const rentalDays = useMemo(() => {

    const difference =
      returnDate.getTime() -
      pickupDate.getTime();

    const days =
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24),
      );

    return days > 0 ? days : 1;

  }, [pickupDate, returnDate]);


  /* =======================================================
     TOTAL PRICE
  ======================================================= */

  const totalPrice = useMemo(() => {

    if (rentalType === 'Hour') {
      return numericPrice;
    }

    if (rentalType === 'Weekly') {
      return numericPrice * 7;
    }

    if (rentalType === 'Monthly') {
      return numericPrice * 30;
    }

    return numericPrice * rentalDays;

  }, [
    numericPrice,
    rentalType,
    rentalDays,
  ]);


  /* =======================================================
     DATE PICKER
  ======================================================= */

  const handleDateChange = (
    event: any,
    selectedDate?: Date,
  ) => {

    setDatePickerMode(null);

    if (!selectedDate) {
      return;
    }

    if (datePickerMode === 'pickup') {

      setPickupDate(selectedDate);

      // Return date pickup se pehle nahi ho sakti
      if (
        selectedDate.getTime() >=
        returnDate.getTime()
      ) {
        const newReturnDate =
          new Date(
            selectedDate.getTime() +
              24 * 60 * 60 * 1000,
          );

        setReturnDate(newReturnDate);
      }

    } else if (datePickerMode === 'return') {

      if (
        selectedDate.getTime() <=
        pickupDate.getTime()
      ) {
        Alert.alert(
          'Invalid Date',
          'Return date must be after pick-up date.',
        );

        return;
      }

      setReturnDate(selectedDate);
    }
  };


  /* =======================================================
     PAY NOW
  ======================================================= */

  const handlePayNow = () => {

    Keyboard.dismiss();

    if (!name.trim()) {
      Alert.alert(
        'Required',
        'Please enter your full name.',
      );
      return;
    }

    if (!email.trim()) {
      Alert.alert(
        'Required',
        'Please enter your email address.',
      );
      return;
    }

    if (!contact.trim()) {
      Alert.alert(
        'Required',
        'Please enter your contact number.',
      );
      return;
    }

    if (contact.length !== 10) {
      Alert.alert(
        'Invalid Contact',
        'Please enter a valid 10 digit contact number.',
      );
      return;
    }

    if (!location.trim()) {
      Alert.alert(
        'Location Required',
        'Please select your car location.',
      );
      return;
    }


    /* ===============================================
       SEND COMPLETE BOOKING DATA
    =============================================== */

    navigation.navigate(
      'PaymentMethods',
      {
        car: car,

        name: name,
        email: email,
        contact: contact,

        gender: gender,

        rentalType: rentalType,

        pickupDate:
          pickupDate.toISOString(),

        returnDate:
          returnDate.toISOString(),

        location: location,

        driver: driver,

        rentalDays: rentalDays,

        totalPrice: totalPrice,
      },
    );
  };


  /* =======================================================
     NO CAR DATA
  ======================================================= */

  if (!car) {

    return (
      <SafeAreaView
        style={styles.container}>

        <View style={styles.errorContainer}>

          <CarFront
            size={45}
            color="#222A2C"
          />

          <Text style={styles.errorTitle}>
            Car Details Not Found
          </Text>

          <Text style={styles.errorText}>
            Please go back and select a car again.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }>

            <Text style={styles.backButtonText}>
              Go Back
            </Text>

          </TouchableOpacity>

        </View>

      </SafeAreaView>
    );
  }


  /* =======================================================
     UI
  ======================================================= */

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F4F4"
      />


      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>


        {/* =================================================
            HEADER
        ================================================= */}

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.8}
            onPress={() =>
              navigation.goBack()
            }>

            <ArrowLeft
              size={22}
              color="#222A2C"
              strokeWidth={1.8}
            />

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            Booking Details
          </Text>


          <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.8}>

            <MoreHorizontal
              size={22}
              color="#222A2C"
            />

          </TouchableOpacity>

        </View>


        {/* =================================================
            CONTENT
        ================================================= */}

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>


          {/* =================================================
              PROGRESS
          ================================================= */}

          <View style={styles.progressSection}>

            <View style={styles.progressLine} />


            <View style={styles.step}>

              <View
                style={[
                  styles.stepCircle,
                  styles.stepActive,
                ]}>

                <View
                  style={styles.stepDot}
                />

              </View>

              <Text
                style={styles.stepActiveText}>
                Booking details
              </Text>

            </View>


            <View style={styles.step}>

              <View
                style={styles.stepCircle}>

                <View
                  style={styles.stepDot}
                />

              </View>

              <Text style={styles.stepText}>
                Payment methods
              </Text>

            </View>


            <View style={styles.step}>

              <View
                style={styles.stepCircle}>

                <View
                  style={styles.stepDot}
                />

              </View>

              <Text style={styles.stepText}>
                Confirmation
              </Text>

            </View>

          </View>


          {/* =================================================
              DRIVER
          ================================================= */}

          <View style={styles.driverCard}>

            <View
              style={styles.driverContent}>

              <Text style={styles.driverTitle}>
                Book with driver
              </Text>

              <Text
                style={styles.driverSubtitle}>
                Don't have a driver? Book with driver.
              </Text>

            </View>


            <Switch
              value={driver}
              onValueChange={setDriver}
              trackColor={{
                false: '#D6D8D9',
                true: '#222A2C',
              }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D6D8D9"
            />

          </View>


          {/* =================================================
              FORM
          ================================================= */}

          <Text style={styles.formTitle}>
            Personal Details
          </Text>


          {/* FULL NAME */}

          <View style={styles.inputContainer}>

            <UserRound
              size={19}
              color="#777D7F"
            />

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Full Name*"
              placeholderTextColor="#999D9E"
              style={styles.input}
            />

          </View>


          {/* EMAIL */}

          <View style={styles.inputContainer}>

            <Mail
              size={19}
              color="#777D7F"
            />

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email Address*"
              placeholderTextColor="#999D9E"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

          </View>


          {/* CONTACT */}

          <View style={styles.inputContainer}>

            <Phone
              size={19}
              color="#777D7F"
            />

            <TextInput
              value={contact}
              onChangeText={text =>
                setContact(
                  text.replace(
                    /[^0-9]/g,
                    '',
                  ),
                )
              }
              placeholder="Contact*"
              placeholderTextColor="#999D9E"
              keyboardType="phone-pad"
              maxLength={10}
              style={styles.input}
            />

          </View>


          {/* =================================================
              GENDER
          ================================================= */}

          <Text style={styles.sectionTitle}>
            Gender
          </Text>


          <View style={styles.genderRow}>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setGender('Male')
              }
              style={[
                styles.genderButton,
                gender === 'Male' &&
                  styles.genderActive,
              ]}>

              <Text
                style={[
                  styles.genderText,
                  gender === 'Male' &&
                    styles.genderTextActive,
                ]}>

                ♂ Male

              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setGender('Female')
              }
              style={[
                styles.genderButton,
                gender === 'Female' &&
                  styles.genderActive,
              ]}>

              <Text
                style={[
                  styles.genderText,
                  gender === 'Female' &&
                    styles.genderTextActive,
                ]}>

                ♀ Female

              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setGender('Others')
              }
              style={[
                styles.genderButton,
                gender === 'Others' &&
                  styles.genderActive,
              ]}>

              <Text
                style={[
                  styles.genderText,
                  gender === 'Others' &&
                    styles.genderTextActive,
                ]}>

                ⚯ Others

              </Text>

            </TouchableOpacity>

          </View>


          {/* =================================================
              RENTAL DATE
          ================================================= */}

          <Text style={styles.sectionTitle}>
            Rental Date & Time
          </Text>


          <View style={styles.rentalRow}>

            {[
              'Hour',
              'Day',
              'Weekly',
              'Monthly',
            ].map(type => (

              <TouchableOpacity
                key={type}
                activeOpacity={0.8}
                onPress={() =>
                  setRentalType(type)
                }
                style={[
                  styles.rentalButton,
                  rentalType === type &&
                    styles.rentalActive,
                ]}>

                <Text
                  style={[
                    styles.rentalText,
                    rentalType === type &&
                      styles.rentalTextActive,
                  ]}>

                  {type}

                </Text>

              </TouchableOpacity>

            ))}

          </View>


          {/* =================================================
              DATE SELECTOR
          ================================================= */}

          <View style={styles.dateCard}>


            {/* PICKUP */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dateColumn}
              onPress={() =>
                setDatePickerMode('pickup')
              }>

              <Text style={styles.dateLabel}>
                Pick-up Date
              </Text>

              <View
                style={styles.dateValueRow}>

                <CalendarDays
                  size={17}
                  color="#666D6F"
                />

                <Text
                  style={styles.dateValue}>

                  {formatDate(pickupDate)}

                </Text>

              </View>

            </TouchableOpacity>


            <View style={styles.dateDivider} />


            {/* RETURN */}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dateColumn}
              onPress={() =>
                setDatePickerMode('return')
              }>

              <Text style={styles.dateLabel}>
                Return Date
              </Text>

              <View
                style={styles.dateValueRow}>

                <CalendarDays
                  size={17}
                  color="#666D6F"
                />

                <Text
                  style={styles.dateValue}>

                  {formatDate(returnDate)}

                </Text>

              </View>

            </TouchableOpacity>

          </View>


          {/* =================================================
              DATE PICKER
          ================================================= */}

          {datePickerMode && (

            <DateTimePicker
              value={
                datePickerMode === 'pickup'
                  ? pickupDate
                  : returnDate
              }
              mode="date"
              display={
                Platform.OS === 'ios'
                  ? 'spinner'
                  : 'calendar'
              }
              minimumDate={
                datePickerMode === 'return'
                  ? new Date(
                      pickupDate.getTime() +
                        24 *
                          60 *
                          60 *
                          1000,
                    )
                  : new Date()
              }
              onChange={handleDateChange}
            />

          )}


          {/* =================================================
              CAR LOCATION
          ================================================= */}

          <Text style={styles.sectionTitle}>
            Car Location
          </Text>

{/* ================= CAR LOCATION ================= */}


<View style={styles.locationWrapper}>
  <View style={styles.locationIcon}>
    <MapPin size={20} color="#555D5F" />
  </View>

  <TextInput
    value={location}
    onChangeText={text => {
      setLocation(text);

      // User manually type kare to old results clear
      if (!text.trim()) {
        setLocationResults([]);
      }
    }}
    placeholder="Search car location"
    placeholderTextColor="#999D9E"
    style={styles.locationInput}
    autoCorrect={false}
    autoCapitalize="words"
    returnKeyType="search"
    numberOfLines={1}
    ellipsizeMode="tail"
  />

  <View style={styles.locationRightIcon}>
    <Navigation size={19} color="#555D5F" />
  </View>

  {locationLoading && (
    <Text style={styles.locationLoading}>
      Searching...
    </Text>
  )}

  {/* SEARCH RESULTS */}
  {locationResults.length > 0 && (
    <View style={styles.locationResults}>
      {locationResults.map((item: any, index: number) => (
        <TouchableOpacity
          key={`${item.place_id || item.osm_id || index}`}
          activeOpacity={0.75}
          style={styles.locationRow}
          onPress={() => {
            const fullLocation =
              item.display_name ||
              'Indore, Madhya Pradesh, India';

            const locationWords =
              fullLocation.trim().split(/\s+/);

            const selectedLocation =
              locationWords.length > 10
                ? locationWords.slice(0, 10).join(' ') + '...'
                : fullLocation;

            // ⭐ Maximum 10 words input me jayenge
            setLocation(selectedLocation);

            // Results close
            setLocationResults([]);

            Keyboard.dismiss();
          }}
        >
          <View style={styles.resultIcon}>
            <MapPin size={17} color="#222A2C" />
          </View>

          <Text
            style={styles.locationResultText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {(() => {
              const text =
                item.display_name || 'Selected Location';

              const words =
                text.trim().split(/\s+/);

              return words.length > 10
                ? words.slice(0, 10).join(' ') + '...'
                : text;
            })()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )}
</View>


{/* ================= MAP ================= */}
<View style={styles.locationMapContainer}>
  <WebView
    originWhitelist={['*']}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    source={{
      html: `
        <!DOCTYPE html>
        <html>
        <head>

          <meta
            name="viewport"
            content="width=device-width,
            initial-scale=1.0,
            maximum-scale=1.0,
            user-scalable=no"
          />

          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          />

          <style>
            html,
            body,
            #map {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
            }

            body {
              overflow: hidden;
            }
          </style>

        </head>

        <body>

          <div id="map"></div>

          <script
            src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">
          </script>

          <script>

            // =========================
            // DEFAULT INDORE LOCATION
            // =========================

            const indore = [
              22.7196,
              75.8577
            ];

            // =========================
            // CREATE MAP
            // =========================

            const map = L.map('map').setView(
              indore,
              13
            );

            // =========================
            // OPEN STREET MAP
            // =========================

            L.tileLayer(
              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
              }
            ).addTo(map);

            // =========================
            // DEFAULT MARKER
            // =========================

            let marker = L.marker(indore)
              .addTo(map)
              .bindPopup(
                'Indore, Madhya Pradesh'
              )
              .openPopup();

            // =========================
            // MAP CLICK
            // =========================

            map.on(
              'click',
              async function(e) {

                const latitude =
                  e.latlng.lat;

                const longitude =
                  e.latlng.lng;

                // Marker move
                marker.setLatLng([
                  latitude,
                  longitude
                ]);

                // Temporary popup
                marker
                  .bindPopup(
                    'Getting location...'
                  )
                  .openPopup();

                try {

                  // =========================
                  // REVERSE GEOCODING
                  // =========================

                  const response =
                    await fetch(
                      'https://nominatim.openstreetmap.org/reverse' +
                      '?lat=' +
                      latitude +
                      '&lon=' +
                      longitude +
                      '&format=json' +
                      '&addressdetails=1'
                    );

                  const result =
                    await response.json();

                  // =========================
                  // LOCATION NAME
                  // =========================

                  let locationName =
                    'Selected Location';

                  if (
                    result &&
                    result.display_name
                  ) {
                    const fullLocation =
                      result.display_name.trim();

                    const words =
                      fullLocation.split(/\s+/);

                    locationName =
                      words.length > 10
                        ? words.slice(0, 10).join(' ') + '...'
                        : fullLocation;
                  }

                  // =========================
                  // SHOW NAME ON MAP
                  // =========================

                  marker
                    .bindPopup(
                      locationName
                    )
                    .openPopup();

                  // =========================
                  // SEND NAME TO RN
                  // =========================

                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                      type: 'LOCATION_SELECTED',

                      // ⭐ INPUT ME YE JAYEGA
                      location:
                        locationName,

                      // Internal use ke liye
                      latitude:
                        latitude,

                      longitude:
                        longitude
                    })
                  );

                } catch (error) {

                  console.log(
                    'Location error:',
                    error
                  );

                  window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                      type: 'LOCATION_SELECTED',

                      location:
                        'Selected Location',

                      latitude:
                        latitude,

                      longitude:
                        longitude
                    })
                  );

                }
              }
            );

          </script>

        </body>
        </html>
      `,
    }}

    onMessage={event => {
      try {

        const data =
          JSON.parse(
            event.nativeEvent.data
          );

        // =========================
        // LOCATION SELECTED
        // =========================

        if (
          data.type ===
          'LOCATION_SELECTED'
        ) {

          // ⭐⭐⭐ MAIN LINE ⭐⭐⭐
          // Map ki location INPUT me aa jayegi
          setLocation(
            data.location
          );

          // Search suggestions hatao
          setLocationResults([]);

          // Keyboard hide
          Keyboard.dismiss();
        }

      } catch (error) {

        console.log(
          'Map message error:',
          error
        );

      }
    }}

    style={styles.locationMap}
  />
</View>

          {/* =================================================
              SELECTED LOCATION
          ================================================= */}

          {location.length > 0 && (

            <View
              style={styles.selectedLocation}>

              <MapPin
                size={17}
                color="#222A2C"
              />

              <View
                style={
                  styles.selectedLocationContent
                }>

                <Text
                  style={
                    styles.selectedLocationLabel
                  }>
                  Selected location
                </Text>

                <Text
                  style={
                    styles.selectedLocationText
                  }
                  numberOfLines={2}>

                  {location}

                </Text>

              </View>

            </View>

          )}


          {/* =================================================
              SELECTED CAR
          ================================================= */}

          <View style={styles.carSummary}>

            <View
              style={styles.carSummaryIcon}>

              <CarFront
                size={22}
                color="#222A2C"
              />

            </View>


            <View
              style={styles.carSummaryContent}>

              <Text style={styles.carBrand}>
                {car.brand}
              </Text>

              <Text style={styles.carName}>
                {car.name}
              </Text>

              <Text style={styles.carSpecs}>
                {car.seats || '5 Seats'} •{' '}
                {car.transmission ||
                  'Automatic'}{' '}
                •{' '}
                {car.fuelType ||
                  'Petrol'}
              </Text>

            </View>


            <View
              style={styles.carPriceBox}>

              <Text style={styles.carPrice}>
                {car.price}
              </Text>

              <Text
                style={styles.carPriceLabel}>
                per day
              </Text>

            </View>

          </View>


          {/* =================================================
              BOOKING SUMMARY
          ================================================= */}

          <View
            style={styles.summaryCard}>

            <View style={styles.summaryRow}>

              <Text
                style={styles.summaryLabel}>
                Rental type
              </Text>

              <Text
                style={styles.summaryValue}>
                {rentalType}
              </Text>

            </View>


            <View style={styles.summaryRow}>

              <Text
                style={styles.summaryLabel}>
                Rental days
              </Text>

              <Text
                style={styles.summaryValue}>
                {rentalDays} day
                {rentalDays > 1
                  ? 's'
                  : ''}
              </Text>

            </View>


            <View style={styles.summaryDivider} />


            <View style={styles.totalRow}>

              <Text style={styles.totalLabel}>
                Total Amount
              </Text>

              <Text style={styles.totalPrice}>
                ₹{totalPrice}
              </Text>

            </View>

          </View>



        </ScrollView>


        {/* =================================================
            BOTTOM PAY BUTTON
        ================================================= */}

        <View style={styles.bottomBar}>

          <View style={styles.bottomPriceBox}>

            <Text style={styles.bottomLabel}>
              Total Amount
            </Text>

            <Text style={styles.bottomPrice}>
              ₹{totalPrice}
            </Text>

          </View>


          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.payButton}
            onPress={handlePayNow}>

            <Text style={styles.payButtonText}>
              ₹{totalPrice}
            </Text>

            <Text style={styles.payNowText}>
              Pay Now  
            </Text>

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};


/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  flex: {
    flex: 1,
  },


  /* =======================================================
     MAIN
  ======================================================= */

  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
  },


  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 30,
  },


  /* =======================================================
     HEADER
  ======================================================= */

  header: {
    height: 100,
    paddingHorizontal: 20,
    backgroundColor: '#F5F4F4',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:20,
  },


  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DEDEDE',

    alignItems: 'center',
    justifyContent: 'center',
  },


  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },


  /* =======================================================
     PROGRESS
  ======================================================= */

  progressSection: {
    height: 80,

    position: 'relative',

    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 4,
  },


  progressLine: {
    position: 'absolute',

    top: 12,

    left: 43,
    right: 43,

    height: 1.5,

    backgroundColor: '#8A8D8E',
  },


  step: {
    width: 92,

    alignItems: 'center',
  },


  stepCircle: {
    width: 16,
    height: 16,

    borderRadius: 8,

    backgroundColor: '#222A2C',

    alignItems: 'center',
    justifyContent: 'center',
  },


  stepActive: {
    backgroundColor: '#222A2C',
  },


  stepDot: {
    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: '#FFFFFF',
  },


  stepActiveText: {
    marginTop: 8,

    fontSize: 9,
    fontWeight: '700',

    color: '#111111',

    textAlign: 'center',
  },


  stepText: {
    marginTop: 8,

    fontSize: 9,

    color: '#777777',

    textAlign: 'center',
  },


  /* =======================================================
     DRIVER
  ======================================================= */

  driverCard: {
    minHeight: 68,

    paddingHorizontal: 16,

    marginBottom: 18,

    borderRadius: 12,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E0E0E0',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  driverContent: {
    flex: 1,
  },


  driverTitle: {
    fontSize: 14,

    fontWeight: '700',

    color: '#222222',
  },


  driverSubtitle: {
    marginTop: 5,

    fontSize: 11,

    color: '#8B8F90',
  },


  /* =======================================================
     FORM TITLE
  ======================================================= */

  formTitle: {
    marginBottom: 12,

    fontSize: 16,

    fontWeight: '800',

    color: '#111111',
  },


  /* =======================================================
     INPUT
  ======================================================= */

  inputContainer: {
    height: 52,

    marginBottom: 12,

    paddingHorizontal: 15,

    borderRadius: 11,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DEDEDE',

    flexDirection: 'row',
    alignItems: 'center',
  },


  input: {
    flex: 1,

    height: 52,

    marginLeft: 11,

    paddingVertical: 0,

    fontSize: 13,

    color: '#222222',
  },


  /* =======================================================
     SECTION TITLE
  ======================================================= */

  sectionTitle: {
    marginTop: 10,

    marginBottom: 11,

    fontSize: 15,

    fontWeight: '800',

    color: '#111111',
  },


  /* =======================================================
     GENDER
  ======================================================= */

  genderRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 15,
  },


  genderButton: {
    flex: 1,

    height: 42,

    marginHorizontal: 4,

    borderRadius: 21,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DDDDDD',

    alignItems: 'center',
    justifyContent: 'center',
  },


  genderActive: {
    backgroundColor: '#222A2C',

    borderColor: '#222A2C',
  },


  genderText: {
    fontSize: 12,

    color: '#777777',

    fontWeight: '500',
  },


  genderTextActive: {
    color: '#FFFFFF',

    fontWeight: '700',
  },


  /* =======================================================
     RENTAL
  ======================================================= */

  rentalRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 15,
  },


  rentalButton: {
    flex: 1,

    height: 40,

    marginHorizontal: 4,

    borderRadius: 20,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DDDDDD',

    alignItems: 'center',
    justifyContent: 'center',
  },


  rentalActive: {
    backgroundColor: '#000000',

    borderColor: '#000000',
  },


  rentalText: {
    fontSize: 11,

    color: '#777777',

    fontWeight: '500',
  },


  rentalTextActive: {
    color: '#FFFFFF',

    fontWeight: '700',
  },


  /* =======================================================
     DATE
  ======================================================= */

  dateCard: {
    minHeight: 68,

    borderRadius: 34,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DCDCDC',

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 14,
  },


  dateColumn: {
    flex: 1,

    paddingHorizontal: 18,

    justifyContent: 'center',
  },


  dateDivider: {
    width: 1,

    height: 42,

    backgroundColor: '#DDDDDD',
  },


  dateLabel: {
    fontSize: 10,

    fontWeight: '700',

    color: '#333333',

    marginBottom: 6,
  },


  dateValueRow: {
    flexDirection: 'row',

    alignItems: 'center',
  },


  dateValue: {
    marginLeft: 7,

    fontSize: 11,

    color: '#777777',

    fontWeight: '500',
  },


  /* =======================================================
     GOOGLE LOCATION
  ======================================================= */

  locationWrapper: {
    minHeight: 56,

    marginBottom: 10,

    borderRadius: 11,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#DEDEDE',

    flexDirection: 'row',

    alignItems: 'center',

    paddingLeft: 13,

    overflow: 'visible',

    zIndex: 1000,
  },


  locationInput: {
    flex: 1,
    minWidth: 0,
    height: 52,
    marginLeft: 8,
    paddingVertical: 0,
    paddingHorizontal: 6,
    fontSize: 13,
    color: '#222222',
  },

  locationRightIcon: {
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationLoading: {
    position: 'absolute',
    right: 42,
    top: 60,
    fontSize: 10,
    color: '#777777',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
  },

  locationResults: {
    position: 'absolute',
    top: 58,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    elevation: 8,
    zIndex: 9999,
  },

  locationRow: {
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  resultIcon: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationResultText: {
    flex: 1,
    minWidth: 0,
    marginLeft: 6,
    fontSize: 11,
    lineHeight: 16,
    color: '#333333',
  },

  locationIcon: {
    width: 35,
    height: 35,

    borderRadius: 18,

    backgroundColor: '#F1F2F2',

    alignItems: 'center',
    justifyContent: 'center',
  },


  googleContainer: {
    flex: 1,

    marginLeft: 5,

    zIndex: 1000,
  },


  googleInputContainer: {
    backgroundColor: 'transparent',

    height: 54,

    padding: 0,

    borderTopWidth: 0,
    borderBottomWidth: 0,
  },


  googleInput: {
    height: 52,

    margin: 0,

    paddingHorizontal: 8,

    backgroundColor: 'transparent',

    fontSize: 13,

    color: '#222222',
  },


  googleList: {
    position: 'absolute',

    top: 58,

    left: -48,

    right: 0,

    backgroundColor: '#FFFFFF',

    borderRadius: 10,

    borderWidth: 1,

    borderColor: '#E1E1E1',

    elevation: 6,

    shadowColor: '#000',

    shadowOpacity: 0.12,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    zIndex: 9999,
  },


  googleRow: {
    paddingHorizontal: 14,

    paddingVertical: 13,

    borderBottomWidth: 1,

    borderBottomColor: '#F0F0F0',
  },


  googleDescription: {
    fontSize: 12,

    color: '#333333',
  },


  googleRightIcon: {
    width: 30,
    height: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },


  /* =======================================================
     SELECTED LOCATION
  ======================================================= */

  selectedLocation: {
    minHeight: 62,

    paddingHorizontal: 13,

    marginBottom: 14,

    borderRadius: 11,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E0E0E0',

    flexDirection: 'row',
    alignItems: 'center',
  },


  selectedLocationContent: {
    flex: 1,

    marginLeft: 10,
  },


  selectedLocationLabel: {
    fontSize: 9,

    color: '#999999',

    marginBottom: 4,
  },


  selectedLocationText: {
    flex: 1,
    minWidth: 0,
    fontSize: 12,

    fontWeight: '600',

    color: '#333333',

    lineHeight: 17,
  },


  /* =======================================================
     CAR SUMMARY
  ======================================================= */

  carSummary: {
    minHeight: 85,

    padding: 12,

    marginBottom: 14,

    borderRadius: 14,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E0E0E0',

    flexDirection: 'row',
    alignItems: 'center',
  },


  carSummaryIcon: {
    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#F0F1F1',

    alignItems: 'center',
    justifyContent: 'center',
  },


  carSummaryContent: {
    flex: 1,

    marginLeft: 12,
  },


  carBrand: {
    fontSize: 10,

    color: '#999999',
  },


  carName: {
    marginTop: 3,

    fontSize: 15,

    fontWeight: '800',

    color: '#222222',
  },


  carSpecs: {
    marginTop: 5,

    fontSize: 10,

    color: '#777777',
  },


  carPriceBox: {
    alignItems: 'flex-end',
  },


  carPrice: {
    fontSize: 16,

    fontWeight: '800',

    color: '#222A2C',
  },


  carPriceLabel: {
    marginTop: 3,

    fontSize: 9,

    color: '#999999',
  },


  /* =======================================================
     SUMMARY
  ======================================================= */

  summaryCard: {
    padding: 16,

    borderRadius: 14,

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E0E0E0',
  },


  summaryRow: {
    minHeight: 32,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  summaryLabel: {
    fontSize: 12,

    color: '#777777',
  },


  summaryValue: {
    fontSize: 12,

    fontWeight: '700',

    color: '#222222',
  },


  summaryDivider: {
    height: 1,

    backgroundColor: '#E7E7E7',

    marginVertical: 8,
  },


  totalRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  totalLabel: {
    fontSize: 15,

    fontWeight: '800',

    color: '#111111',
  },


  totalPrice: {
    fontSize: 20,

    fontWeight: '800',

    color: '#222A2C',
  },


  /* =======================================================
     BOTTOM
  ======================================================= */

  


  bottomBar: {
    minHeight: 88,

    paddingHorizontal: 20,

    paddingTop: 10,

    paddingBottom: Platform.OS === 'ios'
      ? 14
      : 10,

    backgroundColor: '#F5F4F4',

    borderTopWidth: 1,

    borderTopColor: '#E2E2E2',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },


  bottomPriceBox: {
    paddingLeft: 2,
  },


  bottomLabel: {
    fontSize: 10,

    color: '#888888',
  },


  bottomPrice: {
    marginTop: 3,

    fontSize: 21,

    fontWeight: '800',

    color: '#222A2C',
  },


  payButton: {
    minWidth: 190,

    height: 54,

    paddingHorizontal: 25,

    borderRadius: 28,

    backgroundColor: '#222A2C',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',
  },


  payButtonText: {
    marginRight: 13,

    fontSize: 14,

    fontWeight: '800',

    color: '#FFFFFF',
  },


  payNowText: {
    fontSize: 14,

    fontWeight: '700',

    color: '#FFFFFF',
  },


  /* =======================================================
     ERROR
  ======================================================= */

  errorContainer: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    paddingHorizontal: 30,
  },


  errorTitle: {
    marginTop: 15,

    fontSize: 20,

    fontWeight: '800',

    color: '#222222',
  },


  errorText: {
    marginTop: 8,

    fontSize: 13,

    color: '#777777',

    textAlign: 'center',
  },


  backButton: {
    marginTop: 20,

    height: 48,

    paddingHorizontal: 30,

    borderRadius: 24,

    backgroundColor: '#222A2C',

    alignItems: 'center',
    justifyContent: 'center',
  },


  backButtonText: {
    color: '#FFFFFF',

    fontSize: 14,

    fontWeight: '700',
  },




  locationMapContainer: {
  height: 240,
  marginBottom: 14,
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#DEDEDE',
},

locationMap: {
  flex: 1,
},

});




export default BookingScreen  