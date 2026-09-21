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
  Check,
  CreditCard,
  Smartphone,
  Wallet,
  ShieldCheck,
  X,
  ChevronRight,
} from 'lucide-react-native';
import RazorpayCheckout from 'react-native-razorpay';

const PaymentMethodsScreen = ({navigation, route}: any) => {
  const booking = route?.params ?? {};

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [showAlert, setShowAlert] = useState(false);

  const totalPrice = useMemo(() => {
    const value = Number(booking.totalPrice || 0);
    return Number.isFinite(value) ? value : 0;
  }, [booking.totalPrice]);

  const methods = [
    {
      id: 'UPI',
      title: 'UPI',
      subtitle: 'Google Pay • PhonePe • Paytm',
      icon: Smartphone,
    },
    {
      id: 'Card',
      title: 'Credit / Debit Card',
      subtitle: 'Visa • Mastercard • RuPay',
      icon: CreditCard,
    },
    {
      id: 'Cash',
      title: 'Cash',
      subtitle: 'Pay at pickup',
      icon: Wallet,
    },
  ];

  const handleContinue = () => {
    if (!paymentMethod) {
      return;
    }

    setShowAlert(true);
  };

  const confirmPayment = async () => {
    setShowAlert(false);

    // Cash: no online gateway required.
    if (paymentMethod === 'Cash') {
      navigation.navigate('BookingConfirmation', {
        ...booking,
        paymentMethod,
        paymentStatus: 'Pay at pickup',
      });
      return;
    }

    try {
      // Razorpay expects the amount in the smallest currency unit.
      // ₹100 = 10000 paise.
      const amountInPaise = Math.round(totalPrice * 100);

      if (amountInPaise <= 0) {
        setShowAlert(true);
        return;
      }

      const options = {
        description: `Vehicle booking - ${booking.rentalType || 'Rental'}`,
        image: 'https://razorpay.com/favicon.png',
        currency: 'INR',
        key: 'rzp_test_TeDNWx0JGdNWLi',
        amount: amountInPaise,
        name: 'VehicleApp',
        prefill: {
          name: booking.name || 'Customer',
          email: booking.email || '',
          contact: booking.mobile || booking.phone || '',
        },
        theme: {
          color: '#222A2C',
        },
      };

      const data = await RazorpayCheckout.open(options);

      navigation.navigate('BookingConfirmation', {
        ...booking,
        paymentMethod,
        paymentStatus: 'Test payment successful',
        razorpayPaymentId: data?.razorpay_payment_id || '',
        razorpayOrderId: data?.razorpay_order_id || '',
        razorpaySignature: data?.razorpay_signature || '',
      });
    } catch (error: any) {
      // User cancellation and payment failures come here.
      console.log('Razorpay payment error:', error);

      setShowAlert(true);
    }
  };

  const selectedMethod = methods.find(
    item => item.id === paymentMethod,
  );

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
          <ArrowLeft size={21} color="#171B1C" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Payment</Text>
          <Text style={styles.headerSubTitle}>
            Secure checkout
          </Text>
        </View>

        <View style={styles.secureIcon}>
          <ShieldCheck size={19} color="#222A2C" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* PROGRESS */}
        <View style={styles.progressWrapper}>
          <View style={styles.step}>
            <View style={styles.stepDone}>
              <Check size={11} color="#FFFFFF" />
            </View>

            <Text style={styles.stepDoneText}>
              Details
            </Text>
          </View>

          <View style={styles.activeLine} />

          <View style={styles.step}>
            <View style={styles.stepActive}>
              <Text style={styles.stepNumber}>2</Text>
            </View>

            <Text style={styles.stepActiveText}>
              Payment
            </Text>
          </View>

          <View style={styles.inactiveLine} />

          <View style={styles.step}>
            <View style={styles.stepInactive}>
              <Text style={styles.stepInactiveNumber}>3</Text>
            </View>

            <Text style={styles.stepInactiveText}>
              Confirm
            </Text>
          </View>
        </View>

        {/* TITLE */}
        <View style={styles.titleArea}>
          <Text style={styles.title}>
            Choose Payment Method
          </Text>

          <Text style={styles.subtitle}>
            Select your preferred way to pay
          </Text>
        </View>

        {/* AMOUNT CARD */}
        <View style={styles.amountCard}>
          <View>
            <Text style={styles.amountLabel}>
              TOTAL AMOUNT
            </Text>

            <Text style={styles.amount}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.bookingType}>
            <Text style={styles.bookingTypeText}>
              {booking.driver
                ? 'Driver included'
                : 'Self drive'}
            </Text>
          </View>
        </View>

        {/* PAYMENT OPTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Payment options
          </Text>

          <Text style={styles.optionCount}>
            {methods.length} options
          </Text>
        </View>

        {methods.map(method => {
          const Icon = method.icon;
          const selected = paymentMethod === method.id;

          return (
            <TouchableOpacity
              key={method.id}
              activeOpacity={0.9}
              onPress={() =>
                setPaymentMethod(method.id)
              }
              style={[
                styles.methodCard,
                selected && styles.methodCardSelected,
              ]}>

              <View
                style={[
                  styles.methodIcon,
                  selected && styles.methodIconSelected,
                ]}>
                <Icon
                  size={22}
                  color={
                    selected
                      ? '#FFFFFF'
                      : '#222A2C'
                  }
                />
              </View>

              <View style={styles.methodContent}>
                <View style={styles.methodTitleRow}>
                  <Text style={styles.methodTitle}>
                    {method.title}
                  </Text>

                  {selected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedBadgeText}>
                        Selected
                      </Text>
                    </View>
                  )}
                </View>

                <Text style={styles.methodSubtitle}>
                  {method.subtitle}
                </Text>
              </View>

              <View
                style={[
                  styles.radio,
                  selected && styles.radioSelected,
                ]}>
                {selected && (
                  <Check
                    size={12}
                    color="#FFFFFF"
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* BOOKING INFO */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View>
              <Text style={styles.infoTitle}>
                Booking summary
              </Text>

              <Text style={styles.infoSubTitle}>
                Your rental details
              </Text>
            </View>

            <View style={styles.infoCheck}>
              <Check size={15} color="#222A2C" />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Customer
            </Text>

            <Text style={styles.infoValue}>
              {booking.name || 'Customer'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Location
            </Text>

            <Text
              numberOfLines={1}
              style={styles.infoValue}>
              {booking.location || 'Selected location'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Rental
            </Text>

            <Text style={styles.infoValue}>
              {booking.rentalType || 'Day'} •{' '}
              {booking.rentalDays || 1}{' '}
              {(booking.rentalDays || 1) > 1
                ? 'days'
                : 'day'}
            </Text>
          </View>
        </View>

        {/* SECURITY */}
        <View style={styles.securityBox}>
          <ShieldCheck
            size={18}
            color="#222A2C"
          />

          <Text style={styles.securityText}>
            Your payment information is secure
          </Text>
        </View>

        {/* CONTINUE */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.continueButton}
          onPress={handleContinue}>

          <View>
            <Text style={styles.payLabel}>
              {paymentMethod === 'Cash'
                ? 'Amount payable'
                : 'Total payable'}
            </Text>

            <Text style={styles.continuePrice}>
              ₹{totalPrice.toLocaleString('en-IN')}
            </Text>
          </View>

          <View style={styles.continueRight}>
            <Text style={styles.continueText}>
              {paymentMethod === 'Cash'
                ? 'Continue'
                : 'Pay & Continue'}
            </Text>

            <ChevronRight
              size={19}
              color="#FFFFFF"
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* SWEET ALERT STYLE MODAL */}
      <Modal
        visible={showAlert}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAlert(false)}>

        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>

            {/* CLOSE */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAlert(false)}>
              <X size={18} color="#777777" />
            </TouchableOpacity>

            {/* ICON */}
            <View style={styles.alertIcon}>
              {paymentMethod === 'Cash' ? (
                <Wallet
                  size={30}
                  color="#222A2C"
                />
              ) : (
                <Check
                  size={32}
                  color="#222A2C"
                  strokeWidth={3}
                />
              )}
            </View>

            <Text style={styles.alertTitle}>
              {paymentMethod === 'Cash'
                ? 'Confirm Booking'
                : 'Confirm Payment'}
            </Text>

            <Text style={styles.alertMessage}>
              {paymentMethod === 'Cash'
                ? 'You have selected Cash payment. Payment will be collected at pickup.'
                : `You selected ${selectedMethod?.title}. Continue to complete your booking.`}
            </Text>

            {/* PRICE */}
            <View style={styles.alertAmount}>
              <Text style={styles.alertAmountLabel}>
                TOTAL AMOUNT
              </Text>

              <Text style={styles.alertAmountValue}>
                ₹{totalPrice.toLocaleString('en-IN')}
              </Text>
            </View>

            {/* BUTTONS */}
            <View style={styles.alertButtons}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.cancelButton}
                onPress={() =>
                  setShowAlert(false)
                }>
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.confirmButton}
                onPress={confirmPayment}>
                <Text style={styles.confirmText}>
                  {paymentMethod === 'Cash'
                    ? 'Confirm'
                    : 'Continue'}
                </Text>

                <ChevronRight
                  size={17}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },

  /* HEADER */

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
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E7E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerCenter: {
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#171B1C',
  },

  headerSubTitle: {
    marginTop: 2,
    fontSize: 10,
    color: '#8A8D8E',
  },

  secureIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E7E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },

  /* PROGRESS */

  progressWrapper: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  step: {
    width: 65,
    alignItems: 'center',
  },

  stepDone: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepActive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#222A2C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepInactive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E0E2E3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepNumber: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  stepInactiveNumber: {
    fontSize: 9,
    fontWeight: '700',
    color: '#888888',
  },

  activeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#222A2C',
    marginTop: 8,
  },

  inactiveLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#DDDFE0',
    marginTop: 8,
  },

  stepDoneText: {
    marginTop: 7,
    fontSize: 9,
    fontWeight: '700',
    color: '#55595A',
  },

  stepActiveText: {
    marginTop: 7,
    fontSize: 9,
    fontWeight: '800',
    color: '#171B1C',
  },

  stepInactiveText: {
    marginTop: 7,
    fontSize: 9,
    color: '#929596',
  },

  /* TITLE */

  titleArea: {
    marginTop: 5,
  },

  title: {
    fontSize: 23,
    fontWeight: '900',
    color: '#111516',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: '#85898A',
  },

  /* AMOUNT */

  amountCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  amountLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#AEB3B4',
    letterSpacing: 0.8,
  },

  amount: {
    marginTop: 4,
    fontSize: 27,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  bookingType: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#3A4244',
  },

  bookingTypeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* SECTION */

  sectionHeader: {
    marginTop: 23,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#171B1C',
  },

  optionCount: {
    fontSize: 10,
    color: '#909394',
  },

  /* PAYMENT CARD */

  methodCard: {
    minHeight: 78,
    marginBottom: 10,
    paddingHorizontal: 13,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E3E4',
    flexDirection: 'row',
    alignItems: 'center',
  },

  methodCardSelected: {
    borderColor: '#222A2C',
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  methodIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: '#F0F1F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  methodIconSelected: {
    backgroundColor: '#222A2C',
  },

  methodContent: {
    flex: 1,
    marginLeft: 12,
  },

  methodTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  methodTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#222627',
  },

  methodSubtitle: {
    marginTop: 5,
    fontSize: 10,
    color: '#909394',
  },

  selectedBadge: {
    marginLeft: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: '#E9EAEB',
  },

  selectedBadgeText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#222A2C',
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#C2C5C6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    backgroundColor: '#222A2C',
    borderColor: '#222A2C',
  },

  /* INFO */

  infoCard: {
    marginTop: 8,
    padding: 16,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E4E5',
  },

  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#222627',
  },

  infoSubTitle: {
    marginTop: 3,
    fontSize: 9,
    color: '#999D9E',
  },

  infoCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#ECEDEE',
    marginVertical: 13,
  },

  infoRow: {
    marginTop: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoLabel: {
    fontSize: 10,
    color: '#929596',
  },

  infoValue: {
    maxWidth: '60%',
    fontSize: 10,
    fontWeight: '700',
    color: '#303536',
    textAlign: 'right',
  },

  /* SECURITY */

  securityBox: {
    marginTop: 12,
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 13,
    backgroundColor: '#ECEEEF',
    flexDirection: 'row',
    alignItems: 'center',
  },

  securityText: {
    marginLeft: 8,
    fontSize: 10,
    color: '#656A6B',
  },

  /* BUTTON */

  continueButton: {
    minHeight: 64,
    marginTop: 16,
    paddingLeft: 20,
    paddingRight: 8,
    borderRadius: 18,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  payLabel: {
    fontSize: 9,
    color: '#AEB3B4',
  },

  continuePrice: {
    marginTop: 2,
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  continueRight: {
    minHeight: 48,
    paddingHorizontal: 15,
    borderRadius: 14,
    backgroundColor: '#343D3F',
    flexDirection: 'row',
    alignItems: 'center',
  },

  continueText: {
    marginRight: 5,
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* SWEET ALERT */

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  alertBox: {
    width: '100%',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 22,
    alignItems: 'center',
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alertIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F0F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 14,
  },

  alertTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#171B1C',
    textAlign: 'center',
  },

  alertMessage: {
    marginTop: 8,
    paddingHorizontal: 8,
    fontSize: 11,
    lineHeight: 17,
    color: '#85898A',
    textAlign: 'center',
  },

  alertAmount: {
    width: '100%',
    marginTop: 18,
    padding: 14,
    borderRadius: 15,
    backgroundColor: '#F5F6F6',
    alignItems: 'center',
  },

  alertAmountLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#999D9E',
    letterSpacing: 0.8,
  },

  alertAmountValue: {
    marginTop: 3,
    fontSize: 24,
    fontWeight: '900',
    color: '#222A2C',
  },

  alertButtons: {
    width: '100%',
    marginTop: 17,
    flexDirection: 'row',
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#555A5B',
  },

  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#222A2C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmText: {
    marginRight: 4,
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

export default PaymentMethodsScreen;