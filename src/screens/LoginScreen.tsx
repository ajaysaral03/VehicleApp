import React, {useState} from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  ArrowRight,
  Bike,
  Car,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
} from 'lucide-react-native';

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // DEMO LOGIN
  // --------------------------------------------------

  const handleLogin = () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      Alert.alert(
        'Email Required',
        'Please enter your email address.',
      );
      return;
    }

    if (!password) {
      Alert.alert(
        'Password Required',
        'Please enter your password.',
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Demo credentials
      if (
        cleanEmail === 'demo@vehicleapp.com' &&
        password === 'Demo@123'
      ) {
        const demoUser = {
          uid: 'vehicle_demo_001',
          name: 'Demo User',
          email: 'demo@vehicleapp.com',
          phone: '+91 9999999999',
          photo: '',
          provider: 'demo',
        };

        navigation.replace('Home', {
          user: demoUser,
        });

        return;
      }

      Alert.alert(
        'Login Failed',
        'Demo account use karein:\n\nEmail: demo@vehicleapp.com\nPassword: Demo@123',
      );
    }, 600);
  };

  // --------------------------------------------------
  // AUTO FILL DEMO ACCOUNT
  // --------------------------------------------------

  const useDemoLogin = () => {
    setEmail('demo@vehicleapp.com');
    setPassword('Demo@123');
  };

  // --------------------------------------------------
  // REGISTER
  // --------------------------------------------------

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#111718"
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>

          {/* =====================================================
              VEHICLE HEADER
          ===================================================== */}

          <View style={styles.hero}>

            {/* TOP BAR */}

            <View style={styles.topBar}>
              <View style={styles.logoRow}>

                <View style={styles.logo}>
                  <Car
                    size={25}
                    color="#FFFFFF"
                    strokeWidth={2.2}
                  />
                </View>

                <View>
                  <Text style={styles.logoTitle}>
                    QENT  
                  </Text>

                  <Text style={styles.logoSub}>
                    RENT • RIDE • GO
                  </Text>
                </View>
              </View>

              <View style={styles.secureBadge}>
                <ShieldCheck
                  size={13}
                  color="#C9FF72"
                />

                <Text style={styles.secureText}>
                  SECURE
                </Text>
              </View>
            </View>

            {/* HERO TEXT */}

            <View style={styles.heroTextContainer}>
              <Text style={styles.heroSmall}>
                YOUR RIDE, YOUR WAY
              </Text>

              <Text style={styles.heroTitle}>
                Move freely.
              </Text>

              <Text style={styles.heroDescription}>
                Choose a bike, auto or car and
                get moving around the city.
              </Text>

              <View style={styles.locationBox}>
                <MapPin
                  size={14}
                  color="#C9FF72"
                />

                <Text style={styles.locationText}>
                  Easy booking across India
                </Text>
              </View>
            </View>

            {/* VEHICLE TYPES */}

            <View style={styles.vehicleRow}>

              {/* BIKE */}

              <View style={styles.vehicleCard}>
                <View style={styles.vehicleIcon}>
                  <Bike
                    size={25}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.vehicleName}>
                  Bike
                </Text>

                <Text style={styles.vehicleCaption}>
                  Quick
                </Text>
              </View>

              {/* AUTO */}

              <View style={styles.vehicleCard}>
                <View style={styles.vehicleIcon}>
                  <Truck
                    size={25}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.vehicleName}>
                  Auto
                </Text>

                <Text style={styles.vehicleCaption}>
                  Local
                </Text>
              </View>

              {/* CAR */}

              <View style={styles.vehicleCard}>
                <View style={styles.vehicleIcon}>
                  <Car
                    size={25}
                    color="#FFFFFF"
                  />
                </View>

                <Text style={styles.vehicleName}>
                  Car
                </Text>

                <Text style={styles.vehicleCaption}>
                  Comfort
                </Text>
              </View>

            </View>
          </View>

          {/* =====================================================
              LOGIN AREA
          ===================================================== */}

          <View style={styles.loginArea}>

            <Text style={styles.heading}>
              Welcome back
            </Text>

            <Text style={styles.subHeading}>
              Login to book your next ride
            </Text>

            {/* =================================================
                DEMO ACCOUNT
            ================================================= */}

            <View style={styles.demoBox}>

              <View style={styles.demoIcon}>
                <KeyRound
                  size={17}
                  color="#273033"
                />
              </View>

              <View style={styles.demoInfo}>
                <Text style={styles.demoTitle}>
                  Demo Account
                </Text>

                <Text style={styles.demoEmail}>
                  demo@vehicleapp.com
                </Text>

                <Text style={styles.demoPassword}>
                  Password: Demo@123
                </Text>
              </View>

              <Pressable
                onPress={useDemoLogin}
                style={({pressed}) => [
                  styles.demoButton,
                  pressed && styles.pressed,
                ]}>

                <Text style={styles.demoButtonText}>
                  USE
                </Text>
              </Pressable>
            </View>

            {/* =================================================
                EMAIL
            ================================================= */}

            <Text style={styles.label}>
              EMAIL ADDRESS
            </Text>

            <View style={styles.inputBox}>

              <View style={styles.inputIcon}>
                <Mail
                  size={18}
                  color="#687274"
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9CA5A6"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

            </View>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <View style={styles.passwordHeader}>
              <Text style={styles.label}>
                PASSWORD
              </Text>

              <Pressable>
                <Text style={styles.forgot}>
                  Forgot password?
                </Text>
              </Pressable>
            </View>

            <View style={styles.inputBox}>

              <View style={styles.inputIcon}>
                <LockKeyhole
                  size={18}
                  color="#687274"
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9CA5A6"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <Pressable
                onPress={() =>
                  setShowPassword(
                    value => !value,
                  )
                }
                style={styles.eyeButton}>

                {showPassword ? (
                  <EyeOff
                    size={18}
                    color="#687274"
                  />
                ) : (
                  <Eye
                    size={18}
                    color="#687274"
                  />
                )}

              </Pressable>

            </View>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <Pressable
              onPress={handleLogin}
              disabled={loading}
              style={({pressed}) => [
                styles.loginButton,
                pressed && styles.pressed,
                loading && styles.disabled,
              ]}>

              <Text style={styles.loginButtonText}>
                {loading
                  ? 'Logging in...'
                  : 'Login & Continue'}
              </Text>

              {!loading && (
                <View style={styles.arrowCircle}>
                  <ArrowRight
                    size={18}
                    color="#1C2527"
                  />
                </View>
              )}

            </Pressable>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <View style={styles.dividerRow}>

              <View style={styles.divider} />

              <Text style={styles.orText}>
                OR
              </Text>

              <View style={styles.divider} />

            </View>

            {/* =================================================
                GOOGLE
            ================================================= */}

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Google Login',
                  'Google login ko use karne ke liye Firebase configuration required hai.',
                )
              }
              style={({pressed}) => [
                styles.googleButton,
                pressed && styles.pressed,
              ]}>

              <View style={styles.googleLogo}>
                <Text style={styles.googleText}>
                  G
                </Text>
              </View>

              <View style={styles.googleContent}>

                <Text style={styles.googleTitle}>
                  Continue with Google
                </Text>

                <Text style={styles.googleSub}>
                  Fast & secure login
                </Text>

              </View>

              <ArrowRight
                size={18}
                color="#697375"
              />

            </Pressable>

            {/* =================================================
                REGISTER
            ================================================= */}

            <View style={styles.registerRow}>

              <Text style={styles.registerText}>
                New to VehicleApp?
              </Text>

              <Pressable
                onPress={handleRegister}>

                <Text style={styles.registerLink}>
                  Create Account
                </Text>

              </Pressable>

            </View>

            {/* =================================================
                FEATURES
            ================================================= */}

            <View style={styles.featureRow}>

              <View style={styles.feature}>
                <Bike
                  size={15}
                  color="#667173"
                />

                <Text style={styles.featureText}>
                  Bikes
                </Text>
              </View>

              <View style={styles.feature}>
                <Truck
                  size={15}
                  color="#667173"
                />

                <Text style={styles.featureText}>
                  Autos
                </Text>
              </View>

              <View style={styles.feature}>
                <Car
                  size={15}
                  color="#667173"
                />

                <Text style={styles.featureText}>
                  Cars
                </Text>
              </View>

            </View>

            {/* =================================================
                FOOTER
            ================================================= */}

            <Text style={styles.footer}>
              By continuing, you agree to our Terms
              of Service and Privacy Policy.
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#F4F6F5',
  },

  scrollContent: {
    flexGrow: 1,
  },

  // =====================================================
  // HERO
  // =====================================================

  hero: {
    backgroundColor: '#111718',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  topBar: {
    height:100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#252E30',
    borderWidth: 1,
    borderColor: '#3A4547',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoTitle: {
   
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  logoSub: {
    marginLeft: 10,
    marginTop: 2,
    fontSize: 7,
    letterSpacing: 1.4,
    fontWeight: '800',
    color: '#899395',
  },

  secureBadge: {
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#1D2627',
    borderWidth: 1,
    borderColor: '#354143',
    flexDirection: 'row',
    alignItems: 'center',
  },

  secureText: {
    marginLeft: 4,
    fontSize: 7,
    fontWeight: '900',
    color: '#C9FF72',
  },

  heroTextContainer: {
    marginTop: 27,
    height:90,
  },

  heroSmall: {
    fontSize: 8,
    letterSpacing: 1.5,
    fontWeight: '900',
    color: '#9DA7A9',
  },

  heroTitle: {
    marginTop: 5,
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  heroDescription: {
    width: '82%',
    marginTop: 7,
    fontSize: 10,
    lineHeight: 16,
    color: '#AEB6B8',
  },

  locationBox: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#1D2728',
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: {
    marginLeft: 5,
    fontSize: 8,
    fontWeight: '700',
    color: '#D0D5D6',
  },

  // =====================================================
  // VEHICLES
  // =====================================================

  vehicleRow: {
    marginTop: 21,
    flexDirection: 'row',
    gap: 9,
  },

  vehicleCard: {
    flex: 1,
    minHeight: 78,
    padding: 9,
    borderRadius: 15,
    backgroundColor: '#1A2324',
    borderWidth: 1,
    borderColor: '#303B3D',
  },

  vehicleIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: '#263133',
    alignItems: 'center',
    justifyContent: 'center',
  },

  vehicleName: {
    marginTop: 7,
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  vehicleCaption: {
    marginTop: 2,
    fontSize: 7,
    color: '#7F8B8D',
  },

  // =====================================================
  // LOGIN AREA
  // =====================================================

  loginArea: {
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 35,
  },

  heading: {
    fontSize: 25,
    fontWeight: '900',
    color: '#182123',
  },

  subHeading: {
    marginTop: 5,
    marginBottom: 18,
    fontSize: 10,
    color: '#7B8587',
  },

  // =====================================================
  // DEMO BOX
  // =====================================================

  demoBox: {
    marginBottom: 19,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#E9EFEC',
    borderWidth: 1,
    borderColor: '#D6E0DB',
    flexDirection: 'row',
    alignItems: 'center',
  },

  demoIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  demoInfo: {
    flex: 1,
    marginLeft: 9,
  },

  demoTitle: {
    fontSize: 9,
    fontWeight: '900',
    color: '#20292B',
  },

  demoEmail: {
    marginTop: 3,
    fontSize: 8,
    color: '#606B6D',
  },

  demoPassword: {
    marginTop: 2,
    fontSize: 7,
    color: '#899294',
  },

  demoButton: {
    paddingHorizontal: 11,
    height: 33,
    borderRadius: 10,
    backgroundColor: '#20292B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  demoButtonText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  // =====================================================
  // INPUT
  // =====================================================

  label: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: '#687274',
  },

  inputBox: {
    height: 54,
    marginTop: 7,
    paddingHorizontal: 11,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DEE4E2',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F0F3F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    flex: 1,
    marginLeft: 9,
    paddingVertical: 0,
    fontSize: 11,
    color: '#172022',
  },

  passwordHeader: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  forgot: {
    fontSize: 8,
    fontWeight: '800',
    color: '#3C4749',
  },

  eyeButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // =====================================================
  // LOGIN BUTTON
  // =====================================================

  loginButton: {
    height: 55,
    marginTop: 19,
    paddingLeft: 17,
    paddingRight: 7,
    borderRadius: 15,
    backgroundColor: '#20292B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  loginButtonText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#C9FF72',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // =====================================================
  // DIVIDER
  // =====================================================

  dividerRow: {
    marginVertical: 21,
    flexDirection: 'row',
    alignItems: 'center',
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDE2E1',
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 7,
    fontWeight: '900',
    color: '#98A1A2',
  },

  // =====================================================
  // GOOGLE
  // =====================================================

  googleButton: {
    height: 56,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE1E0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  googleLogo: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: '#F1F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleText: {
    fontSize: 19,
    fontWeight: '900',
    color: '#4285F4',
  },

  googleContent: {
    flex: 1,
    marginLeft: 10,
  },

  googleTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: '#222A2C',
  },

  googleSub: {
    marginTop: 2,
    fontSize: 8,
    color: '#8B9495',
  },

  // =====================================================
  // REGISTER
  // =====================================================

  registerRow: {
    marginTop: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  registerText: {
    fontSize: 9,
    color: '#7D8789',
  },

  registerLink: {
    marginLeft: 5,
    fontSize: 9,
    fontWeight: '900',
    color: '#20292B',
  },

  // =====================================================
  // FEATURES
  // =====================================================

  featureRow: {
    marginTop: 22,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E5E3',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  featureText: {
    marginLeft: 5,
    fontSize: 8,
    fontWeight: '800',
    color: '#697476',
  },

  // =====================================================
  // FOOTER
  // =====================================================

  footer: {
    marginTop: 14,
    paddingHorizontal: 18,
    fontSize: 7,
    lineHeight: 12,
    textAlign: 'center',
    color: '#9BA3A4',
  },

  pressed: {
    opacity: 0.72,
  },

  disabled: {
    opacity: 0.55,
  },
});

export default LoginScreen;