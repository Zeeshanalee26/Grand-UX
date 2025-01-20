document.addEventListener('DOMContentLoaded', function() {
  const capabilityGroups = document.querySelectorAll('.capability-group');
  
  capabilityGroups.forEach(group => {
    const header = group.querySelector('.capability-header');
    const list = group.querySelector('.capability-list');
    
    header.addEventListener('click', () => {
      const isActive = group.classList.contains('active');
      
      capabilityGroups.forEach(otherGroup => {
        if (otherGroup !== group && otherGroup.classList.contains('active')) {
          otherGroup.classList.remove('active');
          const otherList = otherGroup.querySelector('.capability-list');
          otherList.style.maxHeight = '0';
          otherList.style.visibility = 'hidden';
          otherList.style.opacity = '0';
        }
      });
      
      if (!isActive) {
        group.classList.add('active');
        requestAnimationFrame(() => {
          list.style.visibility = 'visible';
          list.style.opacity = '1';
          list.style.maxHeight = '2000px';
        });
      } else {
        group.classList.remove('active');
        list.style.maxHeight = '0';
        list.style.visibility = 'hidden';
        list.style.opacity = '0';
      }
    });
  });
  
  if (capabilityGroups.length > 0) {
    const firstGroup = capabilityGroups[0];
    const firstList = firstGroup.querySelector('.capability-list');
    
    firstGroup.classList.add('active');
    requestAnimationFrame(() => {
      firstList.style.visibility = 'visible';
      firstList.style.opacity = '1';
      firstList.style.maxHeight = '2000px';
    });
  }
});