import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Animated, Image, ImageBackground, View} from 'react-native';

function AnimatableImage(props) {
  const {animated, children, ...rest} = props;

  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    if (loading) {
      setLoading(false);
    }
  };

  const ImageComponent = children ? ImageBackground : animated ? Animated.Image : Image;

  return (
    <View style={{position: 'relative', height: rest.style[0].height || 180}}>
      <ImageComponent {...rest} onLoad={handleLoad} onLoadEnd={handleLoad}>
        {children}
      </ImageComponent>
      {loading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : null}
    </View>
  );
}

AnimatableImage.propTypes = Image.propTypes | Animated.Image.propTypes;

AnimatableImage.defaultProps = {
  animated: false,
};

export default AnimatableImage;
