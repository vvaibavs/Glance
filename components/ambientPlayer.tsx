import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function AmbientPlayer() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setMusic = async () => {
    // Required on iOS
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
    });

    const { sound: soundvar } = await Audio.Sound.createAsync(
      require("../assets/sounds/673483__felixblume__rain-from-hut-interior-cabin-drops-distant-voices-and-motor-far-away-outside-subtle-noise-interior-sometimes-thunder-recorded-in-playa-blanca-amazon-rainforest.mp3")
    );

    await soundvar.setIsLoopingAsync(true);
    await soundvar.setVolumeAsync(0.4);

    setSound(soundvar);
  };

  const playPauseSound = async () => {
    if (!sound) return;
    await sound.setStatusAsync({ shouldPlay: !isPlaying });
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setMusic();

    return () => {
      sound?.unloadAsync();
    };
  }, []);

  return (
    <View style={{ flexDirection: "row", gap: 16 }}>
        {isPlaying ? (
          <Ionicons name="pause-circle" size={35} onPress={playPauseSound} />
        ) : (
          <Ionicons name="play-circle" size={35} onPress={playPauseSound} />
        )}
    </View>
  );
}
