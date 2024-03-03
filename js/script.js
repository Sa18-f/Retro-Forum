const loadAllPosts = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const data = await res.json();
  const posts = data.posts;
  displayNews(posts);
}
const loadNews = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const posts = data.posts;
    displayNews(posts);
    // data.posts.forEach((post) => {
    //     console.log(post);
    // })
}
const displayNews = (posts) => {
  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';
  posts.forEach(post => {
      const statusBadge = `<div class="absolute top-4 left-20 w-4 h-4 rounded-full ${post.isActive ? 'bg-green-500' : 'bg-red-500'}"></div>`;
      const div = document.createElement('div');
      div.classList = `card card-side bg-base-100 shadow-xl lg:w-[750px]`;
      div.innerHTML = `
      <div class="relative">   
        <img class="ml-4 mt-3 w-20 rounded-full h-20" src="${post.image}" alt="Movie"/>
        ${statusBadge}
      </div>
      <div class="card-body">
        <div class="flex gap-5">
          <p>#<span>${post.category}</span></p>
          <p>Author :  <span>${post.author.name}</span></p>
        </div>
        <h2 class="card-title">${post.title.replace(/'/g,'')}</h2>
        <p>${post.description}</p>
        <hr class="my-3">
        <div class="flex justify-between">
          <div class="flex gap-5">
            <div class="flex gap-1">
              <img class="h-7" src="./images/Group 13.png" alt="">
              <p>${post.comment_count}</p>
            </div>
            <div class="flex gap-1">
              <i class="fas fa-eye mt-1"></i>
              <p>${post.view_count}</p>
            </div>
            <div class="flex gap-1">
              <img class="h-7" src="./images/Group 18.png" alt="">
              <p>${post.posted_time}</p>
            </div>
          </div>
          <button onclick="markAsRead('${post.title.replace(/'/g,'')}', ${post.view_count})" class="bg-[#1cd1005d] rounded-full w-8 h-8"><i class="fa-solid fa-envelope"></i></button>
        </div>
      </div>
      `;
      newsContainer.appendChild(div);
  });
  setTimeout(() => {
    toggleLoadingSpinner(false);
  }, 2000);
}; 
let markAsReadCount = 0;
const markAsRead = (title, view) => {
  markAsReadCount++;
  const markAsReadCountZone = document.getElementById('mark-count');
  markAsReadCountZone.textContent = markAsReadCount;
  const readCountContainer = document.getElementById('read-count-container');
  const div = document.createElement('div');
  div.classList.add('flex', 'justify-between', 'items-center', 'my-3');
  const p = document.createElement('p');
  p.textContent = `${title}`;
  
  const p2 = document.createElement('p');
  const viewIcon = document.createElement('i');
  viewIcon.className = 'fas fa-eye';
  p2.appendChild(viewIcon);
  p2.appendChild(document.createTextNode(` ${view}`));
  div.appendChild(p);
  div.appendChild(p2);
  readCountContainer.appendChild(div);
};

const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadNews(searchText);
}
const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loader-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
}
loadAllPosts();
// loadNews();