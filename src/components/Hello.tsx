import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { selectTest } from 'src/redux/settings/settings.selectors';
import { toggleTest } from 'src/redux/settings/settings.slice';
import { Switch } from 'react-native-elements';

const Hello: React.FC = () => {
  const dispatch = useAppDispatch();
  const isEnabled = useSelector(selectTest);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          dispatch(toggleTest());
        }}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Hello;
