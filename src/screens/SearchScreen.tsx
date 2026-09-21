import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Heart,
  Car,
  Bike,
  X,
} from 'lucide-react-native';

import Footer from '../components/Footer';

type VehicleType = 'All' | 'Car' | 'Bike' | 'Auto';

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: VehicleType;
  price: number;
  unit: string;
  location: string;
  rating: number;
  image: string;
}

const VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Maruti Swift',
    brand: 'Maruti Suzuki',
    type: 'Car',
    price: 1200,
    unit: '/day',
    location: 'Vijay Nagar, Indore',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '2',
    name: 'Maruti Dzire',
    brand: 'Maruti Suzuki',
    type: 'Car',
    price: 1400,
    unit: '/day',
    location: 'Palasia, Indore',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '3',
    name: 'Hyundai Creta',
    brand: 'Hyundai',
    type: 'Car',
    price: 2200,
    unit: '/day',
    location: 'Geeta Bhawan, Indore',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '4',
    name: 'Tata Nexon',
    brand: 'Tata',
    type: 'Car',
    price: 1800,
    unit: '/day',
    location: 'Rau, Indore',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '5',
    name: 'Honda Activa 6G',
    brand: 'Honda',
    type: 'Bike',
    price: 450,
    unit: '/day',
    location: 'Vijay Nagar, Indore',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '6',
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    type: 'Bike',
    price: 900,
    unit: '/day',
    location: 'Palasia, Indore',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1558980664-10ea2e6d8b4e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '7',
    name: 'Hero Splendor Plus',
    brand: 'Hero',
    type: 'Bike',
    price: 350,
    unit: '/day',
    location: 'Bhawarkua, Indore',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '8',
    name: 'TVS Apache RTR',
    brand: 'TVS',
    type: 'Bike',
    price: 650,
    unit: '/day',
    location: 'Bengali Square, Indore',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '9',
    name: 'Bajaj RE',
    brand: 'Bajaj',
    type: 'Auto',
    price: 18,
    unit: '/km',
    location: 'Rajwada, Indore',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '10',
    name: 'Piaggio Ape',
    brand: 'Piaggio',
    type: 'Auto',
    price: 17,
    unit: '/km',
    location: 'Indore Railway Station',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '11',
    name: 'Mahindra XUV700',
    brand: 'Mahindra',
    type: 'Car',
    price: 2800,
    unit: '/day',
    location: 'AB Road, Indore',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: '12',
    name: 'KTM Duke 200',
    brand: 'KTM',
    type: 'Bike',
    price: 850,
    unit: '/day',
    location: 'Bhawarkua, Indore',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=900&q=85',
  },
];

