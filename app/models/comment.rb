class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :request

  # def user_email
  #   return self.user.email
  # end
end
