import React from 'react';
import {Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {SharedElement} from 'react-navigation-shared-element';
import styles from '../../styles/NewsRowStyle';

export default function NewsRow({rowItem}) {
  return (
    <View style={styles.cardContainer}>
      {rowItem.multimedia.length > 0 ? (
        <View>
          <View style={styles.upperSectionWrapper}>
            <SharedElement id={`itemPhoto.${rowItem._id}`}>
              <Image
                source={{
                  uri: `https://www.nytimes.com/${rowItem.multimedia[0].url}`,
                }}
                style={styles.newImage}
              />
            </SharedElement>
            <Text style={styles.titleWithImage}>{rowItem.headline.main}</Text>
          </View>

          <Text style={styles.newsDescription}>{rowItem.abstract}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.titleWrapper}>{rowItem.headline.main}</Text>
          <Text style={styles.newsDescription}>{rowItem.abstract}</Text>
        </View>
      )}
    </View>
  );
}

NewsRow.propTypes = {
  rowItem: PropTypes.shape({
    multimedia: PropTypes.string,
    _id: PropTypes.string,
    headline: PropTypes.shape({
      main: PropTypes.string,
    }),
    abstract: PropTypes.string,
  }).isRequired,
};
