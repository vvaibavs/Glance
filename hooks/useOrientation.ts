import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    'portrait'
  );

  useEffect(() => {
    const updateOrientation = async () => {
      const info = await ScreenOrientation.getOrientationAsync();
      setOrientation(
        info === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          info === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
          ? 'landscape'
          : 'portrait'
      );
    };

    updateOrientation();

    const subscription =
      ScreenOrientation.addOrientationChangeListener((event) => {
        const o = event.orientationInfo.orientation;
        setOrientation(
          o === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
            o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
            ? 'landscape'
            : 'portrait'
        );
      });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return orientation;
}
