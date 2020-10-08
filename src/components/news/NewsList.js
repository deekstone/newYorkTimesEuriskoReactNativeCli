import React, {useEffect, useState, createRef} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import NewsRow from './NewsRow';
import {fetchNews, loadMoreNews} from '../../redux/actions/NewsActions';
import styles from '../../styles/NewsListStyle';

/**
 * This is the main view
 * this view will display the news list with a search input
 */
function NewsList({navigation}) {
  // Creating a reference )
  const flatListRef = createRef();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const isRefreshing = useSelector((state) => state.isRefreshing);
  const isLoading = useSelector((state) => state.isLoading);
  const page = useSelector((state) => state.page);
  const data = useSelector((state) => state.data);

  /**
   * when first opening the view this function will be triggered in order to fetch the news
   */
  useEffect(() => {
    dispatch(fetchNews(1));
  }, []);

  /**
   * This is the list footer
   * In caset the user scrolls to the bottom of the list we will display a small activity indicator
   */
  function renderFooter() {
    // this activity indicator will be displayed only when fetching data
    return !isRefreshing ? (
      <ActivityIndicator style={styles.activityIndicatorStyle} />
    ) : null;
  }

  return (
    <View style={styles.newsListWrapper}>
      <SearchBar
        placeholder="Search news..."
        round
        lightTheme
        value={searchText}
        onChangeText={(e) => {
          setSearchText(e);
        }}
        onClear={() => {
          dispatch(fetchNews(1, ''));
          flatListRef.current.scrollToOffset({animated: true, offset: 0});
        }}
        onSubmitEditing={() => {
          // After pressing done on the keyboard after searching for a text
          // return in case the text is empty
          if (searchText.length === 0) return;

          // scroll to the to of the list before searching for new data
          flatListRef.current.scrollToOffset({animated: true, offset: 0});

          // in case the text is not empty search for news
          dispatch(fetchNews(1, searchText));
        }}
      />
      <FlatList
        ref={flatListRef}
        data={data}
        refreshing={isRefreshing}
        onRefresh={() => {
          dispatch(fetchNews(1));
        }}
        renderItem={(item) => (
          <TouchableOpacity
            onPress={() => {
              // Go to the news detail view after selecting a news
              navigation.navigate('NewsDetail', item.item);
            }}
          >
            <NewsRow rowItem={item.item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          index.toString();
        }}
        onEndReached={() => {
          /*
           * This function will be trigered after scrolling to the bottom of the page
           * on End reached the app will fetch more news
           * in order to prevent an endless loop, we wont call the api that
           * gets more news if it is already loading
           */

          if (!isLoading) dispatch(loadMoreNews(page, searchText));
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter()}
      />
    </View>
  );
}

// Connecting new lists  component to a Redux store.
export default connect(null, {fetchNews, loadMoreNews})(NewsList);

NewsList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
