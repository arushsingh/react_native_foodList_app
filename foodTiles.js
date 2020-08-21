import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, Button, TouchableOpacity } from 'react-native';
import SubFoodItemsList from './subFoodItemsList';


const FoodTiles = ({ approvedFood }) => {
  // console.log('test to list', approvedFood)
  const styles = StyleSheet.create({
    foodTile : {
      backgroundColor: '#fff',
      width: '100%',
      marginTop: '.5rem',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'row',
      boxShadow: '1px 2px 6px #909497',
    },
    buttonStyle: {
      elevation: 8,
      paddingVertical: 5,
      paddingHorizontal: 6
    },
    fullWidth: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    tileText: {
      paddingTop: '1rem',
      paddingRight: '1rem',
      paddingBottom: '1rem',
      paddingLeft: '.5rem',
      fontSize: '15px',
      fontStyle: 'oblique',
    },
    imageStyle:{
      width: 40,
      height: 40,
      display: 'block',
      margin: '.5rem',
    },
    text: {
      fontFamily: 'fontFamily',
      color: '#336666',
      backgroundColor: 'transparent',
    },
    // both the conditions are same this 
    // is done here to display platform specific code
    bold: Platform.OS === 'ios' ? {
      fontFamily: 'fontFamily',
      fontWeight: '700'
    } : {
      fontFamily: 'fontFamily',
      fontWeight: '700'
    },
    centerElement: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  const [selected, setSelected] = useState([]);

  const selectFood = (selection) => {
    let foodSelection = [];
    if (selected.includes(selection)) {
      let index = selected.indexOf(selection);
      let foodData = [...selected];
      foodData.splice(index, 1);
      setSelected(foodData);
    } else {
      foodSelection.push(selection);
      setSelected([...selected, ...foodSelection])
    }
  }

  return (
    <View style={styles.fullWidth}>
      {approvedFood.map((item) => {
        // console.log(item.category)
        // key needs to be passed to perform CRUD operations on the array
        // we can pass index too but that only when we do not have anything unique in the dataset
        return(
          <TouchableOpacity 
            style={styles.buttonStyle}
            onPress={() => selectFood(item.category.categoryName)} 
            key={item.category.categoryName} 
            title={item.category.categoryName}
            >
            <View style={styles.foodTile}>
              <Image 
                style={styles.imageStyle} 
                source={'https://i.ibb.co/0JjvQtp/Dinner.png'}
              />
              <Text 
                style={[styles.tileText, styles.centerElement, styles.bold, {color: item.category.colorCode}]}>
                  {item.category.categoryName} {item.category.servingSize && `(${item.category.servingSize})`}             </Text>
            </View>
            { selected.includes(item.category.categoryName) &&
              <SubFoodItemsList subcategory={item.category.subcategories} colorCode={item.category.colorCode} />}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
export default FoodTiles;