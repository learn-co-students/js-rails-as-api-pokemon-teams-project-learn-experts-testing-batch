class TrainerSerializer

    def initialize(trainer)
        @trainer = trainer
    end

    def to_serialized_json
        @trainer.to_json(
            include: {
                pokemons: {
                    except: [:created_at, :updated_at]
                },
            }, 
            except: [:created_at, :updated_at]
        )
    end
end