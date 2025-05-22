package com.malana.pet;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import java.util.List;

@Controller
@RequestMapping(path="/malana")
@CrossOrigin(origins = "http://localhost:5173")// Updated URI
public class PetController {

    @Autowired
    private PetRepository petRepository;

    // Retrieve all the pets
    @GetMapping(path="/pets")
    public @ResponseBody Iterable<Pet> getAllPets() {
        return petRepository.findAll();
    }

    // Add a new Pet
    @PostMapping(path="/pets")
    public ResponseEntity<Pet> addNewPet(@RequestBody Pet pet) {
        Pet savedPet = petRepository.save(pet);
        return ResponseEntity.ok(savedPet);
    }

    // Add multiple Pets
    @PostMapping(path="/pets/bulk")
    public ResponseEntity<List<Pet>> addMultiplePets(@RequestBody List<Pet> pets) {
        List<Pet> savedPets = petRepository.saveAll(pets);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPets);
    }


    // Edit a pet base on id
    @PutMapping("/pets/{id}")
    public ResponseEntity updatePet(@PathVariable Integer id, @RequestBody Pet pet) {
        Pet currentPet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No pet found with id: " + id));

        if (pet.getName() != null) {
            currentPet.setName(pet.getName());
        }
        if (pet.getSpecies() != null) {
            currentPet.setSpecies(pet.getSpecies());
        }
        if (pet.getBreed() != null) {
            currentPet.setBreed(pet.getBreed());
        }
        if (pet.getGender() != null) {
            currentPet.setGender(pet.getGender());
        }
        if (pet.getImage() != null) {
            currentPet.setImage(pet.getImage());
        }
        if (pet.getDescription() != null) {
            currentPet.setDescription(pet.getDescription());
        }
        if (pet.getPrice() != null) {
            currentPet.setPrice(pet.getPrice());
        }
        petRepository.save(currentPet);
        return ResponseEntity.ok("Pet with id " + id + " updated.");
    }

    // Delete a pet base on id
    @DeleteMapping(path="/pets/{id}")
    public @ResponseBody ResponseEntity<?> deletePet(@PathVariable Integer id) {
        Optional<Pet> pet = petRepository.findById(id);
        if (pet.isPresent()) {
            petRepository.deleteById(id);
            return ResponseEntity.ok("Pet with id " + id + " deleted.");
        } else {
            return ResponseEntity.badRequest().body("No pet found with id: " + id);
        }
    }

    // Get a pet by id
    @GetMapping(path="/pets/{id}")
    public ResponseEntity<?> getPetById(@PathVariable Integer id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No pet found with id: " + id));

        return ResponseEntity.ok(pet);
    }

    // Get pets that contains key in name, species, breed, gender, image, description and price
    @GetMapping(path = "/pets/search/{key}")
    public @ResponseBody Object searchPets(@PathVariable String key) {
        List<Pet> matchingCars = petRepository.findByNameIgnoreCaseContainingOrSpeciesIgnoreCaseContainingOrBreedIgnoreCaseContainingOrGenderIgnoreCaseContainingOrImageIgnoreCaseContainingOrDescriptionIgnoreCaseContaining(
                key, key, key, key, key, key
        );

        if (!matchingCars.isEmpty()) {
            return matchingCars;
        } else {
            return "Empty";
        }
    }

    @GetMapping(path = "/pets/search/price/{price}")
    public ResponseEntity<List<Pet>> getPetsByPriceLessThanEqual(@PathVariable Double price) {
        List<Pet> petsByPrice = petRepository.findByPriceLessThanEqual(price);
        return ResponseEntity.ok(petsByPrice);
    }
}