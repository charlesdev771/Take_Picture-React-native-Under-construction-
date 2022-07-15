
/*Teste*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, {useState, useEffect, TouchableOpacity, Modal, Image} from 'react';
import {Camera} from 'expo-camera';

import {FontAswesome} from '@expo/vector-icons';

export default function App() {


  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null);
  const [capturePhoto, setCapturePhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() =>{
    (async () =>{
      const {status} = await Camera.requestPermissionAsync()
      setHasPermission(status==="granted");
    })();
  }, [])

  if (hasPermission === null)
  {
    return <View/>
  }

  if ( hasPermission === false)
  {
    return <Text>Acesso Negados</Text>
  }

  async function takePicture()
  {
    if (camRef)
    {
      const data = await camRef.current.takePictureAsync();
      setCapturePhoto(data.uri);
      setOpen(true);
    }


  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera type={type} style={styles.camera}></Camera>
      <View style={styles.contentButtons}>

        <TouchableOpacity style={styles.buttonFlip}
          onPress={() =>{
            setType(
              type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
            )
          }}
          >

          <FontAswesome name="exchange" size={23} color="red"></FontAswesome>

        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>

        <FontAswesome name="camera" size={23} color={"#fff"}></FontAswesome>

        </TouchableOpacity>
      </View>

      <Modal animation="slide"
        transparent={true}
        visible={open}
      >
      <View style={styles.contentModal}>
      <TouchableOpacity style={styles.closeButton} onPress{() => {setOpen(false)}}>

      </TouchableOpacity>

      <Image style={styles.imgPhoto} source={{uri = capturePhoto}}></Image>

      </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  camera:
  {
    width: '100%',
    height: '100%'

  },

  contentButtons:
  {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },


  buttonFlip:
  {
    position: 'absolute',
    bottom: 50,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 20
  },

  buttonCamera:
  {
    position: 'absolute',
    bottom: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 20
  }
});
