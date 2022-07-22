import { z } from "zod"

const CLIENT_SECRET = "yG2bQPk3Qt/jk5woSpio25usK70Et/cI78RxEvWIV3BJ3/SdfHKU2CvzYKlzZyI4"
const BASE_URL = "https://cycle.fly.dev/api"

const Location = z.object({
  country: z.string(),
  region: z.string().nullable()
})
export type Location = z.infer<typeof Location>

const Article = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  likes: z.number(),
  inserted_at: z.string().transform((d) => new Date(d)),
  updated_at: z.string().transform((d) => new Date(d)),
  location: Location.nullable()
})
export type Article = z.infer<typeof Article>

export const getArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${BASE_URL}/articles`, {
    headers: {
      secret: CLIENT_SECRET
    }
  })
  const json = await response.json()

  if (!json["data"]) {
    throw Error(json["error"])
  } else {
    const articles = Article.array().parse(json["data"])
    return articles
  }
}
