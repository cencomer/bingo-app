import React, { useState, useEffect } from 'react';
import './App.css'; // Importa el archivo de estilos de Tailwind CSS

function App() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [numbersSelected, setNumbersSelected] = useState([]);
  const [numbersMarked, setNumbersMarked] = useState([]);

  useEffect(() => {
    const savedNumbers = localStorage.getItem('numbersSelected');
    const savedMarks = localStorage.getItem('numbersMarked');
    if (savedNumbers) {
      setNumbersSelected(JSON.parse(savedNumbers));
    }
    if (savedMarks) {
      setNumbersMarked(JSON.parse(savedMarks));
    }
  }, []);

  const selectRandomNumber = () => {
    const remainingNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(num => !numbersSelected.includes(num));
    const randomNumber = remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
    setSelectedNumber(randomNumber);
    const updatedSelectedNumbers = [...numbersSelected, randomNumber];
    setNumbersSelected(updatedSelectedNumbers);
    markNumber(randomNumber);
    localStorage.setItem('numbersSelected', JSON.stringify(updatedSelectedNumbers));
    playBingoSound();
  };

  const markNumber = (number) => {
    if (!numbersMarked.includes(number)) {
      const updatedMarkedNumbers = [...numbersMarked, number];
      setNumbersMarked(updatedMarkedNumbers);
      localStorage.setItem('numbersMarked', JSON.stringify(updatedMarkedNumbers));
    }
  };

  /* const toggleNumberMarking = (number) => {
    if (numbersMarked.includes(number)) {
      const updatedMarkedNumbers = numbersMarked.filter(num => num !== number);
      setNumbersMarked(updatedMarkedNumbers);
      localStorage.setItem('numbersMarked', JSON.stringify(updatedMarkedNumbers));
    } else {
      const updatedMarkedNumbers = [...numbersMarked, number];
      setNumbersMarked(updatedMarkedNumbers);
      localStorage.setItem('numbersMarked', JSON.stringify(updatedMarkedNumbers));
    }
  }; */

  const clearLocalStorage = () => {
    localStorage.removeItem('numbersSelected');
    localStorage.removeItem('numbersMarked');
    setNumbersSelected([]);
    setNumbersMarked([]);
  };

  const toggleFullScreen = () => {
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen();
    }
  };

  const playBingoSound = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/bingo-sound.mp3`);
    audio.play();
  };

  return (
    <div className="container mx-auto mt-10 w-full h-screen">
      <h1 className="text-3xl lg:text-6xl font-black text-center mt-2 md:mt-16 mb-8 border p-4 rounded-lg shadow-md">Sorteo de Bingo</h1>
      <div className='md:flex md:flex-row w-full'>
        <div className='mx-auto p-2 md:p-0 md:w-2/3'>

          <div className="grid grid-cols-6 lg:grid-cols-8 gap-2 h-full overflow-y-auto w-full text-xl md:text-4xl text-center">
            {Array.from({ length: 75 }, (_, i) => i + 1).map(number => (
              <div key={number} className={`bg-gray-200 rounded-md p-3 ${numbersMarked.includes(number) ? 'bg-green-500 text-white' : ''}`} 
              /* onClick={() => toggleNumberMarking(number)} */
              >
                {number}
              </div>
            ))}
          </div>
        </div>
        <div className="border p-4 md:p-12 md:ml-8 rounded-xl shadow-md w-full md:w-1/3 flex flex-col justify-between">
          <div className='flex flex-col items-center'>
            <div className='text-center font-black text-9xl p-8 bg-white rounded-lg shadow-2xl'>{selectedNumber}</div>
            <span className="text-md font-bold text-center mt-6 mb-12">Número actual</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-4 w-full text-3xl" onClick={selectRandomNumber}>
            Sortear Número
          </button>
          
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-full" onClick={toggleFullScreen}>
            Pantalla Completa
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-12 w-full" onClick={clearLocalStorage}>
            Reiniciar juego
          </button>
        <p className='text-center text-xs md:text-md mt-4'>Parroquia.co Hecho con amor en Cencomer.com</p>
        </div>
      </div>
    </div>
  );
}

export default App;
