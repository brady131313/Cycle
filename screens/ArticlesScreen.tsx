import { StyleSheet } from 'react-native';
import ArticleList from '../components/ArticleList';

import { Text, View } from '../components/Themed';

export default function ArticlesScreen() {
  return (
    <View style={styles.container}>
      <ArticleList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
