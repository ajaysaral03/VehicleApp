import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  Linking,
  ScrollView,
  Modal,
  Animated,
  Easing,
} from 'react-native';

import {WebView} from 'react-native-webview';
import Sound from 'react-native-sound';

import {
  ArrowLeft,
  Phone,
  UserRound,
  LocateFixed,
  MapPin,
  Clock3,
  IndianRupee,
  Navigation,
  CheckCircle2,
  Bell,
  CarFront,
  X,
} from 'lucide-react-native';

/* =========================================================
   TYPES
========================================================= */

type Coordinate = {
  latitude: number;
  longitude: number;
};

type VehicleType = 'bike' | 'auto' | 'car';

type Vehicle = {
  type: VehicleType;
  name: string;
  icon: string;
  baseFare: number;
  perKm: number;
  minimumFare: number;
  speed: number;
  driverName: string;
  driverPhone: string;
  rating: number;
};

/* =========================================================
   DEFAULT INDORE LOCATION
========================================================= */

const INDORE: Coordinate = {
  latitude: 22.7196,
  longitude: 75.8577,
};

const DEFAULT_DRIVER: Coordinate = {
  latitude: 22.7271,
  longitude: 75.8792,
};

/* =========================================================
   VEHICLES
========================================================= */

const VEHICLES: Vehicle[] = [
  {
    type: 'bike',
    name: 'Bike',
    icon: '🏍️',
    baseFare: 20,
    perKm: 8,
    minimumFare: 40,
    speed: 28,
    driverName: 'Rahul Sharma',
    driverPhone: '+919111040320',
    rating: 4.8,
  },

  {
    type: 'auto',
    name: 'Auto',
    icon: '🛺',
    baseFare: 30,
    perKm: 12,
    minimumFare: 60,
    speed: 25,
    driverName: 'Amit Verma',
    driverPhone: '+919111040320',
    rating: 4.7,
  },

  {
    type: 'car',
    name: 'Car',
    icon: '🚕',
    baseFare: 60,
    perKm: 18,
    minimumFare: 100,
    speed: 30,
    driverName: 'Vikas Patel',
    driverPhone: '+919111040320',
    rating: 4.9,
  },
];

/* =========================================================
   INR
========================================================= */

const formatINR = (amount: number) => {
  return `${Math.round(amount).toLocaleString('en-IN')}`;
};

/* =========================================================
   SCREEN
========================================================= */

