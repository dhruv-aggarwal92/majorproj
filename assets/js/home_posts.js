// {
//     //methord to submit the form data for new post using AJAX
//     let createPost = function(){
//         let newPostForm = $('#new-post-form');
//         newPostForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url:'/posts/create',
//                 data: newPostForm.serialize(),     //convert post form data into json content being the key  value filled in the form
//                 success: function(data){
//                     let newPost = newPostDom(data.data.post,data.data.name);           //need to check what is inside data i.e where the post is, through console 
//                     $('#posts-list-container').prepend(newPost)         //$('#posts-list-container>ul').prepend(newPost)  if inside some tag
//                     deletePost($(' .delete-post-button',newPost))
//                     new PostComments(data.data.post._id);

//                     new Noty({
//                         theme: 'relax',
//                         text:'<%= flash.success%>',
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
//                    }).show();
//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }
    
//     //methord to creat a post in DOM
//     let newPostDom = function(post,name){                              //we use `` for interpolating strings  also remember that put _id only id won't work in ajax req
//             return $(`<li id="post-${post._id}">             
//                         <hr>
//                         <p>
//                                 <small>
//                                     <a class='delete-post-button' href="/posts/destroy/${ post._id }">X</a>
//                                 </small>
//                             <ul id="li">
//                                 <li>${ name }</li>  
//                                 <li>${ post.content }</li>
//                                 <ul>
//                                 <div class="post-comments">   
//                                         <form action="/comments/create" id="new-comment-form" method="POST">
//                                             <input type="text" name="content" cols="30" rows="1" placeholder="Your thoughts" required>
//                                             <input type="hidden" name="post" value="${ post._id }">
//                                             <input type="submit" value="Post">
//                                         </form>
                                                    
//                                     <div id="post-comments-list">
                                                        
//                                         <ul id="post-commets-${post._id}">            <!--   A little diffrent from somthin we are doing  -->
                                            
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 </ul>
//                             </ul>
//                         </p>
//                     </li>`)                  
//     }



//     //methord to delete apost from DOM
//     let deletePost = function(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),

//                 success: function(data){
//                     console.log(data.data.post_id)
                    
//                     $(`#post-${data.data.post_id}`).remove();
//                     new Noty({
//                         theme: 'relax',
//                         text:'<%= flash.success%>',
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
//                    }).show();
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }

//     // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
//     let convertPostsToAjax = function(){
//         $('#posts-list-container>li').each(function(){
//             let self = $(this);
//             let deleteButton = $(' .delete-post-button', self);
//             deletePost(deleteButton);

//             // get the post's id by splitting the id attribute
//             let postId = self.prop('id').split("-")[1]
//             new PostComments(postId);
//         });
//     }



//     createPost();
//     convertPostsToAjax();
// }           