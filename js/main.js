//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);
//saving the bookmarks
function saveBookmark(e){
    //get form values using es5
var siteName=document.getElementById('siteName').value;
var siteURL=document.getElementById('siteURL').value;
if(!validateForm(siteName,siteURL)){
    return false;
}

var bookmark= {
    name : siteName,
    url : siteURL,
}
//console.log(bookmark);
/*loacal Storage working
localStorage.setItem('test','hi'); //to set an item into local storage
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
*/
//test if bookmark is null
if(localStorage.getItem('bookmark')===null){
//init array
    var bookmarks=[];
//add to the array
    bookmarks.push(bookmark);
//set to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));//bcoz the result is a json array and we want it to be a string


}
else{
    //get bookmarks from local storage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));//parses string into JSON
    //add bookmark to array
    bookmarks.push('bookmark');
    //re-set it to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
//clear form 
document.getElementById('myForm').reset();














fetchBookmarks();
//prevent form from submitting
e.preventDefault();
}
//delete bookmark
function deleteBookmark(url){
//get bookmarks from localStorage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
//loop through bookmarks
    for(var i=0;i<bookmarks.length;i++){
//remove from array
        if(bookmarks[i].url===url){

             bookmarks.splice(i,1);

        }
    }

 //re-set it to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();

}



//fetch Bookmarks
function fetchBookmarks(){
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarkResults=document.getElementById('bookmarkResults');
    //build output
    bookmarkResults.innerHTML='';
    for(var i=0;i<bookmarks.length;i++){
        var name=bookmarks[i].name;
        var url=bookmarks[i].url;
        bookmarkResults.innerHTML+='<div class="well">'+
        '<h3>'+name+
        
        '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
        '<a onclick="deleteBookmark(\''+url+'\')"   class="btn btn-danger" target="_blank" href="'+"#"+'">Delete</a>'+
        '</h3>'+
        '</div>';

    }
}
function validateForm(siteName,siteURL){
    if(!siteName || !siteURL){
        alert('Please fill in the from');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex)){
        alert('Please add a valid URL');
        return false;
    
    }
    return true;
}