$(document).ready(function(){
    console.log("login.js");

    $('#cross').on('click',function(){
      console.log("cross pressed");
      $('.popUp').removeClass('show');
      $('.signpopUp').removeClass('show');
    })

    $('#signcross').on('click',function(){
      console.log("signIn cross pressed");
      $('.popUp').removeClass('show');
      $('.signpopUp').removeClass('show');
    })

    $('#showpop').on('click',function(){
        console.log("Showpop pressed");
        $('.popUp').addClass('show');
        $('.signpopUp').removeClass('show');
    })

    $('#showsignin').on('click',function(){
      console.log("SignIn / LogIn pressed");
      $('.popUp').removeClass('show');
      $('.signpopUp').addClass('show');
  })
})