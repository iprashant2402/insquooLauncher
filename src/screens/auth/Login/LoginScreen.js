import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../colors/colors';
import Button from '../../../components/Button/Button';
import {onGoogleButtonPress} from '../../../utils/auth';
import styles from './LoginScreen.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const GoogleIcon = <Icon name="google-plus" size={20} color={colors.white} />;

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <Button
          onclick={() =>
            onGoogleButtonPress()
              .then(() => console.log('Signed in with Google!'))
              .catch(e => console.log(e))
          }
          title="SIGN IN WITH GOOGLE"
          bgColor={colors.google_red}
          textColor={colors.white}
          borderColor={colors.google_red}
          rounded
          block
          icon={GoogleIcon}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
