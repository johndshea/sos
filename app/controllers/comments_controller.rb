class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.save

     render :json => @comment

  end

  def comment_params
    params.require(:comment).permit(:user_id, :request_id, :user_email, :body)
  end
end
