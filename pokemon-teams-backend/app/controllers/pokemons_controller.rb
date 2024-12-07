class PokemonsController < ApplicationController
  #create and destroy actions
  #show? new?
  def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon)
  end

end