const SearchScreen = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] =
    useState<VehicleType>('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredVehicles = useMemo(() => {
    let data = VEHICLES;

    if (selectedType !== 'All') {
      data = data.filter(
        vehicle => vehicle.type === selectedType,
      );
    }

    if (searchText.trim()) {
      const search = searchText.toLowerCase().trim();

      data = data.filter(vehicle => {
        return (
          vehicle.name.toLowerCase().includes(search) ||
          vehicle.brand.toLowerCase().includes(search) ||
          vehicle.type.toLowerCase().includes(search) ||
          vehicle.location.toLowerCase().includes(search)
        );
      });
    }

    return data;
  }, [searchText, selectedType]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id],
    );
  };

  const openVehicle = (vehicle: Vehicle) => {
    navigation.navigate('CarDetails', {
      vehicle,
    });
  };

  const renderVehicle = ({
    item,
  }: {
    item: Vehicle;
  }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => openVehicle(item)}>
        {/* IMAGE */}

        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.image}}
            style={styles.vehicleImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
            activeOpacity={0.8}>
            <Heart
              size={17}
              color={isFavorite ? '#111' : '#555'}
              fill={isFavorite ? '#111' : 'transparent'}
            />
          </TouchableOpacity>

          <View style={styles.typeBadge}>
            {item.type === 'Car' && (
              <Car size={12} color="#fff" />
            )}

            {item.type === 'Bike' && (
              <Bike size={12} color="#fff" />
            )}

            {item.type === 'Auto' && (
              <Text style={styles.autoEmoji}>
                🛺
              </Text>
            )}

            <Text style={styles.typeText}>
              {item.type}
            </Text>
          </View>
        </View>

        {/* DETAILS */}

        <View style={styles.cardContent}>
          <View style={styles.nameRow}>
            <View style={styles.nameContainer}>
              <Text
                style={styles.vehicleName}
                numberOfLines={1}>
                {item.name}
              </Text>

              <Text
                style={styles.vehicleBrand}
                numberOfLines={1}>
                {item.brand}
              </Text>
            </View>

            <View style={styles.rating}>
              <Star
                size={12}
                color="#F2A900"
                fill="#F2A900"
              />

              <Text style={styles.ratingText}>
                {item.rating}
              </Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <MapPin
              size={13}
              color="#888"
            />

            <Text
              style={styles.locationText}
              numberOfLines={1}>
              {item.location}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>
                ₹{item.price.toLocaleString('en-IN')}
              </Text>

              <Text style={styles.unit}>
                {item.unit}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.viewButton}
              activeOpacity={0.85}
              onPress={() => openVehicle(item)}>
              <Text style={styles.viewButtonText}>
                View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F7F7"
      />

      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>
              Find your vehicle
            </Text>

            <View style={styles.headerLocation}>
              <MapPin
                size={14}
                color="#222"
              />

              <Text style={styles.headerLocationText}>
                Indore, Madhya Pradesh
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.headerFilter}
            activeOpacity={0.8}>
            <SlidersHorizontal
              size={20}
              color="#222"
            />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Search
            size={20}
            color="#777"
          />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search car, bike, auto..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchText('')}>
              <X
                size={18}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* LOCATION */}

        <View style={styles.locationBox}>
          <View style={styles.locationIcon}>
            <MapPin
              size={17}
              color="#222"
            />
          </View>

          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>
              PICKUP LOCATION
            </Text>

            <Text style={styles.locationValue}>
              Indore, Madhya Pradesh
            </Text>
          </View>
        </View>

        {/* FILTER */}

        <View style={styles.filterScroll}>
          {(
            [
              'All',
              'Car',
              'Bike',
              'Auto',
            ] as VehicleType[]
          ).map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterChip,
                selectedType === type &&
                  styles.filterChipActive,
              ]}
              activeOpacity={0.85}
              onPress={() =>
                setSelectedType(type)
              }>
              {type === 'Car' && (
                <Car
                  size={15}
                  color={
                    selectedType === type
                      ? '#fff'
                      : '#333'
                  }
                />
              )}

              {type === 'Bike' && (
                <Bike
                  size={15}
                  color={
                    selectedType === type
                      ? '#fff'
                      : '#333'
                  }
                />
              )}

              {type === 'Auto' && (
                <Text
                  style={[
                    styles.chipAuto,
                    selectedType === type &&
                      styles.chipAutoActive,
                  ]}>
                  🛺
                </Text>
              )}

              <Text
                style={[
                  styles.filterText,
                  selectedType === type &&
                    styles.filterTextActive,
                ]}>
                {type === 'All'
                  ? 'All'
                  : type === 'Car'
                  ? 'Cars'
                  : type === 'Bike'
                  ? 'Bikes'
                  : 'Auto'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RESULT HEADER */}

        <View style={styles.resultHeader}>
          <View>
            <Text style={styles.resultTitle}>
              Vehicles near you
            </Text>

            <Text style={styles.resultSubtitle}>
              {filteredVehicles.length} vehicles
              available
            </Text>
          </View>

          <Text style={styles.indoreText}>
            Indore
          </Text>
        </View>

        {/* VEHICLE LIST */}

        <FlatList
          data={filteredVehicles}
          keyExtractor={item => item.id}
          renderItem={renderVehicle}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.listContent
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Search
                  size={27}
                  color="#777"
                />
              </View>

              <Text style={styles.emptyTitle}>
                No vehicle found
              </Text>

              <Text style={styles.emptyText}>
                Try another car, bike, auto or
                location.
              </Text>
            </View>
          }
        />

        {/* FOOTER */}

        <View style={styles.footer}>
          <Footer activeTab="search" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    paddingHorizontal: 17,
    paddingTop: 8,
    paddingBottom: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:100,
    marginTop:20,
  },

  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },

  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 4,
  },

  headerLocationText: {
    fontSize: 10,
    color: '#777',
    fontWeight: '600',
  },

  headerFilter: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  searchContainer: {
    marginHorizontal: 17,
    height: 51,
    borderRadius: 13,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    color: '#222',
    fontSize: 12,
    height: 50,
  },

  locationBox: {
    marginHorizontal: 17,
    marginTop: 10,
    height: 60,
    borderRadius: 13,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  locationIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationInfo: {
    marginLeft: 9,
  },

  locationLabel: {
    fontSize: 7,
    color: '#999',
    fontWeight: '800',
    letterSpacing: 0.6,
  },

  locationValue: {
    fontSize: 11,
    color: '#222',
    fontWeight: '700',
    marginTop: 4,
  },

  filterScroll: {
    paddingHorizontal: 17,
    paddingTop: 12,
    paddingBottom: 3,
    flexDirection: 'row',
    gap: 8,
  },

  filterChip: {
    height: 38,
    paddingHorizontal: 13,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  filterChipActive: {
    backgroundColor: '#111',
    borderColor: '#111',
  },

  filterText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#444',
  },

  filterTextActive: {
    color: '#fff',
  },

  chipAuto: {
    fontSize: 14,
  },

  chipAutoActive: {
    color: '#fff',
  },

  resultHeader: {
    paddingHorizontal: 17,
    paddingTop: 19,
    paddingBottom: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },

  resultSubtitle: {
    fontSize: 9,
    color: '#999',
    marginTop: 3,
  },

  indoreText: {
    fontSize: 10,
    color: '#555',
    fontWeight: '700',
  },

  listContent: {
    paddingHorizontal: 17,
    paddingBottom: 100,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  card: {
    width: '48.2%',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },

  imageContainer: {
    height: 125,
    backgroundColor: '#EEE',
    position: 'relative',
  },

  vehicleImage: {
    width: '100%',
    height: '100%',
  },

  favoriteButton: {
    position: 'absolute',
    right: 7,
    top: 7,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeBadge: {
    position: 'absolute',
    left: 7,
    bottom: 7,
    minHeight: 23,
    paddingHorizontal: 7,
    borderRadius: 7,
    backgroundColor: 'rgba(0,0,0,0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  typeText: {
    color: '#fff',
    fontSize: 7,
    fontWeight: '800',
  },

  autoEmoji: {
    fontSize: 10,
  },

  cardContent: {
    padding: 9,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  nameContainer: {
    flex: 1,
    marginRight: 5,
  },

  vehicleName: {
    fontSize: 12,
    color: '#222',
    fontWeight: '800',
  },

  vehicleBrand: {
    fontSize: 8,
    color: '#999',
    marginTop: 3,
  },

  rating: {
    height: 21,
    paddingHorizontal: 5,
    borderRadius: 6,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  ratingText: {
    fontSize: 8,
    color: '#555',
    fontWeight: '700',
  },

  locationRow: {
    marginTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  locationText: {
    flex: 1,
    fontSize: 7.5,
    color: '#888',
  },

  priceRow: {
    marginTop: 9,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111',
  },

  unit: {
    fontSize: 7,
    color: '#999',
    marginTop: 1,
  },

  viewButton: {
    height: 27,
    paddingHorizontal: 9,
    borderRadius: 7,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewButtonText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '700',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '800',
    color: '#222',
  },

  emptyText: {
    marginTop: 5,
    fontSize: 10,
    color: '#999',
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default SearchScreen;
