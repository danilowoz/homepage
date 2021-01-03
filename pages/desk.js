import Head from 'next/head'
import Layout from '@comp/layout'
import { getTable } from '@lib/airtable'
import { Chakra } from '../chakra'
import {
  Image,
  Text,
  Heading,
  AspectRatio,
  Container,
  Grid,
  GridItem
} from '@chakra-ui/react'

function DeskPage({ cover, data }) {
  return (
    <Chakra>
      <Layout>
        <Head>
          <title>Masam</title>
        </Head>

        <Container maxW="2xl">
          <Text fontSize="2xl">
            İnternette gezinirken beğendiğim şeylerin küçük bir listesi. Beni
            takip edenlerin de beğeneceğini düşündüğüm, belli bir kategorisi
            olmayan karışık şeyler.
          </Text>
        </Container>

        {cover.length > 0 && (
          <Container maxW="6xl" mt={20}>
            <Image
              src={cover[0].Photo[0].thumbnails.full.url}
              alt={cover[0].Name}
            />
          </Container>
        )}

        <Container maxW="6xl" mt={20}>
          <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr' }} gap={8}>
            {data.map((item) => {
              return (
                <GridItem key={item._id}>
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src={item.Photo[0].thumbnails.full.url}
                      alt={item.Name}
                      objectFit="cover"
                    />
                  </AspectRatio>
                  <a href={item.Url}>
                    <Text>{item.Name}</Text>
                    <Text>{item.Description}</Text>
                  </a>
                </GridItem>
              )
            })}
          </Grid>
        </Container>
      </Layout>
    </Chakra>
  )
}

export async function getStaticProps() {
  const data = await getTable('Gear')

  const cover = data.filter((o) => o.Category === 'Cover')
  const general = data.filter((o) => o.Category === 'General')
  const home = data.filter((o) => o.Category === 'Home')

  return {
    props: {
      cover,
      data: [...general, ...home]
    },
    revalidate: 600
  }
}

export default DeskPage
