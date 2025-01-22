import PlaceholderImage from "../assets/images/placeholder.png"

export default function validateImage(image) {
    return new Promise((resolve) => {
        if (image) {
            const img = new Image()
            img.src = image

            img.onload = () => resolve(image)
            img.onerror = () => resolve(PlaceholderImage)
        } else {
            resolve(PlaceholderImage)
        }
    })
}