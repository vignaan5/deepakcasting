import './App.css';


// Import all images
import cocaCola from './assets/images/cocacola.png';
import dcasting from './assets/images/dcasting.png';
import ModelGrid from './components/grid/ModelGrid';
import Charishma from "./assets/images/charishma.jpg"
import Navbar from './components/navbar/Navbar';
import ModelProfile from './pages/ModelProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModelForm from './pages/ModelForm';



function App() {
  const models = [
    {
      name: "Coca-Cola",
      brand: "Charishma Shrikar",
      imageUrl: Charishma,
      logoUrl: dcasting,
      films: [
        { 
          id: 1, 
          title: "Coca Cola Campaign",
          image: cocaCola
        }
      ]
    },
    {
      name: "Angela for Coca cola",
      brand: "Coca Cola",
      imageUrl: cocaCola,
      logoUrl: dcasting,
      films: [
        { 
          id: 1, 
          title: "Coca Cola Campaign",
          image: cocaCola
        }
      ]
    },
    {
      name: "Angela for Coca cola",
      brand: "Coca Cola",
      imageUrl: cocaCola,
      logoUrl: dcasting,
      films: [
        { 
          id: 1, 
          title: "Coca Cola Campaign",
          image: cocaCola
        }
      ]
    },
    {
      name: "Angela for Coca cola",
      brand: "Coca Cola",
      imageUrl: cocaCola,
      logoUrl: dcasting,
      films: [
        { 
          id: 1, 
          title: "Coca Cola Campaign",
          image: cocaCola
        }
      ]
    },
    {
      name: "Angela for Coca cola",
      brand: "Coca Cola",
      imageUrl: cocaCola,
      logoUrl: dcasting,
      films: [
        { 
          id: 1, 
          title: "Coca Cola Campaign",
          image: cocaCola
        }
      ]
    },
  ];

  const modelData = {
    id: "1", // Add an ID
    personalInfo: {
      fullName: "Charishma Shrikar",
      age: 21,
      city: "Hyderabad",
      physicalAttributes: {
        height: 5.6,
        weight: 51,
        bust: "34",
        waist: "28",
        hips: "34"
      }
    },
    comfortLevel: {
      traditionalWear: true,
      westernWear: true,
      nightWear: true,
      innerWear: false,
      bikini: false,
      semiNude: false,
      nude: false
    },
    photos: [
      Charishma, // Your imported image
      Charishma,
      Charishma
    ]
  };








  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar></Navbar><ModelGrid models={models} /></>} />
        <Route path="/model/:id" element={ <> <Navbar></Navbar> <ModelProfile model={modelData} /> </> } />
        <Route path='/modeldetailsform' element={ <><Navbar/><ModelForm /></>} />
      </Routes>
    </BrowserRouter>
    


   </>
  );
}

export default App;
