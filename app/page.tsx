'use client';

import { useEffect, useState, useRef } from 'react';
import {
  CheckIcon,
  Combobox,
  Group,
  Highlight,
  Pill,
  PillsInput,
  TextInput,
  useCombobox,
} from '@mantine/core';
import RecipeCard from '@/app/components/RecipeCard';

interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
}

function getFilteredOptions(data: string[], searchQuery: string, limit: number) {
  const result: string[] = [];

  for (let i = 0; i < data.length; i++) {
    if (result.length === limit) break;

    if (data[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(data[i]);
    }
  }

  return result;
}

// Extract unique ingredients from recipes
function extractUniqueIngredients(recipes: Recipe[]): string[] {
  const ingredientSet = new Set<string>();
  
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      // Extract the main ingredient (first word or key ingredient)
      const mainIngredient = ingredient.toLowerCase().trim();
      
      // Check for noodle types
      const noodleTypes = [
        'spaghetti', 'penne', 'elbow macaroni', 'fettuccine', 'lasagna',
        'ramen noodles', 'ziti', 'egg noodles', 'instant ramen',
        'tagliatelle', 'fusilli pasta', 'fusilli', 'bowtie', 'gnocchi', 'rigatoni'
      ];
      
      // Find matching noodle type
      const matchingNoodle = noodleTypes.find(noodle => 
        mainIngredient.includes(noodle)
      );
      
      if (matchingNoodle) 
        ingredientSet.add(matchingNoodle);
      
    });
  });
  
  return Array.from(ingredientSet).sort();
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientSearch, setIngredientSearch] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  const searchCombobox = useCombobox({
    onDropdownClose: () => searchCombobox.resetSelectedOption(),
  });

  const ingredientCombobox = useCombobox({
    onDropdownClose: () => ingredientCombobox.resetSelectedOption(),
    onDropdownOpen: () => ingredientCombobox.updateSelectedOptionIndex('active'),
  });

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
        setAvailableIngredients(extractUniqueIngredients(data));
      });
  }, []);

  // Filter recipes based on search and selected ingredients
  useEffect(() => {
    let filtered = recipes;

    // Apply name search filter
    if (searchValue) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply ingredient filter
    if (selectedIngredients.length > 0) {
      filtered = filtered.filter((recipe) =>
        selectedIngredients.every(selectedIngredient =>
          recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())
          )
        )
      );
    }

    setFilteredRecipes(filtered);
  }, [searchValue, selectedIngredients, recipes]);

  const recipeNames = recipes.map((recipe) => recipe.name);
  const filteredNames = getFilteredOptions(recipeNames, searchValue, 5);

  const searchOptions = filteredNames.map((name) => (
    <Combobox.Option value={name} key={name}>
      <Highlight highlight={searchValue} size="sm">
        {name}
      </Highlight>
    </Combobox.Option>
  ));

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    searchCombobox.updateSelectedOptionIndex();
    searchCombobox.openDropdown();
  };

  const handleIngredientSelect = (val: string) => {
    setIngredientSearch('');
    setSelectedIngredients((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    );
  };

  const handleIngredientRemove = (val: string) =>
    setSelectedIngredients((current) => current.filter((v) => v !== val));

  const ingredientValues = selectedIngredients.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleIngredientRemove(item)}>
      {item}
    </Pill>
  ));

  const ingredientOptions = availableIngredients
    .filter((item) => item.toLowerCase().includes(ingredientSearch.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={selectedIngredients.includes(item)}>
        <Group gap="md">
          {selectedIngredients.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <main className="p-6">
      {/* Header row with title and search */}
      <div className="flex justify-between items-center mb-6 relative">
        <h1 className="text-3xl font-bold">Noodle Recipes</h1>

        <div className="flex gap-4 items-center">
          {/* Ingredient Filter */}
          <div className="w-80">
            <Combobox 
              store={ingredientCombobox} 
              onOptionSubmit={handleIngredientSelect} 
              withinPortal={false}
            >
              <Combobox.DropdownTarget>
                <PillsInput onClick={() => ingredientCombobox.openDropdown()}>
                  <Pill.Group>
                    {ingredientValues}
                    <Combobox.EventsTarget>
                      <PillsInput.Field
                        onFocus={() => ingredientCombobox.openDropdown()}
                        onBlur={() => ingredientCombobox.closeDropdown()}
                        value={ingredientSearch}
                        placeholder="Filter by noodle type..."
                        onChange={(event) => {
                          ingredientCombobox.updateSelectedOptionIndex();
                          setIngredientSearch(event.currentTarget.value);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Backspace' && ingredientSearch.length === 0) {
                            event.preventDefault();
                            handleIngredientRemove(selectedIngredients[selectedIngredients.length - 1]);
                          }
                        }}
                      />
                    </Combobox.EventsTarget>
                  </Pill.Group>
                </PillsInput>
              </Combobox.DropdownTarget>

              <Combobox.Dropdown
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  zIndex: 50,
                  width: '100%',
                  background: 'white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '0.375rem',
                  overflow: 'hidden',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                <Combobox.Options>
                  {ingredientOptions.length === 0 ? (
                    <Combobox.Empty>No ingredients found</Combobox.Empty>
                  ) : (
                    ingredientOptions
                  )}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </div>

          {/* Recipe Name Search */}
          <div className="relative w-64" ref={searchRef}>
            <Combobox
              onOptionSubmit={(value) => {
                setSearchValue(value);
                searchCombobox.closeDropdown();
              }}
              withinPortal={false}
              store={searchCombobox}
            >
              <Combobox.Target>
                <TextInput
                  placeholder="Search recipe..."
                  value={searchValue}
                  onChange={(event) => handleSearchChange(event.currentTarget.value)}
                  onClick={() => searchCombobox.openDropdown()}
                  onFocus={() => searchCombobox.openDropdown()}
                  onBlur={() => searchCombobox.closeDropdown()}
                />
              </Combobox.Target>

              {/* Absolute floating dropdown */}
              <Combobox.Dropdown
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 50,
                  width: '100%',
                  background: 'white',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  borderRadius: '0.375rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <Combobox.Options>
                  {searchOptions.length === 0 ? (
                    <Combobox.Empty>Nothing found</Combobox.Empty>
                  ) : (
                    searchOptions
                  )}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </div>
        </div>
      </div>

      {/* Recipe grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}