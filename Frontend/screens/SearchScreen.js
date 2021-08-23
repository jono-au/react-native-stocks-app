
import React, { useState, useEffect,useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ListContext } from '../contexts/ListContext';
import axios from 'axios';

/********************** Seach function ***************** */
const Searching = ({navigation}) => {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

/********************** Get all the data for search ************************* */
  useEffect(() => {
    try {
        async function getStocks(){
            const API_KEY = "4796a2b95fa6295c55da36b9adb60268";
            const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
            let res = await fetch(url);
            let data = await res.json();
 
            setFilteredDataSource(data);
            setMasterDataSource(data);
       
            }
            getStocks();
        } catch(err) {
            return;
        }

}, []);

//search function 
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
   
        const symbol = item.symbol;
        const name = item.name;

        const itemData = symbol.concat(name);
        const textData = text;
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

 // Flat List Companies
  const ItemView = ({ item }) => {
    return ( 
      <View style={styles.itemContent}>
          <View style={styles.col1}>
              <Text>
                <Text style={styles.symbol}>{item.symbol}</Text>
                {"\n"}
                <Text style={styles.name}>{item.name}</Text>
                {"\n"}
                <Text style={styles.sector}>{item.sector}</Text> 
              </Text>
          </View>  
          <View style={styles.col2}>
            <TouchableOpacity style={styles.button} title="Add to watchlist" onPress={() => {setSymbol(item); navigation.navigate('Stocks');}}>
              <Text style={styles.watchlist}>Add to watchlist</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  };


/********** USE STOCKS CONTEXT SET COMPANY SYMBOL *******************/

/***********SET LIST OF COMPANY STOCKS********* */
const {companyList, setCompanyList} = useContext(ListContext);

let listarray = [...companyList];

  const setSymbol = (item) => {
    listarray.push({"name": item.symbol});
    setCompanyList(listarray );

  //stringify list save to localstorage and database
         const comlist = JSON.stringify(listarray);
         const list = {
           list: comlist,
         }

 /************* BACKUP LIST  MONGO *****************/
        axios.put('http://172.22.27.231:3000/stockslist/update/60ba2de149785f2fb774b3ea', list)
        .then(res => console.log(res.data))
        .catch(err => res.status(400).json('Error: '+ err));


  };

// Flat List Item Separator
  const ItemSeparatorView = () => {
    return ( 
      <View style={styles.itemseperator} />
    );
  };

  //********DATE function (month) ********* */
  function getDate() {
      let dateObj = new Date();
      let day = dateObj.getUTCDate();
      let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      let month = months[dateObj.getMonth()];
      let newdate = day + " " + month;
      return newdate;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#303337' }}>
      <View style={styles.container}>
      <Text style={styles.stocktitle}>STOCKS</Text>
      <Text style={styles.date}>{getDate()}</Text>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search Company Name..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303337',
    paddingTop:20,
  },

  col1: {
    flex: 0.7
  }, 

  col2: {
    flex: .3
  },

  symbol: {
    color: 'white',
    fontSize:22, 
    fontWeight: 'bold'
  },

  name: {
    color: '#c2c2c2',
    fontSize:18, 
    fontWeight: 'bold'
  },
  
  stocktitle: {
    fontSize:28, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center'
  },

  sector: {
    color: 'gray',
    fontSize:16
  },

  watchlist: {
    color: 'white'
  },

  date: { 
    fontSize:22,
    fontWeight: 'bold', 
    color: 'white', 
    paddingBottom: 20, 
    textAlign: 'center'
  },
  itemseperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },

  itemStyle: {
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
    
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,

 },
 itemContent: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  height: 100,
  alignContent: 'space-between'
  
 }
});


export default Searching;