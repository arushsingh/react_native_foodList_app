import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';

const SubFoodItemsList = ({ subcategory, colorCode }) => {

  const styles = StyleSheet.create({
    SubFoodItemsContainer: {
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: '.5rem',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    text: {
      fontFamily: 'fontFamily',
      color: '#336666',
      backgroundColor: 'transparent',
      marginTop: '.5rem',
      padding: '.5rem',
      fontStyle: 'oblique',
    },
    // both the conditions are same 
    // this is done here to display platform specific code
    bold: Platform.OS === 'ios' ? {
      fontFamily: 'fontFamily',
      fontWeight: '700'
    } : {
      fontFamily: 'fontFamily',
      fontWeight: '700'
    },
    subItemMenuBold: Platform.OS === 'ios' ? {
      fontFamily: 'fontFamily',
      fontWeight: '500'
    } : {
      fontFamily: 'fontFamily',
      fontWeight: '500'
    },
    subItemMenu: {
      padding: '.5rem',
      width: '100%',
      borderBottomColor: '#333',
      borderBottomWidth: '1px',
      fontStyle: 'oblique',
    }
  })
  return(
    <View style={styles.SubFoodItemsContainer}>
      {subcategory.map((item, index) => {
        return(
          <View key={index}>
             <Text style={[styles.text, styles.bold, {color: colorCode}]}>{item.subCategoryname}</Text>
            {item.items.map((item) => (
              <Text style={[styles.subItemMenu, styles.subItemMenuBold]} key={item}>{item}</Text>
            ))}
          </View>
        )
      })}
    </View>
  )
}
export default SubFoodItemsList;