class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all 
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    # def show
    #     pokemon = Pokemon.find_by(id: params[:id]) 
    #     render json: PokemonSerializer.new(pokemon).to_serialized.json
    # end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        new_poke = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: PokemonSerializer.new(new_poke).to_serialized_json
    end

    def destroy
        gone_poke = Pokemon.find_by(id: params[:id])
        gone_poke.destroy
        render json: PokemonSerializer.new(gone_poke).to_serialized_json
    end
end
