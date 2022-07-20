const CLIENT_SECRET = "yG2bQPk3Qt/jk5woSpio25usK70Et/cI78RxEvWIV3BJ3/SdfHKU2CvzYKlzZyI4"
const BASE_URL = "https://cycle.fly.dev/api"

export const getArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles`, {
    headers: {
      secret: CLIENT_SECRET
    }
  })
  const json = await response.json()

  if (!json["data"]) {
    throw Error(json["error"])
  } else {
    return json["data"]
  }
}
