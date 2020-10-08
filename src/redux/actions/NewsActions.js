// eslint-disable-next-line import/no-unresolved
import { API_TOKEN } from '@env';
import {
  FETCHING_NEWS_REQUEST, FETCHING_NEWS_FAILURE, FETCHING_NEWS_SUCCESS, LOAD_MORE_NEWS_SUCCESS,
} from './Types';
import AxiosInstance from '../../helper/AxiosHelper';

export const fetchingNewsRequest = () => ({ type: FETCHING_NEWS_REQUEST });

/**
 * Retuns the data with a success FLAG
 * @param {*} json Is the data returned from the API after successfully calling the API
 */
export const fetchingNewsSuccess = (json) => ({
  type: FETCHING_NEWS_SUCCESS,
  payload: json,
});

/**
 * Returns the error from the api with a FLAG
 * @param {*} error error returned after calling the API
 */
export const fetchingNewsFailure = (error) => ({
  type: FETCHING_NEWS_FAILURE,
  payload: error,
});

/*
 * Getting news from the New York Times Api
 * This is used when performing a swipe to refresh and when searching for a text
 * @param {Intrger} page Page number
 * @param {String} query search text
 */
export const fetchNews = (page, query = '') => async (dispatch) => {
  dispatch(fetchingNewsRequest());
  try {
    const res1 = await AxiosInstance.get(
      `articlesearch.json?api-key=${API_TOKEN}&sort=newest&page=${page}&q=${query}`,
    );

    const res2 = await AxiosInstance.get(
      `articlesearch.json?api-key=${API_TOKEN}&sort=newest&page=${page + 1}&q=${query}`,
    );

    dispatch(fetchingNewsSuccess([...res1.data.response.docs, ...res2.data.response.docs]));
  } catch (error) {
    dispatch(fetchingNewsFailure(error));
  }
};

/**
 * THis is called after successfully loading more news
 * @param {*} json data retuned after loading more news
 */
export const loadMoreNewsSuccess = (json) => ({
  type: LOAD_MORE_NEWS_SUCCESS,
  payload: json,
});

/**
 * This function loads more news.
 * Here we are performing 2 API calls in order to get a total of 20 news
 * Async Await is used in order to wait for each API
 * call to finish before dispatching the Total data received
 * @param {*} page Page number
 * @param {*} query Search Text
 */
export const loadMoreNews = (page, query) => async (dispatch) => {
  dispatch(fetchingNewsRequest());
  try {
    const res1 = await AxiosInstance.get(
      `articlesearch.json?api-key=${API_TOKEN}&sort=newest&page=${page}&q=${query}`,
    );
    // we are increasing the number of page by 1 each time to get the next page
    const res2 = await AxiosInstance.get(
      `articlesearch.json?api-key=${API_TOKEN}&sort=newest&page=${page + 1}&q=${query}`,
    );

    // Here the data from the first and the second api call
    // are being concatenated and then dispatched
    dispatch(loadMoreNewsSuccess([...res1.data.response.docs, ...res2.data.response.docs]));
  } catch (error) {
    // In case of an error.
    // the error will be dispatched
    dispatch(fetchingNewsFailure(error));
  }
};
