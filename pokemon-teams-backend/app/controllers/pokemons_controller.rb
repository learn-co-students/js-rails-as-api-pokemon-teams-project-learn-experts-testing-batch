class PokemonsController < ApplicationController

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon, except: [:created_at, :updated_at]
  end

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    if trainer.pokemon.length < 6
      pokemon = trainer.pokemon.new
      pokemon.nickname = Faker::Name.first_name
      pokemon.species = Faker::Games::Pokemon.name
      pokemon.save
      render json: pokemon
    else
      render json: { message: "There are already 6 pokemon on this team!" }
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: pokemon
  end

end
