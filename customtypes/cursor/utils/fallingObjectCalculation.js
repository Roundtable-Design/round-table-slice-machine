import { useState, useEffect} from 'react';

export default function fallingObjectCalculation() {
    
    const [ fallingObjectAppear, setFallingObjectAppear ] = useState(false);

  


  useEffect(() => {
      window.addEventListener("click", () => {
      setFallingObjectAppear(true)
      setTimeout(() => setFallingObjectAppear(false), 5000)
      
      })
  

  })

    return fallingObjectAppear;
}