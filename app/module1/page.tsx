"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Volume2, VolumeX, RotateCcw, Play, Pause, Award, CheckCircle2 } from "lucide-react";
import { useModules } from "../components/ModuleContext";
import Image from "next/image";

const salads = [
  {
    id: 1,
    type: "Appetizer Salad",
    description: "Light and refreshing salads served at the beginning of a meal to stimulate the appetite. Usually small portions with crisp greens and a light vinaigrette.",
    image: "/image/apetizer.jpg",
    audioPath: "/image/audio/Appetizer salad.aac",
    lectureNote: "Appetizer salads are crucial for setting the tone of a meal. They should be light enough to stimulate appetite without filling up your guests. Focus on crisp, fresh ingredients with bright, acidic dressings. Remember: presentation matters most in appetizer salads as they create the first impression.",
    examples: [
      {
        name: "Creamy Chicken Salad",
        image: "/image/examples/creamychickensalad.webp",
        ingredients: [
          "2½ cups finely chopped cooked chicken",
          "2 hard-boiled eggs, finely grated",
          "¼ cup finely grated cheese",
          "1 tomato, seeded and chopped",
          "½ tablespoon fresh parsley, finely chopped",
          "¼–⅓ cup mayonnaise",
          "2 tablespoons Homemade Ranch dressing (optional)",
          "35–40 crackers",
          "1 large English cucumber, sliced",
          "Salt and ground black pepper, to taste"
        ],
        process: "Step 1: Prepare the ingredients — Finely chop the cooked chicken, grate the hard-boiled eggs and cheese, seed and chop the tomato, and finely chop the parsley. Step 2: Combine the main ingredients — In a mixing bowl, add the chopped chicken, grated eggs, grated cheese, chopped tomato, and parsley. Step 3: Add the dressing — Add ¼ cup mayonnaise and mix well. If desired, add 2 tablespoons of homemade ranch dressing for extra flavor. Step 4: Mix thoroughly — Stir all ingredients until evenly combined and creamy. Adjust the consistency by adding more mayonnaise (up to ⅓ cup if needed). Step 5: Season to taste — Add salt and ground black pepper according to your preference. Mix again. Step 6: Prepare the base — Arrange the crackers and cucumber slices on a serving tray. Step 7: Assemble the appetizer — Spoon a small amount of the creamy chicken salad onto each cracker or cucumber slice. Step 8: Serve — Serve immediately, or chill for 15–20 minutes before serving for better flavor."
      },
      {
        name: "Avocado Pesto Egg Salad Bites",
        image: "/image/examples/examplesavocadopestoeggsalad.jpg",
        ingredients: [
          "½ avocado, cubed",
          "2 hard-boiled eggs, cubed",
          "1–2 tablespoons vegan pesto",
          "Handful fresh basil, slivered",
          "1–2 green onions, thinly sliced",
          "1–2 teaspoons lemon juice",
          "Salt and pepper, to taste",
          "½ long cucumber, sliced into rounds"
        ],
        process: "Step 1: Prepare the ingredients — Cube the avocado and hard-boiled eggs. Slice the green onions thinly, sliver the fresh basil, and cut the cucumber into round slices. Step 2: Combine the main ingredients — In a mixing bowl, add the cubed avocado and eggs. Step 3: Add the flavorings — Add 1–2 tablespoons of vegan pesto, green onions, basil, and lemon juice. Step 4: Mix gently — Lightly toss or mash the mixture until slightly creamy but still chunky. Be careful not to overmix. Step 5: Season to taste — Add salt and pepper according to your preference. Mix again. Step 6: Prepare the base — Arrange the cucumber slices neatly on a serving tray. Step 7: Assemble the appetizer — Spoon a small amount of the avocado pesto egg salad onto each cucumber slice. Step 8: Serve — Serve immediately for freshness, or chill for 10–15 minutes before serving."
      },
    ],
    keyPoints: ["Small portions", "Crisp greens", "Light vinaigrette", "Served first"]
  },
  {
    id: 2,
    type: "Side Salad",
    description: "Accompanies the main course and complements the flavors of the entrée. Often features seasonal vegetables and simple dressings.",
    image: "/image/Sidesaladcover.png",
    audioPath: "/image/audio/Side salad.aac",
    lectureNote: "Side salads serve as a complementary dish to the main course. The key is balance - they should enhance, not overpower, the entrée. Consider the flavors and textures of your main dish when selecting ingredients. A simple vinaigrette often works best to keep the focus on the main course.",
    examples: [
      {
        name: "Coleslaw",
        image: "/image/examples/coleslaw.png",
        ingredients: [
          "Cabbage, shredded",
          "Carrots, grated",
          "Mayonnaise",
          "Vinegar",
          "Sugar",
          "Salt and pepper"
        ],
        process: "Step 1: Wash the cabbage and carrots. Step 2: Shred the cabbage into thin strips. Step 3: Grate the carrots. Step 4: Place the cabbage and carrots in a large bowl. Step 5: In another bowl, mix the mayonnaise, vinegar, sugar, salt, and pepper. Step 6: Stir until the dressing becomes smooth and creamy. Step 7: Pour the dressing over the cabbage and carrots. Step 8: Mix well until the vegetables are evenly coated. Step 9: Refrigerate for about 30 minutes before serving to improve the flavor."
      },
      {
        name: "Mixed Green Salad",
        image: "/image/examples/mixsalad.png",
        ingredients: [
          "Mixed greens (romaine lettuce or spinach)",
          "Cucumber",
          "Cherry tomatoes",
          "Red onion",
          "Olive oil",
          "Lemon juice or vinegar",
          "Salt and pepper"
        ],
        process: "Step 1: Wash all the vegetables thoroughly. Step 2: Chop the lettuce if needed. Step 3: Slice the cucumber and red onion. Step 4: Place the mixed greens in a large bowl. Step 5: Add the cucumber, cherry tomatoes, and red onion. Step 6: In a small bowl, mix the olive oil, lemon juice, salt, and pepper. Step 7: Pour the dressing over the salad. Step 8: Toss gently until the ingredients are well combined. Step 9: Transfer to a serving bowl and serve immediately."
      },
    ],
    keyPoints: ["Complements entrée", "Simple flavors", "Seasonal vegetables", "Balance is key"]
  },
  {
    id: 3,
    type: "Main Course Salad",
    description: "Substantial salads with protein like chicken, fish, or beans that serve as the primary dish. Nutritionally balanced and filling.",
    image: "/image/maincoursecover.png",
    audioPath: "/image/audio/main course salad.aac",
    lectureNote: "Main course salads must be nutritionally complete and satisfying. Include quality protein sources, complex carbohydrates, and healthy fats. These salads should be substantial enough to be the centerpiece of the meal. Pay attention to portion sizes and nutritional balance throughout.",
    examples: [
      {
        name: "Chef's Salad",
        image: "/image/examples/chef.png",
        ingredients: [
          "1½ lbs lettuce (Boston, Bibb, green or red leaf), washed and dried",
          "Salt and black pepper",
          "1 cup dressing (vinaigrette, ranch, or blue cheese)",
          "4 oz Swiss cheese, cut into thin strips",
          "4 oz baked ham, cut into thin strips",
          "4 oz smoked turkey/chicken/duck, cut into thin strips",
          "4 oz roast beef, cut into thin strips",
          "2 hard-boiled eggs, cut into wedges",
          "1 ripe avocado, diced",
          "16 cherry or grape tomatoes, cut in half",
          "2 cucumbers, sliced",
          "1 cup toasted croutons"
        ],
        process: "Step 1: Tear the lettuce into bite-size pieces and place in a large bowl. Step 2: Add salt and pepper, then mix with ½ cup dressing. Step 3: Divide the lettuce into 4 serving bowls. Step 4: Arrange the cheese, meats, eggs, and avocado on top of the lettuce (like spokes of a wheel). Step 5: Add tomatoes, cucumbers, and croutons on top. Step 6: Season again with salt and pepper if needed. Step 7: Serve with the remaining dressing on the side."
      },
      {
        name: "Cobb Salad",
        image: "/image/examples/cobb.png",
        ingredients: [
          "3 slices bacon",
          "1½ large eggs",
          "½ head iceberg lettuce, shredded",
          "1½ cups chopped, cooked chicken meat",
          "1 ripe tomato, seeded and chopped",
          "⅜ cup blue cheese, crumbled",
          "1½ green onions, chopped",
          "½ avocado, peeled, pitted, and diced",
          "½ (8 oz) bottle Ranch-style salad dressing"
        ],
        process: "Step 1: Place eggs in a saucepan and cover completely with cold water; bring to a boil, then cover and remove from heat. Let eggs sit for 10 to 12 minutes, then cool, peel, and chop. Step 2: While the eggs are cooking, place bacon in a large, deep skillet. Cook over medium-high heat until evenly brown, 7 to 10 minutes. Drain, crumble, and set aside. Step 3: Divide shredded lettuce among individual plates. Arrange rows of bacon, eggs, chicken, tomatoes, blue cheese, green onions, and avocado on top. Step 4: Drizzle with dressing and enjoy!"
      },
    ],
    keyPoints: ["Contains protein", "Nutritionally complete", "Substantial portions", "Meal centerpiece"]
  },
  {
    id: 4,
    type: "Dessert Salad",
    description: "Sweet salads made with fruits, nuts, and creamy dressings. Often served at the end of a meal or as a refreshing treat.",
    image: "/image/DessertSaladcover.png",
    audioPath: "/image/audio/DESSERT SALADS.aac",
    lectureNote: "Dessert salads offer a lighter alternative to traditional desserts. They combine fresh or preserved fruits with sweet, creamy dressings. Popular at gatherings and potlucks, these salads provide a refreshing end to a meal while still satisfying the sweet tooth.",
    examples: [
      {
        name: "Waldorf Salad",
        image: "/image/examples/waldrof.png",
        ingredients: [
          "2 large sweet apples",
          "1 cup seedless red grapes",
          "½ cup celery",
          "½ cup walnuts",
          "1 cup mini marshmallows",
          "1 cup whipped topping",
          "4 oz cream cheese",
          "1 tsp vanilla extract",
          "1 tbsp lemon juice"
        ],
        process: "Step 1: Prepare the Dressing — Whisk together a sweet, creamy base using whipped topping, softened cream cheese, and a dash of vanilla until the mixture is smooth and light. Step 2: Prepare the Fruit — Dice sweet apples into uniform cubes and halve seedless red grapes, patting them dry to ensure the dressing stays thick and creamy. Step 3: Slice the Celery — Cut the celery into very thin slices to provide a refreshing, crisp contrast to the sweetness of the other ingredients. Step 4: Combine Ingredients — Gently fold the apples, grapes, celery, and mini marshmallows into the cream mixture until every piece is evenly coated. Step 5: Chill the Salad — Cover the bowl and refrigerate for at least one hour to allow the flavors to meld and the marshmallows to soften slightly. Step 6: Add the Crunch — Stir in toasted walnuts just before serving to maintain their firm texture and nutty aroma against the soft cream."
      },
      {
        name: "Ambrosia Salad",
        image: "/image/examples/ambrosia.png",
        ingredients: [
          "1 cup heavy whipping cream",
          "1 cup sour cream",
          "1 can (11 oz) mandarin oranges",
          "1 can (20 oz) crushed pineapple",
          "1 cup maraschino cherries",
          "1 cup sweetened shredded coconut",
          "2 cups mini fruit-flavored marshmallows",
          "½ cup chopped walnuts"
        ],
        process: "Step 1: Prepare the Base — Whisk together the heavy whipping cream and sour cream until the mixture is smooth, thick, and well-combined. Step 2: Add Sweeteners — Gently fold in the mini marshmallows and shredded coconut so they begin to absorb the cream and soften slightly. Step 3: Prepare the Fruit — Drain the mandarin oranges, pineapple, and cherries completely, then pat them with a paper towel to remove any excess moisture. Step 4: Fold the Fruits — Carefully add the prepared oranges, pineapple, and cherries to the cream base using a spatula to avoid breaking the delicate fruit segments. Step 5: Incorporate the Crunch — Stir in the chopped nuts last to ensure they remain crisp against the soft textures of the fruit and marshmallows. Step 6: Chill for Service — Refrigerate the salad for at least 4 hours, or ideally overnight, to allow the marshmallows to expand and the flavors to fully meld."
      },
    ],
    keyPoints: ["Sweet dressings", "Fresh fruits", "Light dessert option", "Refreshing finish"]
  },
  {
    id: 5,
    type: "Separate Course (Dessert) Salad",
    description: "Sweet salads served as a separate course or dessert, made with fruits, nuts, gelatin, or sweetened dressings.",
    image: "/image/DessertSaladcover.png",
    audioPath: "/image/audio/Separate course (dessert) salad.aac",
    lectureNote: "Dessert salads are served at the end of a meal as a lighter alternative to traditional desserts. They often use fruits, sweet dressings, whipped cream, or gelatin and should be refreshing rather than heavy.",
    examples: [
      {
        name: "Caesar Salad",
        image: "/image/examples/gege.png",
        ingredients: [
          "Olive oil",
          "Egg yolks",
          "Fresh lemon juice",
          "Worcestershire sauce",
          "Anchovy paste",
          "Garlic",
          "Mustard"
        ],
        process: "Step 1: Prepare the Dressing — Whisk the egg yolks with lemon juice and mustard, then slowly drizzle in the olive oil to create a thick, creamy emulsion. Step 2: Infuse Flavor — Stir in the finely minced garlic, anchovy paste, and Worcestershire sauce until the dressing is pungent and smooth. Step 3: Toss the Greens — Break the romaine leaves into large, bite-sized pieces and toss in a chilled bowl with enough dressing to coat every leaf. Step 4: Add Crunch and Salt — Fold in croutons and a generous handful of shaved Parmesan cheese just before serving to maintain texture. Step 5: Finish and Serve — Plate on a chilled dish and top with an extra crack of black pepper and a final sprinkle of cheese."
      },
      {
        name: "Caprese Salad",
        image: "/image/examples/caprese.png",
        ingredients: [
          "Ripe tomatoes",
          "Mozzarella cheese (Bocconcini or Buffalo)",
          "Basil leaves",
          "Olive oil",
          "Balsamic glaze",
          "Flaky sea salt",
          "Cracked black pepper"
        ],
        process: "Step 1: Slice the Base — Begin by slicing the tomatoes and the fresh mozzarella into uniform rounds approximately 1/4-inch thick. Step 2: Layer for Presentation — On a flat serving platter, alternate the slices of tomato and mozzarella in a circular or linear overlapping pattern. Step 3: Incorporate Aromatics — Tuck a whole, fresh basil leaf between each slice of cheese and tomato so that the scent infuses the entire dish. Step 4: Drizzle and Season — Uniformly drizzle the olive oil and a small amount of balsamic glaze over the top of the arranged ingredients. Step 5: Final Touch — Sprinkle the salad with sea salt and black pepper immediately before bringing it to the table to ensure the tomatoes stay firm and juicy."
      },
    ],
    keyPoints: ["Sweet ingredients", "Served last", "Light dessert option", "Refreshing"]
  },
  {
    id: 6,
    type: "Accompaniment Salad",
    description: "Salads served alongside the main course to complement flavors and add freshness to the meal.",
    image: "/image/accompanimentcover.png",
    audioPath: "/image/audio/accompaniment salad.aac",
    lectureNote: "Accompaniment salads balance rich main dishes. They are usually simple, lightly dressed, and should not overpower the main course.",
    examples: [
      {
        name: "Coleslaw",
        image: "/image/examples/coleslaw.png",
        ingredients: [
          "Cabbage, shredded",
          "Carrots, grated",
          "Mayonnaise",
          "Vinegar",
          "Sugar",
          "Salt and pepper"
        ],
        process: "Step 1: Wash the cabbage and carrots. Step 2: Shred the cabbage into thin strips. Step 3: Grate the carrots. Step 4: Place the cabbage and carrots in a large bowl. Step 5: In another bowl, mix mayonnaise, vinegar, sugar, salt, and pepper. Step 6: Stir until smooth and creamy. Step 7: Pour the dressing over the cabbage and carrots. Step 8: Toss well to coat the vegetables. Step 9: Refrigerate for 30 minutes before serving."
      },
      {
        name: "Side Garden Salad",
        image: "/image/examples/gardensalad.png",
        ingredients: [
          "Lettuce (romaine or iceberg)",
          "Cucumber, sliced",
          "Cherry tomatoes",
          "Carrots, shredded",
          "Italian dressing",
          "Cheddar cheese",
          "Salt and pepper"
        ],
        process: "Step 1: Wash all the vegetables thoroughly. Step 2: Chop the lettuce into bite-sized pieces. Step 3: Slice the cucumber and prepare the cherry tomatoes. Step 4: Place the lettuce in a bowl. Step 5: Add cucumber, tomatoes, and shredded carrots. Step 6: Sprinkle salt and pepper. Step 7: Add the dressing. Step 8: Toss the salad gently. Step 9: Serve immediately as a side dish."
      },
    ],
    keyPoints: ["Served with main dish", "Simple flavors", "Light dressing", "Enhances meal"]
  },
  {
    id: 7,
    type: "Green Salads",
    description: "Salads made primarily from leafy greens such as lettuce, spinach, or arugula, usually tossed with dressing.",
    image: "/image/greensaladcover.webp",
    audioPath: "/image/audio/Green Salads.aac",
    lectureNote: "Green salads are the most common type of salad. Freshness, crispness, and proper drying of greens are essential for quality.",
    examples: [
      {
        name: "Mixed Green Salad",
        image: "/image/examples/mixedgreensalad.webp",
        ingredients: [
          "6 cups spring mix or your favorite mixed greens",
          "1 English cucumber, thinly sliced",
          "¼ red onion, thinly sliced",
          "2 tablespoons slivered almonds and pepitas, or your favorite nuts/seeds"
        ],
        process: "Step 1: Prepare the ingredients — Wash and drain the spring mix or mixed greens thoroughly. Thinly slice the cucumber and red onion. Step 2: Place the greens — In a large salad bowl, add the spring mix or your chosen mixed greens. Step 3: Add the vegetables — Add the sliced cucumber and red onion on top of the greens. Step 4: Add the toppings — Sprinkle the slivered almonds and pepitas (or any preferred nuts/seeds) evenly over the salad. Step 5: Toss the salad — Gently toss all the ingredients until well combined. Step 6: Serve — Transfer to a serving plate or bowl. Serve immediately, or chill for a few minutes before serving."
      },
      {
        name: "Mâche Salad with Yogurt Dressing",
        image: "/image/examples/machesalad.jpg",
        ingredients: [
          "2 big handfuls mâche lettuce",
          "1 green bell pepper, diced",
          "1 cucumber, peeled or unpeeled depending on preference",
          "3 scallions, finely chopped",
          "1 avocado, diced",
          "Pinch of salt"
        ],
        process: "Step 1: Prepare the ingredients — Wash the mâche lettuce gently and drain well. Dice the green bell pepper and avocado. Slice or dice the cucumber depending on your preference, and finely chop the scallions. Step 2: Place the greens — In a salad bowl, add the mâche lettuce as the base. Step 3: Add the vegetables — Add the diced green bell pepper, cucumber, chopped scallions, and diced avocado on top of the lettuce. Step 4: Season lightly — Sprinkle a pinch of salt over the salad. Step 5: Add the yogurt dressing — Drizzle your prepared yogurt dressing over the salad (or serve it on the side). Step 6: Toss gently — Lightly toss the salad until the ingredients are evenly coated with the dressing. Step 7: Serve — Transfer to a serving plate or bowl and serve immediately for best freshness."
      },
    ],
    keyPoints: ["Leafy greens", "Fresh ingredients", "Light dressing", "Crisp texture"]
  },
  {
    id: 8,
    type: "Vegetable, Grain, Legume & Pasta Salads",
    description: "Hearty salads made with vegetables, grains, legumes, or pasta, often served chilled or at room temperature.",
    image: "/image/pastasaladcover.png",
    audioPath: "/image/audio/Vegetable grain.aac",
    lectureNote: "These salads are filling and versatile, often used for buffets or packed meals. Proper seasoning and cooling improve flavor.",
    examples: [
      {
        name: "Pasta Salad",
        image: "/image/examples/pasta.png",
        ingredients: [
          "1 (16 oz) package uncooked rotini pasta",
          "1 (16 oz) bottle Italian salad dressing",
          "2 medium cucumbers, chopped",
          "6 medium tomatoes, chopped",
          "1 bunch green onions, chopped",
          "4 oz grated Parmesan cheese",
          "1 tablespoon Italian seasoning"
        ],
        process: "Step 1: Gather all ingredients. Step 2: Bring a large pot of lightly salted water to a boil. Place pasta in the pot, cook for 8 to 12 minutes until al dente, and drain. Step 3: Toss cooked pasta with Italian dressing, cucumbers, tomatoes, and green onions in a large bowl. Step 4: Mix Parmesan cheese and Italian seasoning in a small bowl, and gently mix into the salad. Step 5: Refrigerate pasta salad until chilled for best results, at least 30 minutes before serving."
      },
      {
        name: "Bean Salad",
        image: "/image/examples/beansalad.png",
        ingredients: [
          "15 oz can kidney beans",
          "15 oz can white beans or pinto beans",
          "15 oz can green beans",
          "15 oz can wax beans (or another can of green beans)",
          "½ medium white onion",
          "¼ medium red onion (optional)",
          "2 tablespoons chopped curly or Italian parsley",
          "½ cup white vinegar",
          "¼ cup olive oil",
          "2 tablespoons granulated sugar (or maple syrup or honey)",
          "¼ teaspoon each dried dill and garlic powder",
          "1 teaspoon kosher salt",
          "Fresh ground black pepper"
        ],
        process: "Step 1: Drain and rinse the beans. Thinly slice the onions into slivers. Step 2: Finely chop the parsley. In a large bowl, whisk together the white vinegar, olive oil, sugar, dill, garlic powder, and kosher salt. Step 3: Add the beans, onions, and parsley and stir until coated. You can eat immediately, but for best results refrigerate for 1 hour to allow the salad to marinate. Store leftovers refrigerated for up to 5 days."
      },
    ],
    keyPoints: ["Hearty ingredients", "Good for buffets", "Served cold", "Well-seasoned"]
  },
  {
    id: 9,
    type: "Bound Salads",
    description: "Salads held together with a thick dressing such as mayonnaise.",
    image: "/image/boundsaladcover.png",
    audioPath: "/image/audio/Bound Salad.aac",
    lectureNote: "Bound salads use creamy dressings that coat ingredients evenly. Proper chilling improves texture and flavor.",
    examples: [
      {
        name: "Potato Salad",
        image: "/image/examples/potato.png",
        ingredients: [
          "2 pounds (907g) small yellow, red, or white potatoes",
          "1 tablespoon apple cider, wine, or rice wine vinegar",
          "½ cup (113g) sour cream",
          "¼ cup (56g) mayonnaise",
          "1 tablespoon yellow mustard",
          "½ medium red onion, finely chopped (about ½ cup)",
          "3 celery stalks, finely chopped (about ½ cup)",
          "1 medium dill pickle, finely chopped (about ⅓ cup)",
          "2 hard-boiled eggs, peeled and chopped (optional)",
          "¼ cup chopped fresh herbs (parsley, dill, chives, tarragon, or cilantro)",
          "Salt and fresh ground black pepper"
        ],
        process: "Step 1: Boil cubed potatoes in water until tender (about 10–15 minutes). Drain and let them cool completely. Step 2: In a separate bowl, mix the mayonnaise, sour cream, mustard, and spices. Step 3: In a large bowl, combine the cooled potatoes, chopped eggs, celery, and pickles. Step 4: Fold the dressing into the potato mixture gently using a spatula to avoid mashing the potatoes. Step 5: Chill in the refrigerator for 1–2 hours before serving."
      },
      {
        name: "Chicken Salad",
        image: "/image/examples/chicken.png",
        ingredients: [
          "2 cups cooked chopped or shredded chicken",
          "½ cup mayonnaise",
          "1 rib celery, diced",
          "1 green onion, thinly sliced",
          "1 teaspoon Dijon mustard",
          "¼ teaspoon seasoned salt, more to taste",
          "⅛ teaspoon black pepper, or to taste",
          "1 teaspoon chopped fresh dill or ¼ teaspoon dried dill (optional)"
        ],
        process: "Step 1: Place the pre-cooked shredded or cubed chicken in a large mixing bowl. Step 2: Stir in the diced celery and green onions. Step 3: Add the mayonnaise, lemon juice, salt, and pepper. Step 4: Mix until the chicken is thoroughly and evenly coated with the dressing. Step 5: Serve immediately on a bed of lettuce or as a sandwich filling, or chill for better flavor."
      },
    ],
    keyPoints: ["Creamy dressing", "Thick consistency", "Served cold", "Well-mixed"]
  },
  {
    id: 10,
    type: "Fruit Salads",
    description: "Salads made primarily from fresh or preserved fruits, served sweet or lightly dressed.",
    image: "/image/fruitsaladcover.png",
    audioPath: "/image/audio/FRUIT SALADS.aac",
    lectureNote: "Fruit salads emphasize freshness and natural sweetness. Prevent browning by using citrus juice.",
    examples: [
      {
        name: "Tropical Fruit Salad",
        image: "/image/examples/tropical.png",
        ingredients: [
          "2 cups pineapple chunks",
          "1 cup papaya chunks",
          "2 cups mango chunks",
          "1 cup kiwi slices",
          "1 cup raspberries",
          "¼ cup honey",
          "2 tablespoons lime juice",
          "Mint sprigs and lime slices (optional garnish)"
        ],
        process: "Step 1: Place the pineapple, papaya, mango, kiwi, and raspberries in a large bowl. Step 2: In a small bowl, whisk together the honey and lime juice until smooth. Step 3: Drizzle the dressing over the fruit and toss gently to coat. Step 4: Serve, garnished with mint sprigs and lime slices if desired."
      },
      {
        name: "Fruit Cocktail Salad",
        image: "/image/examples/fruitcocktail.png",
        ingredients: [
          "1 (540 ml) can fruit cocktail stored in water, drained",
          "4 kiwis, diced",
          "1 cup strawberries, diced",
          "1 cup blueberries",
          "1 medium apple, diced",
          "1 medium peach, diced",
          "1 mango, peeled and diced",
          "3 mandarin oranges, peeled",
          "⅓ cup 100% orange juice",
          "Juice of 1 lemon",
          "Zest of 1 lemon",
          "⅛ teaspoon salt",
          "1–2 tablespoons honey (optional)",
          "¼ cup fresh mint, finely chopped (optional)",
          "1 teaspoon vanilla extract (optional)"
        ],
        process: "Step 1: In a large bowl, add the drained fruit cocktail. Top with additional diced fruits including kiwi, strawberries, blueberries, apple, peach, mandarins, and mango. Step 2: Add lemon juice, lemon zest, and salt. If using, also add the honey, fresh mint, and vanilla extract. Step 3: Toss to combine. Serve fresh or store in an airtight container in the fridge for up to 3–5 days."
      },
    ],
    keyPoints: ["Fresh fruits", "Natural sweetness", "Colorful presentation", "Light dressing"]
  },
  {
    id: 11,
    type: "Composed Salads",
    description: "Salads where ingredients are arranged neatly rather than mixed.",
    image: "/image/composedsaladcover.png",
    audioPath: "/image/audio/Composed salad.aac",
    lectureNote: "Composed salads focus on presentation. Ingredients are arranged artistically and dressed lightly or separately.",
    examples: [
      {
        name: "Cobb Salad",
        image: "/image/examples/cobb.png",
        ingredients: [
          "3 slices bacon",
          "1½ large eggs",
          "½ head iceberg lettuce, shredded",
          "1½ cups chopped, cooked chicken meat",
          "1 ripe tomato, seeded and chopped",
          "⅜ cup blue cheese, crumbled",
          "1½ green onions, chopped",
          "½ avocado, peeled, pitted, and diced",
          "½ (8 oz) bottle Ranch-style salad dressing"
        ],
        process: "Step 1: Place eggs in a saucepan and cover completely with cold water; bring to a boil, then cover and remove from heat. Let eggs sit for 10 to 12 minutes, then cool, peel, and chop. Step 2: While the eggs are cooking, place bacon in a large, deep skillet. Cook over medium-high heat until evenly brown, 7 to 10 minutes. Drain, crumble, and set aside. Step 3: Divide shredded lettuce among individual plates. Arrange rows of bacon, eggs, chicken, tomatoes, blue cheese, green onions, and avocado on top. Step 4: Drizzle with dressing and enjoy!"
      },
      {
        name: "Niçoise Salad",
        image: "/image/examples/gege.png",
        ingredients: [
          "⅓ cup lemon juice or red wine vinegar",
          "¾ cup extra virgin olive oil",
          "3 tablespoons finely chopped shallot",
          "2 tablespoons finely chopped fresh basil",
          "1 tablespoon finely chopped fresh thyme",
          "2 teaspoons finely chopped fresh oregano or tarragon",
          "1 teaspoon Dijon mustard",
          "Salt and freshly ground black pepper",
          "2–3 (5 oz) cans tuna, drained, or 2 (8 oz) grilled tuna steaks",
          "6 hard-boiled eggs, peeled and quartered lengthwise",
          "1¼ pounds small young red or fingerling potatoes",
          "2 medium heads Boston or butter lettuce, torn into bite-sized pieces",
          "3 small ripe tomatoes, cored and cut into wedges",
          "1 small red onion, thinly sliced",
          "8 oz green beans, trimmed and cut into 2-inch pieces",
          "¼ cup Niçoise olives",
          "2 tablespoons capers, rinsed, and/or several anchovies (optional)"
        ],
        process: "Step 1: In a jar, place the oil, lemon juice or vinegar, shallots, herbs, and mustard. Cover with a lid and shake until well blended. Add salt and pepper to taste. Step 2: Marinate the onion slices in some of the vinaigrette — Place onion slices in a small bowl and sprinkle with 3 tablespoons of the vinaigrette. Step 3: Cook the potatoes — Place potatoes in a large pot, cover with 2 inches of water, and add 1 tablespoon of salt. Bring to a boil, then lower to a simmer and cook for 10 to 12 minutes until fork tender. Drain. While still warm, cut into halves or quarters and dress with about ¼ cup of the vinaigrette. Step 4: Boil the green beans — Bring a medium pot of salted water to a boil. Add green beans and cook until tender but still firm, about 3 to 5 minutes. Drain and rinse with cold water to stop the cooking. Step 5: Arrange the salad — Arrange a bed of lettuce on a serving platter. Mound tuna in the center. Sprinkle tomatoes and onions around the tuna. Arrange potatoes, green beans, hard-boiled eggs, olives, and anchovies (if using) in mounds on the lettuce. Step 6: Drizzle everything with the remaining vinaigrette. Sprinkle with capers if using. Serve immediately, slightly warm or at room temperature."
      },
    ],
    keyPoints: ["Arranged presentation", "Visual appeal", "Separate components", "Minimal mixing"]
  },
  {
    id: 12,
    type: "Gelatin Salads",
    description: "Salads made with gelatin combined with fruits, vegetables, or meats.",
    image: "/image/gelatin_cover.png",
    audioPath: "/image/audio/gelatin salads.aac",
    lectureNote: "Gelatin salads are popular for special occasions. Proper setting time and temperature are important.",
    examples: [
      {
        name: "Vegetable Aspic",
        image: "/image/examples/aspic.png",
        ingredients: [
          "2 packets of agar or xanthan",
          "About 1 L of broth",
          "1 can of corn",
          "1 can of peas",
          "1 cooked carrot",
          "Radish",
          "1 red pepper",
          "1 tofu (preferably smoked)",
          "2 pickles",
          "Parsley",
          "Vegan ham (optional)"
        ],
        process: "Step 1: Prepare dishes or molds (bread forms, cake molds, or small bowls) for shaping the jellies. Step 2: Cut vegetables and tofu according to preference and place them in the dishes. The shape of your veggies is totally up to you. Step 3: Prepare agar or xanthan as described on the package, using a strong broth instead of water for a much better taste. Step 4: Pour the jelly mixture into the molds and refrigerate for a few hours until fully set. Serve as a party snack."
      },
      {
        name: "Tropical Gelatin Fruit Salad",
        image: "/image/examples/gelatinfruit.png",
        ingredients: [
          "16 oz cottage cheese",
          "8 oz whipped topping",
          "1 can pineapple tidbits, drained",
          "1 can mandarin oranges, drained",
          "2 small boxes or 1 large box orange Jello mix"
        ],
        process: "Step 1: Mix together the whipped topping and Jello mix until thoroughly combined. Step 2: Add in the cottage cheese and mix completely. Step 3: Add in the fruit and mix. Step 4: Refrigerate for one hour. Serve chilled."
      },
    ],
    keyPoints: ["Gelatin-based", "Chilled before serving", "Decorative", "Firm texture"]
  }
];

