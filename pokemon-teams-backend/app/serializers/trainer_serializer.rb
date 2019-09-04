class TrainerSerializer < ActiveModel::Serializer
  attributes :name, :id

  has_many :pokemon
end
