import * as React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import { DataTable } from 'react-native-paper';
import { useContext, useEffect, useState } from 'react'; 
import {StocksContext} from '../contexts/StocksContext';


export default function StockTable() {

  const [open, setOpen] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const [vol, setVol] = useState(null);
  const [pe, setPE] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [yearHigh, setYearHigh] = useState(null);
  const [yearLow, setYearLow] = useState(null);
  const [avgVol, setAvgVol] = useState(null);

  //*** USE CONTEXT GET COMPANY SYMBOL ******** /////
  const {companySymbolTable, setCompanySymbolTable} = useContext(StocksContext);

  useEffect(() => {
    async function getStocks(){
    const comSym = companySymbolTable;

    const API_KEY = "4796a2b95fa6295c55da36b9adb60268"; 
    const url = `https://financialmodelingprep.com/api/v3/quote/${comSym}?apikey=${API_KEY}`;
    try {
        let res = await fetch(url);
        let j = await res.json();
   
        setOpen(intToString(j[0]["open"]));
        setHigh(intToString(j[0]["dayHigh"]));
        setLow(intToString(j[0]["dayLow"]));
        setVol(intToString(j[0]["volume"]));
        setPE(intToString(j[0]["pe"]));
        setMarketCap(intToString(j[0]["marketCap"]));
        setYearHigh(intToString(j[0]["yearHigh"]));
        setYearLow(intToString(j[0]["yearLow"]));
        setAvgVol(intToString(j[0]["avgVolume"]));
              
        } catch(err) {
          return;
        }
   }
   getStocks();

 },[companySymbolTable])

/***** CONVERT USER FRIENDLY NUMBERS***********/
 function intToString(num) {
  if (num < 1000) {
      return num.toFixed(2);
  }
  var si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
    ];
  var i;
  for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].v) {
          break;
      }
  }
  return (num / si[i].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].s;
}

  return (
    <ScrollView horizontal>
        <DataTable>
          <DataTable.Row>

              <DataTable.Row style={styles.rows}>
                <DataTable.Cell><Text style={styles.heading}>Open</Text></DataTable.Cell>
                <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{open}</Text></DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={styles.rows}>
                <DataTable.Cell><Text style={styles.heading}>Vol.</Text></DataTable.Cell>
                <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{vol}</Text></DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row style={styles.rows}>
                <DataTable.Cell><Text style={styles.heading}>52W H</Text></DataTable.Cell>
                <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{yearHigh}</Text></DataTable.Cell>
              </DataTable.Row>        
          </DataTable.Row>

           <DataTable.Row>
                <DataTable.Row style={styles.rows}>
                  <DataTable.Cell><Text style={styles.heading}>High</Text></DataTable.Cell>
                  <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{high}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.rows}>
                  <DataTable.Cell><Text style={styles.heading}>P/E</Text></DataTable.Cell>
                  <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{pe}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.rows}>
                  <DataTable.Cell><Text style={styles.heading}>52W L</Text></DataTable.Cell>
                  <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{yearLow}</Text></DataTable.Cell>
                </DataTable.Row>
          </DataTable.Row>

          <DataTable.Row>
                <DataTable.Row style={styles.rows}>
                  <DataTable.Cell style={styles.heading}><Text style={styles.heading}>Low </Text></DataTable.Cell>
                  <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{low}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.rows}>
                  <DataTable.Cell><Text style={styles.heading}>Mkt Cap</Text></DataTable.Cell>
                  <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{marketCap}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.rows}>
                  <DataTable.Cell><Text style={styles.heading}>Avg Vol</Text></DataTable.Cell>
                  <DataTable.Cell numeric style={styles.datas}><Text style={styles.data}>{avgVol}</Text></DataTable.Cell>
                </DataTable.Row>
          </DataTable.Row>
        </DataTable>     
      </ScrollView>

  );

}

const styles = StyleSheet.create({
  datas: {
    paddingLeft: 0,
    textAlign: "right",
  },

  data: {
    fontWeight:"bold",
    color: 'white',
  },

 rows: {
  width:200,
 },
 
 heading: {
  color:"#c2c2c2",
  fontWeight: "bold",
 },

});
