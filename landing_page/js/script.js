'use-strict';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f1a3dd28f2msh166dbf53fa0e95dp10c1f1jsnfaba429a1c08',
		'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
	}
};
const swiperWrapper = document.querySelector('.swiper-wrapper');

   const HtmlTemplate = (book) => {
       return ` 
          <div class="swiper-slide">
             <img src="${book?.published_works[0].cover_art_url}" class="cover-book">
             <h3>${book?.title}</h3>
          </div>
       `
   }
 
    const renderHTML = (books) => {
        let temp = '';

        if(Array.isArray(books)){
            books.map((book, idx) => {
                 temp += HtmlTemplate(book);
            });
        }

        return temp;
    }
 
     const fetchBooks = async () => {
         try {
            const request = await fetch('https://book-finder1.p.rapidapi.com/api/search?series=Wings%20of%20fire&book_type=Fiction&lexile_min=600&lexile_max=800&results_per_page=25&page=1', options);
            const response = await request.json();
            const results = response.results;

            swiperWrapper.innerHTML = renderHTML(results);
         } catch(err) {
           return err;
         }
     }

     let swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

     window.addEventListener('DOMContentLoaded' , fetchBooks);
   