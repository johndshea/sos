json.array!(@requests) do |request|

  json.id            request.id
  json.name          request.name
  json.description   request.description
  json.skills        request.skills
  json.skill_list    request.skill_list
  json.lat           request.lat
  json.lng           request.lng

  if request.user
    json.user_id       request.user.id
    json.email         request.user.email
  end

  if request.comments
    json.comments       request.comments
  end

  json.url           request_url(request, format: :json)

  # json.extract! request, :id, :name, :description, :skills, :skill_list, :lat, :lng
  # if request.user
  #   json.extract! request.user, :email
  # end

end
