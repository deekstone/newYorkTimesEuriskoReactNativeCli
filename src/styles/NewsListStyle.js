import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardListWrapper: {
    padding: 10,
  },
  container: {
    flex: 1,
    position: 'relative',
    borderWidth: 1,
    height: '100%',
    width: '100%',
  },
  scrollToTopBtn: {
    bottom: 0,
    right: 0,
    borderWidth: 1,
    zIndex: 99,
  },
  activityIndicatorStyle: { color: '#000', marginTop: 20 },
  newsListWrapper: { flex: 1 },
});

export default styles;
