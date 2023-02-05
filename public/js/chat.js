console.log("chat page");
const socket = io();

async function loadMsgs(){
    let allMsgs = await axios.get('/allmessages');
    console.log(allMsgs);

    for(let msg of allMsgs.data){
        const timestamp = timeDifference(new Date(), new Date(msg.createdAt));
        $('#center__area').append(
            ` <div class="box__img">
                    <div class="img">
                    <img  style=" height:50px; width=50px; border-radius: 40px;"src="https://uybor.uz/borless/uybor/img/user-images/user_no_photo_600x600.png"></img></div>
                    <div class="tweet">
                        <div class="user__info--tweet">
                            <h4>${msg.user}</h4>
                            <small>&nbsp &nbsp &nbsp ${timestamp}</small>
                        </div>
                        <p>${msg.content} </p>
                    </div>
                </div>`
        )
    }


}

loadMsgs();

$('#send-msg-btn').click(()=>{
    const textMsg = $('#msg-text').val();

    socket.emit("send-msg",{
        user:currentUser,
        msg:textMsg,
    })

    $('#msg-text').val("");
});


socket.on("recived-msg" , (data)=>{

    // $('#all-msg-container').append(
    //     `<li>
    //         <span>${data.user} </span>
    //         <span>${data.createdAt} <span>
    //         <p>${data.msg}</p>
    //     </li>`
    // )
    const timestamp = timeDifference(new Date(), new Date(data.createdAt));
    $('#center__area').append(
        ` <div class="box__img">
                <div class="img"></div>
                <div class="tweet">
                    <div class="user__info--tweet">
                        <h4>${data.user}</h4>
                        <small>${timestamp}</small>
                    </div>
                    <p>${data.msg} </p>
                </div>
            </div>`
    )


});





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