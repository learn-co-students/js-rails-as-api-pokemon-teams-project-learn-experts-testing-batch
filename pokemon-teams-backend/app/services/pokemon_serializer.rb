class PokemonSerializer

    def initialize(pokemon)
        @pokemon = pokemon
    end

    def to_serialized_json
        @pokemon.to_json(
            include: {
                trainer: {
                    only: :name
                },
            }, 
            except: [:created_at, :updated_at]
        )
    end
end