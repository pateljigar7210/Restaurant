/**
 * @format
 */
import React, {useState, useEffect, useRef, MutableRefObject} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Box, IBoxProps, View} from 'native-base';
import Video, {OnLoadData, OnProgressData} from 'react-native-video';

import MediaControls, {PLAYER_STATES} from '../../lib/MediaControls';
import {theme} from '../../theme';

type IPlayerProps = {
  path: string;
  containerStyle?: IBoxProps;
};

function VideoPlayer(props: IPlayerProps) {
  const {path, containerStyle} = props;

  const videoPlayer = useRef() as MutableRefObject<Video>;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);

  useEffect(() => {
    setPlayerState(PLAYER_STATES.PAUSED);
  }, []);

  const onSeek = (seek: number) => videoPlayer?.current.seek(seek);

  const onFullScreen = () => setFullScreen(v => !v);

  const onFullScreenDismiss = () => {
    setPaused(true);
    setPlayerState(PLAYER_STATES.PAUSED);
    setFullScreen(false);
  };

  const onPaused = (newState: number) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    setPlayerState(PLAYER_STATES.PLAYING);
    setPaused(false);
  };

  const onProgress = (data: OnProgressData) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  const loadingStyle: ViewStyle = isLoading ? {backgroundColor: theme.colors.black[1000]} : {};

  return (
    <Box mt="2" height="180" width="100%" bgColor={theme.colors.black[1000]} {...containerStyle}>
      <Video
        paused={paused}
        ref={videoPlayer}
        fullscreen={isFullScreen}
        resizeMode="contain"
        source={{uri: path}}
        style={styles.video}
        muted={false}
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onFullscreenPlayerWillDismiss={onFullScreenDismiss}
      />
      <MediaControls
        containerStyle={loadingStyle}
        isFullScreen={isFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor="#000"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeek}
        playerState={playerState}
        sliderStyle={{thumbStyle: {borderWidth: 0}}}
        progress={currentTime}>
        <MediaControls.Toolbar>
          <View />
        </MediaControls.Toolbar>
      </MediaControls>
    </Box>
  );
}

VideoPlayer.defaultProps = {
  containerStyle: {},
};

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.black,
  },
});

export {VideoPlayer};
