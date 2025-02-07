import React from 'react'

const NotionBook = () => {
    const [showAlternative, setShowAlternative] = useState<boolean>(false);
    const isItTime = Math.random() < 0.1;

    const handleHover = () => {
        if (isItTime) {
            setShowAlternative(true);
        } else setShowAlternative(false);
    }
  return (
    <div></div>
  )
}

export default NotionBook