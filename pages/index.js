import Head from 'next/head'
import Footer from '../component/footer'
import Header from '../component/header'
import Homepage from '../component/homepage/homepage'
import Layout from '../component/layout'
import SearchForm from '../component/homepage/search-form'
import Header2 from '../component/header2'
import Hero from '../component/hero'

export default function Home() {
  return (
    <div>
      <Head> 
        <title>CI Virtual Classroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header2/>
        <Hero/>
          <Layout>
            <Homepage/>
          </Layout>
        <Footer />
      </main>
    </div>
  )
}
