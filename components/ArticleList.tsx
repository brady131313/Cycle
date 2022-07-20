import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getArticles } from "../api/cycle";
import { Text, View } from "./Themed";

const Item = ({title}) => (
  <View>
    <Text>{title}</Text>
  </View>
)

export default function ArticleList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  const loadArticles = async () => {
    try {
      setLoading(true)
      const fetched = await getArticles()
      setArticles(fetched)
    } catch (error) {
      console.error("Fetching articles", error)
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  )

  useEffect(() => {
    loadArticles()
  }, [])

  return (
    <View>
      <FlatList
        data={articles}
        renderItem={renderItem}
        onRefresh={loadArticles}
        refreshing={loading}
      />
    </View>
  )
}
