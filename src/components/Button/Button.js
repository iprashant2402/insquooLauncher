import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors, {fonts} from '../../colors/colors';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const Button = ({
  title,
  bgColor = colors.primary,
  textColor = colors.white,
  borderColor = colors.primary,
  rounded,
  clear,
  block,
  icon,
  onclick,
}) => {
  const btnStyles = [
    {
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      paddingHorizontal: 22,
      paddingVertical: 16,
    },
  ];
  const textStyles = [
    {
      color: textColor,
      fontSize: ScreenWidth / 32,
      textAlign: 'center',
      fontFamily: fonts.primary_semibold,
    },
  ];

  const iconContainer = {
    marginRight: 12,
  };

  if (block) {
    btnStyles.push({width: '100%'});
  }

  if (rounded) {
    btnStyles.push({borderRadius: 32});
  }

  if (clear) {
    btnStyles.push({
      backgroundColor: 'transparent',
      borderWidth: 0,
      paddingHorizontal: 0,
      paddingVertical: 0,
    });
  }

  return (
    <TouchableOpacity style={btnStyles} onPress={onclick} activeOpacity={0.8}>
      {icon && <View style={iconContainer}>{icon}</View>}
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
