import React, { useState, useEffect,useContext } from 'react'; 
import {LineChart} from 'react-native-chart-kit'
import { Dimensions, View, StyleSheet, Text } from 'react-native'
const screenWidth = Dimensions.get('window').width
import {StocksContext} from '../contexts/StocksContext';



export default function Chart(){

  //Get company symbol for table component & chart 
const {companySymbolTable, setCompanySymbolTable} = useContext(StocksContext);

const [allStocks, setAllStocks] = useState([]);

useEffect(() => {
  async function getStocks(){
  const comSymbol = companySymbolTable;
  const API_KEY = "4796a2b95fa6295c55da36b9adb60268";
  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${comSymbol}?timeseries=365&apikey=${API_KEY}`;
  
  try {
      let res = await fetch(url);
      let j = await res.json();

    let daily = j["historical"];
    daily =  Object.entries(daily);

      const allstocksdata = daily.map((stocks) => ({
        date: stocks[1]["label"],
        close: stocks[1]["close"],
          }            
      ));
         setAllStocks(allstocksdata.reverse());

      } catch(err) {
         alert("Please choose another company symbol");
      }
 }
 getStocks();

},[companySymbolTable])


const [companyName, setCompanyName] = useState(null);
const [companyPrice, setCompanyPrice] = useState(null);
const [changePercentage, setChangePercentage] = useState(null);

/***********GET TOP COMPANY INFORMATION ****************/
useEffect(() => {
  async function getStocksInfo(){
  const symbol = companySymbolTable;

  const API_KEY = "4796a2b95fa6295c55da36b9adb60268";
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`;
  try {
      let res = await fetch(url);
      let j = await res.json();
 
      setCompanyName(j[0]["name"]);
      setCompanyPrice(j[0]["price"]);
      setChangePercentage(j[0]["changesPercentage"]);
      
       
      } catch(err) {
              alert("Please choose another company symbol");
      }
 }
 getStocksInfo();

},[companySymbolTable])


/***************************CHART COMPONENT********************************** */

let closing = [1,1,1];

for (const stocksClosePrice in allStocks) {
  let stocks = parseFloat(`${allStocks[stocksClosePrice]["close"]}`);
  closing.push(stocks);   
}

    return (
          <View>
            <Text style={styles.symbol}> {companySymbolTable} 
              <Text style={styles.name}>{companyName}</Text>
            </Text >

            <Text style={styles.textInfo}>
              {companyPrice} <Text style={ (parseFloat(changePercentage) > 0) ? {color:"green"} : {color:"red"} }>{changePercentage}%</Text>
              {"\n"}
              <Text style={styles.close}> At Close</Text>
            </Text>

            <LineChart
              data={{
                labels: ['Jun', 'Oct', 'Jan', 'Apr', 'Jun',],
                datasets: [{
                  data: 
                    closing
                }]
              }}
              width={Dimensions.get('window').width}
              height={220}
              yAxisLabel={'$'}
              chartConfig={{
                backgroundColor: '#ff2626',
                backgroundGradientFrom: '#242424',
                backgroundGradientTo: '#000000',
                decimalPlaces: 0, 
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 0   
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 0
              }}
              withDots={false}
              withInnerLines={false}
            />
          </View>
    );      
};

  const styles = StyleSheet.create({
    textInfo: {
      fontSize: 24,
      fontWeight: "bold",
      paddingLeft: 5,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomColor: "gray",
      borderBottomWidth: 0.7,
      borderTopColor: "gray",
      borderTopWidth: 0.7,
      color: 'white',
    },

    symbol: { 
      fontSize: 32, 
      fontWeight:"bold", 
      paddingBottom: 10, 
      color: "white"
    },

    name: { 
      fontSize: 14, 
      color:"#c2c2c2"
    },

    close: {
      fontSize: 16, 
      color:"#c2c2c2"
    },

    
  });