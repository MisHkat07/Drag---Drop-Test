const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

let colorId;
let colorArray = [];

draggables.forEach(draggable => {

  // Dragging Start Point
  draggable.addEventListener('dragstart', () => {
    colorId = draggable.id;

    draggable.classList.add('dragging');
  });

  // Dreagging End Point
  draggable.addEventListener('dragend', () => {

    draggable.classList.remove('dragging');

  });


  containers.forEach(container => {
    container.addEventListener('dragover', () => {
        
      let endPointContainerColors = [...container.querySelectorAll('.draggable:not(.dragging)')];
  
      endPointContainerColors.forEach(child => {
        // Containing End point Container's existed colors.
        colorArray.push(child.id);
      });

      for (let i = 0; i < colorArray.length; i++) {
        if (colorArray.includes(colorId)) {
          draggable.classList.remove('dragging');
          
        }        
      }
      colorArray = [];
    });

  });
})


containers.forEach(container => {

  container.addEventListener('dragover', e => {
    // Enabling Dropping
    e.preventDefault()
    
    // Detetcing container according to the position of Y axis through cursor
    const afterElement = getDragAfterElement(container, e.clientY)
    
    // Assigning that dragging element
    const currentlyDragging = document.querySelector('.dragging')

    if (afterElement == null) {
      // Appending to the container that the element is dragging on
         container.appendChild(currentlyDragging);
    } else {
      container.insertBefore(currentlyDragging, afterElement)
    }
  })
})


function getDragAfterElement(container, y) {
  // So that the dragging element doesn't count itself as one of the existed element
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  // That will define the closest element to drop on
  return draggableElements.reduce((closest, child) => {
    // Mouse hover rectangle
    const box = child.getBoundingClientRect()

    // Distance between the mouse box and the center of the element
    const offset = y - box.top - box.height / 2

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element //to define Most closest element's axis
}