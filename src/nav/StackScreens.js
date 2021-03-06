import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import React from 'react';
import {Image} from 'react-native';
import NewsList from '../components/news/NewsList';
import NewsDetail from '../components/newsDetail/NewsDetail';
import logoImg from '../assets/nytimestimeline.jpg';
import styles from '../styles/StackScreenStyle';
/**
 * Render the stack views
 */

export default function StackViewsApp() {
  const Stack = createSharedElementStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Newslist">
      <Stack.Screen
        name="NewsList"
        component={NewsList}
        options={{
          headerLeftContainerStyle: styles.headerLeftContainer,
          headerLeft: () => (
            // App logo added in the nav bar
            <Image source={logoImg} style={styles.imgLogo} />
          ),
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{
          headerTitle: '',
          gestureEnabled: false,
          // customizing the animation
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 250}},
            close: {animation: 'timing', config: {duration: 250}},
          },
          cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}
        // Sharing the news Photo and item title in order to have a
        // small animation when navigating from the news to the news detail
        sharedElementsConfig={(route) => [
          `itemPhoto.${route.params._id}`,
          `itemTitle.${route.params._id}`,
        ]}
      />
    </Stack.Navigator>
  );
}
