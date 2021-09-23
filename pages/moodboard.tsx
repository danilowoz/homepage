import PageTransition from 'components/page-transition';
import PageTitle from 'components/page-title';
import { Dropmark } from 'types/dropmark';
import Head from 'next/head';
import useSWR from 'swr';

function Moodboard() {
  const { data, error, isValidating } = useSWR('/api/moodboard', {
    revalidateOnFocus: false,
  });

  if (isValidating) {
    return <div>Loading</div>;
  }

  if (!isValidating && error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 gap-8">
      {data.map((item: Dropmark) => {
        return (
          <div key={item.id} className="mb-8">
            <img
              src={item.content}
              width={item.metadata.width}
              height={item.metadata.height}
            />
          </div>
        );
      })}
    </div>
  );
}

function MoodboardPage() {
  return (
    <PageTransition>
      <Head>
        <title>Moodboard - Adem ilter</title>
      </Head>

      <div className="c-small">
        <PageTitle>
          İyi tasarlanmış ürünleri incelemekten aşırı keyif alırım. Bu tür
          ürünlerde gördüğüm küçük ama tatlı detayların ekran görüntülerini
          toplayarak ilham olabilecek bir koleksiyon oluşturuyorum.
        </PageTitle>
      </div>

      <div className="c-large mt-20">
        <Moodboard />
      </div>
    </PageTransition>
  );
}

// export async function getStaticProps() {
//   const items: [Dropmark] = await getDropmark();
//
//   return {
//     props: {
//       items,
//     },
//     // revalidate: 7200,
//   };
// }

export default MoodboardPage;
