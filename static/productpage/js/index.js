$(document).ready(function(){
var data,ownerName;
var users,currentUser;
//get all user information 
var category="";
var categoryList={
    1:"",
    2:"gadg",
    3:"comp",
    4:"anti",
    5:"phon",
    6:"misc",
    
};


console.log(categoryList[1]);
function getusers()
{
$.ajax({url: "rest/users/?format=json", success: function(result){
    users= result;
    console.log(result);
    
    

 },complete:function()
 {
    //do nothing 
 },
 
 });
} 
    
   
//get products  
function getproductinfo()
{
    console.log("category :",category);
    $.ajax({url: "/product/rest/products/?id=&itemname=&owner=&status=0&buyer=&category="+category, success: function(result){
        data= result;
        console.log(result);
        $('#users').html('');
        

    },complete:function()
    {
        refresh();
        printResult();
        if(data.length==0)
        {
            $("#products-list").html("")
            $("#products-list").append('<h1>There are currently no products</h1>');
        }
    },
    
    });

}

//function to change owner from url to name
function refresh()
{
   for(var key in data)
   {
        for(var x in users)
        {
            if(data[key].owner == users[x].url)
            {
                data[key].owner = users[x].username
            }
        } 
   }
    
}
//Append products to html
function printResult()
{

    $('#products-list').html('');
    for(var key in data)
    {
          

          $("#products-list").append('<div class="col-xs-6 col-lg-4" style=""><div class="card " style="width:225x;"><img class="card-img-top " style=" object-fit: cover;width:225px;margin:0 auto;" src="'+data[key].image+'" alt="Card image"><div class="card-body"><h4 class="card-title">'+data[key].itemname +'</h4><p class="card-text">'+data[key].description +'</p><a href ="'+data[key].id+'/'+'">go to link</a></div></div></div>');
    }
}
    getusers();
    getproductinfo();
    setInterval(getproductinfo, 5000);
    setInterval(getusers,15000);


   //select category
   $("#myselect").change(function(){

    var selectedOption = $("option:selected").val();
    //alert("You have selected the option - " + categoryList[selectedOption]);
    category=categoryList[selectedOption];
    console.log("category :",category);
    getproductinfo();

});
});