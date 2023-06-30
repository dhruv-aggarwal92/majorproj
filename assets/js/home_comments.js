class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#new-${postId}-comment-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
    }

    createComment(postId){
        console.log('2345678')
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<p id="comment-${ comment._id}">
                    <small>
                        <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
                    </small>
                    ${ comment.content }
                    <br>
                    ${ comment.user.name }
                    <small>
                            
                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                        0 Likes
                    </a>
                
                    </small> 
                </p>`)
    }

    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
}


// {
//     let createcomment = function(){
//         let newcommentform = $(`#new-${postd}-comment-form`)
//         newcommentform.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type:'post',
//                 url:'/comments/create',
//                 data: newcommentform.serialize(),
//                 success: function(data){
//                     let newCom = newComDom(data.data.comment);
//                     $(`#post-comments-${data.data.post._id}`).prepend(newCom)
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }
//     let newComDom=function(comment){
//         return $(`<p id="comment-${ comment._id}">
//                     <small>
//                         <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
//                     </small>
//                     ${ comment.content }
//                     <br>
//                     ${ comment.user.name } 
//                 </p>`)
//     }

//     createcomment()
// }