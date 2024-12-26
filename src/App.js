import './App.css';


// Import all images
import cocaCola from './assets/images/cocacola.png';
import dcasting from './assets/images/dcasting.png';
import ModelGrid from './components/grid/ModelGrid';
import Charishma from "./assets/images/charishma.jpg"



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

  return (
   <>
   <ModelGrid models={models} />
   </>
  );
}

export default App;
