// for categries section

// as dynamic click was n ot working so we added handleCategoryclick for render 

// and still its nort working so we needed to chnage categoriy in url to categoru=${selectedCategory}

/* for further making serachbar serach the news ,we have added
 .searchInput and searchquery useState.
 .and then make url let from const and make4 other url 
 .after that we craeted searchHandle fn.
 .after that we used it in form.

*/

// //note:: to make some thing more interactive button we will take example as .read-more-link:active{
//     transform: translateY(0.1rem);
// }

// jumangi url :   let url=`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=9e9504f434d8714995bd02b8d3d0c25d`
//jumanji other if url : url=`https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=9e9504f434d8714995bd02b8d3d0c25d`

//other url : let url =`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=124f655e9fbb2cd32c749cd7bb42a326`
//other other if url : url =`https://gnews.io/api/v4/search?q={searchQuery&lang=en&apikey=124f655e9fbb2cd32c749cd7bb42a326`


//as bookmarked sections get vanishwed after refreshing.
//so to solve this problem we stored it in local storage
//included localStorage.setItems in handleBookamrksclick section and other new function called " savexdBookamrks"