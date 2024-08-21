import { useState, useEffect} from 'react';

export default function useMousePosition() {
    
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    let clientScrollY = 0;
    let totalScrollY = 0;

    const updateMousePosition = (e) => {
        setMousePosition({x: e.clientX-20 , y: totalScrollY-20});
        //                           -20              -900
    }

    
    
    

    useEffect ( () => {
        function updateTotalScrollY(){
            totalScrollY = window.scrollY + clientScrollY;
        //   console.log(totalScrollY);
        }
        
        document.addEventListener('mousemove', (e1) => {
            clientScrollY = e1.clientY;
            updateTotalScrollY();
            document.addEventListener('mousemove', updateMousePosition)
            return () => {
                document.removeEventListener("mousemove", updateMousePosition)
            }
        })
        document.addEventListener('scroll', (e) => {
            updateTotalScrollY();
        })
    },[])

    return mousePosition;
}