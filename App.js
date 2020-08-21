import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, AsyncStorage, TextInput } from 'react-native';
import FoodTiles from './foodTiles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F9',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  containerHeader: {
    fontSize: '1.3rem',
    textAlign: 'left',
    fontWeight: '700',
    paddingLeft: '1rem',
  },
  closeButton: {
    fontSize: '2rem',
    paddingTop: '2rem',
    paddingLeft: '1rem',
    width: '90%'
  },
  messageIcon: {
    paddingLeft: 0,
    paddingRight: '1rem',
    paddingTop: '1rem',
    fontSize: '2rem',
    width: '10%'
  }, 
  headerIconsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
  },
  loaderStyle: {
    width: '100%',
    flex: 1,
  },
  inputStyles: {
    borderColor: 'rgb(128, 128, 128)',
    borderWidth: '1px',
    height: '40px',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1rem',
    marginTop: '.5rem',
    borderRadius: '5px',
  }
});

const App = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem('approvedFoodList', JSON.stringify(data))
    } catch(err) {
      console.log('error saving the Data');
    }
  }

  const getData = async () => {
    try{
      const data = await AsyncStorage.getItem('approvedFoodList');
      let parsedData = JSON.parse(data);
      if (parsedData != null) {
        setData(parsedData);
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      } else {
        fetchData();
      }
    } catch (err) {
      console.log('error getting saved data');
    }
  }  

  const fetchData = async () => {
    console.log('console to check if cache is working and no call happening')
    try {
      let response = await fetch('https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e');
      let responseResult = await response.json();
      storeData(responseResult);
      setData(responseResult);
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    } catch (error) {
      console.error(error);
    }
  }

  const filterResults = async (text)  => {
    setValue(text);
    let originalData = data.categories.slice(); 
    let newItems = [...originalData];
    // console.log(newItems);
    let newFilterItems = {
      categories: []
    };
    if (text.length === 0) {
      const data = await AsyncStorage.getItem('approvedFoodList');
      let parsedData = JSON.parse(data);
      setData(parsedData);
      return
    }
    for(let i = 0 ; i < newItems.length; i++) {
      for(let j = 0 ; j < newItems[i].category.subcategories.length ; j++){
        for (let k = 0 ; k < newItems[i].category.subcategories[j].items.length ; k++ ) {
          if (newItems[i].category.subcategories[j].items[k].substring(0, text.length).toLowerCase() === text){
            if ( newFilterItems.categories.find(item => item.category.categoryName === newItems[i].category.categoryName)) {
              return
            } else {
              newFilterItems.categories.push(newItems[i])
            }
          }
        }
      }
    }
    setData(newFilterItems)
  }

  // this effect is used to fetch the data from the API if the data is not present in the asynchronous storage
  useEffect(() => {getData()} ,[])

  return(
    <View style={styles.container}>
      {/* FontAwesome or some custom SVG can be used here as this is a demo app hence used capital alphabet "X" */}
      <View style={styles.headerIconsContainer}>
        <Text style={styles.closeButton}>X</Text>
        <Text style={styles.messageIcon}>O</Text>
      </View>
      <Text style={styles.containerHeader}>Approved Food List</Text>
      <TextInput
        style={styles.inputStyles}
        onChangeText={text => filterResults(text)}
        value={value}
        placeholder='Try Searching for Fat, Sauces & names...'
      />
      {loading && <ActivityIndicator style={styles.loaderStyle} />}
      {!loading && data && data.categories &&  data.categories.length > 0 && <FoodTiles approvedFood={data.categories}/> }
    </View>
  )
}
export default App;