const slidesWrapper = document.querySelector('[data-js="slides-wrapper"]')
const slides = document.querySelectorAll('[data-slide]')

const navigatorButtons = document.querySelector('[data-js="buttons-wrapper"]')

const hideSlides = () => {

    Array.prototype.forEach.call([...slidesWrapper.children], 
        (children) => children.style.display = 'none')
}

const showCurrentSlide = (index) => slides[index].style.display = 'block'

window.addEventListener('DOMContentLoaded', () => {

    hideSlides()
    document.querySelector('[data-slide]').style.display = 'block'

})

const indexControl = () => {

    let indexObj = {
        currentIndex: 0
    }

    let indexObjProto = {
        getCurrentIndex: function() {
            return indexObj.currentIndex
        },
        setCurrentIndex: function(amount) {
            return indexObj.currentIndex = amount
        }
    }

    Object.setPrototypeOf(indexObj, indexObjProto)
    return indexObj

}

const indexCtrl = indexControl()
const { getCurrentIndex, setCurrentIndex } = indexCtrl

const handleNextSlide = () => {
    
    hideSlides()
    const currentSlide = getCurrentIndex() === slides.length - 1 
        ? setCurrentIndex(0)
        : setCurrentIndex(getCurrentIndex() + 1)

    showCurrentSlide(currentSlide)
}

const handlePreviousSlide = () => {

    hideSlides()
    const currentSlide = getCurrentIndex() === 0 
        ? setCurrentIndex(slides.length - 1) 
        : setCurrentIndex(getCurrentIndex() - 1)
    showCurrentSlide(currentSlide)
}

navigatorButtons.addEventListener('click', (event) => {
    
    const targetClicked = event.target
    const datasetTargetClicked = targetClicked.dataset
    const buttonClicked = datasetTargetClicked.button

    switch(buttonClicked) {
        case 'next': 
            handleNextSlide()
            break
        case 'previous':
            handlePreviousSlide()
            break
    }
})