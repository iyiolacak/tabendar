import { useState } from "react"

const useEasterEgg = (probability: number) => {
    const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false)
    
    const handleGiveItAChance = () => {
        if(Math.random() < probability) {
            setShowEasterEgg(true);
        } else setShowEasterEgg(false);
    }
    return { showEasterEgg, handleGiveItAChance}
}
export default useEasterEgg