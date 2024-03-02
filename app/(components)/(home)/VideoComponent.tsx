import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';


// function Icon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
//   size: number
// }) {
//   return <FontAwesome style={{ marginBottom: -3, }} {...props} />;
// }

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
      {/* <View style={styles.buttons}>
        <Icon color={status.isPlaying ? "gray" : "orange"} name={status.isPlaying ? 'pause-circle-o' : "play-circle-o"} size={50}
          onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
        />
      </View> */}

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
