import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}: any) => {
  const handleGetStarted = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* =====================================================
          STATUS BAR
      ===================================================== */}

      <StatusBar
        barStyle="light-content"
        backgroundColor="#111111"
        translucent={true}
      />

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <View style={styles.darkOverlay} />

      <View style={styles.bottomOverlay} />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <View style={styles.content}>

        {/* ===================================================
            TOP LOGO / BRAND
        =================================================== */}

        <View style={styles.topSection}>

          <View style={styles.logoBox}>
            <Text style={styles.logoEmoji}>
              🚗
            </Text>
          </View>

          <View style={styles.brandContainer}>

            <Text style={styles.brandName}>
              QENT
            </Text>

            <Text style={styles.brandTagline}>
              DRIVE • RIDE • GO
            </Text>

          </View>

        </View>

        {/* ===================================================
            CENTER CONTENT
        =================================================== */}

        <View style={styles.centerContent}>

          {/* SMALL BADGE */}

          <View style={styles.smallBadge}>
            <Text style={styles.smallBadgeText}>
              YOUR RIDE, YOUR WAY
            </Text>
          </View>

          {/* MAIN HEADING */}

          <Text style={styles.heading}>
            Move  freely.{'\n'}
            <Text style={styles.headingLight}>
              Go anywhere.
            </Text>
          </Text>

          {/* DESCRIPTION */}

          <Text style={styles.description}>
            Cars, bikes and autos at your fingertips.
            Book your perfect ride quickly and easily.
          </Text>

          {/* =================================================
              VEHICLE TYPES
          ================================================= */}

          <View style={styles.vehicleRow}>

            {/* CAR */}

            <View style={styles.vehicleItem}>

              <Text style={styles.vehicleEmoji}>
                🚗
              </Text>

              <Text style={styles.vehicleText}>
                Cars
              </Text>

            </View>

            {/* BIKE */}

            <View style={styles.vehicleItem}>

              <Text style={styles.vehicleEmoji}>
                🏍️
              </Text>

              <Text style={styles.vehicleText}>
                Bikes
              </Text>

            </View>

            {/* AUTO */}

            <View style={styles.vehicleItem}>

              <Text style={styles.vehicleEmoji}>
                🛺
              </Text>

              <Text style={styles.vehicleText}>
                Auto
              </Text>

            </View>

          </View>

        </View>

        {/* ===================================================
            BOTTOM SECTION
        =================================================== */}

        <View style={styles.bottomSection}>

          {/* GET STARTED */}

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.getStartedButton}
            onPress={handleGetStarted}>

            <Text style={styles.buttonText}>
              Get Started
            </Text>

            <View style={styles.arrowCircle}>

              <Text style={styles.arrow}>
                →
              </Text>

            </View>

          </TouchableOpacity>

          {/* FEATURES */}

          <Text style={styles.bottomText}>
            Easy booking • Transparent pricing
          </Text>

          {/* INDIA */}

          <Text style={styles.indiaText}>
            Made for India 🇮🇳
          </Text>

        </View>

      </View>
    </View>
  );
};

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({

  /* =======================================================
     CONTAINER
  ======================================================= */

  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  /* =======================================================
     BACKGROUND IMAGE
  ======================================================= */

  backgroundImage: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    width: width,
    height: height,
  },

  /* =======================================================
     DARK OVERLAY
  ======================================================= */

  darkOverlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.48)',
  },

  /* =======================================================
     BOTTOM OVERLAY
  ======================================================= */

  bottomOverlay: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    height: height * 0.58,

    backgroundColor: 'rgba(0, 0, 0, 0.58)',
  },

  /* =======================================================
     MAIN CONTENT
  ======================================================= */

  content: {
    flex: 1,

    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 28,

    justifyContent: 'space-between',
  },

  /* =======================================================
     TOP SECTION
  ======================================================= */

  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* =======================================================
     LOGO
  ======================================================= */

  logoBox: {
    width: 48,
    height: 48,

    borderRadius: 15,

    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 5,
  },

  logoEmoji: {
    fontSize: 25,
  },

  /* =======================================================
     BRAND
  ======================================================= */

  brandContainer: {
    justifyContent: 'center',
  },

  brandName: {
    color: '#FFFFFF',

    fontSize: 18,
    fontWeight: '900',

    letterSpacing: 2.5,
  },

  brandTagline: {
    marginTop: 2,

    color: '#BEBEBE',

    fontSize: 7,
    fontWeight: '700',

    letterSpacing: 1.5,
  },

  /* =======================================================
     CENTER CONTENT
  ======================================================= */

  centerContent: {
    marginTop: height * 0.08,
  },

  /* =======================================================
     SMALL BADGE
  ======================================================= */

  smallBadge: {
    alignSelf: 'flex-start',

    paddingHorizontal: 11,
    paddingVertical: 7,

    borderRadius: 20,

    backgroundColor: 'rgba(255,255,255,0.14)',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',

    marginBottom: 16,
  },

  smallBadgeText: {
    color: '#FFFFFF',

    fontSize: 7,

    fontWeight: '800',

    letterSpacing: 1.2,
  },

  /* =======================================================
     HEADING
  ======================================================= */

  heading: {
    color: '#FFFFFF',

    fontSize: width < 380 ? 38 : 42,

    lineHeight: width < 380 ? 43 : 47,

    fontWeight: '900',

    letterSpacing: -1.2,
  },

  headingLight: {
    color: '#D7D7D7',

    fontWeight: '400',
  },

  /* =======================================================
     DESCRIPTION
  ======================================================= */

  description: {
    marginTop: 16,

    maxWidth: width * 0.82,

    color: '#D0D0D0',

    fontSize: 12,

    lineHeight: 19,

    fontWeight: '400',
  },

  /* =======================================================
     VEHICLE ROW
  ======================================================= */

  vehicleRow: {
    flexDirection: 'row',

    marginTop: 24,

    gap: 9,
  },

  /* =======================================================
     VEHICLE ITEM
  ======================================================= */

  vehicleItem: {
    width: 82,
    height: 66,

    borderRadius: 15,

    backgroundColor: 'rgba(255,255,255,0.11)',

    borderWidth: 1,

    borderColor: 'rgba(255,255,255,0.16)',

    alignItems: 'center',

    justifyContent: 'center',
  },

  /* =======================================================
     VEHICLE EMOJI
  ======================================================= */

  vehicleEmoji: {
    fontSize: 21,
  },

  /* =======================================================
     VEHICLE TEXT
  ======================================================= */

  vehicleText: {
    marginTop: 4,

    color: '#FFFFFF',

    fontSize: 8,

    fontWeight: '700',
  },

  /* =======================================================
     BOTTOM
  ======================================================= */

  bottomSection: {
    width: '100%',
  },

  /* =======================================================
     GET STARTED BUTTON
  ======================================================= */

  getStartedButton: {
    width: '100%',

    height: 57,

    borderRadius: 30,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    paddingLeft: 23,

    paddingRight: 7,

    shadowColor: '#000',

    shadowOpacity: 0.25,

    shadowRadius: 10,

    elevation: 6,
  },

  /* =======================================================
     BUTTON TEXT
  ======================================================= */

  buttonText: {
    color: '#111111',

    fontSize: 14,

    fontWeight: '900',
  },

  /* =======================================================
     ARROW
  ======================================================= */

  arrowCircle: {
    width: 44,

    height: 44,

    borderRadius: 22,

    backgroundColor: '#111111',

    alignItems: 'center',

    justifyContent: 'center',
  },

  arrow: {
    color: '#FFFFFF',

    fontSize: 22,

    fontWeight: '400',

    marginTop: -2,
  },

  /* =======================================================
     BOTTOM TEXT
  ======================================================= */

  bottomText: {
    marginTop: 11,

    textAlign: 'center',

    color: '#AFAFAF',

    fontSize: 8,

    fontWeight: '500',
  },

  /* =======================================================
     INDIA TEXT
  ======================================================= */

  indiaText: {
    marginTop: 7,

    textAlign: 'center',

    color: '#FFFFFF',

    fontSize: 8,

    fontWeight: '700',
  },

});

export default SplashScreen;

