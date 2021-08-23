import React, { useState, useEffect, useContext } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ScrollView } from 'react-native';
import { StocksContext } from '../contexts/StocksContext';
import {ListContext} from '../contexts/ListContext';
import Slider from '../components/Slider';
import { SliderContext } from '../contexts/SliderContext';
import axios from 'axios';




export default function StocksScreen({navigation}){

/**********USE CONTEXT  ************/
const [companySymbolTable, setCompanySymbolTable] = useState("");
         
//Get company list
const {companyList, setCompanyList} = useContext(ListContext);

  const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };

      //************** Set company list with data ******************** */
      const [companyListData, setCompanyListData] = useState([]);
  
              const ListData = [];
              
              useEffect(() => {

                companyList.forEach((element) => {          
                  async function getStocks(element){
                    const comSymbol = element;
                    const API_KEY = "4796a2b95fa6295c55da36b9adb60268";
                    const url = `https://financialmodelingprep.com/api/v3/quote/${comSymbol}?apikey=${API_KEY}`;
                    try {
                        let res = await fetch(url);
                        let j = await res.json();
                        j = { symbol: element, name: j[0]["name"], price: j[0]["price"], change: j[0]["changesPercentage"], changeval: j[0]["change"] };
                        ListData.push(j);
                  
                    setCompanyListData(ListData);
                    setCompanyListData(ListData);
                
                   
                    } catch(err) {
                      return;
                    }
                }
                getStocks(element.name);
                
              });     
          },[companyList])

            /************ toggle percentage or change value **************** */
            const [toggle, setToggle] = useState(true);
              const toggleFunction = () => {
                setToggle(!toggle);
                  };


                  /********* Renders list of stocks******** */
      const ItemView = ({ item }) => {
        return (
          <View style={styles.itemContainer}>
                <View style={styles.modal}>
                  <TouchableOpacity style={{}} onPress={() => {getItem(item)}}>              
                          <Text style={styles.symbol}>{item.symbol}
                                {"\n"}
                                <Text style={styles.name}>{item.name}</Text>
                                {"\n"}
                          </Text>
                    </TouchableOpacity>
                </View>
            
                <View style={styles.numbers}>
                      <Text style={styles.price}>{item.price}</Text>
                        <TouchableOpacity onPress={() => toggleFunction()}>
                          <Text style={(parseFloat(item.change) > 0) ? {color:"green"} : {color:"red"}}> 
                            <Text style={styles.toggle}>{toggle ? item.change + '%' : item.changeval}</Text>
                          </Text>
                        </TouchableOpacity>
                </View>    
                  <View style={{}}>
                      <TouchableOpacity style={styles.button} title="Remove" onPress={() => {removeSymbol(item)}}>
                        <Text style={styles.x}>X</Text>
                      </TouchableOpacity>
                  </View> 
            </View>

        );
      };

      //set company stock for slider
      const getItem = (item) => {              
          setCompanySymbolTable(item.symbol);   
          setModalVisible(!isModalVisible);  
      };

   /*********************Remove company from watchlist****************************** */
      const removeSymbol = (item) => {
        let newList = [...companyList];
        newList = newList.filter(symbol => symbol.name != item.symbol); 
        setCompanyList(newList);
        setCompanyListData(ListData);

        //updating mongo database
        const comlist = JSON.stringify(newList);
        const list = {
          list: comlist,
        }
        axios.put('http://172.22.27.231:3000/stockslist/update/60ba2de149785f2fb774b3ea', list)
        .then(res => console.log(res.data))
        .catch(err => res.status(400).json('Error: '+ err));
        ///////////////////////////////
      };   

/************SLIDER CONTEXT toggle for company information***************/
const [isModalVisible, setModalVisible] = useState(false);

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

        return (          
        <SafeAreaView style={styles.list}>
            <View>
                <Text style={styles.watchlist}>WATCHLIST</Text>
                  
                  <FlatList
                    data={companyListData}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                    refreshing={true}
                  
                  
                  />
                  
              </View>        
                <StocksContext.Provider value={{companySymbolTable, setCompanySymbolTable}}>
                  <SliderContext.Provider value={{isModalVisible, setModalVisible}}>
                    <Slider />
                  </SliderContext.Provider>          
                </StocksContext.Provider>  
            </SafeAreaView>
          
          );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    itemContainer: {
      flexDirection: 'row', 
      alignContent: 'space-between', 
      width: "100%", 
      alignItems: 'stretch', 
      height: 90
    },

    itemStyle: {
      padding: 10,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold'
    },

    modal: {
      flex:1
    },

    symbol: {
      fontSize:20, 
      fontWeight: 'bold', 
      color: 'white'
    },

    name: {
      fontWeight: 'bold', 
      color: '#c2c2c2'
    },

    button: {
      alignItems: "center",
      backgroundColor: "red",
      padding: 5,
   },

   numbers: {
     paddingRight:40, 
     paddingLeft: 30
    },

    price: {
      textAlign: "right", 
      color: 'white', 
      fontSize:20
    },

    toggle: {
      fontSize:20, 
      fontWeight: "bold",
      marginTop: 30, 
      textAlign:'right'
    },

    x: {
      color: 'white', 
      borderRadius:20
    },

    list: { 
      flex: 1, 
      backgroundColor: '#303337'
    },

    watchlist: {
      fontSize:28, 
      fontWeight:"bold", 
      color: 'white',  
      paddingTop:30, 
      paddingBottom: 20, 
      textAlign: 'center'
    },


  });
