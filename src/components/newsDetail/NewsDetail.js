import React from 'react';
import {View, Image, Share} from 'react-native';
import {Text} from 'react-native-elements';
import {SharedElement} from 'react-navigation-shared-element';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from '../../styles/NewsDetailStyle';

export default function NewsDetail({route}) {
  const news = route.params;
  const nav = useNavigation();

  nav.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={async () => {
          try {
            await Share.share({
              message: news.web_url,
            });
          } catch (error) {
            console.error(error);
          }
        }}>
        <FontAwesomeIcon
          icon={faShare}
          size={20}
          color="#5c5c5c"
          style={styles.shareIconStyle}
        />
      </TouchableOpacity>
    ),
  });

  return (
    <ScrollView>
      <View style={styles.headerSection}>
        <Text style={styles.headerSectionCat}>{news.section_name}</Text>
        <Text style={styles.headerSectionHeadline}>{news.headline.main}</Text>
        <Text style={styles.headerSectionDate}>
          {moment(news.pub_date).format('DD-MM-YYYY hh:MM')}
        </Text>
      </View>
      {news.multimedia.length > 0 ? (
        // eslint-disable-next-line no-underscore-dangle
        <SharedElement id={`itemPhoto.${news._id}`}>
          <Image
            source={{uri: `https://www.nytimes.com/${news.multimedia[0].url}`}}
            style={styles.newsImage}
          />
        </SharedElement>
      ) : (
        <View />
      )}

      <View style={styles.lowerSectionWrapper}>
        <Text style={styles.authorSection}>{news.byline.original}</Text>
        <Text style={styles.newAbstract}>{news.abstract}</Text>
        <Text style={styles.newsDescription}>{news.lead_paragraph}</Text>
      </View>
    </ScrollView>
  );
}

NewsDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      pub_date: PropTypes.string,
      section_name: PropTypes.string,
      multimedia: PropTypes.arrayOf(PropTypes.object).isRequired,
      _id: PropTypes.string,
      byline: PropTypes.shape({
        original: PropTypes.string,
      }),
      headline: PropTypes.shape({
        main: PropTypes.string,
      }),
      lead_paragraph: PropTypes.string,
      abstract: PropTypes.string,
    }),
  }).isRequired,
};
