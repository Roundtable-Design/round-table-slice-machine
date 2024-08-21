import { useState, useEffect} from 'react';

export default function useMousePosition() {
    
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});

    let clientScrollY = 0;
    let totalScrollY = 0;

    const updateMousePosition = (e) => {
        setMousePosition({x: e.clientX , y: totalScrollY});
    }

    useEffect ( () => {
        function updateTotalScrollY(){
            totalScrollY = window.scrollY + clientScrollY;
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