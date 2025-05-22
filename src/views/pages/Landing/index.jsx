import NavBar from "./pages/Navbar"
import Landing from "./pages/Landing"
import Services from "./pages/Services"
import BusinessModel from "./pages/BusinessModel"
import 'src/App.css'
import FAQ from "./pages/FAQ"
import IeoSpecifics from "./pages/IeoSpecifics"
import VestingChart from "./pages/VestingChart"
import Footer from "./pages/Footer"


const MainLayout = () => {

    return <>
    <div className='overflow-x-hidden'>
    <NavBar/>
    <Landing/>
    <div style={{background:"linear-gradient(to right,#3F066D,#0B0691)"}}>
    <Services/>
    </div>
    <BusinessModel/>
    <div style={{background:"linear-gradient(to right,#3F066D,#0B0691)"}}>
    <FAQ/>
    </div>
    <IeoSpecifics/>
    <VestingChart/>
    <div style={{background:"linear-gradient(to left,#3F066D,#0B0691)"}}>
    <Footer/></div>
    

    </div>
    </>
}

export default MainLayout