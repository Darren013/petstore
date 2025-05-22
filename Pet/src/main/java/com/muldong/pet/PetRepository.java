package com.muldong.pet;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByNameIgnoreCaseContainingOrSpeciesIgnoreCaseContainingOrBreedIgnoreCaseContainingOrGenderIgnoreCaseContainingOrImageIgnoreCaseContainingOrDescriptionIgnoreCaseContaining(
            String name, String species, String breed, String gender, String image, String description
    );

    List<Pet> findByPriceLessThanEqual(Double price);
}