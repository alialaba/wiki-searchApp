const searchMatch = async(e) => {
    //preventing the form from loading when form submitted
    e.preventDefault();
    const inputValue = document.querySelector('.search-input').value;
    //trim is used to prevent whitespace
    const searchInput = inputValue.trim()

    const searchResults = document.querySelector('.js-search-match');
    // clear previous results
    searchResults.innerHTML = "";

    const spinner = document.querySelector('.js-spinner');
    spinner.classList.remove('hidden');

    try {
        const results = await searchWiki(searchInput);

        //query, searchinfoand totalhits are all the arrays of the url API;

        if (results.query.searchinfo.totalhits === 0) {
            alert('No results found. Try different keywords')
            return;
        }
        displaySearch(results)
    } catch (error) {
        alert('failed to search wikipedia')
        console.log(error);
    } finally {
        spinner.classList.add('hidden');
    }

}


const searchWiki = async(searchInput) => {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchInput}`;
    const res = await fetch(endpoint);
    if (!res) {
        throw error(res.showText);
    }
    const json = await res.json()
    return json;
}

//query, search,pageid,snippet and title are all the arrays of the url API;
const displaySearch = (results) => {

    const searchResults = document.querySelector('.js-search-match')
    results.query.search.forEach(result => {
        const URL = `https://en.wikipedia.org/?curid=${result.pageid}`;
        //This will be inserted into  section of js-search-match
        searchResults.insertAdjacentHTML(
            //The insertAdjacentHTML() method of the Element interface parses the specified text as HTML or XML
            // and inserts the resulting nodes into the DOM tree at a specified position(beforebegin, afterbegin, beforeend,afterend)
            'beforeend',
            `<div class="result-item">
             <h3>
             <a href="${URL}" target="_blank" rel="noopener">${result.title}</a>
             </h3>
             <a href="${URL}" target="_blank" rel="noopener" class="result-link">${URL}</a>
             <span class="result-snippet">${result.snippet}</span><be>
             </div>`
        )
    })


}
const form = document.querySelector('.form');
form.addEventListener('submit', searchMatch);