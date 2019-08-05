/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
//  Defines the list of students to be used as well as how many should show on a page
const studentList = document.getElementsByClassName('student-item');
const studentsPerPage = 10;

// Used multiple times by searchFunction() and showPage()
const page = document.querySelector('.page');


/**
 * Dynamically creates the search function and appends it to the top of the page
 * 
 * After I submit the project, I will create a function to make this clearer to read
 */ 
const pageHeader = document.querySelector('.page-header');
const studentSearchDiv = document.createElement('div');
studentSearchDiv.className = ('student-search');
const searchInput = document.createElement('input');
searchInput.placeholder = 'Search for students...'; 
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
studentSearchDiv.appendChild(searchInput);
studentSearchDiv.appendChild(searchButton);
pageHeader.appendChild(studentSearchDiv);


/**
 *  There is definetly a better way to add these, but this is the error 
 *  that will be displayed to the user when there are no results with the search
 */
const studentListDiv = document.querySelector('.student-list');
const noResults = document.createElement('p');
noResults.textContent = 'There are no results';
studentListDiv.appendChild(noResults);
noResults.style.display = 'none';



/***
 *   searchFunction() 
 * 
 *   Creates an empty array and defines the links at the bottom of the screen
 *   Then loops through the student list and checks if it contains the searched words
 *   It will hide any students that aren't searched for, while storing those that are
 *   
 *   It then deletes the current pagination links and re-runs appendPageLinks() and showPage() 
 *   with the current students searched for in searchNames[]
 * 
 *   It will also hide/unhide the no results error that was created above
 * 
 */

const searchFunction = () =>{
   let searchNames = [];
   const bottomLinks = document.querySelector('.pagination');
   for (let i = 0; i < studentList.length; i++){
      const detailsDiv = studentList[i].firstElementChild;
      const name = detailsDiv.children[1].innerHTML; 
      const search = searchInput.value;
      
      if (name.includes(search)) {
         studentList[i].style.display = '';
         searchNames.push(studentList[i]);
      } else {
         studentList[i].style.display = 'none';
      }
   }

   if (searchNames.length > 0){
      noResults.style.display = 'none';
      page.removeChild(bottomLinks);
      appendPageLinks(searchNames);
      showPage(searchNames, 1);
   } else {
      noResults.style.display = '';
      page.removeChild(bottomLinks);
      appendPageLinks(searchNames);
   }

}


// The event listeners for either the button, or the input box
searchInput.addEventListener('keyup', ()=> {
   searchFunction();
});

searchButton.addEventListener('click', ()=> {
   searchFunction();
});



/**
 * showPage() - Dynamically lists students in real time
 *  @param list - the list of students to iterate over
 *  @param page - the current page of students to display on the screen
 * 
 *  showPage() will figure out where to start and where to end showing students on a screen
 *  keeping in mind the studentsPerPage value set in global. It takes into account 
 *  the first user at postion 0 
 */
const showPage = (list, page) => {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = (page * studentsPerPage);

   for (let i = 0; i < list.length; i++){
      let li = list[i]
      if (i >= startIndex && i < endIndex){
         li.style.display = '';
      } else {
         li.style.display = 'none';
      }
   }
}



/**
 *  appendPageLinks() - Dynamically adds links to the bottom of the page to break the list into multiple pages
 * 
 *   @param list - the list of students to iterate over 
 * 
 *  first, the function will check for how many pages will be needed including non-complete pages (ex: 54 students with 10 per page)
 *  then it will create a section to add all of the links and will listen for them to be clicked
 * 
 *  once a link is clicked, the function will call showPage() to have the correct users show on the screen
 */
const appendPageLinks = (list) => {
   let pagesNeeded = (list.length / studentsPerPage)
   if (pagesNeeded % 1 != 0){ pagesNeeded +=1; }
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   div.className = 'pagination'; 
   page.appendChild(div);
   div.appendChild(ul);

   for (let i = 1; i < pagesNeeded; i++){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i; 
      ul.appendChild(li);
      li.appendChild(a);
   }


   div.addEventListener('click', (e)=> {
      if (e.target.tagName === 'A'){
         const page = e.target;
         const number = page.textContent;
         const links = document.getElementsByTagName('a');
         for (let i=0; i < links.length; i++){
            links[i].className = '';
         }

         page.className = 'active';
         
         showPage(list, number);
      }
   });
}

// starts the page with the first page of students showing
showPage(studentList, 1);
appendPageLinks(studentList);