const LiveTrackingScreen = ({
  navigation,
  route,
}: any) => {
  const booking = route?.params?.booking || {};

  /* =======================================================
     PICKUP
  ======================================================= */

  const pickup: Coordinate = useMemo(() => {
    const latitude = Number(
      booking?.pickupLatitude,
    );

    const longitude = Number(
      booking?.pickupLongitude,
    );

    if (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude)
    ) {
      return {
        latitude,
        longitude,
      };
    }

    return INDORE;
  }, [booking]);

  /* =======================================================
     DRIVER
  ======================================================= */

  const driverStart: Coordinate = useMemo(() => {
    const latitude = Number(
      booking?.driverLatitude,
    );

    const longitude = Number(
      booking?.driverLongitude,
    );

    if (
      Number.isFinite(latitude) &&
      Number.isFinite(longitude)
    ) {
      return {
        latitude,
        longitude,
      };
    }

    return DEFAULT_DRIVER;
  }, [booking]);

  /* =======================================================
     STATES
  ======================================================= */

  const [selectedVehicle, setSelectedVehicle] =
    useState<VehicleType>('auto');

  const [driverLocation, setDriverLocation] =
    useState<Coordinate>(driverStart);

  const [distanceKm, setDistanceKm] =
    useState(0);

  const [etaMinutes, setEtaMinutes] =
    useState(0);

  const [fare, setFare] =
    useState(0);

  const [booked, setBooked] =
    useState(false);

  /* =======================================================
     PICKUP ALERT
  ======================================================= */

  const [showPickupModal, setShowPickupModal] =
    useState(false);

  const [pickupAlertShown, setPickupAlertShown] =
    useState(false);

  /* =======================================================
     REFS
  ======================================================= */

  const webViewRef =
    useRef<WebView>(null);

  const pickupSound =
    useRef<Sound | null>(null);

  const pickupAlertPlayed =
    useRef(false);

  const pickupModalVisibleRef =
    useRef(false);

  /* =======================================================
     ANIMATION
  ======================================================= */

  const bellScale = useRef(
    new Animated.Value(1),
  ).current;

  const bellRotate = useRef(
    new Animated.Value(0),
  ).current;

  const modalScale = useRef(
    new Animated.Value(0.8),
  ).current;

  const modalOpacity = useRef(
    new Animated.Value(0),
  ).current;

  /* =======================================================
     VEHICLE
  ======================================================= */

  const selectedVehicleData =
    VEHICLES.find(
      item =>
        item.type === selectedVehicle,
    ) || VEHICLES[1];

  /* =======================================================
     ADDRESS
  ======================================================= */

  const pickupAddress =
    booking?.location ||
    'Vijay Nagar, Indore, Madhya Pradesh';

  /* =======================================================
     LOAD SOUND
  ======================================================= */

  useEffect(() => {
    Sound.setCategory('Playback');

    const sound = new Sound(
      'pickup_alert.mp3',
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log(
            'Pickup sound load error:',
            error,
          );

          return;
        }

        console.log(
          'Pickup sound loaded successfully',
        );
      },
    );

    pickupSound.current = sound;

    return () => {
      pickupSound.current?.stop();
      pickupSound.current?.release();
      pickupSound.current = null;
    };
  }, []);

  /* =======================================================
     MODAL ANIMATION
  ======================================================= */

  useEffect(() => {
    if (!showPickupModal) {
      return;
    }

    modalScale.setValue(0.8);
    modalOpacity.setValue(0);

    Animated.parallel([
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),

      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    const bellAnimation =
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(
              bellScale,
              {
                toValue: 1.12,
                duration: 180,
                easing: Easing.out(
                  Easing.ease,
                ),
                useNativeDriver: true,
              },
            ),

            Animated.timing(
              bellRotate,
              {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
              },
            ),
          ]),

          Animated.timing(
            bellRotate,
            {
              toValue: -1,
              duration: 100,
              useNativeDriver: true,
            },
          ),

          Animated.timing(
            bellRotate,
            {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            },
          ),

          Animated.parallel([
            Animated.timing(
              bellScale,
              {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
              },
            ),

            Animated.timing(
              bellRotate,
              {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
              },
            ),
          ]),

          Animated.delay(600),
        ]),
      );

    bellAnimation.start();

    return () => {
      bellAnimation.stop();

      bellScale.setValue(1);
      bellRotate.setValue(0);
    };
  }, [showPickupModal]);

  /* =======================================================
     DISTANCE
  ======================================================= */

  const calculateDistance = (
    from: Coordinate,
    to: Coordinate,
  ) => {
    const earthRadiusKm = 6371;

    const dLat =
      ((to.latitude - from.latitude) *
        Math.PI) /
      180;

    const dLon =
      ((to.longitude - from.longitude) *
        Math.PI) /
      180;

    const lat1 =
      (from.latitude * Math.PI) /
      180;

    const lat2 =
      (to.latitude * Math.PI) /
      180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(lat1) *
        Math.cos(lat2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a),
      );

    return earthRadiusKm * c;
  };

  /* =======================================================
     FARE
  ======================================================= */

  const calculateFare = (
    km: number,
    vehicle: Vehicle,
  ) => {
    const calculated =
      vehicle.baseFare +
      km * vehicle.perKm;

    return Math.max(
      vehicle.minimumFare,
      Math.round(calculated),
    );
  };

  /* =======================================================
     PLAY PICKUP ALERT
  ======================================================= */

  const playPickupAlert = () => {
    if (pickupAlertPlayed.current) {
      return;
    }

    pickupAlertPlayed.current = true;

    pickupModalVisibleRef.current = true;

    setPickupAlertShown(true);
    setShowPickupModal(true);

    const playLoop = () => {
      if (
        !pickupSound.current ||
        !pickupModalVisibleRef.current
      ) {
        return;
      }

      pickupSound.current.stop(() => {
        if (
          !pickupModalVisibleRef.current
        ) {
          return;
        }

        pickupSound.current?.setCurrentTime(
          0,
        );

        pickupSound.current?.play(
          success => {
            if (
              success &&
              pickupModalVisibleRef.current
            ) {
              playLoop();
            }
          },
        );
      });
    };

    playLoop();
  };

  /* =======================================================
     CLOSE ALERT
  ======================================================= */

