class User < ActiveRecord::Base
  authenticates_with_sorcery!

  has_many :requests
  has_many :user_skills
  has_many :skills, through: :user_skills
  has_many :comments
end
