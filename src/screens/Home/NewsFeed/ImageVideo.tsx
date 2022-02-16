/**
 * @format
 */
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {AutoHeightImage} from '../../../components/Common';

import {INewsFeedData} from '../types/NewsFeedInterface';
import {VideoPlayer} from '../VideoPlayer';

const {width: WIDTH} = Dimensions.get('screen');

interface IImageVideoProps {
  newsFeed: INewsFeedData;
}

function ImageVideo(props: IImageVideoProps) {
  const {newsFeed} = props;
  const {contentDataType} = newsFeed;

  if (contentDataType === 'image' && newsFeed.imageContentLink) {
    const src = newsFeed.imageContentLink[0]?.original;
    return (
      <View style={styles.imageContainer}>
        <AutoHeightImage key={src} width={WIDTH} source={{uri: src || ''}} />
      </View>
    );
  }

  if (contentDataType === 'video' && newsFeed.videoContentLink) {
    const {videoEncodeStatus, VideoPath: path} = newsFeed.videoContentLink[0];
    if (videoEncodeStatus === 'complete') {
      return <VideoPlayer path={path ?? ''} />;
    }
  }

  return null;
}

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 8,
  },
});

export default ImageVideo;
