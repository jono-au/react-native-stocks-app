import React, {useState,useContext,useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Chart from '../components/Chart';
import StockTable from '../components/StockTable';
import { SliderContext } from '../contexts/SliderContext';



export default function Slider() {
  //const [isModalVisible, setModalVisible] = useState(false);
  const {isModalVisible, setModalVisible} = useContext(SliderContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      <Modal 
      isVisible={isModalVisible} 
      backdropColor = '#303337'
      backdropOpacity = {1}
      style={{margin: 0, paddingTop:40}}
      >
        <View style={{flex: 1}}>        
          <Chart />
          <StockTable />
          <Button title="Close Stock" onPress={toggleModal} />   
        </View>
      </Modal>
    </View>
  );
}

