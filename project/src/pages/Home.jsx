import HeroSection from '../components/HeroSection'
import FeaturedCars from '../components/FeaturedCars'
import Navbar from '../components/Navbar'
function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedCars />
    </main>
  )
}

export default Home