const closePickupAlert = () => {
  // 1. Sound ko immediately stop karo
  if (pickupSound.current) {
    pickupSound.current.stop(() => {
      pickupSound.current?.release();
      pickupSound.current = null;
    });
  }

  // 2. Sound/modal states reset karo
  pickupModalVisibleRef.current = false;
  setShowPickupModal(false);
  setPickupAlertShown(false);

  // 3. Ab next screen par jao
  navigation.navigate('PickupConfirmation', {
    pickupAddress:
      booking?.pickupAddress || 'Pickup Location',

    dropAddress:
      booking?.dropAddress || 'Drop Location',

    vehicleType:
      booking?.vehicleType || 'Car',

    driverName:
      booking?.driverName || 'Amit Verma',

    driverPhone:
      booking?.driverPhone || '+919111040320',

    vehicleNumber:
      booking?.vehicleNumber || 'MP 09 AB 1234',

    fare:
      Number(booking?.fare || 0),
  });
};

  /* =======================================================
     DISTANCE / FARE / ETA
  ======================================================= */

  useEffect(() => {
    const km = calculateDistance(
      driverLocation,
      pickup,
    );

    const currentFare =
      calculateFare(
        km,
        selectedVehicleData,
      );

    const eta =
      km <= 0.05
        ? 1
        : Math.max(
            1,
            Math.ceil(
              (km /
                selectedVehicleData.speed) *
                60,
            ),
          );

    setDistanceKm(km);
    setFare(currentFare);
    setEtaMinutes(eta);

    /* 100 METERS */

    if (
      km <= 0.1 &&
      !pickupAlertPlayed.current
    ) {
      playPickupAlert();
    }
  }, [
    driverLocation,
    pickup,
    selectedVehicleData,
  ]);

  /* =======================================================
     DEMO DRIVER MOVEMENT
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setDriverLocation(current => {
        const latDifference =
          pickup.latitude -
          current.latitude;

        const lngDifference =
          pickup.longitude -
          current.longitude;

        const remaining =
          Math.sqrt(
            latDifference *
              latDifference +
              lngDifference *
                lngDifference,
          );

        if (
          remaining < 0.00005
        ) {
          return pickup;
        }

        return {
          latitude:
            current.latitude +
            latDifference * 0.04,

          longitude:
            current.longitude +
            lngDifference * 0.04,
        };
      });
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [pickup]);

  /* =======================================================
     UPDATE MAP
  ======================================================= */

  useEffect(() => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: 'DRIVER_LOCATION',

        latitude:
          driverLocation.latitude,

        longitude:
          driverLocation.longitude,
      }),
    );
  }, [driverLocation]);

  /* =======================================================
     MAP
  ======================================================= */

  const mapHtml = useMemo(() => {
    return `
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

width:100%;
height:100%;
margin:0;
padding:0;

}

body {
overflow:hidden;
}

.vehicle-marker {

width:48px;
height:48px;

border-radius:50%;

background:#222A2C;

border:3px solid #FFFFFF;

display:flex;
align-items:center;
justify-content:center;

font-size:25px;

box-shadow:
0 4px 12px rgba(0,0,0,.30);

}

.pickup-marker {

width:44px;
height:44px;

border-radius:50%;

background:#FFFFFF;

border:3px solid #222A2C;

display:flex;
align-items:center;
justify-content:center;

font-size:24px;

box-shadow:
0 4px 12px rgba(0,0,0,.30);

}

</style>

</head>

<body>

<div id="map"></div>

<script
src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">
</script>

<script>

const driver = {
lat:${driverLocation.latitude},
lng:${driverLocation.longitude}
};

const pickup = {
lat:${pickup.latitude},
lng:${pickup.longitude}
};

const vehicleIcon =
'${selectedVehicleData.icon}';

const map =
L.map('map',{
zoomControl:false
});

map.setView(
[
(driver.lat + pickup.lat) / 2,
(driver.lng + pickup.lng) / 2
],
13
);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19,
attribution:
'&copy; OpenStreetMap contributors'
}
).addTo(map);

const driverIcon =
L.divIcon({

className:'',

html:
'<div class="vehicle-marker">'
+
vehicleIcon
+
'</div>',

iconSize:[48,48],
iconAnchor:[24,24]

});

const pickupIcon =
L.divIcon({

className:'',

html:
'<div class="pickup-marker">📍</div>',

iconSize:[44,44],
iconAnchor:[22,22]

});

const driverMarker =
L.marker(
[
driver.lat,
driver.lng
],
{
icon:driverIcon
}
).addTo(map);

driverMarker.bindPopup(
'<b>${selectedVehicleData.name}</b>'
+
'<br/>'
+
'${selectedVehicleData.driverName}'
);

const pickupMarker =
L.marker(
[
pickup.lat,
pickup.lng
],
{
icon:pickupIcon
}
).addTo(map);

pickupMarker.bindPopup(
'<b>Pickup Location</b>'
+
'<br/>'
+
'${pickupAddress}'
);

let routeLine =
L.polyline(
[
[
driver.lat,
driver.lng
],
[
pickup.lat,
pickup.lng
]
],
{
color:'#222A2C',
weight:5,
opacity:.85
}
).addTo(map);

function updateDriver(
latitude,
longitude
){

driverMarker.setLatLng(
[
latitude,
longitude
]
);

routeLine.setLatLngs(
[
[
latitude,
longitude
],
[
pickup.lat,
pickup.lng
]
]
);

}

function centerDriver(
latitude,
longitude
){

map.setView(
[
latitude,
longitude
],
15
);

}

window.addEventListener(
'message',
function(event){

try{

const data =
JSON.parse(event.data);

if(
data.type ===
'DRIVER_LOCATION'
){

updateDriver(
data.latitude,
data.longitude
);

}

if(
data.type ===
'CENTER_MAP'
){

centerDriver(
data.latitude,
data.longitude
);

}

}catch(error){

console.log(error);

}

}
);

</script>

</body>

</html>
`;
  }, [
    driverLocation,
    pickup,
    selectedVehicleData,
    pickupAddress,
  ]);

  /* =======================================================
     CALL
  ======================================================= */

  const handleCallDriver = () => {
    Alert.alert(
      'Driver Details',

      `${selectedVehicleData.driverName}
${selectedVehicleData.driverPhone}`,

      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Call',

          onPress: () => {
            Linking.openURL(
              `tel:${selectedVehicleData.driverPhone}`,
            );
          },
        },
      ],
    );
  };

  /* =======================================================
     CENTER MAP
  ======================================================= */

  const centerMap = () => {
    webViewRef.current?.postMessage(
      JSON.stringify({
        type: 'CENTER_MAP',

        latitude:
          driverLocation.latitude,

        longitude:
          driverLocation.longitude,
      }),
    );
  };

  /* =======================================================
     BOOK
  ======================================================= */

  const handleBookRide = () => {
    setBooked(true);

    Alert.alert(
      'Ride Booked 🎉',

      `${selectedVehicleData.name} booked successfully.

Driver: ${selectedVehicleData.driverName}

Distance: ${distanceKm.toFixed(1)} km

ETA: ${etaMinutes} min

Fare: ${formatINR(fare)}

Pickup:
${pickupAddress}`,
    );
  };

  /* =======================================================
     SELECT VEHICLE
  ======================================================= */

  const handleVehicleSelect = (
    type: VehicleType,
  ) => {
    setSelectedVehicle(type);
    setBooked(false);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <SafeAreaView
      style={styles.container}>

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F4F4"
      />

      {/* ===================================================
          HEADER
      =================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() =>
            navigation.goBack()
          }>

          <ArrowLeft
            size={22}
            color="#222A2C"
          />

        </TouchableOpacity>

        <View
          style={styles.headerCenter}>

          <Text
            style={styles.headerTitle}>
            Book a Ride
          </Text>

          <Text
            style={styles.headerSubtitle}>
            Indore, Madhya Pradesh
          </Text>

        </View>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={centerMap}>

          <LocateFixed
            size={20}
            color="#222A2C"
          />

        </TouchableOpacity>

      </View>

      {/* ===================================================
          PICKUP SECTION
      =================================================== */}

      <View
        style={styles.pickupSection}>

        <View
          style={styles.pickupTimeline}>

          <View
            style={styles.currentLocationDot}>
            <View
              style={
                styles.currentLocationInner
              }
            />
          </View>

          <View
            style={styles.timelineLine}
          />

          <View
            style={styles.destinationDot}>

            <MapPin
              size={16}
              color="#FFFFFF"
            />

          </View>

        </View>

        <View
          style={styles.pickupContent}>

          <Text
            style={styles.pickupLabel}>
            PICKUP LOCATION
          </Text>

          <Text
            style={styles.pickupAddress}
            numberOfLines={2}>
            {pickupAddress}
          </Text>

          <View
            style={styles.pickupMetaRow}>

            <View
              style={styles.locationTag}>

              <LocateFixed
                size={12}
                color="#1E9E4A"
              />

              <Text
                style={styles.locationTagText}>
                Current pickup
              </Text>

            </View>

            <Text
              style={styles.indoreText}>
              INDORE
            </Text>

          </View>

        </View>

        <TouchableOpacity
          style={styles.changePickupButton}
          onPress={() =>
            Alert.alert(
              'Pickup Location',
              'Pickup location change screen yahan open hoga.',
            )
          }>

          <Text
            style={styles.changePickupText}>
            Change
          </Text>

        </TouchableOpacity>

      </View>

      {/* ===================================================
          VEHICLE
      =================================================== */}

      <View
        style={styles.vehicleSection}>

        <View
          style={styles.sectionHeaderRow}>

          <Text
            style={styles.sectionTitle}>
            Choose your ride
          </Text>

          <Text
            style={styles.estimateText}>
            Estimated fare
          </Text>

        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={
            false
          }>

          {VEHICLES.map(item => {

            const active =
              selectedVehicle ===
              item.type;

            const itemFare =
              calculateFare(
                distanceKm,
                item,
              );

            return (
              <TouchableOpacity
                key={item.type}
                activeOpacity={0.85}
                onPress={() =>
                  handleVehicleSelect(
                    item.type,
                  )
                }
                style={[
                  styles.vehicleCard,
                  active &&
                    styles.vehicleCardActive,
                ]}>

                <View
                  style={[
                    styles.vehicleIconBox,
                    active &&
                      styles.vehicleIconBoxActive,
                  ]}>

                  <Text
                    style={styles.vehicleIcon}>
                    {item.icon}
                  </Text>

                </View>

                <View
                  style={
                    styles.vehicleContent
                  }>

                  <Text
                    style={[
                      styles.vehicleName,
                      active &&
                        styles.vehicleNameActive,
                    ]}>
                    {item.name}
                  </Text>

                  <Text
                    style={styles.vehicleRate}>
                    ₹{item.perKm}/km
                  </Text>

                </View>

                <View
                  style={
                    styles.vehicleFare
                  }>

                  <Text
                    style={[
                      styles.vehicleFareText,
                      active &&
                        styles.vehicleFareActive,
                    ]}>
                    {formatINR(
                      itemFare,
                    )}
                  </Text>

                  <Text
                    style={styles.vehicleMin}>
                    Min ₹
                    {item.minimumFare}
                  </Text>

                </View>

              </TouchableOpacity>
            );
          })}

        </ScrollView>

      </View>

      {/* ===================================================
          MAP
      =================================================== */}

      <View
        style={styles.mapContainer}>

        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{
            html: mapHtml,
          }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          style={styles.map}
        />

        <View
          style={styles.liveBadge}>

          <View
            style={styles.liveDot}
          />

          <Text
            style={styles.liveText}>
            DRIVER LIVE
          </Text>

        </View>

        <View
          style={styles.mapDistance}>

          <Navigation
            size={14}
            color="#222A2C"
          />

          <Text
            style={styles.mapDistanceText}>
            {distanceKm < 1
              ? `${Math.round(
                  distanceKm * 1000,
                )} m`
              : `${distanceKm.toFixed(1)} km`}
          </Text>

        </View>

        {pickupAlertShown && (
          <View
            style={styles.mapAlertBadge}>

            <Bell
              size={15}
              color="#1E9E4A"
            />

            <Text
              style={styles.mapAlertText}>
              Driver is nearby
            </Text>

          </View>
        )}

      </View>

      {/* ===================================================
          BOTTOM
      =================================================== */}

      <View
        style={styles.bottomSheet}>

        <View
          style={styles.handle}
        />

        <View
          style={styles.driverRow}>

          <View
            style={styles.driverAvatar}>

            <UserRound
              size={23}
              color="#222A2C"
            />

          </View>

          <View
            style={styles.driverDetails}>

            <Text
              style={styles.driverName}>
              {
                selectedVehicleData.driverName
              }
            </Text>

            <Text
              style={styles.driverRating}>
              ★{' '}
              {
                selectedVehicleData.rating
              }
              {' • '}
              {
                selectedVehicleData.name
              }
            </Text>

          </View>

          <TouchableOpacity
            style={styles.callButton}
            onPress={
              handleCallDriver
            }>

            <Phone
              size={18}
              color="#FFFFFF"
            />

          </TouchableOpacity>

        </View>

        <View
          style={styles.infoRow}>

          <View
            style={styles.infoCard}>

            <Clock3
              size={17}
              color="#222A2C"
            />

            <Text
              style={styles.infoLabel}>
              ETA
            </Text>

            <Text
              style={styles.infoValue}>
              {etaMinutes} min
            </Text>

          </View>

          <View
            style={styles.infoCard}>

            <Navigation
              size={17}
              color="#222A2C"
            />

            <Text
              style={styles.infoLabel}>
              Distance
            </Text>

            <Text
              style={styles.infoValue}>
              {distanceKm < 1
                ? `${Math.round(
                    distanceKm * 1000,
                  )} m`
                : `${distanceKm.toFixed(
                    1,
                  )} km`}
            </Text>

          </View>

          <View
            style={styles.infoCard}>

            <IndianRupee
              size={17}
              color="#222A2C"
            />

            <Text
              style={styles.infoLabel}>
              Fare
            </Text>

            <Text
              style={styles.infoValue}>
              {formatINR(fare)}
            </Text>

          </View>

        </View>

        <View
          style={styles.fareBox}>

          <View
            style={styles.fareRow}>

            <Text
              style={styles.fareLabel}>
              Base fare
            </Text>

            <Text
              style={styles.fareValue}>
              {formatINR(
                selectedVehicleData.baseFare,
              )}
            </Text>

          </View>

          <View
            style={styles.fareRow}>

            <Text
              style={styles.fareLabel}>
              Distance fare
            </Text>

            <Text
              style={styles.fareValue}>
              {formatINR(
                distanceKm *
                  selectedVehicleData.perKm,
              )}
            </Text>

          </View>

          <View
            style={styles.fareDivider}
          />

          <View
            style={styles.fareRow}>

            <Text
              style={styles.totalLabel}>
              Total Estimated Fare
            </Text>

            <Text
              style={styles.totalValue}>
              {formatINR(fare)}
            </Text>

          </View>

        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.bookRideButton,
            booked &&
              styles.bookedButton,
          ]}
          onPress={
            handleBookRide
          }>

          {booked ? (
            <CheckCircle2
              size={20}
              color="#FFFFFF"
            />
          ) : (
            <CarFront
              size={20}
              color="#FFFFFF"
            />
          )}

          <Text
            style={styles.bookRideText}>

            {booked
              ? 'Ride Booked'
              : `Book ${selectedVehicleData.name} • ${formatINR(fare)}`}

          </Text>

        </TouchableOpacity>

      </View>

      {/* ===================================================
          SWEET ALERT STYLE PICKUP MODAL
      =================================================== */}

      <Modal
        visible={showPickupModal}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={() => {}}
      >

        <View
          style={styles.modalOverlay}>

          <Animated.View
            style={[
              styles.pickupModal,
              {
                opacity:
                  modalOpacity,

                transform: [
                  {
                    scale:
                      modalScale,
                  },
                ],
              },
            ]}>

            {/* CLOSE DISABLED INTENTIONALLY */}

            <View
              style={styles.modalTopIcon}>

              <Animated.View
                style={[
                  styles.bellCircle,
                  {
                    transform: [
                      {
                        scale:
                          bellScale,
                      },

                      {
                        rotate:
                          bellRotate.interpolate(
                            {
                              inputRange: [
                                -1,
                                1,
                              ],

                              outputRange: [
                                '-12deg',
                                '12deg',
                              ],
                            },
                          ),
                      },
                    ],
                  },
                ]}>

                <Bell
                  size={38}
                  color="#1E9E4A"
                  strokeWidth={2.4}
                />

              </Animated.View>

            </View>

            <View
              style={styles.successDot}>

              <CheckCircle2
                size={13}
                color="#FFFFFF"
              />

            </View>

            <Text
              style={styles.modalTitle}>
              Pickup Alert
            </Text>

            <Text
              style={styles.modalSubtitle}>
              Your driver is nearby
            </Text>

            {/* DRIVER CARD */}

            <View
              style={styles.alertDriverCard}>

              <View
                style={styles.alertDriverIcon}>

                <Text
                  style={styles.alertDriverEmoji}>
                  {
                    selectedVehicleData.icon
                  }
                </Text>

              </View>

              <View
                style={styles.alertDriverInfo}>

                <Text
                  style={styles.alertDriverName}>
                  {
                    selectedVehicleData.driverName
                  }
                </Text>

                <View
                  style={
                    styles.alertDriverMeta
                  }>

                  <Text
                    style={
                      styles.alertDriverVehicle
                    }>
                    {
                      selectedVehicleData.name
                    }
                  </Text>

                  <Text
                    style={
                      styles.alertDriverSeparator
                    }>
                    •
                  </Text>

                  <Text
                    style={
                      styles.alertDriverRating
                    }>
                    ★{' '}
                    {
                      selectedVehicleData.rating
                    }
                  </Text>

                </View>

              </View>

              <View
                style={styles.nearbyPill}>

                <View
                  style={styles.nearbyGreenDot}
                />

                <Text
                  style={styles.nearbyPillText}>
                  Nearby
                </Text>

              </View>

            </View>

            {/* PICKUP LOCATION */}

            <View
              style={styles.alertPickupCard}>

              <View
                style={styles.alertPickupIcon}>

                <MapPin
                  size={20}
                  color="#1E9E4A"
                />

              </View>

              <View
                style={styles.alertPickupInfo}>

                <Text
                  style={styles.alertPickupLabel}>
                  PICKUP LOCATION
                </Text>

                <Text
                  style={styles.alertPickupAddress}
                  numberOfLines={2}>
                  {pickupAddress}
                </Text>

              </View>

            </View>

            {/* DISTANCE / ETA */}

            <View
              style={styles.alertStatsRow}>

              <View
                style={styles.alertStat}>

                <Navigation
                  size={16}
                  color="#555555"
                />

                <View
                  style={
                    styles.alertStatContent
                  }>

                  <Text
                    style={styles.alertStatLabel}>
                    Distance
                  </Text>

                  <Text
                    style={styles.alertStatValue}>

                    {distanceKm < 1
                      ? `${Math.round(
                          distanceKm *
                            1000,
                        )} m`
                      : `${distanceKm.toFixed(
                          1,
                        )} km`}

                  </Text>

                </View>

              </View>

              <View
                style={styles.alertStat}>

                <Clock3
                  size={16}
                  color="#555555"
                />

                <View
                  style={
                    styles.alertStatContent
                  }>

                  <Text
                    style={styles.alertStatLabel}>
                    ETA
                  </Text>

                  <Text
                    style={styles.alertStatValue}>
                    {etaMinutes} min
                  </Text>

                </View>

              </View>

            </View>

            {/* MESSAGE */}

            <View
              style={styles.readyMessage}>

              <Text
                style={styles.readyEmoji}>
                ✨
              </Text>

              <Text
                style={styles.readyMessageText}>
                Please be ready for pickup
              </Text>

            </View>

            {/* OK BUTTON */}

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.alertOkButton}
              onPress={
                closePickupAlert
              }>

              <CheckCircle2
                size={20}
                color="#FFFFFF"
              />

              <Text
                style={styles.alertOkText}>
                OK, Got It
              </Text>

            </TouchableOpacity>

            <Text
              style={styles.soundHint}>
              🔊 Pickup alert is playing
            </Text>

          </Animated.View>

        </View>

      </Modal>

    </SafeAreaView>
  );
};

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F4F4',
  },

  header: {
    height: 100,
    marginTop:20,
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
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#202426',
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 9,
    color: '#888888',
  },

  /* PICKUP */

  pickupSection: {
    marginHorizontal: 15,
    marginBottom: 9,
    padding: 13,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },

  pickupTimeline: {
    width: 27,
    height: 63,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  currentLocationDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E6F7EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  currentLocationInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1E9E4A',
  },

  timelineLine: {
    width: 1,
    flex: 1,
    marginVertical: 4,
    backgroundColor: '#D8D8D8',
  },

  destinationDot: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pickupContent: {
    flex: 1,
    marginLeft: 7,
  },

  pickupLabel: {
    fontSize: 8,
    fontWeight: '900',
    color: '#1E9E4A',
    letterSpacing: 0.5,
  },

  pickupAddress: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '800',
    color: '#252525',
    lineHeight: 17,
  },

  pickupMetaRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationTag: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#EDF9F1',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationTagText: {
    marginLeft: 4,
    fontSize: 7,
    fontWeight: '800',
    color: '#1E9E4A',
  },

  indoreText: {
    marginLeft: 8,
    fontSize: 7,
    fontWeight: '900',
    color: '#AAAAAA',
  },

  changePickupButton: {
    paddingHorizontal: 8,
    paddingVertical: 7,
  },

  changePickupText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#222A2C',
  },

  /* VEHICLE */

  vehicleSection: {
    paddingHorizontal: 15,
    marginBottom: 8,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#222222',
  },

  estimateText: {
    fontSize: 8,
    color: '#999999',
    fontWeight: '700',
  },

  vehicleCard: {
    width: 202,
    height: 69,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    marginRight: 9,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  vehicleCardActive: {
    backgroundColor: '#F0F2F2',
    borderColor: '#222A2C',
  },

  vehicleIconBox: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleIconBoxActive: {
    backgroundColor: '#FFFFFF',
  },

  vehicleIcon: {
    fontSize: 25,
  },

  vehicleContent: {
    flex: 1,
    marginLeft: 8,
  },

  vehicleName: {
    fontSize: 12,
    fontWeight: '900',
    color: '#222222',
  },

  vehicleNameActive: {
    color: '#222A2C',
  },

  vehicleRate: {
    marginTop: 3,
    fontSize: 8,
    color: '#888888',
  },

  vehicleFare: {
    alignItems: 'flex-end',
  },

  vehicleFareText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#222222',
  },

  vehicleFareActive: {
    color: '#222A2C',
  },

  vehicleMin: {
    marginTop: 2,
    fontSize: 7,
    color: '#999999',
  },

  /* MAP */

  mapContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 8,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },

  map: {
    flex: 1,
  },

  liveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#20A04B',
    marginRight: 6,
  },

  liveText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#20A04B',
  },

  mapDistance: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  mapDistanceText: {
    marginLeft: 5,
    fontSize: 9,
    fontWeight: '900',
    color: '#222A2C',
  },

  mapAlertBadge: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },

  mapAlertText: {
    marginLeft: 5,
    fontSize: 8,
    fontWeight: '900',
    color: '#1E9E4A',
  },

  /* BOTTOM */

  bottomSheet: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
    paddingTop: 7,
    paddingBottom: 13,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#D0D0D0',
    alignSelf: 'center',
    marginBottom: 9,
  },

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  driverAvatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  driverDetails: {
    flex: 1,
    marginLeft: 10,
  },

  driverName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#222222',
  },

  driverRating: {
    marginTop: 3,
    fontSize: 9,
    color: '#777777',
  },

  callButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoRow: {
    marginTop: 9,
    flexDirection: 'row',
  },

  infoCard: {
    flex: 1,
    minHeight: 49,
    marginHorizontal: 3,
    borderRadius: 11,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoLabel: {
    marginTop: 3,
    fontSize: 7,
    color: '#999999',
  },

  infoValue: {
    marginTop: 2,
    fontSize: 10,
    fontWeight: '900',
    color: '#222222',
  },

  fareBox: {
    marginTop: 9,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
  },

  fareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },

  fareLabel: {
    fontSize: 8,
    color: '#777777',
  },

  fareValue: {
    fontSize: 8,
    fontWeight: '700',
    color: '#444444',
  },

  fareDivider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 4,
  },

  totalLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#222222',
  },

  totalValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#222A2C',
  },

  bookRideButton: {
    height: 48,
    marginTop: 9,
    borderRadius: 13,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookedButton: {
    backgroundColor: '#1E9E4A',
  },

  bookRideText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  /* =====================================================
     SWEET ALERT MODAL
  ===================================================== */

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(18, 23, 24, 0.68)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  pickupModal: {
    width: '100%',
    maxWidth: 410,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingTop: 23,
    paddingBottom: 17,
    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,

    elevation: 20,
  },

  modalTopIcon: {
    position: 'relative',
  },

  bellCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#EAF8EF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#F4FCF6',
  },

  successDot: {
    position: 'absolute',
    top: 76,
    left: '50%',
    marginLeft: 22,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1E9E4A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  modalTitle: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: '900',
    color: '#202426',
  },

  modalSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: '#858585',
  },

  /* DRIVER ALERT */

  alertDriverCard: {
    width: '100%',
    marginTop: 18,
    padding: 11,
    borderRadius: 17,
    backgroundColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  alertDriverIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertDriverEmoji: {
    fontSize: 27,
  },

  alertDriverInfo: {
    flex: 1,
    marginLeft: 10,
  },

  alertDriverName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#222222',
  },

  alertDriverMeta: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  alertDriverVehicle: {
    fontSize: 9,
    color: '#777777',
    fontWeight: '700',
  },

  alertDriverSeparator: {
    marginHorizontal: 5,
    color: '#BBBBBB',
  },

  alertDriverRating: {
    fontSize: 9,
    color: '#777777',
    fontWeight: '700',
  },

  nearbyPill: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#EAF8EF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  nearbyGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1E9E4A',
    marginRight: 4,
  },

  nearbyPillText: {
    fontSize: 7,
    fontWeight: '900',
    color: '#1E9E4A',
  },

  /* PICKUP ALERT */

  alertPickupCard: {
    width: '100%',
    marginTop: 9,
    padding: 12,
    borderRadius: 17,
    backgroundColor: '#F0FAF4',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDF2E4',
  },

  alertPickupIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertPickupInfo: {
    flex: 1,
    marginLeft: 9,
  },

  alertPickupLabel: {
    fontSize: 7,
    fontWeight: '900',
    color: '#1E9E4A',
    letterSpacing: 0.4,
  },

  alertPickupAddress: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '800',
    color: '#333333',
    lineHeight: 15,
  },

  /* STATS */

  alertStatsRow: {
    width: '100%',
    marginTop: 9,
    flexDirection: 'row',
  },

  alertStat: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 9,
    marginHorizontal: 3,
    borderRadius: 13,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
  },

  alertStatContent: {
    marginLeft: 7,
  },

  alertStatLabel: {
    fontSize: 7,
    color: '#999999',
    fontWeight: '700',
  },

  alertStatValue: {
    marginTop: 2,
    fontSize: 11,
    color: '#222222',
    fontWeight: '900',
  },

  /* MESSAGE */

  readyMessage: {
    width: '100%',
    marginTop: 10,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#FFF9E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  readyEmoji: {
    fontSize: 13,
    marginRight: 5,
  },

  readyMessageText: {
    fontSize: 9,
    color: '#8A6D1D',
    fontWeight: '800',
  },

  /* OK */

  alertOkButton: {
    width: '100%',
    height: 51,
    marginTop: 12,
    borderRadius: 15,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertOkText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  soundHint: {
    marginTop: 9,
    fontSize: 8,
    color: '#AAAAAA',
  },
});

export default LiveTrackingScreen;
