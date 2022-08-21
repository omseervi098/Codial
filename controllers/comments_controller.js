const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer=require('../mailers/comments_mailer');
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      post.comments.push(comment);
      post.save();
      comment=await (await comment.populate('user', 'name email'));
      commentMailer.newComment(comment);
      if(req.xhr){
        
        return res.status(200).json({
          data:{
            comment:comment
          },
          message:"Comment created !!!"
        })
      }
      req.flash("success", "Comment created !!!");
      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "Error in creating comment");
    console.log(err);
    return;
  }
};
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();
      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      // send the comment id which was deleted back to the views
      if(req.xhr){
        return res.status(200).json({
          data:{
            comment_id:req.params.id
          },
          message:"Comment deleted !!!"
        });
      }
      req.flash("success", "Comment deleted !!!");
      return res.redirect("/");
    } else {
      req.flash("error", "You are not authorized to delete this comment");
      return res.redirect("/");
    }
  } catch (err) {
    req.flash("error", "Error in deleting comment");
    console.log(err);
    return;
  }
};
