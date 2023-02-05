$(document).ready(function(){

    async function refreshTweets(){
        const tweets = await axios.get('/post');
        $('.box__img').empty();

        for(let post of tweets.data){
           // var large = '<div class="box__img"><div class="img"></div><div class="tweet"><div class="user__info--tweet"><h4>'+ post.firstname+ ' ' + post.lastname  + '</h4><small>@'+ post.postedBy + '</small></div><p>'+ post.content+'</p></div></div>';
           const large = createPostHtml(post); 
           $('#center__area').append(large);

           const comm = await axios.get(`/comment/${post._id}`);
           console.log(comm.data);

           for(let curr of comm.data){
            const timestamp = timeDifference(new Date(), new Date(curr.createdAt));
            const bottomComments = ` <div style=" background-color: #F5F5F5;" class="box__img">
            <div class="img">
            <img  style=" height:50px; width=50px; border-radius: 40px;"src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></img>
            </div>
            <div class="tweet">
                <div class="user__info--tweet">
                    <h4>${curr.postedBy}</h4>
                    <small>${timestamp}</small>
                </div>
                <p>${curr.content} </p>
            </div>
        </div>`;

        $('#center__area').append(bottomComments);

           }
        }

        
    }

    refreshTweets();

    $('.tweet__btn').on('click', async function(){
        console.log('tweet pressed');
        const postText = $('#content').val();
        const newPost = await axios.post('/post',{content:postText});
    });


// like feature
    $(document).on('click','.likeButton',async(event)=>{      //do this
        const button = $(event.target);
        const postId = getPostIdFromElement(button);
        console.log(postId);
        const postData=await axios.patch(`/posts/${postId}/like`);
        button.find("span").text(postData.data.likes.length);
        
    })



    function getPostIdFromElement(element){

        const isRoot = element.hasClass('box__img');
    
        const rootElement = isRoot ===true ? element:element.closest('.box__img');
        const postId = rootElement.data().id;
        return postId;
    }


    function createPostHtml(postData){

        const postedBy = postData.postedBy;

        if(postedBy._id === undefined){
            console.log("User object not populated ifel");
        }   

        const displayName = postedBy.firstName + " " + postedBy.lastName;
        const content = postData.content;
        const timestamp = timeDifference(new Date(), new Date(postData.createdAt));
        const displayUName = postedBy.username +" " +timestamp;
        

        return '<div class="box__img" data-id='+ postData._id+'> <div class="img"> <img  style=" height:50px; width=50px; border-radius: 40px;"src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"></img> </div><div class="tweet"><div class="user__info--tweet"><h4> <a href="/profile/'+ postedBy.username +'">'+ displayName + '</a></h4><small>&nbsp @'+ displayUName + '</small></div><p>'+ content+'</p></div> <div class="postFooter"><div class="postButtonContainer"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-comment"></i></button></div><div class="postButtonContainer green"><button class="retweet"><i class="fas fa-retweet"></i></button></div><div class="postButtonContainer red"><button class="likeButton"><i class="far fa-heart"></i> <span>' + postData.likes.length +'</span> </button></div></div>  <form id="f1" action="/addcomment/'+ postData._id +'/'+ postedBy.username+'" method="POST"><input type="text" name="content" id="coo" placeholder="Add comment" ><button type="submit">Add comment</button></form> </div>';
          
    }
    


    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            if(elapsed/1000 < 30){  //changed this
                return 'just now'
            }
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return  Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return  Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return  Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }
    

});