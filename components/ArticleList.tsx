import { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Article, getArticles } from "../api/cycle";
import { Tag } from "./Tag";
import { Text, View } from "./Themed";

const hostname = (url: string) => {
  const parsed = new URL(url)
  return parsed.hostname
}

const Item = ({ title, url, likes, location }: Article) => (
  <View style={styles.hContainer}>
    <Text style={styles.likes}>{likes}</Text>
    <View style={styles.vContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.url}>{hostname(url)}</Text>
      {location &&
        <View style={styles.locationContainer}>
          <Tag title={location.country} />

          {location.region &&
            <Tag title={location.region} style={styles.region} />
          }
        </View>
      }
    </View>
  </View>
)

const styles = StyleSheet.create({
  likes: {
    fontSize: 18,
    width: 32,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flexShrink: 1
  },
  url: {
    fontSize: 12,
    marginTop: 4,
  },
  locationContainer: {
    marginTop: 10,
    flexDirection: 'row'
  },
  region: {
    marginLeft: 8,
    fontSize: 14
  },
  vContainer: {
    paddingVertical: 10,
    marginHorizontal: 12,
  },
  hContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  }
})

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
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

  const renderItem: ListRenderItem<Article> = ({ item }) => (
    <Item {...item} />
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