export default function Module1() {
  const { modules, updateModuleCompletion } = useModules();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isModuleCompleted = modules.find(m => m.id === 1)?.completed || false;
  const progressPercent = ((current + 1) / salads.length) * 100;

  const playAudio = () => {
    if (audioRef.current) { audioRef.current.play(); setIsPlaying(true); }
  };
  const pauseAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); }
  };
  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; setIsPlaying(false); }
  };
  const toggleAutoPlay = () => { setAutoPlay(!autoPlay); if (isPlaying) stopAudio(); };

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    stopAudio();
    if (autoPlay && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [current, autoPlay]);

  useEffect(() => { setIsFlipped(false); }, [current]);

  useEffect(() => {
    if (current === salads.length - 1) {
      setShowCompletion(true);
      if (!isModuleCompleted) {
        setTimeout(() => {
          updateModuleCompletion(1, true);
          alert('🎉 Congratulations! Module 1 marked as complete!');
        }, 1000);
      }
    }
  }, [current, isModuleCompleted]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % salads.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + salads.length) % salads.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <audio
        ref={audioRef}
        src={salads[current].audioPath}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* ── Hero Header ── */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-green-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
          <button
            onClick={() => window.location.href = "/navigation"}
            className="flex items-center gap-2 text-lime-200 hover:text-white transition-colors mb-6 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-semibold">Back to Course</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                  Classification of Salad
                </span>
                <br />
                <span className="text-white text-3xl md:text-4xl">Module 1</span>
              </h1>
              <p className="text-green-100 text-lg">
                Learn the different types and classifications of salads
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <BookOpen className="w-5 h-5 text-lime-300" />
                <span className="font-semibold">12 Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Lesson {current + 1} of {salads.length}</span>
              </div>
              {isModuleCompleted && (
                <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 px-5 py-3 rounded-full font-bold shadow-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-lime-200 font-semibold">Progress</span>
              <span className="text-lime-200 font-semibold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-300 to-lime-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">

        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Image Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-green-200">
            <div className="aspect-video relative overflow-hidden">
              <Image
                key={salads[current].image}
                src={salads[current].image}
                alt={salads[current].type}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-3">
                    {salads[current].type}
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow-md">
                    {salads[current].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav controls */}
            <div className="bg-gradient-to-r from-lime-50 to-green-50 px-6 py-4 flex items-center justify-between border-t-2 border-green-100">
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-green-50 text-green-700 font-extrabold rounded-2xl transition-all shadow-sm border-2 border-green-200 hover:border-green-400 hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
                {salads.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2 rounded-full transition-all ${idx === current ? "bg-gradient-to-r from-lime-500 to-green-600 w-6" : "bg-green-200 hover:bg-green-300 w-2"}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl transition-all hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Completion Card */}
          {showCompletion && current === salads.length - 1 && (
            <div className={`rounded-3xl p-6 shadow-lg border-2 ${
              isModuleCompleted
                ? "bg-gradient-to-br from-white to-green-50 border-green-300"
                : "bg-gradient-to-br from-white to-yellow-50 border-yellow-300"
            }`}>
              <div className="flex items-start gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  isModuleCompleted
                    ? "bg-gradient-to-br from-lime-400 to-green-500"
                    : "bg-gradient-to-br from-yellow-400 to-amber-500"
                }`}>
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold mb-2 text-green-900">
                    {isModuleCompleted ? "Module Already Completed!" : "🎉 Congratulations!"}
                  </h3>
                  <p className="text-green-700 mb-5 leading-relaxed">
                    {isModuleCompleted
                      ? "You've already completed Module 1: Classification of Salad. Great job!"
                      : "You've completed all lessons in Module 1: Classification of Salad. This module has been automatically marked as complete!"}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => { updateModuleCompletion(1, true); window.location.href = "/navigation"; }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 font-extrabold rounded-2xl hover:shadow-xl hover:shadow-lime-500/30 hover:scale-105 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Back to Course
                    </button>
                    {isModuleCompleted && (
                      <button
                        onClick={() => setCurrent(0)}
                        className="px-6 py-3 bg-white text-green-700 font-extrabold rounded-2xl hover:bg-green-50 transition-all border-2 border-green-300 hover:border-green-400"
                      >
                        Review Lessons
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients & Process */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-green-200">
            <h3 className="text-xl font-extrabold text-green-900 mb-5 flex items-center gap-2">
              🍽️ Ingredients & Process
            </h3>

            <div className="space-y-5">
              {salads[current].examples.map((example, idx) => {
                // Parse "Step N: ..." into an array of step strings
                const steps = example.process
                  .split(/(?=Step\s+\d+[:.])/)
                  .map((s) => s.replace(/^Step\s+\d+[:.]\s*/i, "").trim())
                  .filter(Boolean);

                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl border-2 border-green-200 overflow-hidden"
                  >
                    {/* Example header */}
                    <div className="bg-gradient-to-r from-lime-500 to-green-600 px-4 py-2.5">
                      <span className="text-white font-extrabold text-sm">{example.name}</span>
                    </div>

                    <div className="p-4 grid sm:grid-cols-2 gap-4">
                      {/* Ingredients */}
                      <div>
                        <p className="text-xs font-extrabold text-green-500 uppercase tracking-wider mb-2">
                          Ingredients
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {example.ingredients.map((ing, iIdx) => (
                            <span
                              key={iIdx}
                              className="bg-white text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border-2 border-green-200"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Process — numbered steps */}
                      <div>
                        <p className="text-xs font-extrabold text-green-500 uppercase tracking-wider mb-2">
                          Process
                        </p>
                        <ol className="space-y-2">
                          {steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5">
                              {/* Step number badge */}
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center mt-0.5">
                                <span className="text-white text-[10px] font-extrabold leading-none">
                                  {sIdx + 1}
                                </span>
                              </span>
                              {/* Step text */}
                              <span className="text-green-800 text-xs leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Points */}
            <div className="mt-5">
              <h4 className="font-extrabold text-green-900 mb-3">Key Points:</h4>
              <div className="grid grid-cols-2 gap-2">
                {salads[current].keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="bg-green-50 border-2 border-green-200 rounded-2xl px-4 py-2.5 text-sm flex items-center gap-2 hover:border-green-400 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="text-green-800 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        {/* ── END LEFT COLUMN ── */}

        {/* ── RIGHT COLUMN (SIDEBAR) ── */}
        <div className="space-y-5">

          {/* Lecture Notes + Audio */}
          <div className="bg-white rounded-3xl p-6 border-2 border-green-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-green-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                Lecture Notes
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAutoPlay}
                  title={autoPlay ? "Auto-play on" : "Auto-play off"}
                  className={`p-2 rounded-xl transition-all border-2 ${autoPlay ? "bg-gradient-to-r from-lime-500 to-green-600 text-white border-green-600" : "bg-green-50 text-green-700 border-green-200 hover:border-green-400"}`}
                >
                  {autoPlay ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                {isPlaying ? (
                  <button onClick={pauseAudio} className="p-2 bg-red-400 hover:bg-red-500 text-white rounded-xl transition-all border-2 border-red-400">
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={playAudio} className="p-2 bg-gradient-to-r from-lime-500 to-green-600 text-white rounded-xl transition-all hover:shadow-md hover:scale-105">
                    <Play className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Playback speed */}
            <div className="mb-4 bg-green-50 rounded-2xl p-3 border-2 border-green-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-green-700">Playback Speed</label>
                <span className="text-xs font-extrabold text-green-700 bg-green-200 px-2 py-0.5 rounded-full">{playbackRate.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-green-200 rounded-full appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-green-500 mt-1 font-medium">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
              </div>
            </div>

            <p className="text-green-800 leading-relaxed text-sm">{salads[current].lectureNote}</p>
            <p className="mt-3 text-xs font-semibold text-green-500">Lesson {current + 1} of {salads.length}</p>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-3xl p-6 border-2 border-green-200 shadow-lg">
            <h4 className="font-extrabold text-green-900 mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow">
                <span className="text-white text-sm">🍽️</span>
              </div>
              Examples
            </h4>
            <div className="space-y-3">
              {salads[current].examples.map((example, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-green-200 hover:border-green-400"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-green-100">
                    <img
                      src={example.image}
                      alt={example.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-5xl">🥗</div>';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-3 border-t-2 border-green-200">
                    <p className="font-extrabold text-green-900 text-sm text-center group-hover:text-green-700 transition-colors">
                      {example.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
          {/* ── END RIGHT COLUMN ── */}
  
        </div>
      </div>
    );
  }