import React from "react";

import * as ImageManipulator from "expo-image-manipulator";

import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";

function useImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    console.log("hello")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.uri;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      const res = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { height: 1500 } }],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const imageFile = {
        name: filename,
        type,
        uri: res.uri,
      };
      setImage(imageFile);

    return imageFile;


      //   const formData = new FormData();

      //   formData.append("faceImg", imageFile);

      //   await Auth.registerUser({
      //     body: formData,
      //   });
    }

    
  };

  return [{ image }, { pickImage }];
}
export default useImagePicker;