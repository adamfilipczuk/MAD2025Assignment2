import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../style/colors';

const HeaderBar = ({ title }) => {
    return (
        <View style={styles.infoField}>
            <Text style={styles.headerText}>{title}</Text>
        </View>    
    );
};

const styles = StyleSheet.create({
  infoField: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "lightblue",
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    width: 335,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
    color: colors.textPrimary,
  },
});

export default HeaderBar;
