import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';


const VideoComponent = () => {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require('../../../assets/images/dogvideo.mp4')}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
}

export default VideoComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    borderColor: "black",
  },
  video: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.5,
    position: "relative"
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    left:Dimensions.get('window').width * 0.4
  },
});
